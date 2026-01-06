/**
 * WorkExperienceBadge Component
 * Reusable badge component for displaying technologies and achievements
 * 
 * Principles Applied:
 * - Single Responsibility: Displays a single badge
 * - Open/Closed: Extensible through props
 * - DRY: Reusable across work experience section
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import "./WorkExperienceBadge.css";

/**
 * WorkExperienceBadge Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IWorkExperienceBadgeProps {
  label: string;
  variant?: "technology" | "achievement" | "default";
  className?: string;
}

/**
 * WorkExperienceBadge Component
 * Displays a luxury badge for technologies or achievements
 */
export class WorkExperienceBadge extends PureComponent<IWorkExperienceBadgeProps> {
  /**
   * Get badge class based on variant
   */
  private getBadgeClass(): string {
    const { variant = "default" } = this.props;
    return `work-experience-badge work-experience-badge-${variant}`;
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { label, className = "" } = this.props;

    const badgeClasses = [
      this.getBadgeClass(),
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span className={badgeClasses} role="listitem">
        {label}
      </span>
    );
  }
}

