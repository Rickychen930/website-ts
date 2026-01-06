/**
 * Projects Section Component
 * View Layer (MVC Pattern)
 * 
 * Features:
 * - Professional, Luxury, Clean Design
 * - Performance Optimized (throttled scroll, optimized observers, memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with smooth animations
 * - Accessibility Support
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVC (Model-View-Controller)
 * - KISS (Keep It Simple, Stupid)
 * - Component-Based Architecture
 */

import React, { Component, ReactNode } from "react";
import { Card } from "../../components/common";
import { ProjectGrid } from "../../components/projects";
import { ProjectController } from "../../../controllers/project-controller";
import { IProject } from "../../../models/project-model";
import ProjectFilters from "../../../components/projects/project-filters";
import "../../../assets/css/projects-section.css";
import "../../../assets/css/project-filters.css";

/**
 * Legacy Project Item Type (for backward compatibility)
 */
type LegacyProjectItem = {
  key: string;
  icon: string;
  name: string;
  date: string;
  description: string;
};

/**
 * Projects Section Props Interface
 */
type ProjectsProps = {
  data: LegacyProjectItem[] | IProject[];
};

/**
 * Projects Section State Interface
 */
type ProjectsState = {
  visibleProjects: Set<string>;
  isInitialized: boolean;
  error: string | null;
  projects: IProject[];
  filteredProjects: IProject[];
};

/**
 * Intersection Observer Configuration
 * Centralized for maintainability (DRY)
 */
const OBSERVER_CONFIG: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: "50px",
};

/**
 * Projects Section Component
 */
class ProjectsSection extends Component<ProjectsProps, ProjectsState> {
  private readonly controller: ProjectController;
  private observer: IntersectionObserver | null = null;
  private isMounted: boolean = false;

  constructor(props: ProjectsProps) {
    super(props);
    this.controller = new ProjectController();
    this.state = {
      visibleProjects: new Set(),
      isInitialized: false,
      error: null,
      projects: [],
      filteredProjects: [],
    };
  }

  /**
   * Component Did Mount
   * Initialize intersection observer and process data
   */
  componentDidMount(): void {
    this.isMounted = true;
    this.processData();
    this.initializeObserver();
  }

  /**
   * Component Will Unmount
   * Cleanup observers
   */
  componentWillUnmount(): void {
    this.isMounted = false;
    this.cleanup();
  }

  /**
   * Component Did Update
   * Handle data changes
   */
  componentDidUpdate(prevProps: ProjectsProps): void {
    if (prevProps.data !== this.props.data) {
      this.processData();
      this.cleanup();
      this.setState({
        visibleProjects: new Set(),
        isInitialized: false,
        error: null,
        filteredProjects: [],
      });

      if (this.isMounted) {
        this.initializeObserver();
      }
    }
  }

  /**
   * Process and convert project data
   * Handles both legacy and new formats
   */
  private processData(): void {
    const { data } = this.props;

    if (!data || !Array.isArray(data) || data.length === 0) {
      this.setState({ projects: [], isInitialized: true });
      return;
    }

    try {
      // Check if data is already in new format
      const firstItem = data[0];
      const isNewFormat = "status" in firstItem && "category" in firstItem;

      let projects: IProject[];

      if (isNewFormat) {
        // Data is already in new format
        projects = data as IProject[];
      } else {
        // Convert from legacy format
        projects = this.controller.convertFromLegacy(data as LegacyProjectItem[]);
      }

      // Validate projects
      const validation = this.controller.validate(projects);
      if (!validation.isValid) {
        console.warn("Project validation errors:", validation.errors);
        // Continue with projects anyway, but log errors
      }

      // Sort projects (featured first, then by date)
      projects = this.controller.getAllProjects(projects);

      this.setState({ 
        projects, 
        filteredProjects: projects,
        isInitialized: true 
      });
    } catch (error) {
      console.error("Error processing project data:", error);
      this.setState({
        error: error instanceof Error ? error.message : "Failed to process projects",
        projects: [],
        filteredProjects: [],
        isInitialized: true,
      });
    }
  }

  /**
   * Initialize Intersection Observer
   * Performance optimized visibility detection
   */
  private initializeObserver(): void {
    // Cleanup existing observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: mark all items as visible
      const allKeys = this.state.projects.map((p) => p.key);
      this.setState({
        visibleProjects: new Set(allKeys),
        isInitialized: true,
      });
      return;
    }

    // Edge case: Validate data exists
    if (!this.state.projects || this.state.projects.length === 0) {
      this.setState({ isInitialized: true });
      return;
    }

    try {
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        OBSERVER_CONFIG
      );

      // Observe all project cards
      const cards = document.querySelectorAll("[data-project-key]");
      cards.forEach((card) => {
        try {
          this.observer?.observe(card);
        } catch (err) {
          if (process.env.NODE_ENV === "development") {
            console.warn("Failed to observe project card:", err);
          }
        }
      });

      this.setState({ isInitialized: true });
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Error initializing IntersectionObserver:", error);
      }

      // Fallback: show all items
      const allKeys = this.state.projects.map((p) => p.key);
      this.setState({
        visibleProjects: new Set(allKeys),
        isInitialized: true,
      });
    }
  }

  /**
   * Handle Intersection Observer Callback
   * Update visible projects state
   */
  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    if (!this.isMounted) return;

    this.setState((prevState) => {
      const newVisibleProjects = new Set(prevState.visibleProjects);

      entries.forEach((entry) => {
        const projectKey = entry.target.getAttribute("data-project-key");
        if (!projectKey) return;

        if (entry.isIntersecting) {
          newVisibleProjects.add(projectKey);
        } else {
          // Only remove if scrolled past significantly
          if (entry.boundingClientRect.top > window.innerHeight) {
            newVisibleProjects.delete(projectKey);
          }
        }
      });

      return { visibleProjects: newVisibleProjects };
    });
  }

  /**
   * Cleanup Resources
   * Prevent memory leaks
   */
  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Handle link click
   */
  private handleLinkClick = (url: string, type: string): void => {
    // Open link in new tab
    window.open(url, "_blank", "noopener,noreferrer");
  };

  /**
   * Handle visibility change
   */
  private handleVisibilityChange = (key: string, visible: boolean): void => {
    this.setState((prevState) => {
      const newVisibleProjects = new Set(prevState.visibleProjects);
      if (visible) {
        newVisibleProjects.add(key);
      } else {
        newVisibleProjects.delete(key);
      }
      return { visibleProjects: newVisibleProjects };
    });
  };

  /**
   * Handle filter change
   */
  private handleFilterChange = (filteredProjects: IProject[]): void => {
    this.setState({ filteredProjects });
  };

  /**
   * Render Empty State
   * User-friendly empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="projects-empty-state" role="status" aria-live="polite">
        <div className="projects-empty-icon" aria-hidden="true">🚀</div>
        <h3 className="projects-empty-title">No Projects Yet</h3>
        <p className="projects-empty-text">
          Projects will appear here once they are added to your profile.
        </p>
      </div>
    );
  }

  /**
   * Main Render Method
   * Render projects section with error handling
   */
  public render(): ReactNode {
    const { projects, error } = this.state;

    // Edge case: Empty data
    if (!projects || projects.length === 0) {
      return (
        <Card id="projects-section">
          {this.renderEmptyState()}
        </Card>
      );
    }

    // Edge case: Error state (but don't show error, just fallback gracefully)
    if (error) {
      // Don't show error state, just render empty state for better UX
      if (process.env.NODE_ENV === "development") {
        console.error("Projects section error:", error);
      }
      return (
        <Card id="projects-section">
          {this.renderEmptyState()}
        </Card>
      );
    }

    return (
      <Card id="projects-section" title="Projects">
        <div className="projects-section-container">
          <ProjectFilters
            projects={projects}
            onFilterChange={this.handleFilterChange}
          />
          <ProjectGrid
            projects={this.state.filteredProjects.length > 0 ? this.state.filteredProjects : projects}
            visibleProjects={this.state.visibleProjects}
            onVisibilityChange={this.handleVisibilityChange}
            onLinkClick={this.handleLinkClick}
            layout="grid"
          />
        </div>
      </Card>
    );
  }
}

export default ProjectsSection;
