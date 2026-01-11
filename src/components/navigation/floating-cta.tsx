/**
 * Floating CTA Component
 * Hire Me button that starts static at bottom, becomes floating after scroll,
 * and moves above Back to Top button when it appears
 */

import React, { Component, ReactNode } from "react";
import { trackCTAClick } from "../../utils/analytics";
import "../../assets/css/floating-cta.css";

interface FloatingCTAProps {
  onHireMeClick?: () => void;
}

interface FloatingCTAState {
  isFloating: boolean; // True when button should be floating (fixed position)
  backToTopVisible: boolean; // True when Back to Top button is visible
}

/**
 * FloatingCTA Component
 * Displays Hire Me button with dynamic positioning based on scroll
 */
class FloatingCTA extends Component<FloatingCTAProps, FloatingCTAState> {
  private floatThreshold = 100; // Start floating after scrolling 100px
  private backToTopThreshold = 400; // Back to Top appears after 400px (same as BackToTopButton)
  private scrollListener: (() => void) | null = null;

  constructor(props: FloatingCTAProps) {
    super(props);
    this.state = {
      isFloating: false,
      backToTopVisible: false,
    };
  }

  componentDidMount(): void {
    // Check scroll position on mount and scroll
    this.scrollListener = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const isFloating = scrollY > this.floatThreshold;
      const backToTopVisible = scrollY > this.backToTopThreshold;

      this.setState({
        isFloating,
        backToTopVisible,
      });
    };

    window.addEventListener("scroll", this.scrollListener, { passive: true });
    // Initial check
    this.scrollListener();
  }

  componentWillUnmount(): void {
    if (this.scrollListener) {
      window.removeEventListener("scroll", this.scrollListener);
    }
  }

  private handleHireMeClick = (): void => {
    // Track analytics
    trackCTAClick("hire-me", "floating-cta");

    if (this.props.onHireMeClick) {
      this.props.onHireMeClick();
    } else {
      // Default: scroll to contact section
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  render(): ReactNode {
    const { isFloating, backToTopVisible } = this.state;

    // Always render, but with different positioning based on state
    return (
      <div
        className={`floating-cta ${isFloating ? "floating" : "static"} ${backToTopVisible ? "above-back-to-top" : ""}`}
        role="complementary"
        aria-label="Call to action"
      >
        <button
          className="floating-cta-button floating-cta-primary"
          onClick={this.handleHireMeClick}
          aria-label="Hire me - Go to contact section"
        >
          <span className="floating-cta-icon" aria-hidden="true">
            💼
          </span>
          <span className="floating-cta-text">Hire Me</span>
        </button>
      </div>
    );
  }
}

export default FloatingCTA;
