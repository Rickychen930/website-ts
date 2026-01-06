/**
 * AcademicController - Controller Layer (MVC Pattern)
 * Handles business logic for Academic section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 * Extends BaseController for common functionality (DRY, OOP)
 */

import { AcademicModel, IAcademicData, IAcademicItem } from "../models/academic-model";
import { UserProfile } from "../types/user";
import { BaseController } from "./base-controller";

/**
 * AcademicController
 * Orchestrates business logic for Academic section
 * Follows OOP principles - extends BaseController
 */
export class AcademicController extends BaseController {
  /**
   * Get academic data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getAcademicData(profile: UserProfile): IAcademicData | null {
    const data = AcademicModel.extractFromProfile(profile);

    if (!AcademicModel.isValid(data)) {
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
    return this.getAcademicData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return AcademicModel.isValid(data as IAcademicData);
  }

  /**
   * Get sorted academic items (newest first)
   * Follows Single Responsibility Principle (SRP)
   */
  getSortedAcademicItems(profile: UserProfile): IAcademicItem[] {
    const data = this.getAcademicData(profile);
    if (!data) {
      return [];
    }

    return AcademicModel.sortByPeriod(data.items);
  }

  /**
   * Get academic items grouped by institution
   * Follows Single Responsibility Principle (SRP)
   */
  getGroupedByInstitution(profile: UserProfile): Map<string, IAcademicItem[]> {
    const items = this.getSortedAcademicItems(profile);
    return AcademicModel.groupByInstitution(items);
  }

  /**
   * Get formatted period for display
   * Follows Single Responsibility Principle (SRP)
   */
  getFormattedPeriod(period: string): string {
    return AcademicModel.formatPeriod(period);
  }

  /**
   * Get academic level from title
   * Follows Single Responsibility Principle (SRP)
   */
  getAcademicLevel(title: string): "undergraduate" | "graduate" | "certificate" | "other" {
    return AcademicModel.getAcademicLevel(title);
  }

  /**
   * Check if Academic section should be displayed
   * Inherited from BaseController - follows DRY principle
   */
  // shouldDisplay is inherited from BaseController

  /**
   * Get total academic achievements count
   * Follows Single Responsibility Principle (SRP)
   */
  getTotalCount(profile: UserProfile): number {
    const data = this.getAcademicData(profile);
    return data ? data.items.length : 0;
  }

  /**
   * Get unique institutions count
   * Follows Single Responsibility Principle (SRP)
   */
  getInstitutionsCount(profile: UserProfile): number {
    const grouped = this.getGroupedByInstitution(profile);
    return grouped.size;
  }
}

