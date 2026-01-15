/**
 * TestimonialsGrid Component
 * Horizontal scroll layout for all devices
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles horizontal scroll layout
 * - DRY: Reusable scroll component
 * - KISS: Simple, focused component
 * - Component-Based: Composed of TestimonialCard components
 */

import React, { PureComponent, ReactNode } from "react";
import { ITestimonial } from "../../../controllers/testimonials-controller";
import { TestimonialCard } from "./TestimonialCard";
import "./TestimonialsGrid.css";

/**
 * TestimonialsGrid Props
 */
export interface TestimonialsGridProps {
  testimonials: ITestimonial[];
  className?: string;
}

/**
 * TestimonialsGrid Component
 * Displays testimonials in a horizontal scroll layout for all devices
 */
export class TestimonialsGrid extends PureComponent<TestimonialsGridProps> {
  /**
   * Render testimonial cards in horizontal scroll layout
   */
  private renderTestimonialCards(): ReactNode {
    const { testimonials } = this.props;

    if (!testimonials || testimonials.length === 0) {
      return null;
    }

    return testimonials.map((testimonial, index) => (
      <div
        key={testimonial.key || `testimonial-${index}`}
        role="listitem"
        className="testimonial-card-wrapper"
      >
        <TestimonialCard testimonial={testimonial} index={index} />
      </div>
    ));
  }

  public render(): ReactNode {
    const { testimonials, className = "" } = this.props;

    if (!testimonials || testimonials.length === 0) {
      return null;
    }

    return (
      <div className="testimonials-grid-container">
        <article
          className={`testimonials-grid ${className}`.trim()}
          role="list"
          aria-label="Testimonials and recommendations"
        >
          {this.renderTestimonialCards()}
        </article>
      </div>
    );
  }
}

export default TestimonialsGrid;
