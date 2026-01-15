/**
 * AcademicCard Component - Modern Redesign
 * Professional, Luxury, Glassmorphism Design
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
 * Modern redesign with glassmorphism, 3D effects, and sophisticated animations
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
   * Render animated background pattern
   */
  private renderBackgroundPattern(): ReactNode {
    return (
      <>
        <div className="academic-card-pattern" aria-hidden="true"></div>
        <div className="academic-card-glass" aria-hidden="true"></div>
        <div className="academic-card-gradient" aria-hidden="true"></div>
      </>
    );
  }

  /**
   * Render icon with modern design
   */
  private renderIcon(): ReactNode {
    const { item } = this.props;
    return (
      <div className="academic-card-icon" aria-hidden="true">
        <div className="academic-card-icon-outer">
          <div className="academic-card-icon-inner">
            <span className="academic-card-icon-emoji">
              {item.icon || "🎓"}
            </span>
          </div>
          <div className="academic-card-icon-glow"></div>
          <div className="academic-card-icon-ring"></div>
        </div>
      </div>
    );
  }

  /**
   * Render header section with modern typography
   */
  private renderHeader(): ReactNode {
    const { item } = this.props;
    return (
      <div className="academic-card-header">
        <div className="academic-card-title-section">
          <h3 className="academic-card-title">
            {item.title || "Academic Achievement"}
          </h3>
          <span className={this.getLevelBadgeClass()}>
            {this.getLevelLabel()}
          </span>
        </div>
        {item.institution && (
          <div className="academic-card-institution">
            <span className="academic-card-institution-icon">🏛️</span>
            <span className="academic-card-institution-text">
              {item.institution}
            </span>
          </div>
        )}
      </div>
    );
  }

  /**
   * Render period badge with modern design
   */
  private renderPeriod(): ReactNode {
    const { item } = this.props;
    if (!item.period || item.period.trim() === "") {
      return null;
    }

    return (
      <div className="academic-card-period">
        <div className="academic-card-period-icon">📅</div>
        <time dateTime={item.period} className="academic-card-period-text">
          {item.period}
        </time>
      </div>
    );
  }

  /**
   * Render description with modern styling
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
      animationDelay: `${index * 120}ms`,
      transitionDelay: `${index * 120}ms`,
    } as React.CSSProperties;

    return (
      <article
        className={cardClasses}
        style={style}
        data-key={item.key}
        data-index={index}
        aria-label={`Academic achievement: ${item.title} at ${item.institution}`}
      >
        {this.renderBackgroundPattern()}
        <div className="academic-card-content">
          {this.renderIcon()}
          <div className="academic-card-body">
            {this.renderHeader()}
            {this.renderPeriod()}
            {this.renderDescription()}
          </div>
        </div>
        <div className="academic-card-shine" aria-hidden="true"></div>
        <div className="academic-card-glow"></div>
      </article>
    );
  }
}
