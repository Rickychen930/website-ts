/**
 * AboutMeController - Controller Layer (MVC Pattern)
 * Handles business logic for About Me section
 * Follows Single Responsibility Principle (SRP)
 * Follows Dependency Inversion Principle (DIP)
 * Extends BaseController for common functionality (DRY, OOP)
 */

import { UserProfile } from "../types/user";
import { AboutMeModel, IAboutMeData } from "../models/about-me-model";
import { BaseController } from "./base-controller";

/**
 * AboutMeController
 * Orchestrates business logic for About Me section
 * Follows OOP principles - extends BaseController
 */
export class AboutMeController extends BaseController {
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
   * Implementation of abstract method from BaseController
   * @param profile - User profile
   * @returns Extracted data or null
   */
  protected getData(profile: UserProfile): unknown | null {
    return this.getAboutMeData(profile);
  }

  /**
   * Implementation of abstract method from BaseController
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected isValid(data: unknown): boolean {
    return AboutMeModel.isValid(data as IAboutMeData);
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
   * Inherited from BaseController - follows DRY principle
   * Can be overridden if custom logic is needed
   */
  // shouldDisplay is inherited from BaseController
}

