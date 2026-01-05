/**
 * Language Card Component
 * Reusable card component for displaying individual languages
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode, RefObject, createRef } from "react";
import { ILanguage } from "../../../models/language-model";
import { LanguageIcon } from "./LanguageIcon";
import { LanguageBadge } from "./LanguageBadge";
import { LanguageProgressBar } from "./LanguageProgressBar";

/**
 * Language Card Props
 */
interface LanguageCardProps {
  language: ILanguage;
  index: number;
  isVisible: boolean;
  onVisibilityChange: (key: string, visible: boolean) => void;
  proficiencyClass?: string;
  className?: string;
}

/**
 * Language Card State
 */
interface LanguageCardState {
  isHovered: boolean;
}

/**
 * Language Card Component
 * PureComponent for performance optimization
 */
export class LanguageCard extends PureComponent<
  LanguageCardProps,
  LanguageCardState
> {
  private readonly cardRef: RefObject<HTMLDivElement>;
  private readonly ANIMATION_DELAY_BASE = 100;
  private readonly INTERSECTION_THRESHOLD = 0.1;
  private observer: IntersectionObserver | null = null;

  constructor(props: LanguageCardProps) {
    super(props);
    this.cardRef = createRef<HTMLDivElement>();
    this.state = {
      isHovered: false,
    };
  }

  /**
   * Component lifecycle - Mount
   */
  componentDidMount(): void {
    this.setupIntersectionObserver();
  }

  /**
   * Component lifecycle - Unmount
   */
  componentWillUnmount(): void {
    this.cleanupIntersectionObserver();
  }

  /**
   * Setup Intersection Observer for performance optimization
   */
  private setupIntersectionObserver = (): void => {
    if (!this.cardRef.current || typeof IntersectionObserver === "undefined") {
      // Fallback: mark as visible if IntersectionObserver not supported
      this.props.onVisibilityChange(this.props.language.key, true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.props.onVisibilityChange(
            this.props.language.key,
            entry.isIntersecting
          );
        });
      },
      {
        threshold: this.INTERSECTION_THRESHOLD,
        rootMargin: "50px",
      }
    );

    if (this.cardRef.current) {
      this.observer.observe(this.cardRef.current);
    }
  };

  /**
   * Cleanup Intersection Observer
   */
  private cleanupIntersectionObserver = (): void => {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  };

  /**
   * Handle mouse enter
   */
  private handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  /**
   * Handle mouse leave
   */
  private handleMouseLeave = (): void => {
    this.setState({ isHovered: false });
  };

  /**
   * Get animation delay
   */
  private getAnimationDelay(): string {
    return `${this.props.index * this.ANIMATION_DELAY_BASE}ms`;
  }

  /**
   * Get card class names
   */
  private getCardClassNames(): string {
    const { isVisible, className = "" } = this.props;
    const { isHovered } = this.state;
    const classes = ["language-card"];

    if (isVisible) {
      classes.push("language-card-visible");
    }

    if (isHovered) {
      classes.push("language-card-hovered");
    }

    if (className) {
      classes.push(className);
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render icon
   */
  private renderIcon(): ReactNode {
    const { language } = this.props;
    return (
      <LanguageIcon
        icon={language.icon}
        size="large"
        ariaLabel={`${language.name} icon`}
      />
    );
  }

  /**
   * Render title
   */
  private renderTitle(): ReactNode {
    const { language } = this.props;
    return (
      <h3 className="language-card-title">{language.name}</h3>
    );
  }

  /**
   * Render proficiency badge
   */
  private renderProficiency(): ReactNode {
    const { language, proficiencyClass, isVisible } = this.props;
    if (!language.proficiency) {
      return null;
    }

    return (
      <div className="language-card-proficiency">
        <LanguageBadge
          proficiency={language.proficiency}
          proficiencyClass={proficiencyClass}
          variant="gradient"
          size="medium"
        />
        <LanguageProgressBar
          proficiency={language.proficiency}
          isVisible={isVisible}
        />
      </div>
    );
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { language } = this.props;

    return (
      <div
        ref={this.cardRef}
        className={this.getCardClassNames()}
        style={{ animationDelay: this.getAnimationDelay() }}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        role="article"
        aria-label={`Language: ${language.name} - ${language.proficiency}`}
        data-language-key={language.key}
      >
        <div className="language-card-inner">
          <div className="language-card-icon-wrapper">
            {this.renderIcon()}
          </div>
          <div className="language-card-content">
            {this.renderTitle()}
            {this.renderProficiency()}
          </div>
        </div>
        <div className="language-card-shine" aria-hidden="true"></div>
        <div className="language-card-gradient" aria-hidden="true"></div>
        <div className="language-card-border-glow" aria-hidden="true"></div>
        <div className="language-card-particles" aria-hidden="true">
          <div className="language-card-particle"></div>
          <div className="language-card-particle"></div>
          <div className="language-card-particle"></div>
          <div className="language-card-particle"></div>
        </div>
        <div className="language-card-grid-overlay" aria-hidden="true"></div>
      </div>
    );
  }
}

