/**
 * TestimonialsGrid Component
 * Reusable parent component for displaying testimonial cards in a grid layout
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles grid layout
 * - DRY: Reusable grid component
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
 * Displays testimonials in a responsive grid layout
 */
export class TestimonialsGrid extends PureComponent<TestimonialsGridProps> {
  /**
   * Render testimonial cards
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
    const { className = "" } = this.props;

    return (
      <div
        className={`testimonials-grid ${className}`.trim()}
        role="list"
        aria-label="Testimonials and recommendations"
      >
        {this.renderTestimonialCards()}
      </div>
    );
  }
}

export default TestimonialsGrid;
