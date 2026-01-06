import React, { Component, ReactNode } from "react";
import "../../../assets/css/about-me-components.css";

/**
 * TechBadge Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface TechBadgeProps {
  label: string;
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
}

/**
 * TechBadge Component
 * 
 * Features:
 * - Reusable tech stack badge component
 * - Multiple variants and sizes
 * - Luxury design with smooth animations
 * - Fully responsive
 * 
 * Principles Applied:
 * - SOLID (SRP, OCP)
 * - DRY (Reusable component)
 * - OOP (Class-based)
 * - KISS (Simple, focused)
 */
class TechBadge extends Component<TechBadgeProps> {
  static defaultProps: Partial<TechBadgeProps> = {
    variant: "primary",
    size: "md",
  };

  /**
   * Generate CSS class names
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { variant = "primary", size = "md" } = this.props;
    return `tech-badge tech-badge-${variant} tech-badge-${size}`;
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { label } = this.props;

    if (!label || label.trim() === "") {
      return null;
    }

    return (
      <span className={this.getClassNames()} aria-label={`Technology: ${label}`}>
        {label}
      </span>
    );
  }
}

export default TechBadge;

