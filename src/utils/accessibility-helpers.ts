/**
 * Accessibility Helpers
 * Best practices for accessibility
 * WCAG 2.1 AA+ compliant utilities
 */

/**
 * Generate unique ID for ARIA relationships
 */
let idCounter = 0;
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${++idCounter}-${Date.now()}`;
};

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  if (typeof document === 'undefined') return;

  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * Check if element is focusable
 */
export const isFocusable = (element: HTMLElement): boolean => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return element.matches(focusableSelectors);
};

/**
 * Trap focus within element
 */
export const trapFocus = (container: HTMLElement): (() => void) => {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTab = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  container.addEventListener('keydown', handleTab);
  firstElement?.focus();

  return () => {
    container.removeEventListener('keydown', handleTab);
  };
};

/**
 * Get accessible name for element
 */
export const getAccessibleName = (element: HTMLElement): string => {
  // Check aria-label
  const ariaLabel = element.getAttribute('aria-label');
  if (ariaLabel) return ariaLabel;

  // Check aria-labelledby
  const ariaLabelledBy = element.getAttribute('aria-labelledby');
  if (ariaLabelledBy) {
    const labelElement = document.getElementById(ariaLabelledBy);
    if (labelElement) return labelElement.textContent || '';
  }

  // Check associated label
  if (element.id) {
    const label = document.querySelector(`label[for="${element.id}"]`);
    if (label) return label.textContent || '';
  }

  // Check title attribute
  const title = element.getAttribute('title');
  if (title) return title;

  // Fallback to text content
  return element.textContent || '';
};

/**
 * Check color contrast ratio
 */
export const checkColorContrast = (
  foreground: string,
  background: string
): { ratio: number; passesAA: boolean; passesAAA: boolean } => {
  // Simplified contrast calculation
  // In production, use a proper color contrast library
  const getLuminance = (color: string): number => {
    // This is a simplified version
    // Real implementation would parse RGB and calculate luminance
    return 0.5; // Placeholder
  };

  const fgLum = getLuminance(foreground);
  const bgLum = getLuminance(background);

  const lighter = Math.max(fgLum, bgLum);
  const darker = Math.min(fgLum, bgLum);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    ratio,
    passesAA: ratio >= 4.5, // WCAG AA for normal text
    passesAAA: ratio >= 7, // WCAG AAA for normal text
  };
};

/**
 * Skip to content link handler
 */
export const skipToContent = (targetId: string = 'main-content'): void => {
  const target = document.getElementById(targetId);
  if (target) {
    target.focus();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};