/**
 * Academic Model - Data Structure (MVC Pattern)
 * Follows Single Responsibility Principle (SRP)
 * Follows Interface Segregation Principle (ISP)
 */

import { UserProfile } from "../types/user";

/**
 * Academic Item Interface
 * Represents a single academic achievement
 */
export interface IAcademicItem {
  key: string;
  icon: string;
  title: string;
  institution: string;
  period: string;
  description: string;
}

/**
 * Academic Data Interface
 * Collection of academic achievements
 */
export interface IAcademicData {
  items: IAcademicItem[];
}

/**
 * Academic Model
 * Handles data transformation, validation, and business logic
 * Follows Single Responsibility Principle (SRP)
 */
export class AcademicModel {
  /**
   * Extract academic data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): IAcademicData | null {
    if (!profile || !profile.academics || !Array.isArray(profile.academics)) {
      return null;
    }

    const items = profile.academics
      .filter((item) => this.isValidItem(item))
      .map((item) => this.normalizeItem(item));

    if (items.length === 0) {
      return null;
    }

    return { items };
  }

  /**
   * Validate academic item
   * Follows Single Responsibility Principle (SRP)
   */
  static isValidItem(item: any): item is IAcademicItem {
    return (
      item &&
      typeof item.key === "string" &&
      item.key.trim() !== "" &&
      typeof item.title === "string" &&
      item.title.trim() !== "" &&
      typeof item.institution === "string" &&
      item.institution.trim() !== "" &&
      typeof item.period === "string" &&
      item.period.trim() !== ""
    );
  }

  /**
   * Normalize academic item
   * Ensures consistent data structure
   */
  static normalizeItem(item: any): IAcademicItem {
    return {
      key: item.key?.trim() || "",
      icon: item.icon?.trim() || "🎓",
      title: item.title?.trim() || "",
      institution: item.institution?.trim() || "",
      period: item.period?.trim() || "",
      description: item.description?.trim() || "",
    };
  }

  /**
   * Validate academic data
   * Follows Single Responsibility Principle (SRP)
   */
  static isValid(data: IAcademicData | null): data is IAcademicData {
    return (
      data !== null &&
      Array.isArray(data.items) &&
      data.items.length > 0 &&
      data.items.every((item) => this.isValidItem(item))
    );
  }

  /**
   * Sort academic items by period (newest first)
   * Follows Single Responsibility Principle (SRP)
   */
  static sortByPeriod(items: IAcademicItem[]): IAcademicItem[] {
    return [...items].sort((a, b) => {
      // Extract year from period string (assumes format like "2020-2024" or "2024")
      const getYear = (period: string): number => {
        const match = period.match(/\d{4}/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const yearA = getYear(a.period);
      const yearB = getYear(b.period);

      return yearB - yearA; // Descending order (newest first)
    });
  }

  /**
   * Get academic items grouped by institution
   * Follows Single Responsibility Principle (SRP)
   */
  static groupByInstitution(items: IAcademicItem[]): Map<string, IAcademicItem[]> {
    const grouped = new Map<string, IAcademicItem[]>();

    items.forEach((item) => {
      const institution = item.institution;
      if (!grouped.has(institution)) {
        grouped.set(institution, []);
      }
      grouped.get(institution)!.push(item);
    });

    return grouped;
  }

  /**
   * Get formatted period display
   * Follows Single Responsibility Principle (SRP)
   */
  static formatPeriod(period: string): string {
    return period.trim();
  }

  /**
   * Get academic level from title
   * Follows Single Responsibility Principle (SRP)
   */
  static getAcademicLevel(title: string): "undergraduate" | "graduate" | "certificate" | "other" {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("bachelor") || lowerTitle.includes("sarjana") || lowerTitle.includes("s1")) {
      return "undergraduate";
    }
    if (lowerTitle.includes("master") || lowerTitle.includes("magister") || lowerTitle.includes("s2")) {
      return "graduate";
    }
    if (lowerTitle.includes("certificate") || lowerTitle.includes("sertifikat")) {
      return "certificate";
    }

    return "other";
  }
}

