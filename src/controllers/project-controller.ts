/**
 * Project Controller
 * Controller Layer (MVC Pattern)
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Handles project business logic
 * - Dependency Inversion Principle (DIP): Depends on abstractions (Model)
 * - Open/Closed Principle (OCP): Extensible without modification
 * - DRY: Reusable business logic methods
 */

import {
  IProject,
  ProjectModel,
  IProjectValidationResult,
  ProjectStatus,
  ProjectCategory,
} from "../models/project-model";

/**
 * Project Controller
 * Orchestrates project-related business logic
 */
export class ProjectController {
  private readonly model: typeof ProjectModel;

  constructor(model: typeof ProjectModel = ProjectModel) {
    this.model = model;
  }

  /**
   * Validate project data
   * @param data - Project data array
   * @returns Validation result
   */
  public validate(data: IProject[]): IProjectValidationResult {
    return this.model.validate(data);
  }

  /**
   * Get all projects sorted by featured and date
   * @param projects - Array of projects
   * @returns Sorted projects
   */
  public getAllProjects(projects: IProject[]): IProject[] {
    if (!Array.isArray(projects) || projects.length === 0) {
      return [];
    }

    // Sort by featured first, then by date
    const sorted = this.model.sortByFeatured(projects);
    return this.model.sortByDate(sorted);
  }

  /**
   * Get featured projects
   * @param projects - Array of projects
   * @returns Featured projects
   */
  public getFeaturedProjects(projects: IProject[]): IProject[] {
    if (!Array.isArray(projects)) {
      return [];
    }
    return projects.filter((project) => project.featured === true);
  }

  /**
   * Get projects by category
   * @param projects - Array of projects
   * @param category - Category to filter by
   * @returns Filtered projects
   */
  public getProjectsByCategory(
    projects: IProject[],
    category: ProjectCategory
  ): IProject[] {
    if (!Array.isArray(projects)) {
      return [];
    }
    return this.model.filterByCategory(projects, category);
  }

  /**
   * Get projects by status
   * @param projects - Array of projects
   * @param status - Status to filter by
   * @returns Filtered projects
   */
  public getProjectsByStatus(
    projects: IProject[],
    status: ProjectStatus
  ): IProject[] {
    if (!Array.isArray(projects)) {
      return [];
    }
    return this.model.filterByStatus(projects, status);
  }

  /**
   * Get projects by technology
   * @param projects - Array of projects
   * @param technology - Technology name to filter by
   * @returns Filtered projects
   */
  public getProjectsByTechnology(
    projects: IProject[],
    technology: string
  ): IProject[] {
    if (!Array.isArray(projects)) {
      return [];
    }
    return this.model.filterByTechnology(projects, technology);
  }

  /**
   * Get all unique technologies from projects
   * @param projects - Array of projects
   * @returns Array of unique technology names
   */
  public getAllTechnologies(projects: IProject[]): string[] {
    if (!Array.isArray(projects)) {
      return [];
    }

    const technologies = new Set<string>();
    projects.forEach((project) => {
      project.technologies?.forEach((tech) => {
        technologies.add(tech.name);
      });
    });

    return Array.from(technologies).sort();
  }

  /**
   * Get all unique categories from projects
   * @param projects - Array of projects
   * @returns Array of unique categories
   */
  public getAllCategories(projects: IProject[]): ProjectCategory[] {
    if (!Array.isArray(projects)) {
      return [];
    }

    const categories = new Set<ProjectCategory>();
    projects.forEach((project) => {
      if (project.category) {
        categories.add(project.category);
      }
    });

    return Array.from(categories);
  }

  /**
   * Format project date
   * @param dateString - Date string
   * @returns Formatted date
   */
  public formatDate(dateString: string): string {
    return this.model.formatDate(dateString);
  }

  /**
   * Format date for datetime attribute
   * @param dateString - Date string
   * @returns ISO date string
   */
  public formatDateForDateTime(dateString: string): string {
    return this.model.formatDateForDateTime(dateString);
  }

  /**
   * Get status label
   * @param status - Project status
   * @returns Human-readable status label
   */
  public getStatusLabel(status: ProjectStatus): string {
    return this.model.getStatusLabel(status);
  }

  /**
   * Get category label
   * @param category - Project category
   * @returns Human-readable category label
   */
  public getCategoryLabel(category: ProjectCategory): string {
    return this.model.getCategoryLabel(category);
  }

  /**
   * Convert legacy project data to new format
   * @param legacyData - Legacy project data
   * @returns Converted project data
   */
  public convertFromLegacy(legacyData: {
    key: string;
    icon: string;
    name: string;
    date: string;
    description: string;
  }[]): IProject[] {
    return this.model.convertFromLegacy(legacyData);
  }
}

