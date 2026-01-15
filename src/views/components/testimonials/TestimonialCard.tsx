/**
 * TestimonialCard Component
 * Professional testimonial card component following modern design guidelines
 *
 * Design Principles:
 * - Clean, minimal aesthetic
 * - Clear visual hierarchy
 * - Professional typography
 * - Subtle, purposeful animations
 * - Accessible and responsive
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles card display
 * - DRY: Reusable across testimonials section
 * - KISS: Simple, focused component
 * - Component-Based: Composed of smaller components
 */

import React, { PureComponent, ReactNode } from "react";
import { ITestimonial } from "../../../controllers/testimonials-controller";
import "./TestimonialCard.css";

/**
 * TestimonialCard Props
 */
export interface TestimonialCardProps {
  testimonial: ITestimonial;
  index: number;
  className?: string;
}

/**
 * TestimonialCard State
 */
interface TestimonialCardState {
  isHovered: boolean;
  isFocused: boolean;
}

/**
 * TestimonialCard Component
 * Displays a testimonial card with quote, rating, author info, and link
 */
export class TestimonialCard extends PureComponent<
  TestimonialCardProps,
  TestimonialCardState
> {
  constructor(props: TestimonialCardProps) {
    super(props);
    this.state = {
      isHovered: false,
      isFocused: false,
    };
  }

  private handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  private handleFocus = (): void => {
    this.setState({ isFocused: true });
  };

  private handleBlur = (): void => {
    this.setState({ isFocused: false });
  };

  private handleMouseLeave = (): void => {
    this.setState({ isHovered: false });
  };

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    // Escape to blur
    if (e.key === "Escape") {
      e.currentTarget.blur();
    }
  };

  /**
   * Get card class name
   */
  private getCardClass(): string {
    const { className = "" } = this.props;
    const { isHovered, isFocused } = this.state;

    const classes = ["testimonial-card", className];

    if (isHovered || isFocused) {
      classes.push("testimonial-card--active");
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render star rating
   */
  private renderRating(rating?: number): ReactNode {
    if (!rating || rating < 1 || rating > 5) return null;

    return (
      <div
        className="testimonial-card-rating"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`testimonial-card-star ${
              i < rating ? "filled" : "empty"
            }`}
            aria-hidden="true"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </span>
        ))}
        <span className="testimonial-card-rating-text" aria-hidden="true">
          {rating}.0
        </span>
      </div>
    );
  }

  /**
   * Render quote icon - simplified professional design
   */
  private renderQuoteIcon(): ReactNode {
    return (
      <div className="testimonial-card-quote-icon" aria-hidden="true">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 21C3 17.4 5.4 15 9 15C12.6 15 15 17.4 15 21M15 10C15 6.4 17.4 4 21 4M21 4C21 7.6 18.6 10 15 10M21 4V10H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  /**
   * Render author avatar
   */
  private renderAvatar(): ReactNode {
    const { testimonial } = this.props;

    if (testimonial.image) {
      return (
        <div className="testimonial-card-avatar-wrapper">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="testimonial-card-avatar"
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className="testimonial-card-avatar-placeholder">
        {testimonial.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)}
      </div>
    );
  }

  /**
   * Render LinkedIn link
   */
  private renderLink(): ReactNode {
    const { testimonial } = this.props;

    if (!testimonial.link) {
      return null;
    }

    return (
      <a
        href={testimonial.link}
        target="_blank"
        rel="noopener noreferrer"
        className="testimonial-card-link"
        aria-label={`View ${testimonial.name}'s profile on LinkedIn`}
        title="View profile"
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 9H2V21H6V9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    );
  }

  public render(): ReactNode {
    const { testimonial, index } = this.props;

    // Guard against missing testimonial
    if (!testimonial) {
      return null;
    }

    // Ensure index is non-negative
    const safeIndex = Math.max(0, index || 0);
    const testimonialKey = testimonial.key || `testimonial-${safeIndex}`;
    const testimonialName = testimonial.name || "Anonymous";

    return (
      <article
        className={this.getCardClass()}
        style={
          {
            animationDelay: `${safeIndex * 0.08}s`,
            "--index": safeIndex,
          } as React.CSSProperties
        }
        data-testimonial-key={testimonialKey}
        aria-labelledby={`testimonial-${safeIndex}-name`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        {/* Subtle Background Accent */}
        <div className="testimonial-card-background" aria-hidden="true" />

        {/* Quote Icon */}
        {this.renderQuoteIcon()}

        {/* Content */}
        <div className="testimonial-card-content">
          {this.renderRating(testimonial.rating)}
          <blockquote className="testimonial-card-text">
            <p>{testimonial.text}</p>
          </blockquote>
        </div>

        {/* Author Footer */}
        <footer className="testimonial-card-author">
          <div className="testimonial-card-author-main">
            {this.renderAvatar()}
            <div className="testimonial-card-author-info">
              <div
                id={`testimonial-${safeIndex}-name`}
                className="testimonial-card-author-name"
              >
                {testimonialName}
              </div>
              <div className="testimonial-card-author-role">
                {testimonial.role}
                {testimonial.company && (
                  <span className="testimonial-card-company">
                    {" "}
                    · {testimonial.company}
                  </span>
                )}
              </div>
              {testimonial.date && (
                <div className="testimonial-card-date">{testimonial.date}</div>
              )}
            </div>
          </div>
          {this.renderLink()}
        </footer>
      </article>
    );
  }
}

export default TestimonialCard;
