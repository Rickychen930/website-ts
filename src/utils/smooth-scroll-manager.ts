/**
 * SmoothScrollManager - Utility Class for Smooth Scroll Behavior
 * Follows Single Responsibility Principle (SRP)
 * Follows OOP principles - Encapsulation
 */
export class SmoothScrollManager {
  private handler: ((e: MouseEvent) => void) | null = null;
  private readonly offset: number;

  constructor(offset: number = 80) {
    this.offset = offset;
  }

  /**
   * Setup smooth scroll behavior
   */
  setup(): void {
    if (typeof window === "undefined" || this.handler !== null) return;

    this.handler = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - this.offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', this.handler);
  }

  /**
   * Cleanup smooth scroll listener
   */
  cleanup(): void {
    if (typeof document !== "undefined" && this.handler) {
      document.removeEventListener('click', this.handler);
      this.handler = null;
    }
  }
}

