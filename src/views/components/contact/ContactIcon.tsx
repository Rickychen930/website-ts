/**
 * ContactIcon Component
 * Reusable component for displaying contact icons
 * 
 * Principles Applied:
 * - Single Responsibility Principle (SRP): Only handles icon display
 * - DRY: Reusable across contact components
 * - KISS: Simple, focused component
 */

import React, { PureComponent, ReactNode } from "react";
import { IContact, ContactType } from "../../../models/contact-model";
import "./ContactIcon.css";

/**
 * ContactIcon Props
 */
export interface ContactIconProps {
  contact: IContact;
  size?: "small" | "medium" | "large";
  animated?: boolean;
  className?: string;
}

/**
 * ContactIcon State
 */
interface ContactIconState {
  isHovered: boolean;
  isFocused: boolean;
}

/**
 * ContactIcon Component
 * Displays contact icon with animations and styling
 */
export class ContactIcon extends PureComponent<ContactIconProps, ContactIconState> {
  constructor(props: ContactIconProps) {
    super(props);
    this.state = {
      isHovered: false,
      isFocused: false,
    };
  }

  private handleMouseEnter = (): void => {
    this.setState({ isHovered: true });
  };

  private handleMouseLeave = (): void => {
    this.setState({ isHovered: false });
  };

  private handleFocus = (): void => {
    this.setState({ isFocused: true });
  };

  private handleBlur = (): void => {
    this.setState({ isFocused: false });
  };

  /**
   * Get icon class based on contact type
   */
  private getIconClass(): string {
    const { contact, size = "medium", animated = true, className = "" } = this.props;
    const { isHovered, isFocused } = this.state;

    const classes = [
      "contact-icon",
      `contact-icon--${size}`,
      `contact-icon--${contact.type || ContactType.OTHER}`,
      className,
    ];

    if (animated && (isHovered || isFocused)) {
      classes.push("contact-icon--active");
    }

    return classes.filter(Boolean).join(" ");
  }

  /**
   * Get gradient class based on contact type
   */
  private getGradientClass(): string {
    const { contact } = this.props;
    const type = contact.type || ContactType.OTHER;

    return `contact-icon-gradient--${type}`;
  }

  public render(): ReactNode {
    const { contact } = this.props;
    const { isHovered, isFocused } = this.state;

    return (
      <div
        className={this.getIconClass()}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        role="img"
        aria-label={`${contact.label} icon`}
        tabIndex={0}
      >
        <div className={`contact-icon-background ${this.getGradientClass()}`} />
        <div className="contact-icon-content">
          <span className="contact-icon-emoji" aria-hidden="true">
            {contact.icon}
          </span>
        </div>
        {(isHovered || isFocused) && (
          <div className="contact-icon-glow" aria-hidden="true" />
        )}
      </div>
    );
  }
}

export default ContactIcon;

