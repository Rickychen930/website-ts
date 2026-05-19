/**
 * Keyboard shortcuts — portfolio navigation
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface KeyboardShortcut {
  key: string;
  action: () => void;
  description: string;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = [
      { key: "h", action: () => navigate("/"), description: "Go to Home" },
      { key: "a", action: () => navigate("/about"), description: "Go to About" },
      {
        key: "p",
        action: () => navigate("/projects"),
        description: "Go to Projects",
      },
      {
        key: "e",
        action: () => navigate("/experience"),
        description: "Go to Experience",
      },
      {
        key: "r",
        action: () => navigate("/resume"),
        description: "Go to Resume",
      },
      {
        key: "c",
        action: () => navigate("/contact"),
        description: "Go to Contact",
      },
      {
        key: "Escape",
        action: () => {
          const menuToggle = document.querySelector<HTMLButtonElement>(
            'button[aria-expanded="true"]',
          );
          if (menuToggle) menuToggle.click();
        },
        description: "Close menu",
      },
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        if (e.key === "Escape") {
          const shortcut = shortcuts.find((s) => s.key === "Escape");
          if (shortcut) {
            e.preventDefault();
            shortcut.action();
          }
        }
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const shortcut = shortcuts.find(
        (s) => s.key.toLowerCase() === e.key.toLowerCase(),
      );
      if (shortcut) {
        e.preventDefault();
        shortcut.action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [navigate]);
};
