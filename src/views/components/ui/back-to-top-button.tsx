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
import { logError, logWarn } from "../../../utils/logger";
import { Config } from "../../../constants/config";
import "../../../assets/css/back-to-top-button.css";

interface BackToTopButtonState {
  isVisible: boolean;
}

class BackToTopButton extends Component<{}, BackToTopButtonState> {
  // Constants - Using centralized Config for consistency (DRY principle)
  private readonly scrollThreshold = Config.SCROLL.SCROLL_THRESHOLD;
  private readonly throttleDelay = Config.SCROLL.INITIALIZATION_DELAY;
  private readonly scrollAnimationDuration =
    Config.SCROLL.SMOOTH_SCROLL_DURATION;
  private readonly scrollStepInterval = Config.SCROLL.SCROLL_STEP_INTERVAL;
  private readonly focusDelay = Config.SCROLL.FOCUS_DELAY;

  private scrollTimeoutId: number | null = null;
  private scrollIntervalId: number | null = null;
  private isMounted = false;

  constructor(props: {}) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount(): void {
    this.isMounted = true;
    // Edge case: Check browser environment
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    try {
      window.addEventListener("scroll", this.handleScrollThrottled, {
        passive: true,
      });
      // Check initial scroll position
      this.checkScrollPosition();
    } catch (error) {
      logError("Error setting up scroll listener", error, "BackToTopButton");
    }
  }

  componentWillUnmount(): void {
    this.isMounted = false;
    // Edge case: Cleanup properly
    if (typeof window === "undefined") return;

    try {
      window.removeEventListener("scroll", this.handleScrollThrottled);
      if (this.scrollTimeoutId !== null) {
        window.clearTimeout(this.scrollTimeoutId);
        this.scrollTimeoutId = null;
      }
      if (this.scrollIntervalId !== null) {
        window.clearInterval(this.scrollIntervalId);
        this.scrollIntervalId = null;
      }
    } catch (error) {
      logError("Error cleaning up scroll listener", error, "BackToTopButton");
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
      // Also check if component is still mounted to prevent setState after unmount
      if (isVisible !== this.state.isVisible && this.isMounted) {
        this.setState({ isVisible });
      }
    } catch (error) {
      logError("Error checking scroll position", error, "BackToTopButton");
    }
  };

  /**
   * Handle button click - scroll to top
   * Enhanced with better error handling and edge cases
   */
  private handleClick = (): void => {
    // Guard: Don't handle click if button is not visible
    if (!this.state.isVisible) return;

    // Edge case: Check browser environment
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    try {
      // Cleanup any existing scroll interval before starting new scroll
      if (this.scrollIntervalId !== null) {
        window.clearInterval(this.scrollIntervalId);
        this.scrollIntervalId = null;
      }

      // Edge case: Check if smooth scroll is supported
      const supportsSmoothScroll =
        "scrollBehavior" in document.documentElement.style;

      if (supportsSmoothScroll) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Fallback for browsers without smooth scroll support
        const scrollStep =
          -window.scrollY /
          (this.scrollAnimationDuration / this.scrollStepInterval);
        this.scrollIntervalId = window.setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            if (this.scrollIntervalId !== null) {
              window.clearInterval(this.scrollIntervalId);
              this.scrollIntervalId = null;
            }
          }
        }, this.scrollStepInterval);
      }

      // Focus management for accessibility
      // After scrolling to top, focus should return to the top of the page
      // Using requestAnimationFrame for better performance and to ensure DOM is ready
      const focusTopElement = () => {
        // Edge case: Check if component is still mounted before focusing
        if (!this.isMounted) return;

        try {
          // Edge case: Check browser environment
          if (typeof document === "undefined") return;

          // Try to focus the main content area or first heading
          const mainContent = document.querySelector(
            'main[id="main-content"]',
          ) as HTMLElement | null;
          const firstHeading = document.querySelector(
            'h1, h2, [role="heading"]',
          ) as HTMLElement | null;
          const firstFocusableElement = document.querySelector(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) as HTMLElement | null;

          // Priority: main content > first heading > first focusable element
          const targetElement =
            mainContent || firstHeading || firstFocusableElement;

          // Edge case: Only focus if element exists and component is still mounted
          if (targetElement && this.isMounted) {
            // Make element focusable if needed
            if (!targetElement.hasAttribute("tabindex")) {
              targetElement.setAttribute("tabindex", "-1");
            }
            targetElement.focus();
            // Remove tabindex after focus to restore natural tab order
            if (
              targetElement === mainContent ||
              targetElement === firstHeading
            ) {
              setTimeout(() => {
                // Edge case: Check if element still exists and component is mounted
                if (targetElement && this.isMounted) {
                  targetElement.removeAttribute("tabindex");
                }
              }, 1000);
            }
          }
        } catch (error) {
          logWarn(
            "Error focusing element after scroll",
            error,
            "BackToTopButton",
          );
        }
      };

      if (typeof requestAnimationFrame !== "undefined") {
        requestAnimationFrame(() => {
          setTimeout(focusTopElement, this.focusDelay);
        });
      } else {
        setTimeout(focusTopElement, this.focusDelay);
      }
    } catch (error) {
      logError("Error scrolling to top", error, "BackToTopButton");
      // Fallback: simple scroll
      window.scrollTo(0, 0);
    }
  };

  /**
   * Handle keyboard events
   */
  private handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    // Guard: Don't handle keyboard events if button is not visible
    if (!this.state.isVisible) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.handleClick();
    }
  };

  render(): ReactNode {
    const { isVisible } = this.state;

    return (
      <button
        type="button"
        className={`back-to-top-button ${isVisible ? "visible" : ""}`}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        aria-label="Scroll to top"
        title="Scroll to top"
        tabIndex={isVisible ? 0 : -1}
        aria-hidden={!isVisible}
        disabled={!isVisible}
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
