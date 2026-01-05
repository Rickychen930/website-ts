/**
 * Project Model
 * Model Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles project data structure
 * - Open/Closed Principle (OCP): Extensible via interfaces
 * - Interface Segregation Principle (ISP): Focused interfaces
 * - DRY: Reusable validation and formatting methods
 */

/**
 * Project Status Type
 */
export type ProjectStatus = "completed" | "in-progress" | "archived" | "on-hold";

/**
 * Project Category Type
 */
export type ProjectCategory = 
  | "web-development" 
  | "mobile-development" 
  | "full-stack" 
  | "frontend" 
  | "backend" 
  | "devops" 
  | "ai-ml" 
  | "data-science"
  | "other";

/**
 * Project Link Interface
 */
export interface IProjectLink {
  type: "github" | "demo" | "documentation" | "playstore" | "appstore" | "other";
  url: string;
  label?: string;
}

/**
 * Project Technology Badge
 */
export interface IProjectTechnology {
  name: string;
  icon?: string;
  category?: "language" | "framework" | "library" | "tool" | "database" | "cloud";
}

/**
 * Project Item Interface
 * Enhanced project data structure
 */
export interface IProject {
  key: string;
  name: string;
  description: string;
  longDescription?: string;
  icon: string;
  image?: string;
  date: string;
  status: ProjectStatus;
  category: ProjectCategory;
  technologies: IProjectTechnology[];
  links?: IProjectLink[];
  featured?: boolean;
  highlights?: string[];
  teamSize?: number;
  role?: string;
  duration?: string;
}

/**
 * Project Data Interface
 */
export interface IProjectData {
  items: IProject[];
}

/**
 * Project Validation Result
 */
export interface IProjectValidationResult {
  isValid: boolean;
  error: string | null;
  errors: string[];
}

/**
 * Project Model Class
 * Encapsulates project data operations
 */
export class ProjectModel {
  /**
   * Validate project data
   * @param data - Project data array
   * @returns Validation result
   */
  public static validate(data: IProject[]): IProjectValidationResult {
    const errors: string[] = [];

    if (!data || !Array.isArray(data)) {
      return {
        isValid: false,
        error: "Invalid project data format",
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
        errors.push(`Duplicate project key: ${item.key}`);
        return;
      }
      keys.add(item.key);

      if (!item.name || typeof item.name !== "string" || item.name.trim() === "") {
        errors.push(`Project ${item.key} missing name`);
      }

      if (!item.description || typeof item.description !== "string" || item.description.trim() === "") {
        errors.push(`Project ${item.key} missing description`);
      }

      if (!item.date || typeof item.date !== "string" || item.date.trim() === "") {
        errors.push(`Project ${item.key} missing date`);
      }

      if (!item.status || !["completed", "in-progress", "archived", "on-hold"].includes(item.status)) {
        errors.push(`Project ${item.key} has invalid status`);
      }

      if (!item.category || typeof item.category !== "string") {
        errors.push(`Project ${item.key} missing category`);
      }

      if (!Array.isArray(item.technologies)) {
        errors.push(`Project ${item.key} technologies must be an array`);
      }

      if (item.links && !Array.isArray(item.links)) {
        errors.push(`Project ${item.key} links must be an array`);
      }

      if (item.links) {
        item.links.forEach((link, linkIndex) => {
          if (!link.type || !link.url) {
            errors.push(`Project ${item.key} link at index ${linkIndex} is invalid`);
          }
        });
      }
    });

    return {
      isValid: errors.length === 0,
      error: errors.length > 0 ? errors[0] : null,
      errors,
    };
  }

  /**
   * Sort projects by date (newest first)
   * @param projects - Array of projects
   * @returns Sorted array
   */
  public static sortByDate(projects: IProject[]): IProject[] {
    return [...projects].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA; // Newest first
    });
  }

  /**
   * Sort projects by featured status
   * @param projects - Array of projects
   * @returns Sorted array (featured first)
   */
  public static sortByFeatured(projects: IProject[]): IProject[] {
    return [...projects].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }

  /**
   * Filter projects by category
   * @param projects - Array of projects
   * @param category - Category to filter by
   * @returns Filtered projects
   */
  public static filterByCategory(
    projects: IProject[],
    category: ProjectCategory
  ): IProject[] {
    return projects.filter((project) => project.category === category);
  }

  /**
   * Filter projects by status
   * @param projects - Array of projects
   * @param status - Status to filter by
   * @returns Filtered projects
   */
  public static filterByStatus(
    projects: IProject[],
    status: ProjectStatus
  ): IProject[] {
    return projects.filter((project) => project.status === status);
  }

  /**
   * Filter projects by technology
   * @param projects - Array of projects
   * @param technology - Technology name to filter by
   * @returns Filtered projects
   */
  public static filterByTechnology(
    projects: IProject[],
    technology: string
  ): IProject[] {
    return projects.filter((project) =>
      project.technologies.some(
        (tech) => tech.name.toLowerCase() === technology.toLowerCase()
      )
    );
  }

  /**
   * Group projects by category
   * @param projects - Array of projects
   * @returns Grouped projects
   */
  public static groupByCategory(projects: IProject[]): Map<ProjectCategory, IProject[]> {
    const grouped = new Map<ProjectCategory, IProject[]>();

    projects.forEach((project) => {
      const category = project.category || "other";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(project);
    });

    return grouped;
  }

  /**
   * Format date for display
   * @param dateString - Date string
   * @returns Formatted date
   */
  public static formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original if invalid
      }
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    } catch {
      return dateString;
    }
  }

  /**
   * Format date for datetime attribute
   * @param dateString - Date string
   * @returns ISO date string
   */
  public static formatDateForDateTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  }

  /**
   * Get status label
   * @param status - Project status
   * @returns Human-readable status label
   */
  public static getStatusLabel(status: ProjectStatus): string {
    const labels: Record<ProjectStatus, string> = {
      completed: "Completed",
      "in-progress": "In Progress",
      archived: "Archived",
      "on-hold": "On Hold",
    };
    return labels[status] || status;
  }

  /**
   * Get category label
   * @param category - Project category
   * @returns Human-readable category label
   */
  public static getCategoryLabel(category: ProjectCategory): string {
    const labels: Record<ProjectCategory, string> = {
      "web-development": "Web Development",
      "mobile-development": "Mobile Development",
      "full-stack": "Full Stack",
      frontend: "Frontend",
      backend: "Backend",
      devops: "DevOps",
      "ai-ml": "AI/ML",
      "data-science": "Data Science",
      other: "Other",
    };
    return labels[category] || category;
  }

  /**
   * Convert legacy project data to new format
   * @param legacyData - Legacy project data
   * @returns Converted project data
   */
  public static convertFromLegacy(legacyData: {
    key: string;
    icon: string;
    name: string;
    date: string;
    description: string;
  }[]): IProject[] {
    return legacyData.map((item) => ({
      key: item.key,
      name: item.name,
      description: item.description,
      icon: item.icon,
      date: item.date,
      status: "completed" as ProjectStatus,
      category: "other" as ProjectCategory,
      technologies: [],
      featured: false,
    }));
  }
}

