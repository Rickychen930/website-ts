/**
 * Contact Controller
 * Controller Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles contact business logic
 * - Dependency Inversion Principle (DIP): Depends on abstractions (Model)
 * - Open/Closed Principle (OCP): Extensible without modification
 * - DRY: Centralized business logic
 */

import {
  IContact,
  ContactModel,
  IContactValidationResult,
  IContactData,
  ContactType,
} from "../models/contact-model";
import { UserProfile } from "../types/user";
import { logWarn, logError } from "../utils/logger";

/**
 * Contact Controller
 * Orchestrates contact-related business logic
 */
export class ContactController {
  private readonly model: typeof ContactModel;

  constructor(model: typeof ContactModel = ContactModel) {
    this.model = model;
  }

  /**
   * Get contact data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getContactData(profile: UserProfile): IContactData | null {
    const data = ContactModel.extractFromProfile(profile);

    if (!ContactModel.isValid(data)) {
      return null;
    }

    return data;
  }

  /**
   * Validate contact data
   * @param data - Contact data array
   * @returns Validation result
   */
  public validateData(data: IContact[]): IContactValidationResult {
    return this.model.validate(data);
  }

  /**
   * Process and prepare contact data for display
   * @param data - Raw contact data
   * @returns Processed contact data
   */
  public processData(data: IContact[]): IContact[] {
    if (!data || data.length === 0) {
      return [];
    }

    // Validate first
    const validation = this.validateData(data);
    if (!validation.isValid) {
      logWarn("Contact data validation failed", { errors: validation.errors }, "ContactController");
      return [];
    }

    // Sort by priority (highest first)
    const sorted = this.model.sortByPriority(data);

    // Format values and generate links
    return sorted.map((contact) => ({
      ...contact,
      value: this.model.formatValue(contact.value, contact.type),
      link: this.model.generateLink(contact),
    }));
  }

  /**
   * Get contacts grouped by type
   * @param data - Contact data
   * @returns Grouped contacts
   */
  public getGroupedByType(data: IContact[]): Map<ContactType, IContact[]> {
    return this.model.groupByType(data);
  }

  /**
   * Get contacts filtered by type
   * @param data - Contact data
   * @param type - Type to filter
   * @returns Filtered contacts
   */
  public getFilteredByType(data: IContact[], type: ContactType): IContact[] {
    return this.model.filterByType(data, type);
  }

  /**
   * Handle contact link click
   * @param contact - Contact item
   */
  public handleContactClick(contact: IContact): void {
    const link = contact.link || this.model.generateLink(contact);

    if (!link) {
      logWarn("No link available for contact", { label: contact.label }, "ContactController");
      return;
    }

    try {
      // For email and phone, use special protocols
      if (contact.type === ContactType.EMAIL && link.startsWith("mailto:")) {
        window.location.href = link;
        return;
      }

      if (contact.type === ContactType.PHONE && link.startsWith("tel:")) {
        window.location.href = link;
        return;
      }

      // For other links, open in new tab
      window.open(link, "_blank", "noopener,noreferrer");
    } catch (error) {
      logError("Failed to open contact link", error, "ContactController");
    }
  }

  /**
   * Copy contact value to clipboard
   * @param contact - Contact item
   * @returns Promise<boolean> - Success status
   */
  public async copyToClipboard(contact: IContact): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(contact.value);
      return true;
    } catch (error) {
      logError("Failed to copy to clipboard", error, "ContactController");
      // Fallback for older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = contact.value;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        return true;
      } catch (fallbackError) {
        logError("Fallback copy failed", fallbackError, "ContactController");
        return false;
      }
    }
  }

  /**
   * Get contact display priority
   * Higher priority contacts should be shown first
   * @param contact - Contact item
   * @returns Priority score
   */
  public getDisplayPriority(contact: IContact): number {
    return contact.priority || 0;
  }

  /**
   * Check if contact section should be displayed
   * @param profile - User profile
   * @returns Whether to display contact section
   */
  public shouldDisplay(profile: UserProfile): boolean {
    const data = this.getContactData(profile);
    return data !== null && data.contacts.length > 0;
  }

  /**
   * Get primary contact (highest priority)
   * @param contacts - Array of contacts
   * @returns Primary contact or null
   */
  public getPrimaryContact(contacts: IContact[]): IContact | null {
    if (!contacts || contacts.length === 0) {
      return null;
    }

    const sorted = this.model.sortByPriority(contacts);
    return sorted[0] || null;
  }

  /**
   * Get contact statistics
   * @param contacts - Array of contacts
   * @returns Statistics object
   */
  public getContactStats(contacts: IContact[]): {
    total: number;
    byType: Record<ContactType, number>;
    hasEmail: boolean;
    hasPhone: boolean;
    hasSocial: boolean;
  } {
    const stats = {
      total: contacts.length,
      byType: {
        [ContactType.EMAIL]: 0,
        [ContactType.PHONE]: 0,
        [ContactType.SOCIAL]: 0,
        [ContactType.LOCATION]: 0,
        [ContactType.WEBSITE]: 0,
        [ContactType.OTHER]: 0,
      },
      hasEmail: false,
      hasPhone: false,
      hasSocial: false,
    };

    contacts.forEach((contact) => {
      const type = contact.type || ContactType.OTHER;
      stats.byType[type] = (stats.byType[type] || 0) + 1;

      if (type === ContactType.EMAIL) stats.hasEmail = true;
      if (type === ContactType.PHONE) stats.hasPhone = true;
      if (type === ContactType.SOCIAL) stats.hasSocial = true;
    });

    return stats;
  }
}

