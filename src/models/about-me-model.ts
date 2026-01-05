/**
 * About Me Model - Data Structure (MVC Pattern)
 * Follows Single Responsibility Principle (SRP)
 * Follows Interface Segregation Principle (ISP)
 */

import { UserProfile } from "../types/user";

/**
 * About Me Data Interface
 * Extracted from UserProfile for better separation of concerns
 */
export interface IAboutMeData {
  name: string;
  title: string;
  location: string;
  bio: string;
  stats: { value: string; label: string }[];
}

/**
 * About Me Model
 * Handles data transformation and validation
 */
export class AboutMeModel {
  /**
   * Extract About Me data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): IAboutMeData | null {
    if (!profile || !profile.name?.trim()) {
      return null;
    }

    return {
      name: profile.name,
      title: profile.title || "",
      location: profile.location || "",
      bio: profile.bio || "",
      stats: profile.stats || [],
    };
  }

  /**
   * Validate About Me data
   * Follows Single Responsibility Principle (SRP)
   */
  static isValid(data: IAboutMeData | null): data is IAboutMeData {
    return (
      data !== null &&
      typeof data.name === "string" &&
      data.name.trim() !== "" &&
      typeof data.title === "string" &&
      typeof data.location === "string" &&
      typeof data.bio === "string" &&
      Array.isArray(data.stats)
    );
  }

  /**
   * Get default technologies from profile
   * Extracts tech stack from technical skills
   */
  static getDefaultTechnologies(profile: UserProfile): string[] {
    if (!profile.technicalSkills || !Array.isArray(profile.technicalSkills)) {
      return [];
    }

    const technologies: string[] = [];
    profile.technicalSkills.forEach((category) => {
      if (category.items && Array.isArray(category.items)) {
        technologies.push(...category.items);
      }
    });

    return technologies; // Return all technologies
  }

  /**
   * Get featured technologies (top technologies to highlight)
   */
  static getFeaturedTechnologies(profile: UserProfile, limit: number = 8): string[] {
    const allTechnologies = this.getDefaultTechnologies(profile);
    return allTechnologies.slice(0, limit);
  }

  /**
   * Get professional highlights from profile
   * Combines honors and key achievements
   */
  static getProfessionalHighlights(profile: UserProfile): Array<{
    icon: string;
    title: string;
    description: string;
  }> {
    const highlights: Array<{ icon: string; title: string; description: string }> = [];

    // Add top honors
    if (profile.honors && Array.isArray(profile.honors)) {
      profile.honors.slice(0, 2).forEach((honor) => {
        highlights.push({
          icon: honor.icon || "🏆",
          title: honor.title,
          description: honor.description || "",
        });
      });
    }

    return highlights;
  }
}

