/**
 * WorkExperienceIcon Component
 * Reusable icon component for work experience entries
 * 
 * Principles Applied:
 * - Single Responsibility: Displays work experience icon
 * - Open/Closed: Extensible through props
 * - DRY: Reusable across work experience section
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import "./WorkExperienceIcon.css";

/**
 * WorkExperienceIcon Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IWorkExperienceIconProps {
  icon: string;
  company: string;
  isVisible?: boolean;
  className?: string;
}

/**
 * WorkExperienceIcon Component
 * Displays a luxury icon for work experience entry
 */
export class WorkExperienceIcon extends PureComponent<IWorkExperienceIconProps> {
  /**
   * Main render method
   */
  public render(): ReactNode {
    const { icon, company, isVisible = true, className = "" } = this.props;

    const iconClasses = [
      "work-experience-icon",
      isVisible ? "work-experience-icon-visible" : "work-experience-icon-hidden",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div 
        className={iconClasses} 
        aria-label={company ? `Work experience at ${company}` : "Work experience icon"}
        role="img"
      >
        <div className="work-experience-icon-glow"></div>
        <div className="work-experience-icon-inner">
          <span className="work-experience-icon-emoji" aria-hidden="true">{icon || "💼"}</span>
        </div>
        <div className="work-experience-icon-pulse"></div>
      </div>
    );
  }
}

