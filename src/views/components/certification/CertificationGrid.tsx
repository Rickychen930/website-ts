/**
 * Certification Grid Component
 * Reusable grid layout component for certifications with Carousel support
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - DRY (Don't Repeat Yourself)
 * - OOP: Uses reusable Carousel component
 */

import React, { PureComponent, ReactNode } from "react";
import { ICertification } from "../../../models/certification-model";
import { CertificationCard } from "./CertificationCard";
import { Carousel, ICarouselItem } from "../ui/carousel";
import {
  ResponsiveStateManager,
  isMobileOrTablet,
} from "../../../utils/responsive-utils";

/**
 * Certification Grid Props
 */
interface CertificationGridProps {
  certifications: ICertification[];
  visibleItems: Set<string>;
  onVisibilityChange: (key: string, visible: boolean) => void;
  onLinkClick?: (link: string) => void;
  className?: string;
  columns?: number;
  layout?: "grid" | "carousel";
}

/**
 * Certification Grid Component
 * PureComponent for performance optimization
 * Uses Carousel component for horizontal scrolling on mobile/tablet
 */
export class CertificationGrid extends PureComponent<CertificationGridProps> {
  private responsiveManager = new ResponsiveStateManager();
  private isMobileState: boolean = false;

  static defaultProps: Partial<CertificationGridProps> = {
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
   * Get grid class names
   */
  private getClassNames(): string {
    const { className = "", columns } = this.props;
    const classes = ["certification-grid"];

    if (columns) {
      classes.push(`certification-grid-cols-${columns}`);
    }

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get grid style
   */
  private getGridStyle(): React.CSSProperties | undefined {
    const { columns } = this.props;
    if (!columns) {
      return undefined;
    }

    return {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    };
  }

  /**
   * Convert certifications to carousel items
   * Follows DRY principle
   */
  private convertToCarouselItems(): ICarouselItem[] {
    const { certifications, visibleItems, onVisibilityChange, onLinkClick } =
      this.props;

    return certifications.map((cert, index) => {
      const isVisible = visibleItems.has(cert.key);

      return {
        key: cert.key,
        content: (
          <CertificationCard
            certification={cert}
            index={index}
            isVisible={isVisible}
            onVisibilityChange={onVisibilityChange}
            onLinkClick={onLinkClick}
          />
        ),
      };
    });
  }

  /**
   * Render certification cards (for grid layout)
   */
  private renderCertifications(): ReactNode {
    const { certifications, visibleItems, onVisibilityChange, onLinkClick } =
      this.props;

    if (certifications.length === 0) {
      return null;
    }

    return certifications.map((cert, index) => (
      <CertificationCard
        key={cert.key}
        certification={cert}
        index={index}
        isVisible={visibleItems.has(cert.key)}
        onVisibilityChange={onVisibilityChange}
        onLinkClick={onLinkClick}
      />
    ));
  }

  /**
   * Render carousel layout
   */
  private renderCarousel(): ReactNode {
    const items = this.convertToCarouselItems();

    if (items.length === 0) {
      return null;
    }

    return (
      <Carousel
        items={items}
        className={this.getClassNames()}
        itemWidth={340}
        gap={24}
        showArrows={true}
        showIndicators={true}
        scrollSnap={true}
        ariaLabel="Certifications carousel"
        emptyMessage="No certifications available"
        emptyIcon="📜"
      />
    );
  }

  /**
   * Render grid layout (desktop)
   */
  private renderGrid(): ReactNode {
    const { certifications } = this.props;

    if (certifications.length === 0) {
      return null;
    }

    return (
      <div
        className={this.getClassNames()}
        style={this.getGridStyle()}
        role="list"
        aria-label="Certifications"
      >
        {this.renderCertifications()}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { certifications, layout = "carousel" } = this.props;

    if (certifications.length === 0) {
      return null;
    }

    // Use carousel for mobile/tablet, grid for desktop
    if (layout === "carousel" || this.isMobileState) {
      return this.renderCarousel();
    }

    return this.renderGrid();
  }
}
