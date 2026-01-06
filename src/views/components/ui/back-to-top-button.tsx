/**
 * BackToTopButton - Component for scrolling back to top
 * Professional, Accessible, Responsive
 * 
 * Features:
 * - Smooth scroll animation
 * - Visibility based on scroll position
 * - Keyboard accessible
 * - ARIA labels
 * - Performance optimized with throttling
 */

import React, { Component, ReactNode } from "react";
import "../../../assets/css/back-to-top-button.css";

interface BackToTopButtonState {
  isVisible: boolean;
}

class BackToTopButton extends Component<{}, BackToTopButtonState> {
  private scrollThreshold = 400;
  private scrollTimeoutId: number | null = null;
  private readonly throttleDelay = 100;

  constructor(props: {}) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount(): void {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", this.handleScrollThrottled, { passive: true });
    // Check initial scroll position
    this.checkScrollPosition();
  }

  componentWillUnmount(): void {
    if (typeof window === "undefined") return;
    window.removeEventListener("scroll", this.handleScrollThrottled);
    if (this.scrollTimeoutId !== null) {
      window.clearTimeout(this.scrollTimeoutId);
    }
  }

  /**
   * Throttled scroll handler for performance
   */
  private handleScrollThrottled = (): void => {
    if (this.scrollTimeoutId !== null) return;

    this.scrollTimeoutId = window.setTimeout(() => {
      this.checkScrollPosition();
      this.scrollTimeoutId = null;
    }, this.throttleDelay);
  };

  /**
   * Check scroll position and update visibility
   */
  private checkScrollPosition = (): void => {
    if (typeof window === "undefined") return;

    const scrollY = window.scrollY || window.pageYOffset;
    const isVisible = scrollY > this.scrollThreshold;

    if (isVisible !== this.state.isVisible) {
      this.setState({ isVisible });
    }
  };

  /**
   * Handle button click - scroll to top
   */
  private handleClick = (): void => {
    if (typeof window === "undefined") return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Focus management for accessibility
    const firstFocusableElement = document.querySelector(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ) as HTMLElement;
    
    if (firstFocusableElement) {
      setTimeout(() => {
        firstFocusableElement.focus();
      }, 500);
    }
  };

  /**
   * Handle keyboard events
   */
  private handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.handleClick();
    }
  };

  render(): ReactNode {
    const { isVisible } = this.state;

    return (
      <button
        className={`back-to-top-button ${isVisible ? 'visible' : ''}`}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        aria-label="Scroll to top"
        title="Scroll to top"
        tabIndex={isVisible ? 0 : -1}
        style={{ display: 'block' }}
      >
        <span className="back-to-top-icon" aria-hidden="true">
          ↑
        </span>
        <span className="back-to-top-text">Top</span>
      </button>
    );
  }
}

export default BackToTopButton;

