/**
 * Certification Controller
 * Controller Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles certification business logic
 * - Dependency Inversion Principle (DIP): Depends on abstractions (Model)
 * - Open/Closed Principle (OCP): Extensible without modification
 * - DRY: Uses centralized constants for error messages
 */

import { ICertification, CertificationModel, ICertificationValidationResult } from "../models/certification-model";
import { UserProfile } from "../types/user";
import { logWarn, logError } from "../utils/logger";
import { BaseController } from "./base-controller";
import { ErrorMessages } from "../constants";

/**
 * Certification Controller
 * Orchestrates certification-related business logic
 * Follows OOP principles - extends BaseController
 */
export class CertificationController extends BaseController {
  private readonly model: typeof CertificationModel;

  constructor(model: typeof CertificationModel = CertificationModel) {
    super();
    this.model = model;
  }

  /**
   * Get certification data from profile
   * @param profile - User profile
   * @returns Certification array or null
   */
  getCertificationData(profile: UserProfile): ICertification[] | null {
    if (!profile || !profile.certifications) {
      return null;
    }

    const data = profile.certifications as ICertification[];
    if (!this.model.validate(data).isValid) {
      return null;
    }

    return data;
  }

  /**
   * Implementation of abstract method from BaseController
   * @param profile - User profile
   * @returns Extracted data or null
   */
  protected getData(profile: UserProfile): unknown | null {
    return this.getCertificationData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return Array.isArray(data) && this.model.validate(data as ICertification[]).isValid;
  }

  /**
   * Validate certification data
   * @param data - Certification data array
   * @returns Validation result
   */
  public validateData(data: ICertification[]): ICertificationValidationResult {
    return this.model.validate(data);
  }

  /**
   * Process and prepare certification data for display
   * @param data - Raw certification data
   * @returns Processed certification data
   */
  public processData(data: ICertification[]): ICertification[] {
    if (!data || data.length === 0) {
      return [];
    }

    // Validate first
    const validation = this.validateData(data);
    if (!validation.isValid) {
      logWarn(ErrorMessages.INVALID_INPUT, { errors: validation.errors }, "CertificationController");
      return [];
    }

    // Sort by date (newest first)
    return this.model.sortByDate(data);
  }

  /**
   * Get certifications grouped by provider
   * @param data - Certification data
   * @returns Grouped certifications
   */
  public getGroupedByProvider(data: ICertification[]): Map<string, ICertification[]> {
    return this.model.groupByProvider(data);
  }

  /**
   * Get certifications filtered by category
   * @param data - Certification data
   * @param category - Category to filter
   * @returns Filtered certifications
   */
  public getFilteredByCategory(data: ICertification[], category: string): ICertification[] {
    return this.model.filterByCategory(data, category);
  }

  /**
   * Format certification date for display
   * @param dateString - Date string
   * @returns Formatted date
   */
  public formatDate(dateString: string): string {
    return this.model.formatDate(dateString);
  }

  /**
   * Format certification date for datetime attribute
   * @param dateString - Date string
   * @returns ISO date string
   */
  public formatDateForDateTime(dateString: string): string {
    return this.model.formatDateForDateTime(dateString);
  }

  /**
   * Handle certification link click
   * @param link - Certification link
   */
  public handleLinkClick(link: string): void {
    if (!link) {
      return;
    }

    try {
      window.open(link, "_blank", "noopener,noreferrer");
    } catch (error) {
      logError(ErrorMessages.GENERIC, error, "CertificationController");
    }
  }

  /**
   * Get certification display priority
   * Higher priority certifications should be shown first
   * @param cert - Certification item
   * @returns Priority score
   */
  public getDisplayPriority(cert: ICertification): number {
    let priority = 0;

    // Has link (verifiable) = higher priority
    if (cert.link) {
      priority += 10;
    }

    // Has credential ID = higher priority
    if (cert.credentialId) {
      priority += 5;
    }

    // Has description = higher priority
    if (cert.description) {
      priority += 3;
    }

    // Level-based priority
    const levelPriority: Record<string, number> = {
      expert: 8,
      advanced: 6,
      intermediate: 4,
      beginner: 2,
    };
    if (cert.level) {
      priority += levelPriority[cert.level] || 0;
    }

    return priority;
  }

  /**
   * Sort certifications by display priority
   * @param certifications - Array of certifications
   * @returns Sorted certifications
   */
  public sortByPriority(certifications: ICertification[]): ICertification[] {
    return [...certifications].sort((a, b) => {
      const priorityA = this.getDisplayPriority(a);
      const priorityB = this.getDisplayPriority(b);

      if (priorityA !== priorityB) {
        return priorityB - priorityA; // Higher priority first
      }

      // If same priority, sort by date (newest first)
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  }
}

