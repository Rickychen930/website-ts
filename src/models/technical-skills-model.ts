/**
 * Technical Skills Model - Data Structure (MVC Pattern)
 * Follows Single Responsibility Principle (SRP)
 * Follows Interface Segregation Principle (ISP)
 */

import { UserProfile } from "../types/user";

/**
 * Skill Category Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ISkillCategory {
  category: string;
  items: string[];
}

/**
 * Technical Skills Data Interface
 * Extracted from UserProfile for better separation of concerns
 */
export interface ITechnicalSkillsData {
  categories: ISkillCategory[];
  totalSkills: number;
  categoryCount: number;
}

/**
 * Skill Icon Mapping
 * Maps common technologies to their icons/identifiers
 * Follows DRY principle - Centralized icon mapping
 */
export class SkillIconMapper {
  private static readonly iconMap: Record<string, string> = {
    // Frontend
    "React": "⚛️",
    "Vue": "🟢",
    "Angular": "🅰️",
    "TypeScript": "📘",
    "JavaScript": "📜",
    "HTML": "🌐",
    "CSS": "🎨",
    "SASS": "💅",
    "Tailwind": "💨",
    "Bootstrap": "🎯",
    
    // Backend
    "Node.js": "🟢",
    "Express": "🚂",
    "Python": "🐍",
    "Java": "☕",
    "Spring": "🌱",
    "PHP": "🐘",
    "Laravel": "🔴",
    "Django": "🎸",
    "Flask": "🍶",
    "Go": "🐹",
    "Rust": "🦀",
    
    // Databases
    "MongoDB": "🍃",
    "PostgreSQL": "🐘",
    "MySQL": "🗄️",
    "Redis": "🔴",
    "Firebase": "🔥",
    
    // DevOps & Tools
    "Docker": "🐳",
    "Kubernetes": "☸️",
    "AWS": "☁️",
    "Git": "📦",
    "GitHub": "🐙",
    "CI/CD": "🔄",
    "Jenkins": "🤖",
    
    // Mobile
    "React Native": "📱",
    "Flutter": "💙",
    "iOS": "🍎",
    "Android": "🤖",
    
    // Others
    "GraphQL": "📊",
    "REST API": "🔌",
    "Microservices": "🧩",
    "Agile": "🏃",
    "Scrum": "📋",
  };

  /**
   * Get icon for a skill
   * Returns icon if found, otherwise returns default icon
   */
  static getIcon(skillName: string): string {
    const normalized = skillName.trim();
    
    // Try exact match first
    if (this.iconMap[normalized]) {
      return this.iconMap[normalized];
    }
    
    // Try case-insensitive match
    const lowerNormalized = normalized.toLowerCase();
    for (const [key, icon] of Object.entries(this.iconMap)) {
      if (key.toLowerCase() === lowerNormalized) {
        return icon;
      }
    }
    
    // Try partial match
    for (const [key, icon] of Object.entries(this.iconMap)) {
      if (normalized.toLowerCase().includes(key.toLowerCase()) || 
          key.toLowerCase().includes(lowerNormalized)) {
        return icon;
      }
    }
    
    // Default icon
    return "💻";
  }

  /**
   * Get category icon based on category name
   */
  static getCategoryIcon(category: string): string {
    const lowerCategory = category.toLowerCase();
    
    if (lowerCategory.includes("frontend") || lowerCategory.includes("front-end")) {
      return "🎨";
    }
    if (lowerCategory.includes("backend") || lowerCategory.includes("back-end")) {
      return "⚙️";
    }
    if (lowerCategory.includes("database") || lowerCategory.includes("db")) {
      return "🗄️";
    }
    if (lowerCategory.includes("devops") || lowerCategory.includes("deployment")) {
      return "🚀";
    }
    if (lowerCategory.includes("mobile")) {
      return "📱";
    }
    if (lowerCategory.includes("cloud")) {
      return "☁️";
    }
    if (lowerCategory.includes("tool") || lowerCategory.includes("framework")) {
      return "🛠️";
    }
    if (lowerCategory.includes("language") || lowerCategory.includes("programming")) {
      return "💻";
    }
    
    return "🔧";
  }
}

/**
 * Technical Skills Model
 * Handles data transformation and validation
 * Follows Single Responsibility Principle (SRP)
 */
export class TechnicalSkillsModel {
  /**
   * Extract Technical Skills data from UserProfile
   * Follows Single Responsibility Principle (SRP)
   */
  static extractFromProfile(profile: UserProfile): ITechnicalSkillsData | null {
    if (!profile || !profile.technicalSkills) {
      return null;
    }

    const categories = Array.isArray(profile.technicalSkills) 
      ? profile.technicalSkills.filter(this.isValidCategory)
      : [];

    if (categories.length === 0) {
      return null;
    }

    const totalSkills = categories.reduce(
      (sum, category) => sum + (category.items?.length || 0),
      0
    );

    return {
      categories,
      totalSkills,
      categoryCount: categories.length,
    };
  }

  /**
   * Validate a skill category
   * Follows Single Responsibility Principle (SRP)
   */
  static isValidCategory(category: ISkillCategory): category is ISkillCategory {
    return (
      category !== null &&
      typeof category === "object" &&
      typeof category.category === "string" &&
      category.category.trim() !== "" &&
      Array.isArray(category.items) &&
      category.items.length > 0 &&
      category.items.every(
        (item) => typeof item === "string" && item.trim() !== ""
      )
    );
  }

  /**
   * Validate Technical Skills data
   * Follows Single Responsibility Principle (SRP)
   */
  static isValid(data: ITechnicalSkillsData | null): data is ITechnicalSkillsData {
    return (
      data !== null &&
      Array.isArray(data.categories) &&
      data.categories.length > 0 &&
      data.categories.every(this.isValidCategory) &&
      typeof data.totalSkills === "number" &&
      data.totalSkills > 0 &&
      typeof data.categoryCount === "number" &&
      data.categoryCount > 0
    );
  }

  /**
   * Get all unique skills across all categories
   * Useful for search or filtering
   */
  static getAllSkills(data: ITechnicalSkillsData): string[] {
    if (!this.isValid(data)) {
      return [];
    }

    const skillsSet = new Set<string>();
    data.categories.forEach((category) => {
      category.items.forEach((item) => {
        skillsSet.add(item.trim());
      });
    });

    return Array.from(skillsSet);
  }

  /**
   * Get skills by category
   */
  static getSkillsByCategory(
    data: ITechnicalSkillsData,
    categoryName: string
  ): string[] {
    if (!this.isValid(data)) {
      return [];
    }

    const category = data.categories.find(
      (cat) => cat.category.toLowerCase() === categoryName.toLowerCase()
    );

    return category?.items || [];
  }

  /**
   * Get category statistics
   */
  static getCategoryStats(data: ITechnicalSkillsData): Array<{
    category: string;
    count: number;
    percentage: number;
  }> {
    if (!this.isValid(data)) {
      return [];
    }

    return data.categories.map((category) => ({
      category: category.category,
      count: category.items.length,
      percentage: Math.round(
        (category.items.length / data.totalSkills) * 100
      ),
    }));
  }
}

