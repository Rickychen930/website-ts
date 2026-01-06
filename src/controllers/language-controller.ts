/**
 * Language Controller
 * Controller Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles language business logic
 * - Dependency Inversion Principle (DIP): Depends on abstractions (Model)
 * - Open/Closed Principle (OCP): Extensible without modification
 * - DRY: Uses centralized constants, extends BaseController
 * - OOP: Extends BaseController for common functionality
 */

import { UserProfile } from "../types/user";
import {
  ILanguage,
  LanguageModel,
  ILanguageValidationResult,
  ProficiencyLevel,
} from "../models/language-model";
import { BaseController } from "./base-controller";

/**
 * Language Controller
 * Orchestrates language-related business logic
 * Follows OOP principles - extends BaseController
 */
export class LanguageController extends BaseController {
  private readonly model: typeof LanguageModel;

  constructor(model: typeof LanguageModel = LanguageModel) {
    super();
    this.model = model;
  }

  /**
   * Get language data from profile
   * @param profile - User profile
   * @returns Language data or null
   */
  getLanguageData(profile: UserProfile | null): ILanguage[] | null {
    if (!profile) {
      return null;
    }

    const data = this.model.extractFromProfile(profile);

    if (!this.model.isValid(data)) {
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
    return this.getLanguageData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return Array.isArray(data) && this.model.isValid(data as ILanguage[]);
  }

  /**
   * Validate language data
   * @param data - Language data array
   * @returns Validation result
   */
  validateLanguageData(data: ILanguage[]): ILanguageValidationResult {
    return this.model.validate(data);
  }

  /**
   * Get sorted languages by proficiency (highest first)
   * @param languages - Array of languages
   * @returns Sorted languages
   */
  getLanguagesSortedByProficiency(languages: ILanguage[]): ILanguage[] {
    return this.model.sortByProficiency(languages);
  }

  /**
   * Get sorted languages alphabetically
   * @param languages - Array of languages
   * @returns Sorted languages
   */
  getLanguagesSortedByName(languages: ILanguage[]): ILanguage[] {
    return this.model.sortByName(languages);
  }

  /**
   * Get languages grouped by proficiency level
   * @param languages - Array of languages
   * @returns Map of proficiency level to languages
   */
  getLanguagesGroupedByProficiency(
    languages: ILanguage[]
  ): Map<ProficiencyLevel, ILanguage[]> {
    const grouped = new Map<ProficiencyLevel, ILanguage[]>();

    // Initialize all proficiency levels
    Object.values(ProficiencyLevel).forEach((level) => {
      grouped.set(level, []);
    });

    // Group languages by proficiency
    languages.forEach((lang) => {
      const category = this.model.getProficiencyCategory(lang.proficiency);
      if (category && grouped.has(category)) {
        grouped.get(category)!.push(lang);
      }
    });

    // Remove empty groups
    const result = new Map<ProficiencyLevel, ILanguage[]>();
    grouped.forEach((langs, level) => {
      if (langs.length > 0) {
        result.set(level, langs);
      }
    });

    return result;
  }

  /**
   * Get proficiency statistics
   * @param languages - Array of languages
   * @returns Statistics object
   */
  getProficiencyStatistics(languages: ILanguage[]): {
    total: number;
    byLevel: Record<ProficiencyLevel, number>;
    highestLevel: ProficiencyLevel | null;
  } {
    const stats = {
      total: languages.length,
      byLevel: {} as Record<ProficiencyLevel, number>,
      highestLevel: null as ProficiencyLevel | null,
    };

    // Initialize counts
    Object.values(ProficiencyLevel).forEach((level) => {
      stats.byLevel[level] = 0;
    });

    // Count languages by proficiency
    let highestWeight = 0;
    languages.forEach((lang) => {
      const category = this.model.getProficiencyCategory(lang.proficiency);
      if (category) {
        stats.byLevel[category]++;
        const weight = this.model.getProficiencyWeight(lang.proficiency);
        if (weight > highestWeight) {
          highestWeight = weight;
          stats.highestLevel = category;
        }
      }
    });

    return stats;
  }

  /**
   * Get proficiency color class for a language
   * @param proficiency - Proficiency string
   * @returns CSS class name
   */
  getProficiencyColorClass(proficiency: string): string {
    return this.model.getProficiencyColorClass(proficiency);
  }

  /**
   * Get proficiency weight for a language
   * @param proficiency - Proficiency string
   * @returns Weight number
   */
  getProficiencyWeight(proficiency: string): number {
    return this.model.getProficiencyWeight(proficiency);
  }

  /**
   * Format proficiency for display
   * @param proficiency - Proficiency string
   * @returns Formatted proficiency string
   */
  formatProficiency(proficiency: string): string {
    const trimmed = proficiency.trim();
    
    // Return as-is if already well-formatted
    if (trimmed.length > 0) {
      return trimmed;
    }

    return "Not specified";
  }
}

