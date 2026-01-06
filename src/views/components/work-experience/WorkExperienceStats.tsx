/**
 * WorkExperienceStats Component
 * Displays statistics/metrics for work experience
 * Shows software engineering impact
 * 
 * Principles Applied:
 * - Single Responsibility: Displays statistics
 * - Open/Closed: Extensible through props
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import "./WorkExperienceStats.css";

/**
 * WorkExperienceStats Props Interface
 */
export interface IWorkExperienceStatsProps {
  technologiesCount?: number;
  duration?: string;
  achievementsCount?: number;
  className?: string;
}

/**
 * WorkExperienceStats Component
 * Displays key metrics for work experience
 */
export class WorkExperienceStats extends PureComponent<IWorkExperienceStatsProps> {
  /**
   * Render a single stat item
   */
  private renderStatItem(label: string, value: string | number, icon: string): ReactNode {
    return (
      <div className="work-experience-stat-item">
        <div className="work-experience-stat-icon" aria-hidden="true">{icon}</div>
        <div className="work-experience-stat-content">
          <div className="work-experience-stat-value">{value}</div>
          <div className="work-experience-stat-label">{label}</div>
        </div>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { technologiesCount, duration, achievementsCount, className = "" } = this.props;

    // Don't render if no stats available
    if (!technologiesCount && !duration && !achievementsCount) {
      return null;
    }

    const statsClasses = [
      "work-experience-stats",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={statsClasses} role="region" aria-label="Work Experience Statistics">
        {duration && this.renderStatItem("Duration", duration, "⏱️")}
        {technologiesCount !== undefined && technologiesCount > 0 && 
          this.renderStatItem("Technologies", technologiesCount, "⚡")}
        {achievementsCount !== undefined && achievementsCount > 0 && 
          this.renderStatItem("Achievements", achievementsCount, "🏆")}
      </div>
    );
  }
}

