/**
 * ScrollToTop - Back to Top Button Component
 * Professional scroll-to-top functionality with smooth animations
 * 
 * Principles:
 * - SRP: Single responsibility for scroll-to-top functionality
 * - Accessibility: Keyboard navigation and ARIA labels
 */

import React, { Component } from 'react';
import { ScrollConfig } from '../../constants/config';
import './ScrollToTop.css';

interface IScrollToTopState {
  isVisible: boolean;
}

/**
 * ScrollToTop Component
 * Shows a button to scroll back to top when user scrolls down
 */
export class ScrollToTop extends Component<{}, IScrollToTopState> {
  private scrollThreshold = ScrollConfig.SCROLL_THRESHOLD;

  constructor(props: {}) {
    super(props);
    this.state = { isVisible: false };
  }

  componentDidMount(): void {
    window.addEventListener('scroll', this.handleScroll, { passive: true });
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll = (): void => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.setState({ isVisible: scrollY > this.scrollThreshold });
  };

  private scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  private handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.scrollToTop();
    }
  };

  render(): React.ReactNode {
    const { isVisible } = this.state;

    if (!isVisible) return null;

    return (
      <button
        className="scroll-to-top"
        onClick={this.scrollToTop}
        onKeyDown={this.handleKeyDown}
        aria-label="Scroll to top"
        title="Scroll to top"
        type="button"
      >
        <span className="scroll-to-top__icon" aria-hidden="true">
          ↑
        </span>
        <span className="sr-only">Scroll to top</span>
      </button>
    );
  }
}
