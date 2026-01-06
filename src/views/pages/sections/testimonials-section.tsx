/**
 * TestimonialsSection - View Layer (MVC Pattern)
 * Professional, Clean, Luxury, Responsive Testimonials Section
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
import { Card } from "../../components/common";
import {
  TestimonialsController,
  ITestimonial,
} from "../../../controllers/testimonials-controller";
import { SectionTitles } from "../../../constants";
import "../../../assets/css/testimonials-section.css";

/**
 * Testimonials Section Props Interface
 */
type TestimonialsProps = {
  data?: ITestimonial[] | unknown; // Accept data prop like other sections
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
   * Render star rating
   */
  private renderRating(rating?: number): ReactNode {
    if (!rating || rating < 1 || rating > 5) return null;

    return (
      <div
        className="testimonial-rating"
        aria-label={`${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={`testimonial-star ${i < rating ? "filled" : "empty"}`}
            aria-hidden="true"
          >
            ★
          </span>
        ))}
      </div>
    );
  }

  /**
   * Render single testimonial card
   */
  private renderTestimonial(
    testimonial: ITestimonial,
    index: number,
  ): ReactNode {
    return (
      <Card
        key={testimonial.key || `testimonial-${index}`}
        className="testimonial-card"
      >
        <div className="testimonial-content">
          {this.renderRating(testimonial.rating)}
          <p className="testimonial-text">"{testimonial.text}"</p>
        </div>
        <div className="testimonial-author">
          {testimonial.image && (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="testimonial-avatar"
              loading="lazy"
            />
          )}
          <div className="testimonial-author-info">
            <div className="testimonial-author-name">{testimonial.name}</div>
            <div className="testimonial-author-role">
              {testimonial.role}
              {testimonial.company && ` at ${testimonial.company}`}
            </div>
            {testimonial.date && (
              <div className="testimonial-date">{testimonial.date}</div>
            )}
          </div>
          {testimonial.link && (
            <a
              href={testimonial.link}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonial-link"
              aria-label={`View ${testimonial.name}'s profile`}
            >
              <span aria-hidden="true">🔗</span>
            </a>
          )}
        </div>
      </Card>
    );
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="testimonials-empty" role="status" aria-live="polite">
        <p>Testimonials will appear here when available.</p>
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
      <div className="testimonials-grid" role="list">
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.key || `testimonial-${index}`} role="listitem">
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
      >
        <div className="section-container">
          <h2 id="testimonials-heading" className="section-title">
            {SectionTitles.TESTIMONIALS || "Testimonials & Recommendations"}
          </h2>
          <p className="section-subtitle">
            What colleagues and clients say about working with me
          </p>
          {this.renderTestimonials()}
        </div>
      </section>
    );
  }
}

export default TestimonialsSection;
export type { ITestimonial };
