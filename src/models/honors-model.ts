/**
 * Honors Model - Data Structure (MVC Pattern)
 * Follows Single Responsibility Principle (SRP)
 * Follows Interface Segregation Principle (ISP)
 */

import { UserProfile } from "../types/user";

/**
 * Honor Item Interface
 * Represents a single honor/achievement
 */
export interface IHonorItem {
  key: string;
  icon: string;
  title: string;
  event: string;
  date: string;
  description: string;
}

/**
 * Honors Data Interface
 * Collection of honors/achievements
 */
export interface IHonorsData {
  items: IHonorItem[];
}

/**
 * Honor Category Type
 * Categorizes honors by type
 */
export type HonorCategory = "award" | "recognition" | "competition" | "achievement" | "other";

/**
 * Honors Model
 * Handles data transformation, validation, and business logic
 * Follows Single Responsibility Principle (SRP)
 */
export class HonorsModel {
  /**
   * Extract honors data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): IHonorsData | null {
    if (!profile || !profile.honors || !Array.isArray(profile.honors)) {
      return null;
    }

    const items = profile.honors
      .filter((item) => this.isValidItem(item))
      .map((item) => this.normalizeItem(item));

    if (items.length === 0) {
      return null;
    }

    return { items };
  }

  /**
   * Validate honor item
   * Follows Single Responsibility Principle (SRP)
   */
  static isValidItem(item: any): item is IHonorItem {
    return (
      item &&
      typeof item.key === "string" &&
      item.key.trim() !== "" &&
      typeof item.title === "string" &&
      item.title.trim() !== "" &&
      typeof item.event === "string" &&
      item.event.trim() !== "" &&
      typeof item.date === "string" &&
      item.date.trim() !== ""
    );
  }

  /**
   * Normalize honor item
   * Ensures consistent data structure
   */
  static normalizeItem(item: any): IHonorItem {
    return {
      key: item.key?.trim() || "",
      icon: item.icon?.trim() || "🏆",
      title: item.title?.trim() || "",
      event: item.event?.trim() || "",
      date: item.date?.trim() || "",
      description: item.description?.trim() || "",
    };
  }

  /**
   * Validate honors data
   * Follows Single Responsibility Principle (SRP)
   */
  static isValid(data: IHonorsData | null): data is IHonorsData {
    return (
      data !== null &&
      Array.isArray(data.items) &&
      data.items.length > 0 &&
      data.items.every((item) => this.isValidItem(item))
    );
  }

  /**
   * Sort honors by date (newest first)
   * Follows Single Responsibility Principle (SRP)
   */
  static sortByDate(items: IHonorItem[]): IHonorItem[] {
    return [...items].sort((a, b) => {
      const getYear = (dateStr: string): number => {
        // Try to extract year from date string
        const match = dateStr.match(/\d{4}/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const yearA = getYear(a.date);
      const yearB = getYear(b.date);

      return yearB - yearA; // Descending order (newest first)
    });
  }

  /**
   * Get honor category from title/event
   * Follows Single Responsibility Principle (SRP)
   */
  static getCategory(item: IHonorItem): HonorCategory {
    const titleLower = item.title.toLowerCase();
    const eventLower = item.event.toLowerCase();
    const combined = `${titleLower} ${eventLower}`;

    if (
      combined.includes("award") ||
      combined.includes("penghargaan") ||
      combined.includes("prize")
    ) {
      return "award";
    }
    if (
      combined.includes("recognition") ||
      combined.includes("pengakuan") ||
      combined.includes("honor")
    ) {
      return "recognition";
    }
    if (
      combined.includes("competition") ||
      combined.includes("kompetisi") ||
      combined.includes("contest") ||
      combined.includes("champion") ||
      combined.includes("winner")
    ) {
      return "competition";
    }
    if (
      combined.includes("achievement") ||
      combined.includes("pencapaian") ||
      combined.includes("milestone")
    ) {
      return "achievement";
    }

    return "other";
  }

  /**
   * Get formatted date for display
   * Follows Single Responsibility Principle (SRP)
   */
  static formatDate(date: string): string {
    return date.trim();
  }

  /**
   * Get year from date string
   * Follows Single Responsibility Principle (SRP)
   */
  static getYear(date: string): number {
    const match = date.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0;
  }

  /**
   * Group honors by year
   * Follows Single Responsibility Principle (SRP)
   */
  static groupByYear(items: IHonorItem[]): Map<number, IHonorItem[]> {
    const grouped = new Map<number, IHonorItem[]>();

    items.forEach((item) => {
      const year = this.getYear(item.date);
      if (year > 0) {
        if (!grouped.has(year)) {
          grouped.set(year, []);
        }
        grouped.get(year)!.push(item);
      }
    });

    return grouped;
  }

  /**
   * Group honors by category
   * Follows Single Responsibility Principle (SRP)
   */
  static groupByCategory(items: IHonorItem[]): Map<HonorCategory, IHonorItem[]> {
    const grouped = new Map<HonorCategory, IHonorItem[]>();

    items.forEach((item) => {
      const category = this.getCategory(item);
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(item);
    });

    return grouped;
  }
}

