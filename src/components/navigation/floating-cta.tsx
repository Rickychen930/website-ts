/**
 * Floating CTA Component
 * Hire Me button positioned above Back to Top button with 24px gap
 */

import React, { Component, ReactNode } from "react";
import { trackCTAClick } from "../../utils/analytics";
import "../../assets/css/floating-cta.css";

interface FloatingCTAProps {
  onHireMeClick?: () => void;
}

/**
 * FloatingCTA Component
 * Displays Hire Me button floating above Back to Top button
 */
class FloatingCTA extends Component<FloatingCTAProps> {
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
    return (
      <div
        className="floating-cta"
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
