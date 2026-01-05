/**
 * Contact Model
 * Model Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles contact data structure and validation
 * - Open/Closed Principle (OCP): Extensible via interfaces
 * - Interface Segregation Principle (ISP): Focused interfaces
 * - DRY: Centralized data operations
 */

import { UserProfile } from "../types/user";

/**
 * Contact Item Interface
 * Core data structure for a contact method
 */
export interface IContact {
  key: string;
  icon: string;
  label: string;
  value: string;
  link?: string;
  type?: ContactType;
  priority?: number;
  description?: string;
}

/**
 * Contact Type Enum
 * Categorizes different contact methods
 */
export enum ContactType {
  EMAIL = "email",
  PHONE = "phone",
  SOCIAL = "social",
  LOCATION = "location",
  WEBSITE = "website",
  OTHER = "other",
}

/**
 * Contact Validation Result
 */
export interface IContactValidationResult {
  isValid: boolean;
  error: string | null;
  errors: string[];
}

/**
 * Contact Data Interface
 * Extracted from UserProfile for better separation of concerns
 */
export interface IContactData {
  contacts: IContact[];
}

/**
 * Contact Model Class
 * Encapsulates contact data operations
 */
export class ContactModel {
  /**
   * Extract contact data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): IContactData | null {
    if (!profile || !profile.contacts || !Array.isArray(profile.contacts)) {
      return null;
    }

    const contacts: IContact[] = profile.contacts.map((item) => ({
      key: item.key || `contact-${Math.random().toString(36).substr(2, 9)}`,
      icon: item.icon || this.getDefaultIcon(item.label),
      label: item.label || "",
      value: item.value || "",
      link: item.link,
      type: this.detectContactType(item.label, item.value, item.link),
      priority: this.calculatePriority(item),
      description: this.generateDescription(item),
    }));

    return { contacts };
  }

  /**
   * Detect contact type from label, value, and link
   */
  private static detectContactType(
    label: string,
    value: string,
    link?: string
  ): ContactType {
    const lowerLabel = label.toLowerCase();
    const lowerValue = value.toLowerCase();

    if (lowerLabel.includes("email") || lowerValue.includes("@")) {
      return ContactType.EMAIL;
    }

    if (
      lowerLabel.includes("phone") ||
      lowerLabel.includes("mobile") ||
      lowerLabel.includes("whatsapp") ||
      /^[\d\s\-+()]+$/.test(value)
    ) {
      return ContactType.PHONE;
    }

    if (
      lowerLabel.includes("location") ||
      lowerLabel.includes("address") ||
      lowerLabel.includes("city")
    ) {
      return ContactType.LOCATION;
    }

    if (
      lowerLabel.includes("website") ||
      lowerLabel.includes("portfolio") ||
      lowerLabel.includes("blog") ||
      (link && (link.includes("http://") || link.includes("https://")))
    ) {
      return ContactType.WEBSITE;
    }

    if (
      lowerLabel.includes("linkedin") ||
      lowerLabel.includes("github") ||
      lowerLabel.includes("twitter") ||
      lowerLabel.includes("instagram") ||
      lowerLabel.includes("facebook") ||
      lowerLabel.includes("social")
    ) {
      return ContactType.SOCIAL;
    }

    return ContactType.OTHER;
  }

  /**
   * Get default icon based on label
   */
  private static getDefaultIcon(label: string): string {
    const lowerLabel = label.toLowerCase();

    if (lowerLabel.includes("email")) return "✉️";
    if (lowerLabel.includes("phone") || lowerLabel.includes("mobile")) return "📱";
    if (lowerLabel.includes("whatsapp")) return "💬";
    if (lowerLabel.includes("linkedin")) return "💼";
    if (lowerLabel.includes("github")) return "💻";
    if (lowerLabel.includes("location") || lowerLabel.includes("address")) return "📍";
    if (lowerLabel.includes("website") || lowerLabel.includes("portfolio")) return "🌐";
    if (lowerLabel.includes("twitter")) return "🐦";
    if (lowerLabel.includes("instagram")) return "📷";

    return "📧";
  }

  /**
   * Calculate priority for contact item
   * Higher priority items should be displayed first
   */
  private static calculatePriority(item: {
    label: string;
    value: string;
    link?: string;
  }): number {
    let priority = 0;

    // Has link = higher priority
    if (item.link) {
      priority += 10;
    }

    // Email and phone are high priority
    const lowerLabel = item.label.toLowerCase();
    if (lowerLabel.includes("email")) priority += 20;
    if (lowerLabel.includes("phone") || lowerLabel.includes("mobile")) priority += 15;

    // Social media = medium priority
    if (
      lowerLabel.includes("linkedin") ||
      lowerLabel.includes("github") ||
      lowerLabel.includes("portfolio")
    ) {
      priority += 8;
    }

    // Location = lower priority
    if (lowerLabel.includes("location") || lowerLabel.includes("address")) {
      priority += 5;
    }

    return priority;
  }

  /**
   * Generate description for contact item
   */
  private static generateDescription(item: {
    label: string;
    value: string;
    link?: string;
  }): string {
    const lowerLabel = item.label.toLowerCase();

    if (lowerLabel.includes("email")) {
      return "Send me an email";
    }
    if (lowerLabel.includes("phone") || lowerLabel.includes("mobile")) {
      return "Call or message me";
    }
    if (lowerLabel.includes("linkedin")) {
      return "Connect on LinkedIn";
    }
    if (lowerLabel.includes("github")) {
      return "View my code";
    }
    if (lowerLabel.includes("portfolio") || lowerLabel.includes("website")) {
      return "Visit my website";
    }
    if (lowerLabel.includes("location")) {
      return "My location";
    }

    return `Contact via ${item.label}`;
  }

  /**
   * Validate contact data
   * @param data - Contact data array
   * @returns Validation result
   */
  public static validate(data: IContact[]): IContactValidationResult {
    const errors: string[] = [];

    if (!data || !Array.isArray(data)) {
      return {
        isValid: false,
        error: "Invalid contact data format",
        errors: ["Data must be an array"],
      };
    }

    if (data.length === 0) {
      return {
        isValid: true,
        error: null,
        errors: [],
      };
    }

    // Check for duplicate keys
    const keys = new Set<string>();
    data.forEach((item, index) => {
      if (!item || typeof item !== "object") {
        errors.push(`Item at index ${index} is invalid`);
        return;
      }

      if (!item.key || typeof item.key !== "string" || item.key.trim() === "") {
        errors.push(`Item at index ${index} missing required key`);
        return;
      }

      if (keys.has(item.key)) {
        errors.push(`Duplicate contact key: ${item.key}`);
        return;
      }
      keys.add(item.key);

      if (!item.label || typeof item.label !== "string" || item.label.trim() === "") {
        errors.push(`Contact ${item.key} missing label`);
      }

      if (!item.value || typeof item.value !== "string" || item.value.trim() === "") {
        errors.push(`Contact ${item.key} missing value`);
      }

      if (item.link && typeof item.link !== "string") {
        errors.push(`Contact ${item.key} has invalid link`);
      }

      // Validate URL if link is provided
      if (item.link) {
        try {
          new URL(item.link);
        } catch {
          errors.push(`Contact ${item.key} has invalid URL format`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      error: errors.length > 0 ? errors[0] : null,
      errors,
    };
  }

  /**
   * Sort contacts by priority (highest first)
   * @param contacts - Array of contacts
   * @returns Sorted array
   */
  public static sortByPriority(contacts: IContact[]): IContact[] {
    return [...contacts].sort((a, b) => {
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;

      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Higher priority first
      }

      // If same priority, sort alphabetically by label
      return a.label.localeCompare(b.label);
    });
  }

  /**
   * Group contacts by type
   * @param contacts - Array of contacts
   * @returns Grouped contacts
   */
  public static groupByType(contacts: IContact[]): Map<ContactType, IContact[]> {
    const grouped = new Map<ContactType, IContact[]>();

    contacts.forEach((contact) => {
      const type = contact.type || ContactType.OTHER;
      if (!grouped.has(type)) {
        grouped.set(type, []);
      }
      grouped.get(type)!.push(contact);
    });

    return grouped;
  }

  /**
   * Filter contacts by type
   * @param contacts - Array of contacts
   * @param type - Type to filter by
   * @returns Filtered contacts
   */
  public static filterByType(contacts: IContact[], type: ContactType): IContact[] {
    return contacts.filter((contact) => contact.type === type);
  }

  /**
   * Validate contact data
   * @param data - Contact data
   * @returns Whether data is valid
   */
  public static isValid(data: IContactData | null): data is IContactData {
    if (!data || !data.contacts) {
      return false;
    }

    const validation = this.validate(data.contacts);
    return validation.isValid;
  }

  /**
   * Format contact value for display
   * @param value - Contact value
   * @param type - Contact type
   * @returns Formatted value
   */
  public static formatValue(value: string, type?: ContactType): string {
    if (type === ContactType.EMAIL) {
      return value.toLowerCase().trim();
    }

    if (type === ContactType.PHONE) {
      // Format phone number (basic formatting)
      return value.replace(/\s+/g, " ").trim();
    }

    return value.trim();
  }

  /**
   * Generate contact link if not provided
   * @param contact - Contact item
   * @returns Generated link or existing link
   */
  public static generateLink(contact: IContact): string | undefined {
    if (contact.link) {
      return contact.link;
    }

    const type = contact.type || ContactType.OTHER;
    const value = contact.value.trim();

    switch (type) {
      case ContactType.EMAIL:
        return `mailto:${value}`;
      case ContactType.PHONE:
        // Remove non-digit characters except +
        const phoneNumber = value.replace(/[^\d+]/g, "");
        return `tel:${phoneNumber}`;
      case ContactType.WEBSITE:
        if (!value.startsWith("http://") && !value.startsWith("https://")) {
          return `https://${value}`;
        }
        return value;
      default:
        return undefined;
    }
  }
}

