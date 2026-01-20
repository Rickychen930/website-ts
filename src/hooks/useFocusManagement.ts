/**
 * useFocusManagement Hook - Better focus management for accessibility
 * Manages focus for modals, dialogs, and dynamic content
 */

import { useEffect, useRef } from "react";

interface FocusManagementOptions {
  trapFocus?: boolean;
  restoreFocus?: boolean;
  initialFocus?: HTMLElement | null;
}

export const useFocusManagement = (
  isActive: boolean,
  options: FocusManagementOptions = {},
) => {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) {
      // Restore focus when deactivated
      if (options.restoreFocus && previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      return;
    }

    // Store current active element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Set initial focus
    if (options.initialFocus) {
      setTimeout(() => options.initialFocus?.focus(), 0);
    } else if (containerRef.current) {
      setTimeout(() => {
        const firstFocusable = containerRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }, 0);
    }

    // Focus trap
    if (options.trapFocus && containerRef.current) {
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        const focusableElements =
          containerRef.current!.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

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

      document.addEventListener("keydown", handleTab);

      return () => {
        document.removeEventListener("keydown", handleTab);
      };
    }
  }, [isActive, options]);

  return containerRef;
};

/**
 * Announce to screen readers
 */
export const announceToScreenReader = (
  message: string,
  priority: "polite" | "assertive" = "polite",
) => {
  const announcement = document.createElement("div");
  announcement.setAttribute("role", "status");
  announcement.setAttribute("aria-live", priority);
  announcement.setAttribute("aria-atomic", "true");
  announcement.className = "sr-only";
  announcement.textContent = message;
  document.body.appendChild(announcement);

  setTimeout(() => {
    if (document.body.contains(announcement)) {
      document.body.removeChild(announcement);
    }
  }, 1000);
};
