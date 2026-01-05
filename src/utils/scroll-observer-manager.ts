/**
 * ScrollObserverManager - Utility Class for IntersectionObserver Management
 * Follows Single Responsibility Principle (SRP)
 * Follows OOP principles - Encapsulation, Single Responsibility
 */
export class ScrollObserverManager {
  private observer: IntersectionObserver | null = null;
  private readonly threshold: number;
  private readonly rootMargin: string;
  private readonly revealClass: string;

  constructor(
    threshold: number = 0.15,
    rootMargin: string = "0px 0px -100px 0px",
    revealClass: string = "revealed"
  ) {
    this.threshold = threshold;
    this.rootMargin = rootMargin;
    this.revealClass = revealClass;
  }

  /**
   * Initialize IntersectionObserver
   */
  initialize(elements: HTMLElement[]): void {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: add revealed class immediately
      elements.forEach((element) => {
        element.classList.add(this.revealClass);
      });
      return;
    }

    this.cleanup();

    const observerOptions: IntersectionObserverInit = {
      threshold: this.threshold,
      rootMargin: this.rootMargin,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(this.revealClass);
          this.observer?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  /**
   * Cleanup IntersectionObserver
   */
  cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

