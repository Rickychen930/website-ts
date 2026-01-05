import React, { ReactNode, PureComponent } from "react";
import "../../assets/css/card-component.css";

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
 * Card Component
 * 
 * Features:
 * - Luxury & Elegant Design with smooth animations
 * - Performance Optimized (PureComponent for memoization)
 * - Fully Responsive (mobile, tablet, desktop, landscape)
 * - Comprehensive Edge Case Handling
 * - Clean UI/UX with hover effects
 * - Accessibility Support (ARIA labels, semantic HTML)
 * 
 * Principles Applied:
 * - SOLID (Single Responsibility, Open/Closed, Liskov Substitution)
 * - DRY (Don't Repeat Yourself)
 * - OOP (Object-Oriented Programming)
 * - MVP (Minimum Viable Product)
 * - Keep It Simple
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
   * Generate CSS class names
   * Follows DRY principle
   */
  private getClassNames(): string {
    const { className = "", variant = "default" } = this.props;
    const classes = [
      "card",
      `card-variant-${variant}`,
      className,
    ];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render card title if provided
   * Null-safe rendering
   */
  private renderTitle(): ReactNode {
    const { title, id } = this.props;

    if (!title || title.trim() === "") {
      return null;
    }

    const titleId = id ? `${id}-title` : undefined;

    return (
      <header className="card-header">
        <h1 className="card-title" id={titleId}>
          {title}
        </h1>
      </header>
    );
  }

  /**
   * Render card body
   */
  private renderBody(): ReactNode {
    const { children, id, title } = this.props;

    // Edge case: Handle empty children
    if (!children) {
      return null;
    }

    return (
      <div 
        className="card-body" 
        role="region"
        aria-labelledby={id && title ? `${id}-title` : undefined}
      >
        {children}
      </div>
    );
  }

  /**
   * Render card footer if provided
   */
  private renderFooter(): ReactNode {
    const { footer } = this.props;

    if (!footer) {
      return null;
    }

    return (
      <footer className="card-footer" role="contentinfo">
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
      console.warn("⚠️ Card component rendered without content");
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
