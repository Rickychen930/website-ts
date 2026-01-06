/**
 * WorkExperienceController - Controller Layer (MVC Pattern)
 * Handles business logic for Work Experience section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 * Extends BaseController for common functionality (DRY, OOP)
 */

import { UserProfile } from "../types/user";
import { WorkExperienceModel, IWorkExperienceData, IWorkExperienceItem } from "../models/work-experience-model";
import { BaseController } from "./base-controller";

/**
 * WorkExperienceController
 * Orchestrates business logic for Work Experience section
 * Follows OOP principles - extends BaseController
 */
export class WorkExperienceController extends BaseController {
  /**
   * Get work experience data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getWorkExperienceData(profile: UserProfile): IWorkExperienceData | null {
    const data = WorkExperienceModel.extractFromProfile(profile);

    if (!WorkExperienceModel.isValid(data)) {
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
    return this.getWorkExperienceData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return WorkExperienceModel.isValid(data as IWorkExperienceData);
  }

  /**
   * Get sorted work experience items (newest first)
   * Follows Single Responsibility Principle (SRP)
   */
  getSortedWorkExperienceItems(profile: UserProfile): IWorkExperienceItem[] {
    const data = this.getWorkExperienceData(profile);
    if (!data) {
      return [];
    }

    return WorkExperienceModel.sortByPeriod(data.items);
  }

  /**
   * Get work experience items grouped by company
   * Follows Single Responsibility Principle (SRP)
   */
  getGroupedByCompany(profile: UserProfile): Map<string, IWorkExperienceItem[]> {
    const items = this.getSortedWorkExperienceItems(profile);
    return WorkExperienceModel.groupByCompany(items);
  }

  /**
   * Get formatted period for display
   * Follows Single Responsibility Principle (SRP)
   */
  getFormattedPeriod(period: string): string {
    return WorkExperienceModel.formatPeriod(period);
  }

  /**
   * Get formatted duration for display
   * Follows Single Responsibility Principle (SRP)
   */
  getFormattedDuration(period: string): string {
    return WorkExperienceModel.getFormattedDuration(period);
  }

  /**
   * Get experience duration in months
   * Follows Single Responsibility Principle (SRP)
   */
  getDuration(period: string): number | null {
    return WorkExperienceModel.getDuration(period);
  }

  /**
   * Check if Work Experience section should be displayed
   * Inherited from BaseController - follows DRY principle
   */
  // shouldDisplay is inherited from BaseController

  /**
   * Get total work experience count
   * Follows Single Responsibility Principle (SRP)
   */
  getTotalCount(profile: UserProfile): number {
    const data = this.getWorkExperienceData(profile);
    return data ? data.items.length : 0;
  }

  /**
   * Get unique companies count
   * Follows Single Responsibility Principle (SRP)
   */
  getCompaniesCount(profile: UserProfile): number {
    const grouped = this.getGroupedByCompany(profile);
    return grouped.size;
  }

  /**
   * Get total years of experience
   * Follows Single Responsibility Principle (SRP)
   */
  getTotalYearsOfExperience(profile: UserProfile): number {
    const items = this.getSortedWorkExperienceItems(profile);
    let totalMonths = 0;

    items.forEach((item) => {
      const duration = WorkExperienceModel.getDuration(item.period);
      if (duration !== null) {
        totalMonths += duration;
      }
    });

    return Math.floor(totalMonths / 12);
  }
}

