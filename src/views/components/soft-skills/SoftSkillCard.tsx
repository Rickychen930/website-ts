/**
 * SoftSkillCard Component
 *
 * Advanced professional card component showcasing software engineering capabilities
 * Follows Single Responsibility Principle (SRP)
 *
 * Features:
 * - 3D transform effects with parallax
 * - Animated particles and grid background
 * - Skill level indicators
 * - Code-inspired design elements
 * - Advanced glassmorphism
 * - Interactive hover states
 * - Professional luxury design
 */
import React, { PureComponent, ReactNode, RefObject, createRef } from "react";
import { SoftSkillItem } from "../../../models/soft-skills-model";
import { SoftSkillIcon } from "./SoftSkillIcon";
import "./SoftSkillCard.css";

/**
 * Extended HTMLElement interface for mouse handlers storage
 * Type-safe extension for custom properties
 */
interface HTMLElementWithMouseHandlers extends HTMLElement {
  __mouseHandlers?: {
    handleMouseMove: (e: MouseEvent) => void;
    handleMouseLeave: () => void;
  };
  __observer?: IntersectionObserver;
}

export interface ISoftSkillCardProps {
  readonly skill: SoftSkillItem;
  readonly index: number;
  readonly isVisible?: boolean;
  readonly onIntersect?: (key: string) => void;
}

/**
 * SoftSkillCard Component
 * PureComponent for performance optimization
 */
export class SoftSkillCard extends PureComponent<ISoftSkillCardProps> {
  private cardRef: RefObject<HTMLElementWithMouseHandlers | null> =
    createRef<HTMLElementWithMouseHandlers>();
  private mouseX: number = 0;
  private mouseY: number = 0;

  componentDidMount(): void {
    this.observeCard();
    this.setupMouseTracking();
  }

  componentWillUnmount(): void {
    this.disconnectObserver();
    this.removeMouseTracking();
  }

  /**
   * Setup mouse tracking for 3D parallax effect
   */
  private setupMouseTracking(): void {
    if (!this.cardRef.current) return;

    const card = this.cardRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (this.mouseY - centerY) / 20;
      const rotateY = (centerX - this.mouseX) / 20;

      card.style.setProperty("--mouse-x", `${rotateY}deg`);
      card.style.setProperty("--mouse-y", `${rotateX}deg`);
    };

    const handleMouseLeave = () => {
      card.style.setProperty("--mouse-x", "0deg");
      card.style.setProperty("--mouse-y", "0deg");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    card.__mouseHandlers = { handleMouseMove, handleMouseLeave };
  }

  /**
   * Remove mouse tracking
   */
  private removeMouseTracking(): void {
    if (!this.cardRef.current) return;
    const card = this.cardRef.current;
    const handlers = card.__mouseHandlers;

    if (handlers) {
      card.removeEventListener("mousemove", handlers.handleMouseMove);
      card.removeEventListener("mouseleave", handlers.handleMouseLeave);
    }
  }

  /**
   * Calculate skill level based on description length (for demo)
   * In real app, this would come from data
   */
  private getSkillLevel(): number {
    const { skill } = this.props;
    // Calculate level based on description or use a default
    if (skill.description && skill.description.length > 50) {
      return 95;
    } else if (skill.description && skill.description.length > 30) {
      return 85;
    }
    return 90; // Default high level
  }

  /**
   * Observe card for intersection
   */
  private observeCard(): void {
    if (
      typeof IntersectionObserver === "undefined" ||
      !this.cardRef.current ||
      this.props.isVisible
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.props.onIntersect) {
            this.props.onIntersect(this.props.skill.key);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (this.cardRef.current) {
      observer.observe(this.cardRef.current);
      // Store observer for cleanup
      this.cardRef.current.__observer = observer;
    }
  }

  /**
   * Disconnect observer
   */
  private disconnectObserver(): void {
    if (this.cardRef.current && this.cardRef.current.__observer) {
      this.cardRef.current.__observer.disconnect();
    }
  }

  public render(): ReactNode {
    const { skill, index, isVisible = false } = this.props;

    if (!skill || !skill.key || !skill.name) {
      return null;
    }

    const animationDelay = index * 100;
    const skillLevel = this.getSkillLevel();

    return (
      <article
        ref={this.cardRef}
        className={`soft-skill-card ${isVisible ? "soft-skill-card-visible" : "soft-skill-card-hidden"}`}
        style={{ animationDelay: `${animationDelay}ms` }}
        data-key={skill.key}
        aria-labelledby={`soft-skill-${skill.key}-title`}
        role="listitem"
      >
        {/* Animated Grid Background */}
        <div className="soft-skill-card-grid-bg" aria-hidden="true">
          <div className="soft-skill-card-grid-line"></div>
          <div className="soft-skill-card-grid-line"></div>
          <div className="soft-skill-card-grid-line"></div>
        </div>

        {/* Animated Particles */}
        <div className="soft-skill-card-particles" aria-hidden="true">
          <div className="soft-skill-card-particle"></div>
          <div className="soft-skill-card-particle"></div>
          <div className="soft-skill-card-particle"></div>
          <div className="soft-skill-card-particle"></div>
        </div>

        {/* Gradient Background Decoration */}
        <div className="soft-skill-card-bg" aria-hidden="true">
          <div className="soft-skill-card-bg-gradient"></div>
          <div className="soft-skill-card-bg-radial"></div>
        </div>

        {/* Shine Effect */}
        <div className="soft-skill-card-shine" aria-hidden="true"></div>

        {/* Code-inspired Corner Accent */}
        <div className="soft-skill-card-corner-accent" aria-hidden="true">
          <div className="soft-skill-card-corner-line"></div>
          <div className="soft-skill-card-corner-line"></div>
        </div>

        {/* Content Wrapper */}
        <div className="soft-skill-card-inner">
          {/* Icon with Enhanced Effects */}
          <div className="soft-skill-card-icon-wrapper">
            <div className="soft-skill-card-icon-ring" aria-hidden="true"></div>
            <div className="soft-skill-card-icon">
              <SoftSkillIcon
                icon={skill.icon}
                name={skill.name}
                size="large"
                animated={true}
              />
            </div>
            <div
              className="soft-skill-card-icon-pulse"
              aria-hidden="true"
            ></div>
          </div>

          {/* Content */}
          <div className="soft-skill-card-content">
            <div className="soft-skill-card-header">
              <h3
                className="soft-skill-card-title"
                id={`soft-skill-${skill.key}-title`}
              >
                {skill.name}
              </h3>
              <div className="soft-skill-card-badge" aria-hidden="true">
                <span className="soft-skill-card-badge-text">Expert</span>
              </div>
            </div>

            {skill.description && skill.description.trim() !== "" && (
              <p
                className="soft-skill-card-description"
                aria-labelledby={`soft-skill-${skill.key}-title`}
              >
                {skill.description}
              </p>
            )}

            {/* Skill Level Indicator */}
            <div className="soft-skill-card-level">
              <div className="soft-skill-card-level-header">
                <span className="soft-skill-card-level-label">Proficiency</span>
                <span className="soft-skill-card-level-value">
                  {skillLevel}%
                </span>
              </div>
              <div className="soft-skill-card-level-bar">
                <div
                  className="soft-skill-card-level-fill"
                  style={{ width: `${skillLevel}%` }}
                  aria-hidden="true"
                >
                  <div className="soft-skill-card-level-glow"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover Effect Indicator */}
        <div className="soft-skill-card-indicator" aria-hidden="true"></div>

        {/* 3D Transform Overlay */}
        <div className="soft-skill-card-3d-overlay" aria-hidden="true"></div>
      </article>
    );
  }
}
