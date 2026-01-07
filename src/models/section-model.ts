import { UserProfile } from "../types/user";
import { ComponentType } from "react";

/**
 * SectionConfig Model
 * Follows Interface Segregation Principle (ISP)
 */
export interface ISectionConfig {
  readonly id: string;
  readonly title: string;
  readonly component: ComponentType<any>;
  readonly dataKey: keyof UserProfile;
  readonly isVisible?: (profile: UserProfile) => boolean;
}

/**
 * SectionManager - Model Layer (MVC Pattern)
 * Manages section configurations and visibility
 * Follows Single Responsibility Principle (SRP)
 * Follows Open/Closed Principle (OCP) - Extensible through config
 */
export class SectionManager {
  private sections: ISectionConfig[] = [];

  /**
   * Register a section configuration
   * @param config - Section configuration
   */
  registerSection(config: ISectionConfig): void {
    this.sections.push(config);
  }

  /**
   * Register multiple sections
   * @param configs - Array of section configurations
   */
  registerSections(configs: ISectionConfig[]): void {
    this.sections.push(...configs);
  }

  /**
   * Get all visible sections for a profile
   * @param profile - User profile
   * @returns Array of visible section configurations
   */
  getVisibleSections(profile: UserProfile): ISectionConfig[] {
    return this.sections.filter((config) => {
      // Check custom visibility function first (e.g., testimonials always visible)
      const isVisible = config.isVisible ? config.isVisible(profile) : true;

      // If section has custom visibility function that returns true, always include it
      // This allows sections like testimonials to always show even if data is empty
      if (config.isVisible && isVisible) {
        return true;
      }

      // For other sections, check if data exists
      const data = profile[config.dataKey];

      // For arrays, check if they have items
      if (Array.isArray(data)) {
        return data.length > 0;
      }

      // For non-array data (like profile.name which is a string), check if it exists and is not empty
      if (typeof data === "string") {
        return data.trim().length > 0;
      }

      // For objects, check if they exist and have keys
      if (typeof data === "object" && data !== null) {
        return Object.keys(data).length > 0;
      }

      // For other types (boolean, number), check if data is not null/undefined
      return data !== null && data !== undefined;
    });
  }

  /**
   * Get section by ID
   * @param id - Section ID
   * @returns Section configuration or undefined
   */
  getSectionById(id: string): ISectionConfig | undefined {
    return this.sections.find((section) => section.id === id);
  }

  /**
   * Get all sections
   * @returns Array of all section configurations
   */
  getAllSections(): readonly ISectionConfig[] {
    return [...this.sections];
  }

  /**
   * Clear all sections
   */
  clear(): void {
    this.sections = [];
  }
}
