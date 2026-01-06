/**
 * Work Experience Model - Data Structure (MVC Pattern)
 * Follows Single Responsibility Principle (SRP)
 * Follows Interface Segregation Principle (ISP)
 */

import { UserProfile } from "../types/user";

/**
 * Work Experience Item Interface
 * Represents a single work experience entry
 */
export interface IWorkExperienceItem {
  key: string;
  icon: string;
  title: string;
  company: string;
  period: string;
  description: string;
  location?: string;
  technologies?: string[];
  achievements?: string[];
}

/**
 * Work Experience Data Interface
 * Collection of work experiences
 */
export interface IWorkExperienceData {
  items: IWorkExperienceItem[];
}

/**
 * Work Experience Model
 * Handles data transformation, validation, and business logic
 * Follows Single Responsibility Principle (SRP)
 */
export class WorkExperienceModel {
  /**
   * Extract work experience data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): IWorkExperienceData | null {
    if (!profile || !profile.experiences || !Array.isArray(profile.experiences)) {
      return null;
    }

    const items = profile.experiences
      .filter((item) => this.isValidItem(item))
      .map((item) => this.normalizeItem(item));

    if (items.length === 0) {
      return null;
    }

    return { items };
  }

  /**
   * Validate work experience item
   * Follows Single Responsibility Principle (SRP)
   */
  static isValidItem(item: any): item is IWorkExperienceItem {
    return (
      item &&
      typeof item.key === "string" &&
      item.key.trim() !== "" &&
      typeof item.title === "string" &&
      item.title.trim() !== "" &&
      typeof item.company === "string" &&
      item.company.trim() !== "" &&
      typeof item.period === "string" &&
      item.period.trim() !== ""
    );
  }

  /**
   * Normalize work experience item
   * Ensures consistent data structure
   */
  static normalizeItem(item: any): IWorkExperienceItem {
    return {
      key: item.key?.trim() || "",
      icon: item.icon?.trim() || "💼",
      title: item.title?.trim() || "",
      company: item.company?.trim() || "",
      period: item.period?.trim() || "",
      description: item.description?.trim() || "",
      location: item.location?.trim() || undefined,
      technologies: Array.isArray(item.technologies) 
        ? item.technologies.filter((tech: any) => typeof tech === "string" && tech.trim() !== "")
        : this.extractTechnologiesFromDescription(item.description || ""),
      achievements: Array.isArray(item.achievements)
        ? item.achievements.filter((ach: any) => typeof ach === "string" && ach.trim() !== "")
        : undefined,
    };
  }

  /**
   * Extract technologies from description (fallback)
   * Uses simple keyword matching for common technologies
   */
  private static extractTechnologiesFromDescription(description: string): string[] {
    if (!description) return [];
    
    const techKeywords = [
      "React", "TypeScript", "JavaScript", "Node.js", "Python", "Java", "C++", "C#",
      "Vue", "Angular", "Next.js", "Express", "MongoDB", "PostgreSQL", "MySQL",
      "AWS", "Docker", "Kubernetes", "Git", "CI/CD", "REST API", "GraphQL",
      "Redux", "Zustand", "Tailwind CSS", "SASS", "CSS3", "HTML5", "Webpack",
      "Jest", "Cypress", "TypeScript", "ES6+", "Microservices", "Agile", "Scrum"
    ];

    const found: string[] = [];
    const lowerDesc = description.toLowerCase();

    techKeywords.forEach((tech) => {
      if (lowerDesc.includes(tech.toLowerCase())) {
        found.push(tech);
      }
    });

    return found.slice(0, 8); // Limit to 8 technologies
  }

  /**
   * Validate work experience data
   * Follows Single Responsibility Principle (SRP)
   */
  static isValid(data: IWorkExperienceData | null): data is IWorkExperienceData {
    return (
      data !== null &&
      Array.isArray(data.items) &&
      data.items.length > 0 &&
      data.items.every((item) => this.isValidItem(item))
    );
  }

  /**
   * Sort work experience items by period (newest first)
   * Follows Single Responsibility Principle (SRP)
   */
  static sortByPeriod(items: IWorkExperienceItem[]): IWorkExperienceItem[] {
    return [...items].sort((a, b) => {
      // Extract year from period string (assumes format like "May 2023 - Present" or "2020-2024")
      const getYear = (period: string): number => {
        const match = period.match(/\d{4}/);
        return match ? parseInt(match[0], 10) : 0;
      };

      const yearA = getYear(a.period);
      const yearB = getYear(b.period);

      if (yearA !== yearB) {
        return yearB - yearA; // Descending order (newest first)
      }

      // If same year, check for "Present" keyword
      const aIsPresent = a.period.toLowerCase().includes("present");
      const bIsPresent = b.period.toLowerCase().includes("present");
      
      if (aIsPresent && !bIsPresent) return -1;
      if (!aIsPresent && bIsPresent) return 1;
      
      return 0;
    });
  }

  /**
   * Get work experience items grouped by company
   * Follows Single Responsibility Principle (SRP)
   */
  static groupByCompany(items: IWorkExperienceItem[]): Map<string, IWorkExperienceItem[]> {
    const grouped = new Map<string, IWorkExperienceItem[]>();

    items.forEach((item) => {
      const company = item.company;
      if (!grouped.has(company)) {
        grouped.set(company, []);
      }
      grouped.get(company)!.push(item);
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
   * Get experience duration in months
   * Follows Single Responsibility Principle (SRP)
   */
  static getDuration(period: string): number | null {
    const months = this.parseDuration(period);
    return months;
  }

  /**
   * Parse duration from period string
   * Returns duration in months or null if cannot parse
   */
  private static parseDuration(period: string): number | null {
    // Try to extract dates from period string
    // Format examples: "May 2023 - Present", "2020-2024", "Jan 2020 - Dec 2022"
    const dateRegex = /(\w+)\s+(\d{4})/g;
    const matches = Array.from(period.matchAll(dateRegex));
    
    if (matches.length < 1) return null;
    
    const startMatch = matches[0];
    const startMonth = this.getMonthNumber(startMatch[1]);
    const startYear = parseInt(startMatch[2], 10);
    
    let endMonth: number;
    let endYear: number;
    
    if (period.toLowerCase().includes("present") || period.toLowerCase().includes("current")) {
      const now = new Date();
      endMonth = now.getMonth() + 1;
      endYear = now.getFullYear();
    } else if (matches.length >= 2) {
      const endMatch = matches[1];
      endMonth = this.getMonthNumber(endMatch[1]);
      endYear = parseInt(endMatch[2], 10);
    } else {
      return null;
    }
    
    const months = (endYear - startYear) * 12 + (endMonth - startMonth);
    return Math.max(0, months);
  }

  /**
   * Get month number from month name
   */
  private static getMonthNumber(monthName: string): number {
    const months: { [key: string]: number } = {
      jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
      apr: 4, april: 4, may: 5, jun: 6, june: 6, jul: 7, july: 7,
      aug: 8, august: 8, sep: 9, september: 9, oct: 10, october: 10,
      nov: 11, november: 11, dec: 12, december: 12,
    };
    
    return months[monthName.toLowerCase()] || 1;
  }

  /**
   * Get formatted duration string
   * Follows Single Responsibility Principle (SRP)
   */
  static getFormattedDuration(period: string): string {
    const months = this.getDuration(period);
    if (months === null) return "";
    
    if (months < 12) {
      return `${months} ${months === 1 ? "month" : "months"}`;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "year" : "years"}`;
    }
    
    return `${years}.${Math.round(remainingMonths / 12 * 10)} ${years === 1 ? "year" : "years"}`;
  }
}

