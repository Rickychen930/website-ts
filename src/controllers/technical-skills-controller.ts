/**
 * Technical Skills Controller - Controller Layer (MVC Pattern)
 * Handles business logic for Technical Skills section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 */

import { UserProfile } from "../types/user";
import {
  TechnicalSkillsModel,
  ITechnicalSkillsData,
  SkillIconMapper,
} from "../models/technical-skills-model";

/**
 * Technical Skills Controller
 * Orchestrates business logic for Technical Skills section
 * Follows Single Responsibility Principle (SRP)
 */
export class TechnicalSkillsController {
  /**
   * Get Technical Skills data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getTechnicalSkillsData(profile: UserProfile): ITechnicalSkillsData | null {
    const data = TechnicalSkillsModel.extractFromProfile(profile);

    if (!TechnicalSkillsModel.isValid(data)) {
      return null;
    }

    return data;
  }

  /**
   * Check if Technical Skills section should be displayed
   * Follows Single Responsibility Principle (SRP)
   */
  shouldDisplay(profile: UserProfile): boolean {
    const data = this.getTechnicalSkillsData(profile);
    return data !== null && TechnicalSkillsModel.isValid(data);
  }

  /**
   * Get enriched categories with icons
   * Adds icons to each skill and category
   * Follows Single Responsibility Principle (SRP)
   */
  getEnrichedCategories(
    profile: UserProfile
  ): Array<{
    category: string;
    categoryIcon: string;
    items: Array<{ name: string; icon: string }>;
  }> | null {
    const data = this.getTechnicalSkillsData(profile);

    if (!data) {
      return null;
    }

    return data.categories.map((category) => ({
      category: category.category,
      categoryIcon: SkillIconMapper.getCategoryIcon(category.category),
      items: category.items.map((item) => ({
        name: item,
        icon: SkillIconMapper.getIcon(item),
      })),
    }));
  }

  /**
   * Get skill statistics
   * Returns summary statistics about skills
   * Follows Single Responsibility Principle (SRP)
   */
  getSkillStatistics(profile: UserProfile): {
    totalSkills: number;
    categoryCount: number;
    averageSkillsPerCategory: number;
    categoryStats: Array<{
      category: string;
      count: number;
      percentage: number;
    }>;
  } | null {
    const data = this.getTechnicalSkillsData(profile);

    if (!data) {
      return null;
    }

    const categoryStats = TechnicalSkillsModel.getCategoryStats(data);
    const averageSkillsPerCategory = Math.round(
      data.totalSkills / data.categoryCount
    );

    return {
      totalSkills: data.totalSkills,
      categoryCount: data.categoryCount,
      averageSkillsPerCategory,
      categoryStats,
    };
  }

  /**
   * Get all unique skills
   * Useful for search or filtering features
   * Follows Single Responsibility Principle (SRP)
   */
  getAllSkills(profile: UserProfile): string[] {
    const data = this.getTechnicalSkillsData(profile);

    if (!data) {
      return [];
    }

    return TechnicalSkillsModel.getAllSkills(data);
  }

  /**
   * Get skills by category name
   * Follows Single Responsibility Principle (SRP)
   */
  getSkillsByCategory(profile: UserProfile, categoryName: string): string[] {
    const data = this.getTechnicalSkillsData(profile);

    if (!data) {
      return [];
    }

    return TechnicalSkillsModel.getSkillsByCategory(data, categoryName);
  }
}

