/**
 * TestimonialsSection - View Layer (MVC Pattern)
 * Professional, Clean, Luxury, Responsive Testimonials & Recommendations Section
 *
 * Architecture:
 * - MVC: Separated Controller, Model, and View
 * - OOP: Class-based component with encapsulation
 * - Component-Based: Uses reusable sub-components
 *
 * Principles Applied:
 * - MVC: Separated Controller, Model, and View
 * - OOP: Class-based component with encapsulation
 * - SOLID:
 *   - SRP: Each method has single responsibility
 *   - OCP: Extensible through composition
 *   - LSP: Proper inheritance/implementation
 *   - ISP: Interfaces are segregated
 *   - DIP: Depends on abstractions (controller, components)
 * - DRY: Reuses components and utilities
 * - KISS: Simple, clear structure
 */

import React, { Component, ReactNode } from "react";
import {
  TestimonialsController,
  ITestimonial,
} from "../../../controllers/testimonials-controller";
import { SectionTitles } from "../../../constants";
import "../../../assets/css/testimonials-section.css";

/**
 * Testimonials Section Props Interface
 * Improved type safety: Accept ITestimonial array or undefined/null
 */
type TestimonialsProps = {
  data?: ITestimonial[] | null | undefined;
};

/**
 * Testimonials Section State Interface
 */
type TestimonialsState = {
  testimonials: ITestimonial[];
  isVisible: boolean;
};

/**
 * Testimonials Section Component
 */
class TestimonialsSection extends Component<
  TestimonialsProps,
  TestimonialsState
> {
  private readonly controller: TestimonialsController;

  constructor(props: TestimonialsProps) {
    super(props);
    this.state = {
      testimonials: [],
      isVisible: false,
    };
    this.controller = new TestimonialsController();
  }

  componentDidMount(): void {
    this.processData();
    this.setState({ isVisible: true });
  }

  componentDidUpdate(prevProps: TestimonialsProps): void {
    // Re-process data if props changed
    if (prevProps.data !== this.props.data) {
      this.processData();
    }
  }

  /**
   * Process testimonials data
   * Handles data prop like other sections (consistent API)
   */
  private processData(): void {
    const { data } = this.props;

    // Handle different data types
    let testimonialsData: ITestimonial[] | undefined;

    if (data === null || data === undefined) {
      // No data provided - use defaults
      testimonialsData = undefined;
    } else if (Array.isArray(data)) {
      // Data is an array - validate and use if valid
      if (data.length > 0) {
        // Validate that array contains ITestimonial objects
        const isValid = data.every(
          (item) =>
            item &&
            typeof item === "object" &&
            "name" in item &&
            "text" in item,
        );

        if (isValid) {
          testimonialsData = data as ITestimonial[];
        } else {
          // Invalid array - use defaults
          testimonialsData = undefined;
        }
      } else {
        // Empty array - use defaults
        testimonialsData = undefined;
      }
    } else {
      // Data is not an array - use defaults
      testimonialsData = undefined;
    }

    // Get testimonials from controller (will use defaults if testimonialsData is undefined)
    const testimonials = this.controller.getTestimonials(testimonialsData);
    this.setState({ testimonials });
  }

  /**
   * Render star rating with professional styling
   */
  private renderRating(rating?: number): ReactNode {
    if (!rating || rating < 1 || rating > 5) return null;

    return (
      <div
        className="testimonial-rating"
        role="img"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`testimonial-star ${i < rating ? "filled" : "empty"}`}
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
        <span className="testimonial-rating-text" aria-hidden="true">
          {rating}.0
        </span>
      </div>
    );
  }

  /**
   * Render quote icon
   */
  private renderQuoteIcon(): ReactNode {
    return (
      <div className="testimonial-quote-icon" aria-hidden="true">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 17H9L11 13V7H5V13H8M13 17H16L18 13V7H12V13H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  /**
   * Render single testimonial card with professional design
   */
  private renderTestimonial(
    testimonial: ITestimonial,
    index: number,
  ): ReactNode {
    return (
      <article
        className="testimonial-card"
        aria-labelledby={`testimonial-${index}-name`}
      >
        {this.renderQuoteIcon()}
        <div className="testimonial-content">
          {this.renderRating(testimonial.rating)}
          <blockquote className="testimonial-text">
            <p>{testimonial.text}</p>
          </blockquote>
        </div>
        <footer className="testimonial-author">
          <div className="testimonial-author-main">
            {testimonial.image ? (
              <div className="testimonial-avatar-wrapper">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="testimonial-avatar"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="testimonial-avatar-placeholder">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
            )}
            <div className="testimonial-author-info">
              <div
                id={`testimonial-${index}-name`}
                className="testimonial-author-name"
              >
                {testimonial.name}
              </div>
              <div className="testimonial-author-role">
                {testimonial.role}
                {testimonial.company && (
                  <span className="testimonial-company">
                    {" "}
                    · {testimonial.company}
                  </span>
                )}
              </div>
              {testimonial.date && (
                <div className="testimonial-date">{testimonial.date}</div>
              )}
            </div>
          </div>
          {testimonial.link && (
            <a
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-link"
              aria-label={`View ${testimonial.name}'s profile on LinkedIn`}
              title="View profile"
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
          )}
        </footer>
      </article>
    );
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="testimonials-empty" role="status" aria-live="polite">
        <div className="testimonials-empty-icon" aria-hidden="true">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 17H9L11 13V7H5V13H8M13 17H16L18 13V7H12V13H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p>Testimonials and recommendations will appear here when available.</p>
      </div>
    );
  }

  /**
   * Render testimonials grid
   */
  private renderTestimonials(): ReactNode {
    const { testimonials } = this.state;

    if (testimonials.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div
        className="testimonials-grid"
        role="list"
        aria-label="Testimonials and recommendations"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.key || `testimonial-${index}`}
            role="listitem"
            className="testimonial-card-wrapper"
          >
            {this.renderTestimonial(testimonial, index)}
          </div>
        ))}
      </div>
    );
  }

  render(): ReactNode {
    const { isVisible } = this.state;
    const { testimonials } = this.state;

    // Always show section if there are testimonials (including defaults from controller)
    // Controller always returns default testimonials if no custom data provided
    // This section should always be visible since defaults are always available
    if (testimonials.length === 0) {
      // Edge case: Only hide if somehow no testimonials (shouldn't happen with defaults)
      return null;
    }

    return (
      <section
        id="testimonials"
        className={`testimonials-section ${isVisible ? "visible" : ""}`}
        aria-labelledby="testimonials-heading"
        aria-label="Testimonials and Recommendations"
      >
        <div className="section-container">
          <header className="section-header">
            <h2 id="testimonials-heading" className="section-title">
              {SectionTitles.TESTIMONIALS || "Testimonials & Recommendations"}
            </h2>
            <p className="section-subtitle">
              What colleagues and clients say about working with me
            </p>
          </header>
          {this.renderTestimonials()}
        </div>
      </section>
    );
  }
}

export default TestimonialsSection;
export type { ITestimonial };
