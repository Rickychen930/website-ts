/**
 * SoftSkillGrid Component
 *
 * Grid container for soft skill cards with Carousel support
 * Follows Single Responsibility Principle (SRP)
 *
 * Features:
 * - Responsive grid layout
 * - Horizontal scroll carousel on mobile/tablet
 * - Smooth animations
 * - Accessibility support
 */
import React, { PureComponent, ReactNode } from "react";
import { SoftSkillItem } from "../../../models/soft-skills-model";
import { SoftSkillCard } from "./SoftSkillCard";
import { Carousel, ICarouselItem } from "../ui/carousel";
import "./SoftSkillGrid.css";

export interface ISoftSkillGridProps {
  readonly skills: readonly SoftSkillItem[];
  readonly visibleItems?: Set<string>;
  readonly onItemIntersect?: (key: string) => void;
}

/**
 * SoftSkillGrid Component
 * PureComponent for performance optimization
 * Uses Carousel component for horizontal scrolling on all devices
 */
export class SoftSkillGrid extends PureComponent<ISoftSkillGridProps> {
  /**
   * Convert skills to carousel items
   * Follows DRY principle
   */
  private convertToCarouselItems(): ICarouselItem[] {
    const { skills, visibleItems = new Set(), onItemIntersect } = this.props;

    return skills.map((skill, index) => ({
      key: skill.key,
      content: (
        <SoftSkillCard
          skill={skill}
          index={index}
          isVisible={visibleItems.has(skill.key)}
          onIntersect={onItemIntersect}
        />
      ),
    }));
  }

  /**
   * Render carousel layout
   */
  private renderCarousel(): ReactNode {
    const items = this.convertToCarouselItems();

    if (items.length === 0) {
      return this.renderEmptyState();
    }

    return (
      <div className="soft-skills-grid-container">
        <Carousel
          items={items}
          className="soft-skills-carousel"
          itemWidth={320}
          gap={24}
          showArrows={true}
          showIndicators={true}
          scrollSnap={true}
          ariaLabel="Soft skills carousel"
          emptyMessage="No soft skills available"
          emptyIcon="💼"
        />
      </div>
    );
  }

  public render(): ReactNode {
    const { skills } = this.props;

    if (!skills || skills.length === 0) {
      return this.renderEmptyState();
    }

    // Always use horizontal scroll carousel for all devices
    return this.renderCarousel();
  }

  /**
   * Render empty state
   */
  private renderEmptyState(): ReactNode {
    return (
      <div className="soft-skills-empty" role="status" aria-live="polite">
        <div className="soft-skills-empty-icon" aria-hidden="true">
          💼
        </div>
        <p className="soft-skills-empty-text">
          No soft skills available at the moment.
        </p>
      </div>
    );
  }
}
