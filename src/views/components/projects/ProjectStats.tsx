/**
 * Project Stats Component
 * Shows technical metrics and statistics
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";
import { IProject } from "../../../models/project-model";

/**
 * Project Stats Props
 */
interface ProjectStatsProps {
  project: IProject;
  className?: string;
}

/**
 * Project Stats Component
 * PureComponent for performance optimization
 */
export class ProjectStats extends PureComponent<ProjectStatsProps> {
  static defaultProps: Partial<ProjectStatsProps> = {
    className: "",
  };

  /**
   * Calculate lines of code estimate (mock calculation)
   */
  private estimateLinesOfCode(): string {
    const hasBackend = this.props.project.technologies?.some(
      (t) => t.category === "backend" || t.category === "database"
    );
    const hasFrontend = this.props.project.technologies?.some(
      (t) => t.category === "frontend" || t.category === "framework"
    );

    if (hasBackend && hasFrontend) {
      return "10K+";
    } else if (hasBackend || hasFrontend) {
      return "5K+";
    }
    return "2K+";
  }

  /**
   * Get class names
   */
  private getClassNames(): string {
    const { className = "" } = this.props;
    const classes = ["project-stats", className];
    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render single stat
   */
  private renderStat(label: string, value: string, icon: string): ReactNode {
    return (
      <div className="project-stat-item">
        <div className="project-stat-icon" aria-hidden="true">
          {icon}
        </div>
        <div className="project-stat-content">
          <div className="project-stat-value">{value}</div>
          <div className="project-stat-label">{label}</div>
        </div>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { project } = this.props;
    const techCount = project.technologies?.length || 0;
    const linkCount = project.links?.length || 0;
    const loc = this.estimateLinesOfCode();

    return (
      <div className={this.getClassNames()} role="group" aria-label="Project statistics">
        {this.renderStat("Technologies", `${techCount}`, "⚙️")}
        {this.renderStat("Lines of Code", loc, "📝")}
        {linkCount > 0 && this.renderStat("Repositories", `${linkCount}`, "🔗")}
        {project.teamSize && this.renderStat("Team Size", `${project.teamSize}`, "👥")}
      </div>
    );
  }
}

