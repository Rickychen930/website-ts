/**
 * Optimized Smooth Scroll Manager
 * Performance optimized smooth scrolling dengan requestAnimationFrame
 */

export interface SmoothScrollConfig {
  duration?: number;
  easing?: (t: number) => number;
  offset?: number;
}

const DEFAULT_CONFIG: Required<SmoothScrollConfig> = {
  duration: 800,
  easing: (t: number) => {
    // Ease-in-out-cubic
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  },
  offset: 80,
};

export class SmoothScrollOptimized {
  private config: Required<SmoothScrollConfig>;
  private isScrolling = false;
  private animationFrameId: number | null = null;

  constructor(config: SmoothScrollConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  /**
   * Smooth scroll to element
   */
  scrollToElement(elementId: string, customOffset?: number): void {
    if (this.isScrolling) return;

    const element = document.getElementById(elementId);
    if (!element) {
      if (process.env.NODE_ENV === 'development') {
        const { logWarn } = require('./logger');
        logWarn(`Element with id "${elementId}" not found`, undefined, "SmoothScrollOptimized");
      }
      return;
    }

    const offset = customOffset ?? this.config.offset;
    const targetPosition = this.getElementPosition(element) - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    this.isScrolling = true;

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.config.duration, 1);
      const eased = this.config.easing(progress);

      window.scrollTo(0, startPosition + distance * eased);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.isScrolling = false;
        this.animationFrameId = null;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * Smooth scroll to position
   */
  scrollToPosition(targetY: number): void {
    if (this.isScrolling) return;

    const startPosition = window.pageYOffset;
    const distance = targetY - startPosition;
    const startTime = performance.now();

    this.isScrolling = true;

    const animate = (currentTime: number): void => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / this.config.duration, 1);
      const eased = this.config.easing(progress);

      window.scrollTo(0, startPosition + distance * eased);

      if (progress < 1) {
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.isScrolling = false;
        this.animationFrameId = null;
      }
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  /**
   * Get element position
   */
  private getElementPosition(element: HTMLElement): number {
    let position = 0;
    let currentElement: HTMLElement | null = element;

    while (currentElement) {
      position += currentElement.offsetTop;
      currentElement = currentElement.offsetParent as HTMLElement | null;
    }

    return position;
  }

  /**
   * Cancel ongoing scroll
   */
  cancel(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.isScrolling = false;
  }

  /**
   * Check if currently scrolling
   */
  getIsScrolling(): boolean {
    return this.isScrolling;
  }
}

/**
 * Global smooth scroll instance
 */
export const smoothScrollOptimized = new SmoothScrollOptimized();

