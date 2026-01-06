/**
 * WorkExperienceTimeline Component
 * Reusable timeline container component for work experience entries
 * 
 * Principles Applied:
 * - Single Responsibility: Manages timeline layout
 * - Open/Closed: Extensible through props
 * - DRY: Reusable across work experience section
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode, createRef, RefObject } from "react";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { IWorkExperienceItem } from "../../../models/work-experience-model";
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
  private itemRefs = new Map<string, RefObject<HTMLDivElement>>();

  constructor(props: IWorkExperienceTimelineProps) {
    super(props);
    // Initialize refs for all items
    props.items.forEach((item) => {
      this.itemRefs.set(item.key, createRef<HTMLDivElement>());
    });
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
   * Render a single work experience card
   */
  private renderCard(item: IWorkExperienceItem, index: number): ReactNode {
    const { visibleItems, durations } = this.props;
    const isVisible = visibleItems.has(item.key);
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
   * Main render method
   */
  public render(): ReactNode {
    const { items, className = "" } = this.props;

    if (!items || items.length === 0) {
      return null;
    }

    const timelineClasses = [
      "work-experience-timeline",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={timelineClasses} role="list">
        {this.renderTimelineLine()}
        {items.map((item, index) => this.renderCard(item, index))}
      </div>
    );
  }
}

