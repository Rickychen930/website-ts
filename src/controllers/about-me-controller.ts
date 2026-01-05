/**
 * AboutMeController - Controller Layer (MVC Pattern)
 * Handles business logic for About Me section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 */

import { UserProfile } from "../types/user";
import { AboutMeModel, IAboutMeData } from "../models/about-me-model";

/**
 * AboutMeController
 * Orchestrates business logic for About Me section
 */
export class AboutMeController {
  /**
   * Get About Me data from profile
   * Follows Single Responsibility Principle (SRP)
   */
  getAboutMeData(profile: UserProfile): IAboutMeData | null {
    const data = AboutMeModel.extractFromProfile(profile);

    if (!AboutMeModel.isValid(data)) {
      return null;
    }

    return data;
  }

  /**
   * Get technologies for code block display
   * Follows Single Responsibility Principle (SRP)
   */
  getTechnologies(profile: UserProfile): string[] {
    return AboutMeModel.getDefaultTechnologies(profile);
  }

  /**
   * Get featured technologies for badges display
   * Follows Single Responsibility Principle (SRP)
   */
  getFeaturedTechnologies(profile: UserProfile, limit?: number): string[] {
    return AboutMeModel.getFeaturedTechnologies(profile, limit);
  }

  /**
   * Get professional highlights
   * Follows Single Responsibility Principle (SRP)
   */
  getProfessionalHighlights(profile: UserProfile): Array<{
    icon: string;
    title: string;
    description: string;
  }> {
    return AboutMeModel.getProfessionalHighlights(profile);
  }

  /**
   * Check if About Me section should be displayed
   * Follows Single Responsibility Principle (SRP)
   */
  shouldDisplay(profile: UserProfile): boolean {
    const data = this.getAboutMeData(profile);
    return data !== null && AboutMeModel.isValid(data);
  }
}

