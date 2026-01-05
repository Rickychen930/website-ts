/**
 * Project Card Component
 * Main card component for displaying individual projects
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode, RefObject, createRef } from "react";
import { IProject } from "../../../models/project-model";
import { ProjectImage } from "./ProjectImage";
import { ProjectBadge, ProjectStatusBadge, ProjectCategoryBadge } from "./ProjectBadge";
import { ProjectLinks } from "./ProjectLinks";
import { ProjectCodeSnippet } from "./ProjectCodeSnippet";
import { ProjectStats } from "./ProjectStats";
import { ProjectController } from "../../../controllers/project-controller";

/**
 * Project Card Props
 */
interface ProjectCardProps {
  project: IProject;
  index: number;
  isVisible: boolean;
  onVisibilityChange: (key: string, visible: boolean) => void;
  onLinkClick?: (url: string, type: string) => void;
  className?: string;
}

/**
 * Project Card State
 */
interface ProjectCardState {
  isHovered: boolean;
  imageLoaded: boolean;
}

/**
 * Project Card Component
 * PureComponent for performance optimization
 */
export class ProjectCard extends PureComponent<ProjectCardProps, ProjectCardState> {
  private readonly cardRef: RefObject<HTMLDivElement>;
  private readonly controller: ProjectController;
  private readonly ANIMATION_DELAY_BASE = 100;
  private readonly INTERSECTION_THRESHOLD = 0.1;
  private observer: IntersectionObserver | null = null;

  constructor(props: ProjectCardProps) {
    super(props);
    this.cardRef = createRef<HTMLDivElement>();
    this.controller = new ProjectController();
    this.state = {
      isHovered: false,
      imageLoaded: false,
    };
  }

  /**
   * Component lifecycle - Mount
   */
  componentDidMount(): void {
    this.setupIntersectionObserver();
  }

  /**
   * Component lifecycle - Unmount
   */
  componentWillUnmount(): void {
    this.cleanupIntersectionObserver();
  }

  /**
   * Setup Intersection Observer for performance optimization
   */
  private setupIntersectionObserver = (): void => {
    if (!this.cardRef.current || typeof IntersectionObserver === "undefined") {
      this.props.onVisibilityChange(this.props.project.key, true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.props.onVisibilityChange(
            this.props.project.key,
            entry.isIntersecting
          );
        });
      },
      {
        threshold: this.INTERSECTION_THRESHOLD,
        rootMargin: "50px",
      }
    );

    if (this.cardRef.current) {
      this.observer.observe(this.cardRef.current);
    }
  };

  /**
   * Cleanup Intersection Observer
   */
  private cleanupIntersectionObserver = (): void => {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  };

  /**
   * Handle mouse enter
   */
  private handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  /**
   * Handle mouse leave
   */
  private handleMouseLeave = (): void => {
    this.setState({ isHovered: false });
  };

  /**
   * Get animation delay
   */
  private getAnimationDelay(): string {
    return `${this.props.index * this.ANIMATION_DELAY_BASE}ms`;
  }

  /**
   * Get card class names
   */
  private getCardClassNames(): string {
    const { project, isVisible, className = "" } = this.props;
    const { isHovered } = this.state;
    const classes = ["project-card"];

    if (isVisible) {
      classes.push("project-card-visible");
    }

    if (project.featured) {
      classes.push("project-card-featured");
    }

    if (isHovered) {
      classes.push("project-card-hovered");
    }

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render project image
   */
  private renderImage(): ReactNode {
    const { project } = this.props;
    return (
      <div className="project-card-image-wrapper">
        <ProjectImage
          src={project.image}
          alt={project.name}
          icon={project.icon}
          className="project-card-image"
        />
        <div className="project-card-image-overlay" aria-hidden="true"></div>
      </div>
    );
  }

  /**
   * Render project header
   */
  private renderHeader(): ReactNode {
    const { project } = this.props;
    return (
      <div className="project-card-header">
        <div className="project-card-header-top">
          <h3 className="project-card-title">{project.name}</h3>
          <div className="project-card-badges-top">
            <ProjectStatusBadge status={project.status} />
            {project.featured && (
              <ProjectBadge
                label="Featured"
                variant="accent"
                size="small"
                icon="⭐"
              />
            )}
          </div>
        </div>
        <div className="project-card-meta">
          <time
            dateTime={this.controller.formatDateForDateTime(project.date)}
            className="project-card-date"
          >
            {this.controller.formatDate(project.date)}
          </time>
          <ProjectCategoryBadge category={project.category} />
        </div>
      </div>
    );
  }

  /**
   * Render project description
   */
  private renderDescription(): ReactNode {
    const { project } = this.props;
    return (
      <p className="project-card-description">{project.description}</p>
    );
  }

  /**
   * Render technologies
   */
  private renderTechnologies(): ReactNode {
    const { project } = this.props;
    if (!project.technologies || project.technologies.length === 0) {
      return null;
    }

    return (
      <div className="project-card-technologies">
        {project.technologies.slice(0, 6).map((tech, index) => (
          <ProjectBadge
            key={`${tech.name}-${index}`}
            label={tech.name}
            variant="default"
            size="small"
            icon={tech.icon}
            className="project-card-technology"
          />
        ))}
        {project.technologies.length > 6 && (
          <ProjectBadge
            label={`+${project.technologies.length - 6}`}
            variant="default"
            size="small"
            className="project-card-technology-more"
          />
        )}
      </div>
    );
  }

  /**
   * Render highlights
   */
  private renderHighlights(): ReactNode {
    const { project } = this.props;
    if (!project.highlights || project.highlights.length === 0) {
      return null;
    }

    return (
      <ul className="project-card-highlights">
        {project.highlights.slice(0, 3).map((highlight, index) => (
          <li key={index} className="project-card-highlight">
            {highlight}
          </li>
        ))}
      </ul>
    );
  }

  /**
   * Render project stats
   */
  private renderStats(): ReactNode {
    const { project } = this.props;
    return <ProjectStats project={project} className="project-card-stats" />;
  }

  /**
   * Render code snippet
   */
  private renderCodeSnippet(): ReactNode {
    const { project } = this.props;
    const technologies = project.technologies?.map((t) => t.name) || [];
    
    if (technologies.length === 0) {
      return null;
    }

    return (
      <div className="project-card-code-wrapper">
        <ProjectCodeSnippet
          technologies={technologies}
          language="typescript"
          className="project-card-code"
        />
      </div>
    );
  }

  /**
   * Render project links
   */
  private renderLinks(): ReactNode {
    const { project, onLinkClick } = this.props;
    if (!project.links || project.links.length === 0) {
      return null;
    }

    return (
      <div className="project-card-links-wrapper">
        <ProjectLinks links={project.links} onLinkClick={onLinkClick} />
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { project } = this.props;

    return (
      <div
        ref={this.cardRef}
        className={this.getCardClassNames()}
        style={{ animationDelay: this.getAnimationDelay() }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        role="article"
        aria-label={`Project: ${project.name}`}
        data-project-key={project.key}
      >
        <div className="project-card-inner">
          {this.renderImage()}
          <div className="project-card-content">
            {this.renderHeader()}
            {this.renderDescription()}
            {this.renderStats()}
            {this.renderCodeSnippet()}
            {this.renderTechnologies()}
            {this.renderHighlights()}
            {this.renderLinks()}
          </div>
        </div>
        <div className="project-card-shine" aria-hidden="true"></div>
        <div className="project-card-gradient" aria-hidden="true"></div>
      </div>
    );
  }
}

