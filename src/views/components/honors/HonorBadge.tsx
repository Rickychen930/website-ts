/**
 * HonorBadge Component - Reusable Badge Component
 * Displays category badge for honors
 * 
 * Principles Applied:
 * - SRP: Single responsibility - displays category badge
 * - DRY: Reusable component
 * - KISS: Simple component
 */

import React, { PureComponent, ReactNode } from "react";
import { HonorCategory } from "../../../models/honors-model";
import "./HonorBadge.css";

/**
 * HonorBadge Props Interface
 */
export interface IHonorBadgeProps {
  category: HonorCategory;
  className?: string;
}

/**
 * Category Configuration
 * Maps category to display text and styling
 */
const CATEGORY_CONFIG: Record<HonorCategory, { label: string; icon: string }> = {
  award: { label: "Award", icon: "🏅" },
  recognition: { label: "Recognition", icon: "⭐" },
  competition: { label: "Competition", icon: "🥇" },
  achievement: { label: "Achievement", icon: "🎯" },
  other: { label: "Honor", icon: "🏆" },
};

/**
 * HonorBadge Component
 * Displays a category badge
 */
export class HonorBadge extends PureComponent<IHonorBadgeProps> {
  /**
   * Get badge class names
   */
  private getBadgeClassNames(): string {
    const { category, className = "" } = this.props;
    const classes = [
      "honor-badge",
      `honor-badge--${category}`,
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get category config
   */
  private getCategoryConfig(): { label: string; icon: string } {
    return CATEGORY_CONFIG[this.props.category];
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const config = this.getCategoryConfig();

    return (
      <span className={this.getBadgeClassNames()} aria-label={`Category: ${config.label}`}>
        <span className="honor-badge__icon" aria-hidden="true">{config.icon}</span>
        <span className="honor-badge__label">{config.label}</span>
      </span>
    );
  }
}

