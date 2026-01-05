/**
 * AcademicController - Controller Layer (MVC Pattern)
 * Handles business logic for Academic section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 */

import { UserProfile } from "../types/user";
import { AcademicModel, IAcademicData, IAcademicItem } from "../models/academic-model";

/**
 * AcademicController
 * Orchestrates business logic for Academic section
 */
export class AcademicController {
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
   * Follows Single Responsibility Principle (SRP)
   */
  shouldDisplay(profile: UserProfile): boolean {
    const data = this.getAcademicData(profile);
    return data !== null && AcademicModel.isValid(data);
  }

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

