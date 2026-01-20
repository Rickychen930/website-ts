/**
 * useKeyboardShortcuts Hook - Keyboard shortcuts for accessibility
 * Provides keyboard shortcuts for common actions
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = [
      {
        key: "h",
        action: () => navigate("/"),
        description: "Go to Home page",
      },
      {
        key: "a",
        action: () => navigate("/about"),
        description: "Go to About page",
      },
      {
        key: "p",
        action: () => navigate("/projects"),
        description: "Go to Projects page",
      },
      {
        key: "e",
        action: () => navigate("/experience"),
        description: "Go to Experience page",
      },
      {
        key: "c",
        action: () => navigate("/contact"),
        description: "Go to Contact page",
      },
      {
        key: "/",
        action: () => {
          const searchInput = document.querySelector<HTMLInputElement>(
            'input[aria-label="Search"], input[placeholder*="Search"]',
          );
          if (searchInput) {
            searchInput.focus();
            searchInput.select();
          }
        },
        description: "Focus search input",
      },
      {
        key: "Escape",
        action: () => {
          // Close any open modals or menus
          const activeElement = document.activeElement as HTMLElement;
          if (activeElement && activeElement.blur) {
            activeElement.blur();
          }
          // Close mobile menu if open
          const menuToggle = document.querySelector<HTMLButtonElement>(
            'button[aria-expanded="true"]',
          );
          if (menuToggle) {
            menuToggle.click();
          }
        },
        description: "Close modal or menu",
      },
      {
        key: "?",
        action: () => {
          // This is handled by AccessibilityInfo component
          // Just announce it
        },
        description: "Show keyboard shortcuts",
      },
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only activate shortcuts when not typing in input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        // Allow Escape to work even in inputs
        if (e.key === "Escape") {
          const shortcut = shortcuts.find((s) => s.key === "Escape");
          if (shortcut) {
            e.preventDefault();
            shortcut.action();
          }
        }
        return;
      }

      // Check for shortcuts (only when not using modifier keys for browser shortcuts)
      const shortcut = shortcuts.find((s) => {
        const keyMatch = s.key.toLowerCase() === e.key.toLowerCase();
        const ctrlMatch =
          s.ctrlKey === undefined ? !e.ctrlKey : s.ctrlKey === e.ctrlKey;
        const shiftMatch =
          s.shiftKey === undefined ? !e.shiftKey : s.shiftKey === e.shiftKey;
        const altMatch =
          s.altKey === undefined ? !e.altKey : s.altKey === e.altKey;

        return keyMatch && ctrlMatch && shiftMatch && altMatch;
      });

      if (shortcut) {
        e.preventDefault();
        shortcut.action();

        // Announce to screen readers
        const announcement = document.createElement("div");
        announcement.setAttribute("role", "status");
        announcement.setAttribute("aria-live", "polite");
        announcement.setAttribute("aria-atomic", "true");
        announcement.className = "sr-only";
        announcement.textContent = shortcut.description;
        document.body.appendChild(announcement);
        setTimeout(() => {
          if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
          }
        }, 1000);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
};
