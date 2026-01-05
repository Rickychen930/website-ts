/**
 * Certification Badge Component
 * Reusable component for displaying certification badges/metadata
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 */

import React, { PureComponent, ReactNode } from "react";

/**
 * Certification Badge Props
 */
interface CertificationBadgeProps {
  label: string;
  value: string;
  variant?: "default" | "accent" | "muted";
  icon?: string;
  className?: string;
}

/**
 * Certification Badge Component
 * Displays metadata badges (credential ID, level, etc.)
 */
export class CertificationBadge extends PureComponent<CertificationBadgeProps> {
  private static readonly VARIANT_CLASSES = {
    default: "certification-badge-default",
    accent: "certification-badge-accent",
    muted: "certification-badge-muted",
  };

  /**
   * Get badge class names
   */
  private getClassNames(): string {
    const { variant = "default", className = "" } = this.props;
    const classes = [
      "certification-badge",
      CertificationBadge.VARIANT_CLASSES[variant],
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render badge
   */
  public render(): ReactNode {
    const { label, value, icon } = this.props;

    if (!value || value.trim() === "") {
      return null;
    }

    return (
      <div className={this.getClassNames()}>
        {icon && (
          <span className="certification-badge-icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="certification-badge-label" aria-label={label}>
          {value}
        </span>
      </div>
    );
  }
}

