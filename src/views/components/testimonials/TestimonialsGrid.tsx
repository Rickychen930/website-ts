/**
 * TestimonialsGrid Component
 * Reusable parent component for displaying testimonial cards with Carousel support
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles grid layout
 * - DRY: Reusable grid component
 * - KISS: Simple, focused component
 * - Component-Based: Composed of TestimonialCard components
 * - OOP: Uses reusable Carousel component
 */

import React, { PureComponent, ReactNode } from "react";
import { ITestimonial } from "../../../controllers/testimonials-controller";
import { TestimonialCard } from "./TestimonialCard";
import { Carousel, ICarouselItem } from "../ui/carousel";
import {
  ResponsiveStateManager,
  isMobileOrTablet,
} from "../../../utils/responsive-utils";
import "./TestimonialsGrid.css";

/**
 * TestimonialsGrid Props
 */
export interface TestimonialsGridProps {
  testimonials: ITestimonial[];
  className?: string;
  layout?: "grid" | "carousel";
}

/**
 * TestimonialsGrid Component
 * Displays testimonials in a responsive grid layout with Carousel support
 */
export class TestimonialsGrid extends PureComponent<TestimonialsGridProps> {
  private responsiveManager = new ResponsiveStateManager();
  private isMobileState: boolean = false;

  static defaultProps: Partial<TestimonialsGridProps> = {
    layout: "carousel",
  };

  /**
   * Component Did Mount
   * Initialize responsive state
   */
  componentDidMount(): void {
    this.isMobileState = isMobileOrTablet();
    this.responsiveManager.initialize((isMobile) => {
      this.isMobileState = isMobile;
      this.forceUpdate();
    });
  }

  /**
   * Component Will Unmount
   * Cleanup responsive listener
   */
  componentWillUnmount(): void {
    this.responsiveManager.cleanup();
  }

  /**
   * Convert testimonials to carousel items
   * Follows DRY principle
   */
  private convertToCarouselItems(): ICarouselItem[] {
    const { testimonials } = this.props;

    return testimonials.map((testimonial, index) => ({
      key: testimonial.key || `testimonial-${index}`,
      content: (
        <div role="listitem" className="testimonial-card-wrapper">
          <TestimonialCard testimonial={testimonial} index={index} />
        </div>
      ),
    }));
  }

  /**
   * Render testimonial cards (for grid layout)
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

  /**
   * Render carousel layout
   */
  private renderCarousel(): ReactNode {
    const { className = "" } = this.props;
    const items = this.convertToCarouselItems();

    if (items.length === 0) {
      return null;
    }

    return (
      <Carousel
        items={items}
        className={`testimonials-carousel ${className}`.trim()}
        itemWidth={380}
        gap={24}
        showArrows={true}
        showIndicators={true}
        scrollSnap={true}
        ariaLabel="Testimonials and recommendations carousel"
        emptyMessage="No testimonials available"
        emptyIcon="💬"
      />
    );
  }

  /**
   * Render grid layout (desktop)
   */
  private renderGrid(): ReactNode {
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

  public render(): ReactNode {
    const { testimonials, layout = "carousel" } = this.props;

    if (!testimonials || testimonials.length === 0) {
      return null;
    }

    // Use carousel for mobile/tablet, grid for desktop
    if (layout === "carousel" || this.isMobileState) {
      return this.renderCarousel();
    }

    return this.renderGrid();
  }
}

export default TestimonialsGrid;
