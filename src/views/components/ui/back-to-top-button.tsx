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
    // Edge case: Check browser environment
    if (typeof window === "undefined" || typeof document === "undefined") return;
    
    try {
      window.addEventListener("scroll", this.handleScrollThrottled, { passive: true });
      // Check initial scroll position
      this.checkScrollPosition();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require('../../../utils/logger');
        logError("Error setting up scroll listener", error, "BackToTopButton");
      }
    }
  }

  componentWillUnmount(): void {
    // Edge case: Cleanup properly
    if (typeof window === "undefined") return;
    
    try {
      window.removeEventListener("scroll", this.handleScrollThrottled);
      if (this.scrollTimeoutId !== null) {
        window.clearTimeout(this.scrollTimeoutId);
        this.scrollTimeoutId = null;
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require('../../../utils/logger');
        logError("Error cleaning up scroll listener", error, "BackToTopButton");
      }
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
   * Enhanced with better edge case handling
   */
  private checkScrollPosition = (): void => {
    // Edge case: Check browser environment
    if (typeof window === "undefined") return;

    try {
      // Edge case: Handle different scroll position properties
      const scrollY = window.scrollY ?? window.pageYOffset ?? 0;
      const isVisible = scrollY > this.scrollThreshold;

      // Edge case: Only update state if changed to prevent unnecessary re-renders
      if (isVisible !== this.state.isVisible) {
        this.setState({ isVisible });
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require('../../../utils/logger');
        logError("Error checking scroll position", error, "BackToTopButton");
      }
    }
  };

  /**
   * Handle button click - scroll to top
   * Enhanced with better error handling and edge cases
   */
  private handleClick = (): void => {
    // Edge case: Check browser environment
    if (typeof window === "undefined" || typeof document === "undefined") return;

    try {
      // Edge case: Check if smooth scroll is supported
      const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
      
      if (supportsSmoothScroll) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Fallback for browsers without smooth scroll support
        const scrollStep = -window.scrollY / (500 / 15);
        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      }

      // Focus management for accessibility
      // Edge case: Use requestAnimationFrame for better performance
      const focusElement = () => {
        try {
          const firstFocusableElement = document.querySelector(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;
          
          if (firstFocusableElement) {
            firstFocusableElement.focus();
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            const { logWarn } = require('../../../utils/logger');
            logWarn("Error focusing element", error, "BackToTopButton");
          }
        }
      };

      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => {
          setTimeout(focusElement, 500);
        });
      } else {
        setTimeout(focusElement, 500);
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const { logError } = require('../../../utils/logger');
        logError("Error scrolling to top", error, "BackToTopButton");
      }
      // Fallback: simple scroll
      window.scrollTo(0, 0);
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

