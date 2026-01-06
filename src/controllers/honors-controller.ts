/**
 * HonorsController - Controller Layer (MVC Pattern)
 * Handles business logic for Honors section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 * Extends BaseController for common functionality (DRY, OOP)
 */

import { UserProfile } from "../types/user";
import { HonorsModel, IHonorsData, IHonorItem, HonorCategory } from "../models/honors-model";
import { BaseController } from "./base-controller";

/**
 * HonorsController
 * Orchestrates business logic for Honors section
 * Follows OOP principles - extends BaseController
 */
export class HonorsController extends BaseController {
  /**
   * Get honors data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getHonorsData(profile: UserProfile): IHonorsData | null {
    const data = HonorsModel.extractFromProfile(profile);

    if (!HonorsModel.isValid(data)) {
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
    return this.getHonorsData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return HonorsModel.isValid(data as IHonorsData);
  }

  /**
   * Get sorted honors items (newest first)
   * Follows Single Responsibility Principle (SRP)
   */
  getSortedHonorsItems(profile: UserProfile): IHonorItem[] {
    const data = this.getHonorsData(profile);
    if (!data) {
      return [];
    }

    return HonorsModel.sortByDate(data.items);
  }

  /**
   * Get honors items grouped by year
   * Follows Single Responsibility Principle (SRP)
   */
  getGroupedByYear(profile: UserProfile): Map<number, IHonorItem[]> {
    const items = this.getSortedHonorsItems(profile);
    return HonorsModel.groupByYear(items);
  }

  /**
   * Get honors items grouped by category
   * Follows Single Responsibility Principle (SRP)
   */
  getGroupedByCategory(profile: UserProfile): Map<HonorCategory, IHonorItem[]> {
    const items = this.getSortedHonorsItems(profile);
    return HonorsModel.groupByCategory(items);
  }

  /**
   * Get formatted date for display
   * Follows Single Responsibility Principle (SRP)
   */
  getFormattedDate(date: string): string {
    return HonorsModel.formatDate(date);
  }

  /**
   * Get honor category
   * Follows Single Responsibility Principle (SRP)
   */
  getCategory(item: IHonorItem): HonorCategory {
    return HonorsModel.getCategory(item);
  }

  /**
   * Get year from date
   * Follows Single Responsibility Principle (SRP)
   */
  getYear(date: string): number {
    return HonorsModel.getYear(date);
  }

  /**
   * Check if Honors section should be displayed
   * Inherited from BaseController - follows DRY principle
   */
  // shouldDisplay is inherited from BaseController

  /**
   * Get total honors count
   * Follows Single Responsibility Principle (SRP)
   */
  getTotalCount(profile: UserProfile): number {
    const data = this.getHonorsData(profile);
    return data ? data.items.length : 0;
  }

  /**
   * Get unique years count
   * Follows Single Responsibility Principle (SRP)
   */
  getYearsCount(profile: UserProfile): number {
    const grouped = this.getGroupedByYear(profile);
    return grouped.size;
  }

  /**
   * Get categories count
   * Follows Single Responsibility Principle (SRP)
   */
  getCategoriesCount(profile: UserProfile): number {
    const grouped = this.getGroupedByCategory(profile);
    return grouped.size;
  }
}

