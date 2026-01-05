/**
 * HonorCard Component - Reusable Card Component
 * Professional, Luxury, Responsive Honor Card
 * 
 * Principles Applied:
 * - SRP: Single responsibility - displays honor card
 * - OCP: Open for extension via props
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import { IHonorItem, HonorCategory } from "../../../models/honors-model";
import { HonorBadge } from "./HonorBadge";
import "./HonorCard.css";

/**
 * HonorCard Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IHonorCardProps {
  honor: IHonorItem;
  index: number;
  isVisible: boolean;
  category: HonorCategory;
  onCardClick?: (honor: IHonorItem) => void;
  className?: string;
}

/**
 * HonorCard Component
 * Displays a single honor/achievement card
 */
export class HonorCard extends PureComponent<IHonorCardProps> {
  /**
   * Handle card click
   */
  private handleClick = (): void => {
    if (this.props.onCardClick) {
      this.props.onCardClick(this.props.honor);
    }
  };

  /**
   * Get card class names
   */
  private getCardClassNames(): string {
    const { isVisible, category, className = "" } = this.props;
    const classes = [
      "honor-card",
      `honor-card--${category}`,
      isVisible ? "honor-card--visible" : "honor-card--hidden",
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon
   */
  private renderIcon(): ReactNode {
    const { honor } = this.props;
    return (
      <div className="honor-card__icon" aria-hidden="true">
        <div className="honor-card__icon-bg"></div>
        <span className="honor-card__icon-emoji">{honor.icon || "🏆"}</span>
      </div>
    );
  }

  /**
   * Render header
   */
  private renderHeader(): ReactNode {
    const { honor } = this.props;
    return (
      <div className="honor-card__header">
        <h3 className="honor-card__title">{honor.title}</h3>
        <div className="honor-card__meta">
          <span className="honor-card__event">{honor.event}</span>
          <time className="honor-card__date" dateTime={this.formatDateForDateTime(honor.date)}>
            {honor.date}
          </time>
        </div>
      </div>
    );
  }

  /**
   * Render description
   */
  private renderDescription(): ReactNode {
    const { honor } = this.props;
    if (!honor.description || honor.description.trim() === "") {
      return null;
    }

    return (
      <p className="honor-card__description">{honor.description}</p>
    );
  }

  /**
   * Render badge
   */
  private renderBadge(): ReactNode {
    const { category } = this.props;
    return (
      <div className="honor-card__badge">
        <HonorBadge category={category} />
      </div>
    );
  }

  /**
   * Format date for datetime attribute
   */
  private formatDateForDateTime(dateStr: string): string {
    try {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    } catch {
      // Fallback to original string
    }
    return dateStr;
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { honor, index } = this.props;

    return (
      <article
        className={this.getCardClassNames()}
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={this.handleClick}
        aria-label={`Honor: ${honor.title}`}
        tabIndex={0}
      >
        <div className="honor-card__glow"></div>
        <div className="honor-card__content">
          {this.renderIcon()}
          {this.renderBadge()}
          {this.renderHeader()}
          {this.renderDescription()}
        </div>
        <div className="honor-card__shine"></div>
      </article>
    );
  }
}

