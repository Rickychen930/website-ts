/**
 * AcademicTimeline Component
 * Luxury timeline visualization for academic achievements
 * 
 * Principles Applied:
 * - Single Responsibility: Displays timeline visualization
 * - Open/Closed: Extensible through props
 * - DRY: Reusable timeline component
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import "./AcademicTimeline.css";

/**
 * AcademicTimeline Props Interface
 * Follows Interface Segregation Principle (ISP)
 */
export interface IAcademicTimelineProps {
  itemCount: number;
  currentIndex: number;
  isVisible: boolean;
  className?: string;
}

/**
 * AcademicTimeline Component
 * Displays a luxury timeline line connecting academic achievements
 */
export class AcademicTimeline extends PureComponent<IAcademicTimelineProps> {
  /**
   * Render timeline line
   */
  private renderTimelineLine(): ReactNode {
    const { itemCount, isVisible } = this.props;

    if (itemCount <= 1) {
      return null;
    }

    return (
      <div
        className={`academic-timeline-line ${isVisible ? "academic-timeline-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="academic-timeline-line-progress"></div>
      </div>
    );
  }

  /**
   * Render timeline connector dots
   */
  private renderConnectorDots(): ReactNode {
    const { itemCount, currentIndex, isVisible } = this.props;

    if (itemCount <= 1) {
      return null;
    }

    const dots: ReactNode[] = [];
    for (let i = 0; i < itemCount; i++) {
      const isActive = i <= currentIndex;
      const isCurrent = i === currentIndex;

      dots.push(
        <div
          key={i}
          className={`academic-timeline-dot ${
            isActive ? "academic-timeline-dot-active" : ""
          } ${isCurrent ? "academic-timeline-dot-current" : ""} ${
            isVisible ? "academic-timeline-dot-visible" : ""
          }`}
          style={{
            animationDelay: `${i * 100}ms`,
            transitionDelay: `${i * 100}ms`,
          }}
          aria-hidden="true"
        />
      );
    }

    return <div className="academic-timeline-dots">{dots}</div>;
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { className = "" } = this.props;

    const timelineClasses = [
      "academic-timeline",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={timelineClasses} aria-hidden="true">
        {this.renderTimelineLine()}
        {this.renderConnectorDots()}
      </div>
    );
  }
}

