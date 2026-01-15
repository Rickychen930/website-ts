/**
 * Project Grid Component
 * Grid container for displaying projects with Carousel support
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 * - OOP: Uses reusable Carousel component
 */

import React, { PureComponent, ReactNode } from "react";
import { IProject } from "../../../models/project-model";
import { ProjectCard } from "./ProjectCard";
import { Carousel, ICarouselItem } from "../ui/carousel";

/**
 * Project Grid Props
 */
interface ProjectGridProps {
  projects: IProject[];
  visibleProjects: Set<string>;
  onVisibilityChange: (key: string, visible: boolean) => void;
  onLinkClick?: (url: string, type: string) => void;
  className?: string;
  layout?: "grid" | "masonry" | "list" | "carousel";
}

/**
 * Project Grid Component
 * PureComponent for performance optimization
 * Uses Carousel component for horizontal scrolling on all devices
 */
export class ProjectGrid extends PureComponent<ProjectGridProps> {
  static defaultProps: Partial<ProjectGridProps> = {
    className: "",
    layout: "carousel",
  };

  /**
   * Get grid class names
   */
  private getClassNames(): string {
    const { className = "", layout = "carousel" } = this.props;
    const classes = [
      "project-grid",
      `project-grid-layout-${layout}`,
      className,
    ];
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Convert projects to carousel items
   * Follows DRY principle
   */
  private convertToCarouselItems(): ICarouselItem[] {
    const { projects, visibleProjects, onVisibilityChange, onLinkClick } =
      this.props;

    return projects.map((project, index) => {
      const isVisible = visibleProjects.has(project.key);

      return {
        key: project.key,
        content: (
          <ProjectCard
            project={project}
            index={index}
            isVisible={isVisible}
            onVisibilityChange={onVisibilityChange}
            onLinkClick={onLinkClick}
          />
        ),
      };
    });
  }

  /**
   * Render project card (for non-carousel layouts)
   */
  private renderProjectCard(project: IProject, index: number): ReactNode {
    const { visibleProjects, onVisibilityChange, onLinkClick } = this.props;
    const isVisible = visibleProjects.has(project.key);

    return (
      <ProjectCard
        key={project.key}
        project={project}
        index={index}
        isVisible={isVisible}
        onVisibilityChange={onVisibilityChange}
        onLinkClick={onLinkClick}
      />
    );
  }

  /**
   * Render carousel layout
   */
  private renderCarousel(): ReactNode {
    const items = this.convertToCarouselItems();

    if (items.length === 0) {
      return null;
    }

    return (
      <Carousel
        items={items}
        className={this.getClassNames()}
        itemWidth={360}
        gap={24}
        showArrows={true}
        showIndicators={true}
        scrollSnap={true}
        ariaLabel="Projects carousel"
        emptyMessage="No projects available"
        emptyIcon="🚀"
      />
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { projects } = this.props;

    if (!projects || projects.length === 0) {
      return null;
    }

    // Always use horizontal scroll carousel for all devices
    return this.renderCarousel();
  }
}
