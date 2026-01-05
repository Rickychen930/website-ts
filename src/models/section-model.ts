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
    return this.sections.filter(config => {
      const data = profile[config.dataKey];
      const hasData = data && (Array.isArray(data) ? data.length > 0 : true);
      const isVisible = config.isVisible ? config.isVisible(profile) : true;
      return hasData && isVisible;
    });
  }

  /**
   * Get section by ID
   * @param id - Section ID
   * @returns Section configuration or undefined
   */
  getSectionById(id: string): ISectionConfig | undefined {
    return this.sections.find(section => section.id === id);
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

