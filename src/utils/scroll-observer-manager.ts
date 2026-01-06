/**
 * ScrollObserverManager - Utility Class for IntersectionObserver Management
 * Follows Single Responsibility Principle (SRP)
 * Follows OOP principles - Encapsulation, Single Responsibility
 */
export type SectionViewCallback = (
  sectionId: string,
  sectionName: string,
) => void;

export class ScrollObserverManager {
  private observer: IntersectionObserver | null = null;
  private readonly threshold: number;
  private readonly rootMargin: string;
  private readonly revealClass: string;
  private sectionViewCallback?: SectionViewCallback;
  private trackedSections: Set<string> = new Set();

  constructor(
    threshold: number = 0.15,
    rootMargin: string = "0px 0px -100px 0px",
    revealClass: string = "revealed",
  ) {
    this.threshold = threshold;
    this.rootMargin = rootMargin;
    this.revealClass = revealClass;
  }

  /**
   * Set callback for section view tracking
   */
  setSectionViewCallback(callback: SectionViewCallback): void {
    this.sectionViewCallback = callback;
  }

  /**
   * Initialize IntersectionObserver
   */
  initialize(elements: HTMLElement[]): void {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: add revealed class immediately
      elements.forEach((element) => {
        element.classList.add(this.revealClass);
        this.trackSectionView(element);
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
          this.trackSectionView(entry.target as HTMLElement);
          this.observer?.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach((element) => {
      this.observer?.observe(element);
    });
  }

  /**
   * Track section view for analytics
   */
  private trackSectionView(element: HTMLElement): void {
    if (!this.sectionViewCallback || !element) return;

    const sectionId = element.id || element.getAttribute("id") || "";
    if (
      !sectionId ||
      sectionId.trim() === "" ||
      this.trackedSections.has(sectionId)
    )
      return;

    // Extract section name from element
    let sectionName =
      element.getAttribute("aria-label") ||
      element.querySelector("h2, h3")?.textContent?.trim() ||
      "";

    // Fallback: format sectionId as readable name
    if (!sectionName && sectionId) {
      sectionName = sectionId
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
        .trim();
    }

    // Only track if we have a valid section name
    if (sectionName) {
      this.trackedSections.add(sectionId);
      this.sectionViewCallback(sectionId, sectionName);
    }
  }

  /**
   * Reset tracked sections (useful for testing or re-initialization)
   */
  resetTrackedSections(): void {
    this.trackedSections.clear();
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
