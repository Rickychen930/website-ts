/**
 * Language Progress Bar Component
 * Advanced progress visualization showing proficiency level
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 */

import React, { PureComponent, ReactNode } from "react";
import { LanguageModel } from "../../../models/language-model";

/**
 * Language Progress Bar Props
 */
interface LanguageProgressBarProps {
  proficiency: string;
  isVisible: boolean;
  className?: string;
}

/**
 * Language Progress Bar State
 */
interface LanguageProgressBarState {
  progress: number;
  isAnimated: boolean;
}

/**
 * Language Progress Bar Component
 * PureComponent for performance optimization
 */
export class LanguageProgressBar extends PureComponent<
  LanguageProgressBarProps,
  LanguageProgressBarState
> {
  private animationTimeoutId: number | null = null;

  constructor(props: LanguageProgressBarProps) {
    super(props);
    this.state = {
      progress: 0,
      isAnimated: false,
    };
  }

  /**
   * Component lifecycle - Mount
   */
  componentDidMount(): void {
    if (this.props.isVisible) {
      this.animateProgress();
    }
  }

  /**
   * Component lifecycle - Update
   */
  componentDidUpdate(prevProps: LanguageProgressBarProps): void {
    if (prevProps.isVisible !== this.props.isVisible && this.props.isVisible) {
      this.animateProgress();
    }
  }

  /**
   * Component lifecycle - Unmount
   */
  componentWillUnmount(): void {
    if (this.animationTimeoutId !== null) {
      cancelAnimationFrame(this.animationTimeoutId);
      this.animationTimeoutId = null;
    }
  }

  /**
   * Animate progress bar
   */
  private animateProgress(): void {
    if (this.animationTimeoutId !== null) {
      return;
    }

    const weight = LanguageModel.getProficiencyWeight(this.props.proficiency);
    const targetProgress = (weight / 5) * 100; // Convert to percentage

    // Animate from 0 to target
    this.setState({ isAnimated: true });
    
    // Use requestAnimationFrame for smooth animation
    const startTime = Date.now();
    const duration = 1500; // 1.5 seconds

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentProgress = eased * targetProgress;

      this.setState({ progress: currentProgress });

      if (progress < 1) {
        this.animationTimeoutId = requestAnimationFrame(animate);
      } else {
        this.animationTimeoutId = null;
      }
    };

    this.animationTimeoutId = requestAnimationFrame(animate);
  }

  /**
   * Get progress color class
   */
  private getProgressColorClass(): string {
    return LanguageModel.getProficiencyColorClass(this.props.proficiency);
  }

  /**
   * Get progress percentage
   */
  private getProgressPercentage(): number {
    return Math.round(this.state.progress);
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { proficiency, isVisible, className = "" } = this.props;
    const { progress } = this.state;
    const progressClass = this.getProgressColorClass();

    if (!isVisible) {
      return null;
    }

    return (
      <div className={`language-progress-bar ${className}`.trim()}>
        <div className="language-progress-bar-track">
          <div
            className={`language-progress-bar-fill ${progressClass}`}
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={this.getProgressPercentage()}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${proficiency} proficiency: ${this.getProgressPercentage()}%`}
          >
            <div className="language-progress-bar-shine" aria-hidden="true"></div>
            <div className="language-progress-bar-glow" aria-hidden="true"></div>
          </div>
        </div>
        <div className="language-progress-bar-label">
          <span className="language-progress-bar-percentage">
            {this.getProgressPercentage()}%
          </span>
        </div>
      </div>
    );
  }
}

