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
  testimonials?: ITestimonial[];
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
    if (prevProps.testimonials !== this.props.testimonials) {
      this.processData();
    }
  }

  /**
   * Process testimonials data
   */
  private processData(): void {
    const testimonials = this.controller.getTestimonials(
      this.props.testimonials,
    );
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

    if (testimonials.length === 0 && !this.props.testimonials) {
      // Don't render if no testimonials and no props
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
