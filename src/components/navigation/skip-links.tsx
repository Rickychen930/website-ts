/**
 * Skip Links Component
 * Provides keyboard navigation shortcuts for accessibility
 * Allows users to skip to main content, navigation, etc.
 */

import React, { Component, ReactNode } from "react";
import "../../assets/css/skip-links.css";

interface SkipLink {
  id: string;
  label: string;
  target: string;
}

interface SkipLinksProps {
  links?: SkipLink[];
}

interface SkipLinksState {
  focused: boolean;
}

/**
 * Default skip links
 */
const DEFAULT_SKIP_LINKS: SkipLink[] = [
  { id: "skip-main", label: "Skip to main content", target: "#main-content" },
  { id: "skip-nav", label: "Skip to navigation", target: "nav" },
  { id: "skip-contact", label: "Skip to contact", target: "#contact" },
];

/**
 * SkipLinks Component
 * Provides accessible skip navigation
 */
class SkipLinks extends Component<SkipLinksProps, SkipLinksState> {
  constructor(props: SkipLinksProps) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  private handleFocus = (): void => {
    this.setState({ focused: true });
  };

  private handleBlur = (): void => {
    this.setState({ focused: false });
  };

  private handleClick = (
    target: string,
    e: React.MouseEvent<HTMLAnchorElement>,
  ): void => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      // Focus the element for keyboard navigation
      if (element instanceof HTMLElement) {
        element.focus();
        element.setAttribute("tabindex", "-1");
      }
    }
  };

  private handleKeyDown = (
    target: string,
    e: React.KeyboardEvent<HTMLAnchorElement>,
  ): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.handleClick(target, e as any);
    }
  };

  render(): ReactNode {
    const links = this.props.links || DEFAULT_SKIP_LINKS;
    const { focused } = this.state;

    return (
      <div
        className={`skip-links ${focused ? "focused" : ""}`}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={link.target}
            className="skip-link"
            onClick={(e) => this.handleClick(link.target, e)}
            onKeyDown={(e) => this.handleKeyDown(link.target, e)}
            aria-label={link.label}
          >
            {link.label}
          </a>
        ))}
      </div>
    );
  }
}

export default SkipLinks;
