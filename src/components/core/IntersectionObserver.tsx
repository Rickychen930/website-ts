/**
 * IntersectionObserver - HOC for scroll animations
 * Provides fade-in and slide-up animations when elements enter viewport
 * 
 * Principles:
 * - SRP: Single responsibility for intersection observation
 * - DRY: Reusable animation logic
 * - Performance: Uses Intersection Observer API
 */

import React, { Component, ReactNode } from 'react';
import { ScrollConfig } from '../../constants/config';
import './IntersectionObserver.css';

// Type alias to avoid conflict with class name
type DOMIntersectionObserver = globalThis.IntersectionObserver;

export interface IIntersectionObserverProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'zoomIn' | 'rotateIn' | 'flipIn';
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface IIntersectionObserverState {
  isVisible: boolean;
}

/**
 * IntersectionObserver Component
 * Wraps children and applies animations when they enter viewport
 */
export class IntersectionObserver extends Component<
  IIntersectionObserverProps,
  IIntersectionObserverState
> {
  private intersectionObserver: DOMIntersectionObserver | null = null;
  private elementRef: React.RefObject<HTMLDivElement | null>;

  constructor(props: IIntersectionObserverProps) {
    super(props);
    this.state = { isVisible: false };
    this.elementRef = React.createRef<HTMLDivElement>();
  }

  componentDidMount(): void {
    if (!this.elementRef.current) return;

    // Check if IntersectionObserver is supported
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      // Fallback: show content immediately if IntersectionObserver is not supported
      this.setState({ isVisible: true });
      return;
    }

    const options: IntersectionObserverInit = {
      threshold: this.props.threshold ?? ScrollConfig.OBSERVER_THRESHOLD,
      rootMargin: this.props.rootMargin ?? ScrollConfig.OBSERVER_ROOT_MARGIN,
    };

    this.intersectionObserver = new window.IntersectionObserver(
      this.handleIntersection,
      options
    );
    this.intersectionObserver.observe(this.elementRef.current);
  }

  componentWillUnmount(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private handleIntersection = (
    entries: IntersectionObserverEntry[]
  ): void => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      this.setState({ isVisible: true });
      if (this.props.once && this.intersectionObserver) {
        this.intersectionObserver.unobserve(entry.target);
      }
    } else if (!this.props.once) {
      this.setState({ isVisible: false });
    }
  };

  render(): ReactNode {
    const {
      children,
      className = '',
      animation = 'fadeIn',
      delay = 0,
    } = this.props;
    const { isVisible } = this.state;

    const animationClass = `animate--${animation}`;
    const visibleClass = isVisible ? 'animate--visible' : 'animate--hidden';

    return (
      <div
        ref={this.elementRef}
        className={`intersection-observer ${animationClass} ${visibleClass} ${className}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
}
