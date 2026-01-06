/**
 * EmptyState Component - Reusable Empty State Component
 *
 * Features:
 * - Consistent empty state across all sections
 * - Customizable icon, title, and message
 * - Accessibility support (ARIA labels)
 * - Professional, clean design
 *
 * Principles Applied:
 * - DRY: Reusable component to avoid duplication
 * - Single Responsibility: Only handles empty state display
 * - Open/Closed: Extensible via props
 */

import React, { PureComponent, ReactNode } from "react";
import "../../../assets/css/ui-components.css";

/**
 * EmptyState Props Interface
 */
interface EmptyStateProps {
  icon?: string | ReactNode;
  title?: string;
  message?: string;
  className?: string;
  variant?: "default" | "minimal" | "detailed";
  action?: ReactNode; // Optional action button/link
}

/**
 * EmptyState Component
 * Reusable empty state component for consistent UI
 */
export class EmptyState extends PureComponent<EmptyStateProps> {
  static defaultProps: Partial<EmptyStateProps> = {
    icon: "📭",
    title: "No Data Available",
    message: "Content will appear here once available.",
    className: "",
    variant: "default",
    action: undefined,
  };

  /**
   * Render icon
   */
  private renderIcon(): ReactNode {
    const { icon } = this.props;

    if (!icon) return null;

    if (typeof icon === "string") {
      return (
        <div
          className="empty-state-icon"
          aria-hidden="true"
          role="img"
          aria-label="Empty state icon"
        >
          {icon}
        </div>
      );
    }

    return <div className="empty-state-icon">{icon}</div>;
  }

  /**
   * Render title
   */
  private renderTitle(): ReactNode {
    const { title } = this.props;

    if (!title) return null;

    return (
      <h3 className="empty-state-title" id="empty-state-title">
        {title}
      </h3>
    );
  }

  /**
   * Render message
   */
  private renderMessage(): ReactNode {
    const { message } = this.props;

    if (!message) return null;

    return (
      <p className="empty-state-message" id="empty-state-message">
        {message}
      </p>
    );
  }

  /**
   * Render action (optional button/link)
   */
  private renderAction(): ReactNode {
    const { action } = this.props;
    return action ? <div className="empty-state-action">{action}</div> : null;
  }

  /**
   * Get container class names
   */
  private getClassNames(): string {
    const { className = "", variant = "default" } = this.props;
    const classes = ["empty-state", `empty-state-${variant}`, className];

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render component
   */
  public render(): ReactNode {
    const containerClass = this.getClassNames();

    return (
      <div
        className={containerClass}
        role="status"
        aria-live="polite"
        aria-labelledby="empty-state-title"
        aria-describedby="empty-state-message"
      >
        {this.renderIcon()}
        {this.renderTitle()}
        {this.renderMessage()}
        {this.renderAction()}
      </div>
    );
  }
}

export default EmptyState;
