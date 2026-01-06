/**
 * Floating CTA Component
 * Prominent call-to-action buttons for recruiters
 * Sticky/floating buttons that stay visible while scrolling
 */

import React, { Component, ReactNode } from "react";
import { trackCTAClick, trackResumeDownload } from "../../utils/analytics";
import "../../assets/css/floating-cta.css";

interface FloatingCTAProps {
  onHireMeClick?: () => void;
  onDownloadResumeClick?: () => void;
  resumeUrl?: string;
}

interface FloatingCTAState {
  isVisible: boolean;
}

/**
 * FloatingCTA Component
 * Displays prominent CTA buttons that float on the page
 */
class FloatingCTA extends Component<FloatingCTAProps, FloatingCTAState> {
  private scrollThreshold = 300; // Show after scrolling 300px
  private scrollListener: (() => void) | null = null;

  constructor(props: FloatingCTAProps) {
    super(props);
    this.state = {
      isVisible: false,
    };
  }

  componentDidMount(): void {
    // Show CTA after user scrolls down
    this.scrollListener = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      this.setState({ isVisible: scrollY > this.scrollThreshold });
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

  private handleDownloadResume = (): void => {
    // Track analytics
    trackCTAClick("resume", "floating-cta");
    trackResumeDownload();

    if (this.props.onDownloadResumeClick) {
      this.props.onDownloadResumeClick();
    } else {
      // Default: download resume
      const resumeUrl =
        this.props.resumeUrl || "/assets/document/RICKY_CV_8_AUG.pdf";
      const link = document.createElement("a");
      link.href = resumeUrl;
      link.download = "Ricky_Chen_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  render(): ReactNode {
    const { isVisible } = this.state;

    if (!isVisible) {
      return null;
    }

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
        <button
          className="floating-cta-button floating-cta-secondary"
          onClick={this.handleDownloadResume}
          aria-label="Download resume"
        >
          <span className="floating-cta-icon" aria-hidden="true">
            📄
          </span>
          <span className="floating-cta-text">Resume</span>
        </button>
      </div>
    );
  }
}

export default FloatingCTA;
