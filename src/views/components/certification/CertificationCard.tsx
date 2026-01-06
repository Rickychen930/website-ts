/**
 * Certification Card Component
 * Reusable card component for displaying individual certifications
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP)
 * - Open/Closed Principle (OCP)
 * - DRY (Don't Repeat Yourself)
 * - KISS (Keep It Simple, Stupid)
 */

import React, { PureComponent, ReactNode, RefObject, createRef } from "react";
import { ICertification } from "../../../models/certification-model";
import { CertificationIcon } from "./CertificationIcon";
import { CertificationBadge } from "./CertificationBadge";

/**
 * Certification Card Props
 */
interface CertificationCardProps {
  certification: ICertification;
  index: number;
  isVisible: boolean;
  onVisibilityChange: (key: string, visible: boolean) => void;
  onLinkClick?: (link: string) => void;
  className?: string;
}

/**
 * Certification Card State
 */
interface CertificationCardState {
  isHovered: boolean;
}

/**
 * Certification Card Component
 * PureComponent for performance optimization
 */
export class CertificationCard extends PureComponent<
  CertificationCardProps,
  CertificationCardState
> {
  private readonly cardRef: RefObject<HTMLDivElement | null>;
  private readonly ANIMATION_DELAY_BASE = 100;
  private readonly INTERSECTION_THRESHOLD = 0.1;
  private observer: IntersectionObserver | null = null;

  constructor(props: CertificationCardProps) {
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
      this.props.onVisibilityChange(this.props.certification.key, true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          this.props.onVisibilityChange(
            this.props.certification.key,
            entry.isIntersecting,
          );
        });
      },
      {
        threshold: this.INTERSECTION_THRESHOLD,
        rootMargin: "50px",
      },
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
   * Handle card click
   */
  private handleCardClick = (): void => {
    const { certification, onLinkClick } = this.props;
    if (certification.link && onLinkClick) {
      onLinkClick(certification.link);
    }
  };

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.handleCardClick();
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
    const { certification, isVisible, className = "" } = this.props;
    const { isHovered } = this.state;
    const classes = ["certification-card"];

    if (isVisible) {
      classes.push("certification-card-visible");
    }

    if (certification.link) {
      classes.push("certification-card-clickable");
    }

    if (isHovered) {
      classes.push("certification-card-hovered");
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
    const { certification } = this.props;
    return (
      <CertificationIcon
        icon={certification.icon}
        size="large"
        ariaLabel={`${certification.title} icon`}
      />
    );
  }

  /**
   * Render title
   */
  private renderTitle(): ReactNode {
    const { certification } = this.props;
    return <h3 className="certification-card-title">{certification.title}</h3>;
  }

  /**
   * Render provider
   */
  private renderProvider(): ReactNode {
    const { certification } = this.props;
    return (
      <div className="certification-card-provider">
        <span className="certification-card-provider-label">
          {certification.provider}
        </span>
      </div>
    );
  }

  /**
   * Render badges (credential ID, level, etc.)
   */
  private renderBadges(): ReactNode {
    const { certification } = this.props;
    const badges: ReactNode[] = [];

    if (certification.credentialId) {
      badges.push(
        <CertificationBadge
          key="credential-id"
          label="Credential ID"
          value={`ID: ${certification.credentialId}`}
          variant="accent"
          icon="🔑"
        />,
      );
    }

    if (certification.level) {
      badges.push(
        <CertificationBadge
          key="level"
          label="Level"
          value={certification.level.toUpperCase()}
          variant="default"
          icon="⭐"
        />,
      );
    }

    if (badges.length === 0) {
      return null;
    }

    return <div className="certification-card-badges">{badges}</div>;
  }

  /**
   * Render date
   */
  private renderDate(): ReactNode {
    const { certification } = this.props;
    return (
      <div className="certification-card-date">
        <span className="certification-card-date-icon" aria-hidden="true">
          📅
        </span>
        <time
          dateTime={this.formatDateForDateTime(certification.date)}
          className="certification-card-date-text"
        >
          {certification.date}
        </time>
      </div>
    );
  }

  /**
   * Render description if available
   */
  private renderDescription(): ReactNode {
    const { certification } = this.props;
    if (!certification.description) {
      return null;
    }

    return (
      <p className="certification-card-description">
        {certification.description}
      </p>
    );
  }

  /**
   * Render link hint
   */
  private renderLinkHint(): ReactNode {
    const { certification } = this.props;
    if (!certification.link) {
      return null;
    }

    return (
      <div className="certification-card-link-hint" aria-hidden="true">
        <span className="certification-card-link-hint-text">
          Click to verify
        </span>
        <span className="certification-card-link-hint-icon">→</span>
      </div>
    );
  }

  /**
   * Format date for datetime attribute
   */
  private formatDateForDateTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      return date.toISOString().split("T")[0];
    } catch {
      return dateString;
    }
  }

  /**
   * Main render method
   */
  public render(): ReactNode {
    const { certification } = this.props;

    return (
      <div
        ref={this.cardRef}
        className={this.getCardClassNames()}
        style={{ animationDelay: this.getAnimationDelay() }}
        onClick={this.handleCardClick}
        onKeyDown={this.handleKeyDown}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        role={certification.link ? "link" : "article"}
        tabIndex={certification.link ? 0 : -1}
        aria-label={`Certification: ${certification.title} from ${certification.provider}`}
        data-certification-key={certification.key}
      >
        <div className="certification-card-inner">
          {this.renderIcon()}
          <div className="certification-card-content">
            {this.renderTitle()}
            {this.renderProvider()}
            {this.renderBadges()}
            {this.renderDescription()}
            {this.renderDate()}
            {this.renderLinkHint()}
          </div>
        </div>
        <div className="certification-card-shine" aria-hidden="true"></div>
        <div className="certification-card-gradient" aria-hidden="true"></div>
      </div>
    );
  }
}
