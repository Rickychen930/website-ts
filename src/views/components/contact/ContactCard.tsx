/**
 * ContactCard Component
 * Reusable component for displaying individual contact cards
 *
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles card display
 * - DRY: Reusable across contact section
 * - KISS: Simple, focused component
 * - Component-Based: Composed of smaller components
 */

import React, { PureComponent, ReactNode } from "react";
import { IContact, ContactType } from "../../../models/contact-model";
import { ContactIcon } from "./ContactIcon";
import "./ContactCard.css";

/**
 * ContactCard Props
 */
export interface ContactCardProps {
  contact: IContact;
  index: number;
  onContactClick?: (contact: IContact) => void;
  onCopyClick?: (contact: IContact) => void;
  className?: string;
}

/**
 * ContactCard State
 */
interface ContactCardState {
  isHovered: boolean;
  isFocused: boolean;
  isCopied: boolean;
}

/**
 * ContactCard Component
 * Displays a contact card with icon, label, value, and actions
 */
export class ContactCard extends PureComponent<
  ContactCardProps,
  ContactCardState
> {
  private copyTimeout: NodeJS.Timeout | null = null;
  private mouseMoveThrottle: number | null = null;
  private lastMouseMoveTime: number = 0;

  constructor(props: ContactCardProps) {
    super(props);
    this.state = {
      isHovered: false,
      isFocused: false,
      isCopied: false,
    };
  }

  componentWillUnmount(): void {
    // Cleanup timeout
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
      this.copyTimeout = null;
    }
    // Cleanup throttle
    if (this.mouseMoveThrottle !== null) {
      cancelAnimationFrame(this.mouseMoveThrottle);
      this.mouseMoveThrottle = null;
    }
  }

  private handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  private handleFocus = (): void => {
    this.setState({ isFocused: true });
  };

  private handleBlur = (): void => {
    this.setState({ isFocused: false });
  };

  private handleCardClick = (): void => {
    const { contact, onContactClick } = this.props;
    if (onContactClick) {
      onContactClick(contact);
    }
  };

  private handleCopyClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
    const { contact, onCopyClick } = this.props;

    if (onCopyClick) {
      // Clear existing timeout if any
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }

      onCopyClick(contact);
      this.setState({ isCopied: true });
      this.copyTimeout = setTimeout(() => {
        this.setState({ isCopied: false });
        this.copyTimeout = null;
      }, 2000);
    }
  };

  /**
   * Get card class name
   */
  private getCardClass(): string {
    const { contact, className = "" } = this.props;
    const { isHovered, isFocused } = this.state;

    const classes = [
      "contact-card",
      `contact-card--${contact?.type || "other"}`,
      className,
    ];

    if (isHovered || isFocused) {
      classes.push("contact-card--active");
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Render contact value
   */
  private renderValue(): ReactNode {
    const { contact } = this.props;
    const { isHovered, isFocused } = this.state;
    const contactType = contact.type || ContactType.OTHER;

    // Guard against missing value
    const value = contact.value || "";
    if (!value) {
      return (
        <span
          className="contact-card-value"
          aria-label={`${contact.label}: No value provided`}
        >
          —
        </span>
      );
    }

    if (contact.link) {
      const isEmailOrPhone =
        contactType === ContactType.EMAIL || contactType === ContactType.PHONE;

      return (
        <a
          href={contact.link}
          target={isEmailOrPhone ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className={`contact-card-value contact-card-link ${isHovered || isFocused ? "contact-card-link--active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          aria-label={`${contact.label}: ${value}${isEmailOrPhone ? "" : " (opens in new tab)"}`}
        >
          {value}
          {!isEmailOrPhone && (
            <span className="contact-card-link-icon" aria-hidden="true">
              ↗
            </span>
          )}
        </a>
      );
    }

    return (
      <span
        className="contact-card-value"
        aria-label={`${contact.label}: ${value}`}
      >
        {value}
      </span>
    );
  }

  /**
   * Render copy button
   */
  private renderCopyButton(): ReactNode {
    const { contact, onCopyClick } = this.props;
    const { isCopied } = this.state;

    if (!onCopyClick) {
      return null;
    }

    return (
      <button
        type="button"
        className={`contact-card-copy ${isCopied ? "contact-card-copy--copied" : ""}`}
        onClick={this.handleCopyClick}
        aria-label={isCopied ? "Copied!" : `Copy ${contact.label}`}
        title={isCopied ? "Copied!" : `Copy ${contact.label}`}
      >
        <span className="contact-card-copy-icon" aria-hidden="true">
          {isCopied ? "✓" : "📋"}
        </span>
        {isCopied && (
          <span className="contact-card-copy-text" aria-live="polite">
            Copied!
          </span>
        )}
      </button>
    );
  }

  /**
   * Render description if available
   */
  private renderDescription(): ReactNode {
    const { contact } = this.props;

    if (!contact.description) {
      return null;
    }

    return (
      <p className="contact-card-description" aria-hidden="true">
        {contact.description}
      </p>
    );
  }

  private handleMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
    // Throttle mouse move for performance (max 60fps)
    const now = Date.now();
    if (now - this.lastMouseMoveTime < 16) {
      // Cancel previous frame if exists
      if (this.mouseMoveThrottle !== null) {
        cancelAnimationFrame(this.mouseMoveThrottle);
      }

      // Schedule for next frame
      this.mouseMoveThrottle = requestAnimationFrame(() => {
        this.processMouseMove(e);
        this.mouseMoveThrottle = null;
      });
      return;
    }

    this.lastMouseMoveTime = now;
    this.processMouseMove(e);
  };

  /**
   * Process mouse move calculations (throttled)
   */
  private processMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    // Guard against zero dimensions
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  };

  private handleMouseLeave = (e: React.MouseEvent<HTMLElement>): void => {
    this.setState({ isHovered: false });
    // Reset transform
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  };

  /**
   * Handle keyboard navigation
   */
  private handleKeyDown = (e: React.KeyboardEvent<HTMLElement>): void => {
    // Enter or Space to activate
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.handleCardClick();
    }
    // Escape to blur
    if (e.key === "Escape") {
      e.currentTarget.blur();
    }
  };

  public render(): ReactNode {
    const { contact, index } = this.props;
    const { isHovered, isFocused } = this.state;

    // Guard against missing contact
    if (!contact) {
      return null;
    }

    // Ensure index is non-negative
    const safeIndex = Math.max(0, index || 0);
    const contactKey = contact.key || `contact-${safeIndex}`;
    const contactLabel = contact.label || "Contact";

    return (
      <article
        className={this.getCardClass()}
        style={
          {
            animationDelay: `${safeIndex * 0.1}s`,
            "--index": safeIndex,
          } as React.CSSProperties
        }
        data-contact-key={contactKey}
        role="button"
        aria-label={`Contact: ${contactLabel}`}
        aria-pressed={isHovered || isFocused ? "true" : "false"}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleCardClick}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
      >
        {/* Animated Background Pattern */}
        <div className="contact-card-pattern" aria-hidden="true" />

        {/* Glassmorphism Overlay */}
        <div className="contact-card-glass" aria-hidden="true" />

        {/* Gradient Background */}
        <div className="contact-card-background" aria-hidden="true" />

        {/* Shine Effect */}
        <div className="contact-card-shine" aria-hidden="true" />

        {/* Content */}
        <div className="contact-card-content">
          <div className="contact-card-header">
            <div className="contact-card-icon-wrapper">
              <ContactIcon contact={contact} size="medium" animated />
              <div className="contact-card-icon-ring" aria-hidden="true" />
            </div>
            {this.renderCopyButton()}
          </div>
          <div className="contact-card-body">
            <h3 className="contact-card-label">
              <span className="contact-card-label-text">{contact.label}</span>
              <span
                className="contact-card-label-underline"
                aria-hidden="true"
              />
            </h3>
            <div className="contact-card-value-wrapper">
              {this.renderValue()}
            </div>
            {this.renderDescription()}
          </div>
        </div>

        {/* Glow Effects */}
        {(isHovered || isFocused) && (
          <>
            <div
              className="contact-card-glow contact-card-glow--primary"
              aria-hidden="true"
            />
            <div
              className="contact-card-glow contact-card-glow--secondary"
              aria-hidden="true"
            />
            <div className="contact-card-particles" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="contact-card-particle"
                  style={{ "--particle-index": i } as React.CSSProperties}
                />
              ))}
            </div>
          </>
        )}

        {/* Border Gradient */}
        <div className="contact-card-border-gradient" aria-hidden="true" />
      </article>
    );
  }
}

export default ContactCard;
