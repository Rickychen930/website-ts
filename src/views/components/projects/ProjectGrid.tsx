/**
 * Project Grid Component
 * Grid container for displaying projects
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";
import { IProject } from "../../../models/project-model";
import { ProjectCard } from "./ProjectCard";

/**
 * Project Grid Props
 */
interface ProjectGridProps {
  projects: IProject[];
  visibleProjects: Set<string>;
  onVisibilityChange: (key: string, visible: boolean) => void;
  onLinkClick?: (url: string, type: string) => void;
  className?: string;
  layout?: "grid" | "masonry" | "list";
}

/**
 * Project Grid Component
 * PureComponent for performance optimization
 */
export class ProjectGrid extends PureComponent<ProjectGridProps> {
  static defaultProps: Partial<ProjectGridProps> = {
    className: "",
    layout: "grid",
  };

  /**
   * Get grid class names
   */
  private getClassNames(): string {
    const { className = "", layout = "grid" } = this.props;
    const classes = [
      "project-grid",
      `project-grid-layout-${layout}`,
      className,
    ];
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render project card
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
   * Main render method
   */
  public render(): ReactNode {
    const { projects } = this.props;

    if (!projects || projects.length === 0) {
      return null;
    }

    return (
      <div className={this.getClassNames()} role="list" aria-label="Projects">
        {projects.map((project, index) => this.renderProjectCard(project, index))}
      </div>
    );
  }
}

