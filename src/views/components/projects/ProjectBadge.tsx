/**
 * Project Badge Component
 * Reusable badge component for technologies, status, and categories
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";
import { ProjectStatus, ProjectCategory } from "../../../models/project-model";

/**
 * Project Badge Props
 */
interface ProjectBadgeProps {
  label: string;
  variant?: "default" | "primary" | "success" | "warning" | "danger" | "info" | "accent";
  size?: "small" | "medium" | "large";
  icon?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Project Badge Component
 * PureComponent for performance optimization
 */
export class ProjectBadge extends PureComponent<ProjectBadgeProps> {
  static defaultProps: Partial<ProjectBadgeProps> = {
    variant: "default",
    size: "medium",
    icon: undefined,
    className: "",
    ariaLabel: undefined,
  };

  /**
   * Get badge class names
   */
  private getClassNames(): string {
    const { variant = "default", size = "medium", className = "" } = this.props;
    const classes = [
      "project-badge",
      `project-badge-variant-${variant}`,
      `project-badge-size-${size}`,
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon if provided
   */
  private renderIcon(): ReactNode {
    const { icon } = this.props;
    if (!icon) return null;

    return (
      <span className="project-badge-icon" aria-hidden="true">
        {icon}
      </span>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { label, ariaLabel } = this.props;

    return (
      <span
        className={this.getClassNames()}
        aria-label={ariaLabel || label}
        role="status"
      >
        {this.renderIcon()}
        <span className="project-badge-label">{label}</span>
      </span>
    );
  }
}

/**
 * Status Badge Component
 * Specialized badge for project status
 */
export class ProjectStatusBadge extends PureComponent<{
  status: ProjectStatus;
  className?: string;
}> {
  private getStatusVariant(status: ProjectStatus): "default" | "primary" | "success" | "warning" | "danger" | "info" | "accent" {
    const variants: Record<ProjectStatus, "default" | "primary" | "success" | "warning" | "danger" | "info" | "accent"> = {
      completed: "success",
      "in-progress": "primary",
      archived: "default",
      "on-hold": "warning",
    };
    return variants[status] || "default";
  }

  private getStatusLabel(status: ProjectStatus): string {
    const labels: Record<ProjectStatus, string> = {
      completed: "Completed",
      "in-progress": "In Progress",
      archived: "Archived",
      "on-hold": "On Hold",
    };
    return labels[status] || status;
  }

  public render(): ReactNode {
    const { status, className = "" } = this.props;
    return (
      <ProjectBadge
        label={this.getStatusLabel(status)}
        variant={this.getStatusVariant(status)}
        size="small"
        className={className}
        ariaLabel={`Project status: ${this.getStatusLabel(status)}`}
      />
    );
  }
}

/**
 * Category Badge Component
 * Specialized badge for project category
 */
export class ProjectCategoryBadge extends PureComponent<{
  category: ProjectCategory;
  className?: string;
}> {
  private getCategoryLabel(category: ProjectCategory): string {
    const labels: Record<ProjectCategory, string> = {
      "web-development": "Web Dev",
      "mobile-development": "Mobile",
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

  public render(): ReactNode {
    const { category, className = "" } = this.props;
    return (
      <ProjectBadge
        label={this.getCategoryLabel(category)}
        variant="accent"
        size="small"
        className={className}
        ariaLabel={`Project category: ${this.getCategoryLabel(category)}`}
      />
    );
  }
}

