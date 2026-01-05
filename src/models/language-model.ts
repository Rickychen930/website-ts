/**
 * Language Model
 * Model Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles language data structure
 * - Open/Closed Principle (OCP): Extensible via interfaces
 * - Interface Segregation Principle (ISP): Focused interfaces
 */

import { UserProfile } from "../types/user";

/**
 * Language Item Interface
 * Core data structure for a language
 */
export interface ILanguage {
  key: string;
  icon: string;
  name: string;
  proficiency: string;
}

/**
 * Language Validation Result
 */
export interface ILanguageValidationResult {
  isValid: boolean;
  error: string | null;
  errors: string[];
}

/**
 * Proficiency Level Enum
 * Standardized proficiency levels
 */
export enum ProficiencyLevel {
  NATIVE = "Native",
  PROFESSIONAL = "Professional Working Proficiency",
  FLUENT = "Fluent",
  INTERMEDIATE = "Intermediate",
  BASIC = "Basic",
}

/**
 * Proficiency Level Weight
 * For sorting and comparison
 */
export const PROFICIENCY_WEIGHT: Record<ProficiencyLevel, number> = {
  [ProficiencyLevel.NATIVE]: 5,
  [ProficiencyLevel.PROFESSIONAL]: 4,
  [ProficiencyLevel.FLUENT]: 3,
  [ProficiencyLevel.INTERMEDIATE]: 2,
  [ProficiencyLevel.BASIC]: 1,
};

/**
 * Language Model Class
 * Encapsulates language data operations
 */
export class LanguageModel {
  /**
   * Extract languages from user profile
   * @param profile - User profile
   * @returns Language array or null
   */
  public static extractFromProfile(profile: UserProfile | null): ILanguage[] | null {
    if (!profile || !profile.languages) {
      return null;
    }

    if (!Array.isArray(profile.languages)) {
      return null;
    }

    return profile.languages.map((lang) => ({
      key: lang.key || "",
      icon: lang.icon || "🌐",
      name: lang.name || "",
      proficiency: lang.proficiency || "",
    }));
  }

  /**
   * Validate language data
   * @param data - Language data array
   * @returns Validation result
   */
  public static validate(data: ILanguage[]): ILanguageValidationResult {
    const errors: string[] = [];

    if (!data || !Array.isArray(data)) {
      return {
        isValid: false,
        error: "Invalid language data format",
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
        errors.push(`Duplicate language key: ${item.key}`);
        return;
      }
      keys.add(item.key);

      if (!item.name || typeof item.name !== "string" || item.name.trim() === "") {
        errors.push(`Language ${item.key} missing name`);
      }

      if (!item.proficiency || typeof item.proficiency !== "string" || item.proficiency.trim() === "") {
        errors.push(`Language ${item.key} missing proficiency`);
      }
    });

    return {
      isValid: errors.length === 0,
      error: errors.length > 0 ? errors[0] : null,
      errors,
    };
  }

  /**
   * Check if language data is valid
   * @param data - Language data array
   * @returns True if valid
   */
  public static isValid(data: ILanguage[] | null): boolean {
    if (!data) {
      return false;
    }

    const validation = this.validate(data);
    return validation.isValid;
  }

  /**
   * Sort languages by proficiency (highest first)
   * @param languages - Array of languages
   * @returns Sorted array
   */
  public static sortByProficiency(languages: ILanguage[]): ILanguage[] {
    return [...languages].sort((a, b) => {
      const weightA = this.getProficiencyWeight(a.proficiency);
      const weightB = this.getProficiencyWeight(b.proficiency);
      
      // If same proficiency, sort alphabetically by name
      if (weightA === weightB) {
        return a.name.localeCompare(b.name);
      }
      
      return weightB - weightA; // Highest first
    });
  }

  /**
   * Sort languages alphabetically by name
   * @param languages - Array of languages
   * @returns Sorted array
   */
  public static sortByName(languages: ILanguage[]): ILanguage[] {
    return [...languages].sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Get proficiency weight for sorting
   * @param proficiency - Proficiency string
   * @returns Weight number
   */
  public static getProficiencyWeight(proficiency: string): number {
    const normalized = proficiency.trim();
    
    // Check exact matches first
    for (const [level, weight] of Object.entries(PROFICIENCY_WEIGHT)) {
      if (normalized === level) {
        return weight;
      }
    }

    // Check partial matches (case-insensitive)
    const lowerProficiency = normalized.toLowerCase();
    if (lowerProficiency.includes("native")) return 5;
    if (lowerProficiency.includes("professional")) return 4;
    if (lowerProficiency.includes("fluent")) return 3;
    if (lowerProficiency.includes("intermediate")) return 2;
    if (lowerProficiency.includes("basic")) return 1;

    // Default to lowest weight
    return 0;
  }

  /**
   * Get proficiency level category
   * @param proficiency - Proficiency string
   * @returns Proficiency level category
   */
  public static getProficiencyCategory(proficiency: string): ProficiencyLevel | null {
    const weight = this.getProficiencyWeight(proficiency);
    
    for (const [level, levelWeight] of Object.entries(PROFICIENCY_WEIGHT)) {
      if (levelWeight === weight) {
        return level as ProficiencyLevel;
      }
    }

    return null;
  }

  /**
   * Filter languages by proficiency level
   * @param languages - Array of languages
   * @param level - Proficiency level to filter by
   * @returns Filtered languages
   */
  public static filterByProficiency(
    languages: ILanguage[],
    level: ProficiencyLevel
  ): ILanguage[] {
    return languages.filter((lang) => {
      const category = this.getProficiencyCategory(lang.proficiency);
      return category === level;
    });
  }

  /**
   * Get proficiency color class
   * @param proficiency - Proficiency string
   * @returns CSS class name
   */
  public static getProficiencyColorClass(proficiency: string): string {
    const weight = this.getProficiencyWeight(proficiency);
    
    if (weight >= 5) return "proficiency-native";
    if (weight >= 4) return "proficiency-professional";
    if (weight >= 3) return "proficiency-fluent";
    if (weight >= 2) return "proficiency-intermediate";
    return "proficiency-basic";
  }
}

