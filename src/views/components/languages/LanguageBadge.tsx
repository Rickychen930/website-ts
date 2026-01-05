/**
 * Language Badge Component
 * Reusable badge component for displaying proficiency levels
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";

/**
 * Language Badge Props
 */
interface LanguageBadgeProps {
  proficiency: string;
  proficiencyClass?: string;
  variant?: "default" | "outlined" | "filled" | "gradient";
  size?: "small" | "medium" | "large";
  className?: string;
}

/**
 * Language Badge Component
 * PureComponent for performance optimization
 */
export class LanguageBadge extends PureComponent<LanguageBadgeProps> {
  /**
   * Get badge class names
   */
  private getClassNames(): string {
    const { proficiencyClass, variant = "default", size = "medium", className = "" } = this.props;
    const classes = [
      "language-badge",
      `language-badge-${variant}`,
      `language-badge-${size}`,
    ];

    if (proficiencyClass) {
      classes.push(proficiencyClass);
    }

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { proficiency } = this.props;

    return (
      <span className={this.getClassNames()}>
        <span className="language-badge-text">{proficiency}</span>
        <span className="language-badge-glow" aria-hidden="true"></span>
      </span>
    );
  }
}

