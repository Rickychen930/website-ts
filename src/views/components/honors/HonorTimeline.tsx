/**
 * HonorTimeline Component - Timeline View Component
 * Displays honors in a timeline format
 *
 * Principles Applied:
 * - SRP: Single responsibility - displays timeline
 * - OCP: Open for extension via props
 * - DRY: Reusable component
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import { IHonorItem, HonorCategory } from "../../../models/honors-model";
import { HonorCard, IHonorCardProps } from "./HonorCard";
import "./HonorTimeline.css";

/**
 * HonorTimeline Props Interface
 */
export interface IHonorTimelineProps {
  honors: IHonorItem[];
  visibleItems: Set<string>;
  getCategory: (item: IHonorItem) => HonorCategory;
  onCardClick?: (honor: IHonorItem) => void;
  className?: string;
}

/**
 * HonorTimeline Component
 * Displays honors in a timeline layout
 */
export class HonorTimeline extends PureComponent<IHonorTimelineProps> {
  /**
   * Render timeline item
   */
  private renderTimelineItem(honor: IHonorItem, index: number): ReactNode {
    const { visibleItems, getCategory, onCardClick } = this.props;
    const isVisible = visibleItems.has(honor.key);
    const category = getCategory(honor);

    return (
      <div key={honor.key} className="honor-timeline__item">
        <div className="honor-timeline__line"></div>
        <div className="honor-timeline__dot"></div>
        <div className="honor-timeline__card-wrapper">
          <HonorCard
            honor={honor}
            index={index}
            isVisible={isVisible}
            category={category}
            onCardClick={onCardClick}
          />
        </div>
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { honors, className = "" } = this.props;

    if (!honors || honors.length === 0) {
      return null;
    }

    return (
      <div
        className={`honor-timeline ${className}`}
        role="list"
        aria-label="Honors timeline"
      >
        {honors.map((honor, index) => this.renderTimelineItem(honor, index))}
      </div>
    );
  }
}
