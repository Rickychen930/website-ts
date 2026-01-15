/**
 * TestimonialsSection - View Layer (MVC Pattern)
 * Professional, Clean, Luxury, Responsive Testimonials & Recommendations Section
 *
 * Architecture:
 * - MVC: Strict separation of View, Controller, and Model
 * - View: Only handles UI rendering
 * - Controller: Handles all business logic (injected via DI)
 * - Component-Based: Uses reusable parent-child components
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): View only renders UI
 * - Dependency Inversion Principle (DIP): Depends on Controller abstraction
 * - Open/Closed Principle (OCP): Extensible via composition
 * - DRY: Uses reusable components (TestimonialsGrid, TestimonialCard)
 * - KISS: Simple, clear structure
 * - Component-Based: Composed of smaller, focused components
 *
 * Features:
 * - Clean separation of concerns
 * - Proper error handling
 * - Fully accessible (ARIA labels, keyboard navigation)
 * - Responsive design
 * - Professional, luxury, beautiful UI with glassmorphism
 */

import React, { Component, ReactNode } from "react";
import {
  TestimonialsController,
  ITestimonial,
} from "../../../controllers/testimonials-controller";
import { SectionTitles } from "../../../constants";
import { TestimonialsGrid } from "../../components/testimonials";
import { Card } from "../../components/common";
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
    };
    this.controller = new TestimonialsController();
  }

  componentDidMount(): void {
    this.processData();
  }

  componentDidUpdate(prevProps: TestimonialsProps): void {
    // Re-process data if props changed
    if (prevProps.data !== this.props.data) {
      this.processData();
    }
  }

  /**
   * Process testimonials data through controller
   * Centralized data processing for better maintainability
   * Handles data prop like other sections (consistent API)
   */
  private processData(): void {
    const { data } = this.props;

    // Normalize data: handle null, undefined, or invalid arrays
    let testimonialsData: ITestimonial[] | undefined;

    if (data === null || data === undefined) {
      testimonialsData = undefined;
    } else if (Array.isArray(data) && data.length > 0) {
      // Validate that array contains ITestimonial objects
      const isValid = data.every(
        (item) =>
          item && typeof item === "object" && "name" in item && "text" in item,
      );
      testimonialsData = isValid ? (data as ITestimonial[]) : undefined;
    } else {
      testimonialsData = undefined;
    }

    // Get testimonials from controller (will use defaults if testimonialsData is undefined)
    const testimonials = this.controller.getTestimonials(testimonialsData);
    this.setState({ testimonials });
  }

  /**
   * Render empty state
   * Standardized empty state display with improved accessibility
   */
  private renderEmptyState(): ReactNode {
    return (
      <div
        className="testimonials-empty"
        role="status"
        aria-live="polite"
        aria-label="No testimonials available"
      >
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
   * Delegates rendering to reusable TestimonialsGrid parent component
   * TestimonialsGrid uses TestimonialCard child components
   */
  private renderTestimonials(): ReactNode {
    const { testimonials } = this.state;

    if (testimonials.length === 0) {
      return this.renderEmptyState();
    }

    return <TestimonialsGrid testimonials={testimonials} />;
  }

  /**
   * Main render method
   * Follows Single Responsibility Principle (SRP)
   */
  public render(): ReactNode {
    const { testimonials } = this.state;

    // Edge case: Hide section if no testimonials available
    // Controller should always return defaults, but handle edge case gracefully
    if (testimonials.length === 0) {
      return null;
    }

    return (
      <Card
        id="testimonials"
        title={SectionTitles.TESTIMONIALS || "Testimonials & Recommendations"}
        ariaLabel="Testimonials and Recommendations"
      >
        <p className="testimonials-subtitle">
          What colleagues and clients say about working with me
        </p>
        {this.renderTestimonials()}
      </Card>
    );
  }
}

export default TestimonialsSection;
