/**
 * Skill Badge Component
 * Reusable component for displaying individual skills
 * Follows Single Responsibility Principle (SRP)
 * Follows DRY principle - Reusable across the application
 */

import React, { PureComponent, ReactNode } from "react";
import "./SkillBadge.css";

/**
 * Skill Badge Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ISkillBadgeProps {
  name: string;
  icon: string;
  index?: number;
  variant?: "default" | "compact" | "large";
  onClick?: () => void;
  className?: string;
}

/**
 * Skill Badge Component
 *
 * Features:
 * - Luxury & Professional Design
 * - Performance Optimized (PureComponent)
 * - Fully Responsive
 * - Accessible (ARIA labels)
 * - Reusable (DRY principle)
 *
 * Principles Applied:
 * - SOLID (Single Responsibility)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - KISS (Keep It Simple)
 */
export class SkillBadge extends PureComponent<ISkillBadgeProps> {
  static defaultProps: Partial<ISkillBadgeProps> = {
    index: 0,
    variant: "default",
    onClick: undefined,
    className: "",
  };

  /**
   * Generate CSS class names
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { variant = "default", className = "" } = this.props;
    const classes = ["skill-badge", `skill-badge--${variant}`, className];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Handle click event
   */
  private handleClick = (): void => {
    const { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  };

  /**
   * Render skill icon
   */
  private renderIcon(): ReactNode {
    const { icon } = this.props;

    return (
      <span className="skill-badge__icon" aria-hidden="true">
        {icon}
      </span>
    );
  }

  /**
   * Render skill name
   */
  private renderName(): ReactNode {
    const { name } = this.props;

    return <span className="skill-badge__name">{name}</span>;
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { name, index = 0, onClick } = this.props;
    const style = onClick
      ? { cursor: "pointer" }
      : { animationDelay: `${index * 30}ms` }; // Dynamic delay based on index - keep inline

    return (
      <div
        className={this.getClassNames()}
        style={style}
        onClick={this.handleClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        aria-label={`Skill: ${name}`}
        onKeyDown={(e) => {
          if (onClick && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            this.handleClick();
          }
        }}
      >
        {this.renderIcon()}
        {this.renderName()}
      </div>
    );
  }
}

export default SkillBadge;
