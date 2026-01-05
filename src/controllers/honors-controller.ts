/**
 * HonorsController - Controller Layer (MVC Pattern)
 * Handles business logic for Honors section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 */

import { UserProfile } from "../types/user";
import { HonorsModel, IHonorsData, IHonorItem, HonorCategory } from "../models/honors-model";

/**
 * HonorsController
 * Orchestrates business logic for Honors section
 */
export class HonorsController {
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
   * Follows Single Responsibility Principle (SRP)
   */
  shouldDisplay(profile: UserProfile): boolean {
    const data = this.getHonorsData(profile);
    return data !== null && HonorsModel.isValid(data);
  }

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

