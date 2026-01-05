import React, { Component, ReactNode } from "react";
import "../../../assets/css/about-me-components.css";

/**
 * ProfessionalHighlight Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ProfessionalHighlightProps {
  icon: string;
  title: string;
  description?: string;
  variant?: "default" | "primary" | "accent";
}

/**
 * ProfessionalHighlight Component
 * 
 * Features:
 * - Reusable highlight card for key achievements
 * - Luxury design with hover effects
 * - Fully responsive
 * 
 * Principles Applied:
 * - SOLID (SRP, OCP)
 * - DRY (Reusable component)
 * - OOP (Class-based)
 * - KISS (Simple, focused)
 */
class ProfessionalHighlight extends Component<ProfessionalHighlightProps> {
  static defaultProps: Partial<ProfessionalHighlightProps> = {
    variant: "default",
    description: undefined,
  };

  /**
   * Generate CSS class names
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { variant = "default" } = this.props;
    return `professional-highlight professional-highlight-${variant}`;
  }

  /**
   * Render icon
   */
  private renderIcon(): ReactNode {
    const { icon } = this.props;

    if (!icon || icon.trim() === "") {
      return null;
    }

    return (
      <div className="professional-highlight-icon" aria-hidden="true">
        {icon}
      </div>
    );
  }

  /**
   * Render content
   */
  private renderContent(): ReactNode {
    const { title, description } = this.props;

    return (
      <div className="professional-highlight-content">
        <h3 className="professional-highlight-title">{title}</h3>
        {description && (
          <p className="professional-highlight-description">{description}</p>
        )}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { title } = this.props;

    if (!title || title.trim() === "") {
      return null;
    }

    return (
      <div className={this.getClassNames()} role="article" aria-label={title}>
        {this.renderIcon()}
        {this.renderContent()}
      </div>
    );
  }
}

export default ProfessionalHighlight;

