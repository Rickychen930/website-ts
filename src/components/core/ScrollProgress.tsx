/**
 * ScrollProgress - Scroll Progress Indicator
 * Visual indicator showing scroll progress through the page
 * 
 * Features:
 * - Smooth progress bar
 * - Auto-hide when at top
 * - Keyboard accessible
 */

import React, { Component } from 'react';
import './ScrollProgress.css';

export interface IScrollProgressProps {
  color?: string;
  height?: string;
  position?: 'top' | 'bottom';
  showOnScroll?: boolean;
}

interface IScrollProgressState {
  progress: number;
  isVisible: boolean;
}

/**
 * ScrollProgress Component
 * Shows scroll progress through the page
 */
export class ScrollProgress extends Component<IScrollProgressProps, IScrollProgressState> {
  private scrollTimeout: NodeJS.Timeout | null = null;

  constructor(props: IScrollProgressProps) {
    super(props);
    this.state = {
      progress: 0,
      isVisible: false,
    };
  }

  componentDidMount(): void {
    // Throttle scroll handler
    this.handleScroll = this.throttle(this.handleScroll, 16); // ~60fps
    window.addEventListener('scroll', this.handleScroll, { passive: true });
    // Initial calculation
    this.handleScroll();
  }

  componentWillUnmount(): void {
    window.removeEventListener('scroll', this.handleScroll);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  // Throttle scroll handler for better performance
  private throttle = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean;
    return ((...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    }) as T;
  };

  private handleScroll = (): void => {
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollableHeight = documentHeight - windowHeight;
      const progress = scrollableHeight > 0 
        ? Math.min(100, Math.round((scrollTop / scrollableHeight) * 100))
        : 0;

      const { showOnScroll = true } = this.props;
      const isVisible = showOnScroll ? progress > 0 : true;

      // Only update if progress changed significantly (avoid unnecessary re-renders)
      if (Math.abs(this.state.progress - progress) > 0.5 || this.state.isVisible !== isVisible) {
        this.setState({ progress, isVisible });
      }
    });
  };

  render(): React.ReactNode {
    const { color, height = '3px', position = 'top' } = this.props;
    const { progress, isVisible } = this.state;

    if (!isVisible) return null;

    const style: React.CSSProperties = {
      width: `${progress}%`,
      height,
      backgroundColor: color || 'var(--color-accent-primary, #06b6d4)',
    };

    return (
      <div 
        className={`scroll-progress scroll-progress--${position}`}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Scroll progress"
      >
        <div 
          className="scroll-progress__bar"
          style={style}
        />
      </div>
    );
  }
}

export default ScrollProgress;
