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
 * Uses Carousel component for horizontal scrolling on all devices
 */
export class CertificationGrid extends PureComponent<CertificationGridProps> {
  static defaultProps: Partial<CertificationGridProps> = {
    layout: "carousel",
  };

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
   * Main render method
   */
  public render(): ReactNode {
    const { certifications } = this.props;

    if (certifications.length === 0) {
      return null;
    }

    // Always use horizontal scroll carousel for all devices
    return this.renderCarousel();
  }
}
