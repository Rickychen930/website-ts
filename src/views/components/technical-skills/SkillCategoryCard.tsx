/**
 * Skill Category Card Component
 * Reusable component for displaying skill categories
 * Follows Single Responsibility Principle (SRP)
 * Follows DRY principle - Reusable across the application
 */

import React, { PureComponent, ReactNode } from "react";
import { SkillBadge } from "./SkillBadge";
import "./SkillCategoryCard.css";

/**
 * Skill Item Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ISkillItem {
  name: string;
  icon: string;
}

/**
 * Skill Category Card Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface ISkillCategoryCardProps {
  category: string;
  categoryIcon: string;
  items: ISkillItem[];
  index?: number;
  className?: string;
}

/**
 * Skill Category Card Component
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
export class SkillCategoryCard extends PureComponent<ISkillCategoryCardProps> {
  static defaultProps: Partial<ISkillCategoryCardProps> = {
    index: 0,
    className: "",
  };

  /**
   * Generate CSS class names
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { className = "" } = this.props;
    const classes = ["skill-category-card", className];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render category header
   */
  private renderHeader(): ReactNode {
    const { category, categoryIcon, index = 0 } = this.props;

    return (
      <header className="skill-category-card__header">
        <div className="skill-category-card__icon-wrapper">
          <span className="skill-category-card__category-icon" aria-hidden="true">
            {categoryIcon}
          </span>
        </div>
        <h3
          className="skill-category-card__title"
          id={`skill-category-${index}`}
        >
          {category}
        </h3>
        <div className="skill-category-card__underline" aria-hidden="true"></div>
      </header>
    );
  }

  /**
   * Render skill badges
   */
  private renderSkills(): ReactNode {
    const { items } = this.props;

    if (!items || items.length === 0) {
      return (
        <div className="skill-category-card__empty" role="status">
          No skills in this category
        </div>
      );
    }

    return (
      <div className="skill-category-card__skills" role="list" aria-label={`Skills in ${this.props.category}`}>
        {items.map((item, itemIndex) => (
          <div key={`${item.name}-${itemIndex}`} role="listitem">
            <SkillBadge
              name={item.name}
              icon={item.icon}
              index={itemIndex}
              variant="default"
            />
          </div>
        ))}
      </div>
    );
  }

  /**
   * Render skill count badge
   */
  private renderCountBadge(): ReactNode {
    const { items } = this.props;
    const count = items?.length || 0;

    if (count === 0) {
      return null;
    }

    return (
      <div className="skill-category-card__count" aria-label={`${count} skills`}>
        {count}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { index = 0 } = this.props;
    const style = { animationDelay: `${index * 100}ms` };

    return (
      <article
        className={this.getClassNames()}
        style={style}
        aria-labelledby={`skill-category-${index}`}
      >
        {this.renderCountBadge()}
        {this.renderHeader()}
        {this.renderSkills()}
      </article>
    );
  }
}

export default SkillCategoryCard;

