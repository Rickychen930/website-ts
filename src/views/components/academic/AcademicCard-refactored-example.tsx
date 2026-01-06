/**
 * AcademicCard Component - Example Refactored with New CSS Architecture
 * Professional, Code-Based, OOP, SOLID, DRY, KISS
 *
 * This is an EXAMPLE showing how to refactor AcademicCard to use the new CSS architecture
 *
 * Changes:
 * - Uses CSS helpers instead of string concatenation
 * - Uses CSS variables in inline styles
 * - Uses BEM naming with helpers
 * - Maintains all existing functionality
 */

import React, { PureComponent, ReactNode } from "react";
import { IAcademicItem } from "../../../models/academic-model";
import { cn, bemClass } from "../../../utils/css-helpers";
import "./AcademicCard.css"; // Keep existing CSS, but can be migrated gradually

/**
 * AcademicCard Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IAcademicCardProps {
  item: IAcademicItem;
  index: number;
  isVisible: boolean;
  academicLevel: "undergraduate" | "graduate" | "certificate" | "other";
  className?: string;
}

/**
 * AcademicCard Component - Refactored Example
 * Uses new CSS architecture helpers while maintaining compatibility
 */
export class AcademicCard extends PureComponent<IAcademicCardProps> {
  /**
   * Get academic level badge class using BEM helper
   */
  private getLevelBadgeClass(): string {
    const { academicLevel } = this.props;
    // Using BEM helper for consistent naming
    return cn(
      bemClass("academic-level-badge"),
      bemClass("academic-level-badge", undefined, academicLevel),
    );
  }

  /**
   * Get academic level label
   */
  private getLevelLabel(): string {
    const { academicLevel } = this.props;
    const labels = {
      undergraduate: "Undergraduate",
      graduate: "Graduate",
      certificate: "Certificate",
      other: "Education",
    };
    return labels[academicLevel];
  }

  /**
   * Render icon using BEM naming
   */
  private renderIcon(): ReactNode {
    const { item } = this.props;
    return (
      <div className={bemClass("academic-card", "icon")} aria-hidden="true">
        <div className={bemClass("academic-card-icon", "inner")}>
          <span className={bemClass("academic-card-icon", "emoji")}>
            {item.icon || "🎓"}
          </span>
        </div>
        <div className={bemClass("academic-card-icon", "glow")}></div>
      </div>
    );
  }

  /**
   * Render header section using BEM naming
   */
  private renderHeader(): ReactNode {
    const { item } = this.props;
    return (
      <div className={bemClass("academic-card", "header")}>
        <div className={bemClass("academic-card", "title-wrapper")}>
          <h3 className={bemClass("academic-card", "title")}>{item.title}</h3>
          <span className={this.getLevelBadgeClass()}>
            {this.getLevelLabel()}
          </span>
        </div>
        <div className={bemClass("academic-card", "institution")}>
          {item.institution}
        </div>
      </div>
    );
  }

  /**
   * Render period badge using BEM naming
   */
  private renderPeriod(): ReactNode {
    const { item } = this.props;
    return (
      <div className={bemClass("academic-card", "period")}>
        <time
          dateTime={item.period}
          className={bemClass("academic-card-period", "text")}
        >
          {item.period}
        </time>
      </div>
    );
  }

  /**
   * Render description using BEM naming
   */
  private renderDescription(): ReactNode {
    const { item } = this.props;
    if (!item.description || item.description.trim() === "") {
      return null;
    }

    return (
      <div className={bemClass("academic-card", "description")}>
        <p className={bemClass("academic-card-description", "text")}>
          {item.description}
        </p>
      </div>
    );
  }

  /**
   * Main render method
   * Uses CSS helpers and CSS variables in inline styles
   */
  public render(): ReactNode {
    const { item, index, isVisible, className = "" } = this.props;

    // Use CSS helpers for class names
    const cardClasses = cn(
      bemClass("academic-card"),
      isVisible && bemClass("academic-card", undefined, "visible"),
      !isVisible && bemClass("academic-card", undefined, "hidden"),
      className,
    );

    // Use CSS variables in inline styles
    const style = {
      animationDelay: `${index * 150}ms`,
      transitionDelay: `${index * 150}ms`,
      // Can use CSS variables here if needed:
      // color: 'var(--color-text-heading)',
    } as React.CSSProperties;

    return (
      <article
        className={cardClasses}
        style={style}
        data-key={item.key}
        data-index={index}
        aria-label={`Academic achievement: ${item.title} at ${item.institution}`}
      >
        <div className={bemClass("academic-card", "content")}>
          {this.renderIcon()}
          <div className={bemClass("academic-card", "body")}>
            {this.renderHeader()}
            {this.renderPeriod()}
            {this.renderDescription()}
          </div>
        </div>
        <div className={bemClass("academic-card", "glow")}></div>
      </article>
    );
  }
}

/**
 * Usage Notes:
 *
 * 1. This example shows how to use CSS helpers while keeping existing CSS
 * 2. Gradually migrate CSS classes to use BEM helpers
 * 3. Replace hardcoded values in CSS with CSS variables
 * 4. Use cn() for combining classes instead of array.join()
 * 5. Use bemClass() for BEM naming consistency
 *
 * Migration Steps:
 * 1. Start using CSS helpers in component (this example)
 * 2. Update CSS file to use CSS variables
 * 3. Convert class names to BEM format
 * 4. Remove old CSS and use new component CSS
 */
