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
import { TestimonialsGrid } from "../../components/testimonials";
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
   * Uses parent component TestimonialsGrid for proper component hierarchy
   */
  private renderTestimonials(): ReactNode {
    const { testimonials } = this.state;

    if (testimonials.length === 0) {
      return this.renderEmptyState();
    }

    return <TestimonialsGrid testimonials={testimonials} />;
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
