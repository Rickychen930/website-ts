/**
 * Language Icon Component
 * Reusable icon component for languages
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode } from "react";

/**
 * Language Icon Props
 */
interface LanguageIconProps {
  icon: string;
  size?: "small" | "medium" | "large" | "xlarge";
  ariaLabel?: string;
  className?: string;
}

/**
 * Language Icon Component
 * PureComponent for performance optimization
 */
export class LanguageIcon extends PureComponent<LanguageIconProps> {
  /**
   * Get icon size class
   */
  private getSizeClass(): string {
    const { size = "medium" } = this.props;
    return `language-icon-${size}`;
  }

  /**
   * Get icon class names
   */
  private getClassNames(): string {
    const { className = "" } = this.props;
    const classes = ["language-icon", this.getSizeClass()];

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get icon style
   */
  private getIconStyle(): React.CSSProperties {
    const { size = "medium" } = this.props;
    
    const sizeMap = {
      small: "2rem",
      medium: "3.5rem",
      large: "4.5rem",
      xlarge: "6rem",
    };

    return {
      fontSize: sizeMap[size],
    };
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { icon, ariaLabel } = this.props;

    return (
      <div
        className={this.getClassNames()}
        style={this.getIconStyle()}
        role="img"
        aria-label={ariaLabel || "Language icon"}
        aria-hidden={!ariaLabel}
      >
        <span className="language-icon-emoji">{icon || "🌐"}</span>
      </div>
    );
  }
}

