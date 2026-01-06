/**
 * Card Component - Refactored with New CSS Architecture
 * Professional, Code-Based, OOP, SOLID, DRY, KISS
 *
 * This is an example of how to refactor existing Card component to use the new CSS architecture
 *
 * Architecture:
 * - Uses new CSS component classes (card, card--elevated, etc.)
 * - Uses CSS helpers for class name building
 * - Follows BEM naming convention
 * - Type-safe with TypeScript
 *
 * Usage:
 * import Card from '@/views/components/common/card-refactored';
 *
 * <Card variant="elevated" title="Title">Content</Card>
 */

import React, { ReactNode, PureComponent } from "react";
import { cardClass, cn, bemClass } from "../../../utils/css-helpers";

/**
 * Card Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
type CardProps = {
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  id?: string;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "minimal";
  ariaLabel?: string;
};

/**
 * Card Component - Refactored
 * Uses new CSS architecture with utility classes and helpers
 *
 * Features:
 * - Uses CSS helpers for class names
 * - Uses CSS variables for styling
 * - Follows BEM naming convention
 * - Type-safe with TypeScript
 * - Performance Optimized (PureComponent)
 * - Fully Responsive
 * - Accessibility Support
 *
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - KISS (Keep It Simple, Stupid)
 */
class Card extends PureComponent<CardProps> {
  static defaultProps: Partial<CardProps> = {
    title: undefined,
    footer: undefined,
    id: undefined,
    className: "",
    variant: "default",
    ariaLabel: undefined,
  };

  /**
   * Generate CSS class names using CSS helpers
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { className = "", variant = "default" } = this.props;

    // Use CSS helper for card classes
    return cn(cardClass(variant), className);
  }

  /**
   * Render card title if provided
   * Uses BEM naming convention
   */
  private renderTitle(): ReactNode {
    const { title, id } = this.props;

    if (!title || title.trim() === "") {
      return null;
    }

    const titleId = id ? `${id}-title` : undefined;

    return (
      <header className={bemClass("card", "header")}>
        <h1 className={bemClass("card", "title")} id={titleId}>
          {title}
        </h1>
      </header>
    );
  }

  /**
   * Render card body
   * Uses BEM naming convention
   */
  private renderBody(): ReactNode {
    const { children, id, title } = this.props;

    // Edge case: Handle empty children
    if (!children) {
      return null;
    }

    return (
      <div
        className={bemClass("card", "body")}
        role="region"
        aria-labelledby={id && title ? `${id}-title` : undefined}
      >
        {children}
      </div>
    );
  }

  /**
   * Render card footer if provided
   * Uses BEM naming convention
   */
  private renderFooter(): ReactNode {
    const { footer } = this.props;

    if (!footer) {
      return null;
    }

    return (
      <footer className={bemClass("card", "footer")} role="contentinfo">
        {footer}
      </footer>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { id, ariaLabel } = this.props;

    // Edge case: Ensure we always have content
    if (!this.props.children && !this.props.title) {
      if (process.env.NODE_ENV === "development") {
        console.warn("Card component rendered without content");
      }
      return null;
    }

    return (
      <article
        id={id}
        className={this.getClassNames()}
        aria-label={ariaLabel || this.props.title || "Card content"}
      >
        {this.renderTitle()}
        {this.renderBody()}
        {this.renderFooter()}
      </article>
    );
  }
}

export default Card;
