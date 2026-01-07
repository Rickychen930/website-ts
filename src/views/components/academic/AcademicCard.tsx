/**
 * AcademicCard Component
 * Reusable card component for displaying academic achievements
 *
 * Principles Applied:
 * - Single Responsibility: Displays single academic item
 * - Open/Closed: Extensible through props
 * - DRY: Reusable across academic section
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import { IAcademicItem } from "../../../models/academic-model";
import "./AcademicCard.css";

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
 * AcademicCard Component
 * Displays a single academic achievement in a luxury card design
 */
export class AcademicCard extends PureComponent<IAcademicCardProps> {
  /**
   * Get academic level badge class
   */
  private getLevelBadgeClass(): string {
    const { academicLevel } = this.props;
    return `academic-level-badge academic-level-${academicLevel}`;
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
   * Render icon
   */
  private renderIcon(): ReactNode {
    const { item } = this.props;
    return (
      <div className="academic-card-icon" aria-hidden="true">
        <div className="academic-card-icon-inner">
          <span className="academic-card-icon-emoji">{item.icon || "🎓"}</span>
        </div>
        <div className="academic-card-icon-glow"></div>
      </div>
    );
  }

  /**
   * Render header section
   */
  private renderHeader(): ReactNode {
    const { item } = this.props;
    return (
      <div className="academic-card-header">
        <div className="academic-card-title-wrapper">
          <h3 className="academic-card-title">
            {item.title || "Academic Achievement"}
          </h3>
          <span className={this.getLevelBadgeClass()}>
            {this.getLevelLabel()}
          </span>
        </div>
        {item.institution && (
          <div className="academic-card-institution">{item.institution}</div>
        )}
      </div>
    );
  }

  /**
   * Render period badge
   */
  private renderPeriod(): ReactNode {
    const { item } = this.props;
    if (!item.period || item.period.trim() === "") {
      return null;
    }

    return (
      <div className="academic-card-period">
        <time dateTime={item.period} className="academic-card-period-text">
          {item.period}
        </time>
      </div>
    );
  }

  /**
   * Render description
   */
  private renderDescription(): ReactNode {
    const { item } = this.props;
    if (!item.description || item.description.trim() === "") {
      return null;
    }

    return (
      <div className="academic-card-description">
        <p className="academic-card-description-text">{item.description}</p>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { item, index, isVisible, className = "" } = this.props;

    const cardClasses = [
      "academic-card",
      isVisible ? "academic-card-visible" : "academic-card-hidden",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const style = {
      animationDelay: `${index * 150}ms`,
      transitionDelay: `${index * 150}ms`,
    } as React.CSSProperties;

    return (
      <article
        className={cardClasses}
        style={style}
        data-key={item.key}
        data-index={index}
        aria-label={`Academic achievement: ${item.title} at ${item.institution}`}
      >
        <div className="academic-card-content">
          {this.renderIcon()}
          <div className="academic-card-body">
            {this.renderHeader()}
            {this.renderPeriod()}
            {this.renderDescription()}
          </div>
        </div>
        <div className="academic-card-glow"></div>
      </article>
    );
  }
}
