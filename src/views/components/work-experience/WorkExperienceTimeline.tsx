/**
 * WorkExperienceTimeline Component
 * Reusable timeline container component for work experience entries with Carousel support
 *
 * Principles Applied:
 * - Single Responsibility: Manages timeline layout
 * - Open/Closed: Extensible through props
 * - DRY: Reusable across work experience section
 * - KISS: Simple, focused component
 * - OOP: Uses reusable Carousel component
 */

import React, { PureComponent, ReactNode, createRef, RefObject } from "react";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { IWorkExperienceItem } from "../../../models/work-experience-model";
import { Carousel, ICarouselItem } from "../ui/carousel";
import {
  ResponsiveStateManager,
  isMobileOrTablet,
} from "../../../utils/responsive-utils";
import "./WorkExperienceTimeline.css";

/**
 * WorkExperienceTimeline Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IWorkExperienceTimelineProps {
  items: IWorkExperienceItem[];
  visibleItems: Set<string>;
  durations?: Map<string, string>;
  className?: string;
}

/**
 * WorkExperienceTimeline Component
 * Displays work experience items in a luxury timeline layout
 */
export class WorkExperienceTimeline extends PureComponent<IWorkExperienceTimelineProps> {
  private itemRefs = new Map<string, RefObject<HTMLDivElement | null>>();
  private responsiveManager = new ResponsiveStateManager();
  private isMobileState: boolean = false;

  constructor(props: IWorkExperienceTimelineProps) {
    super(props);
    // Initialize refs for all items
    props.items.forEach((item) => {
      this.itemRefs.set(item.key, createRef<HTMLDivElement>());
    });
  }

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
   * Update refs when items change
   */
  componentDidUpdate(prevProps: IWorkExperienceTimelineProps): void {
    if (prevProps.items !== this.props.items) {
      this.itemRefs.clear();
      this.props.items.forEach((item) => {
        this.itemRefs.set(item.key, createRef<HTMLDivElement>());
      });
    }
  }

  /**
   * Render timeline line
   */
  private renderTimelineLine(): ReactNode {
    return (
      <div className="work-experience-timeline-line" aria-hidden="true">
        <div className="work-experience-timeline-line-gradient"></div>
      </div>
    );
  }

  /**
   * Convert items to carousel items
   * Follows DRY principle
   */
  private convertToCarouselItems(): ICarouselItem[] {
    const { items, visibleItems, durations } = this.props;

    return items.map((item, index) => {
      const isVisible = visibleItems.size === 0 || visibleItems.has(item.key);
      const duration = durations?.get(item.key);

      return {
        key: item.key,
        content: (
          <div
            ref={this.itemRefs.get(item.key)}
            data-key={item.key}
            className="work-experience-timeline-item"
          >
            <WorkExperienceCard
              item={item}
              index={index}
              isVisible={isVisible}
              duration={duration}
            />
          </div>
        ),
      };
    });
  }

  /**
   * Render a single work experience card
   */
  private renderCard(item: IWorkExperienceItem, index: number): ReactNode {
    const { visibleItems, durations } = this.props;
    // Default to visible if visibleItems is empty or item is in the Set
    // This ensures cards are shown by default instead of hidden
    const isVisible = visibleItems.size === 0 || visibleItems.has(item.key);
    const duration = durations?.get(item.key);

    return (
      <div
        key={item.key}
        ref={this.itemRefs.get(item.key)}
        data-key={item.key}
        className="work-experience-timeline-item"
      >
        <WorkExperienceCard
          item={item}
          index={index}
          isVisible={isVisible}
          duration={duration}
        />
      </div>
    );
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
        className={`work-experience-carousel ${className}`.trim()}
        itemWidth={380}
        gap={24}
        showArrows={true}
        showIndicators={true}
        scrollSnap={true}
        ariaLabel="Work experience carousel"
        emptyMessage="No work experience available"
        emptyIcon="💼"
      />
    );
  }

  /**
   * Render timeline layout (desktop)
   */
  private renderTimeline(): ReactNode {
    const { items, className = "" } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    const timelineClasses = ["work-experience-timeline", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={timelineClasses} role="list">
        {this.renderTimelineLine()}
        {items.map((item, index) => this.renderCard(item, index))}
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { items } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    // Use carousel for mobile/tablet, timeline for desktop
    if (this.isMobileState) {
      return this.renderCarousel();
    }

    return this.renderTimeline();
  }
}
