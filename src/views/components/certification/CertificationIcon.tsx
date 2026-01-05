/**
 * Certification Icon Component
 * Reusable component for displaying certification icons
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";

/**
 * Certification Icon Props
 */
interface CertificationIconProps {
  icon: string;
  size?: "small" | "medium" | "large";
  className?: string;
  ariaLabel?: string;
}

/**
 * Certification Icon Component
 * PureComponent for performance optimization
 */
export class CertificationIcon extends PureComponent<CertificationIconProps> {
  private static readonly SIZE_CLASSES = {
    small: "certification-icon-small",
    medium: "certification-icon-medium",
    large: "certification-icon-large",
  };

  /**
   * Get icon class names
   */
  private getClassNames(): string {
    const { size = "medium", className = "" } = this.props;
    const classes = [
      "certification-icon-wrapper",
      CertificationIcon.SIZE_CLASSES[size],
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon
   */
  public render(): ReactNode {
    const { icon, ariaLabel } = this.props;

    if (!icon || icon.trim() === "") {
      return null;
    }

    return (
      <div
        className={this.getClassNames()}
        aria-hidden={!ariaLabel}
        aria-label={ariaLabel}
      >
        <span className="certification-icon-emoji">{icon}</span>
        <div className="certification-icon-glow" aria-hidden="true"></div>
        <div className="certification-icon-shine" aria-hidden="true"></div>
      </div>
    );
  }
}

