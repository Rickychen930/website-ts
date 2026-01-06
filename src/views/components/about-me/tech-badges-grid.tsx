import React, { Component, ReactNode } from "react";
import TechBadge from "./tech-badge";
import "../../../assets/css/about-me-components.css";

/**
 * TechBadgesGrid Props Interface
 */
export interface TechBadgesGridProps {
  technologies: string[];
  title?: string;
  variant?: "default" | "compact";
  maxItems?: number;
}

/**
 * TechBadgesGrid Component
 * 
 * Features:
 * - Displays tech stack as a grid of badges
 * - Shows software engineering capabilities prominently
 * - Luxury design with hover effects
 * - Fully responsive
 */
class TechBadgesGrid extends Component<TechBadgesGridProps> {
  static defaultProps: Partial<TechBadgesGridProps> = {
    title: "Technologies",
    variant: "default",
    maxItems: 12,
  };

  /**
   * Get technologies to display
   */
  private getDisplayTechnologies(): string[] {
    const { technologies, maxItems = 12 } = this.props;
    if (!technologies || technologies.length === 0) {
      return [];
    }
    return technologies.slice(0, maxItems);
  }

  /**
   * Render title
   */
  private renderTitle(): ReactNode {
    const { title } = this.props;

    if (!title || title.trim() === "") {
      return null;
    }

    return (
      <h3 className="tech-badges-grid-title">{title}</h3>
    );
  }

  /**
   * Render badges
   */
  private renderBadges(): ReactNode {
    const technologies = this.getDisplayTechnologies();
    const { variant = "default" } = this.props;

    if (technologies.length === 0) {
      return null;
    }

    // Alternate variants for visual interest
    const variants: Array<"primary" | "secondary" | "accent"> = ["primary", "secondary", "accent"];

    return (
      <div className={`tech-badges-grid ${variant === "compact" ? "tech-badges-grid-compact" : ""}`}>
        {technologies.map((tech, index) => {
          const variantType = variants[index % variants.length] as "primary" | "secondary" | "accent";
          return (
            <TechBadge
              key={`tech-${index}-${tech}`}
              label={tech}
              variant={variantType}
              size={variant === "compact" ? "sm" : "md"}
            />
          );
        })}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const technologies = this.getDisplayTechnologies();

    if (technologies.length === 0) {
      return null;
    }

    return (
      <div className="tech-badges-grid-container" role="region" aria-label="Technology Stack">
        {this.renderTitle()}
        {this.renderBadges()}
      </div>
    );
  }
}

export default TechBadgesGrid;

