/**
 * AccessibilityInfo Component - Shows keyboard shortcuts help
 * Can be toggled with ? key
 */

import React, { useState, useEffect, useRef } from "react";
import { useFocusManagement } from "@/hooks/useFocusManagement";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import styles from "./AccessibilityInfo.module.css";

const shortcuts = [
  { key: "H", description: "Go to Home page" },
  { key: "A", description: "Go to About page" },
  { key: "P", description: "Go to Projects page" },
  { key: "E", description: "Go to Experience page" },
  { key: "C", description: "Go to Contact page" },
  { key: "/", description: "Focus search input" },
  { key: "?", description: "Show keyboard shortcuts" },
  { key: "Esc", description: "Close modal or menu" },
];

export const AccessibilityInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const containerRef = useFocusManagement(isOpen, {
    trapFocus: true,
    restoreFocus: true,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with ? key (only when not in input)
      if (
        e.key === "?" &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        const target = e.target as HTMLElement;
        if (
          target.tagName !== "INPUT" &&
          target.tagName !== "TEXTAREA" &&
          !target.isContentEditable &&
          !isOpen
        ) {
          e.preventDefault();
          setIsOpen(true);
        }
      }

      // Close with Escape
      if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-info-title"
    >
      <div
        ref={(node) => {
          modalRef.current = node;
          if (node && containerRef) {
            (
              containerRef as React.MutableRefObject<HTMLElement | null>
            ).current = node;
          }
        }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="document"
        tabIndex={-1}
      >
        <div className={styles.header}>
          <Typography
            variant="h3"
            weight="semibold"
            id="accessibility-info-title"
          >
            Keyboard Shortcuts
          </Typography>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            aria-label="Close keyboard shortcuts"
          >
            ×
          </Button>
        </div>

        <div className={styles.content}>
          <Typography
            variant="body"
            color="secondary"
            className={styles.description}
          >
            Use these keyboard shortcuts to navigate the website more
            efficiently.
          </Typography>

          <ul className={styles.shortcutsList} role="list">
            {shortcuts.map((shortcut) => (
              <li key={shortcut.key} className={styles.shortcutItem}>
                <kbd className={styles.key}>{shortcut.key}</kbd>
                <span className={styles.description}>
                  {shortcut.description}
                </span>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <Typography variant="small" color="tertiary">
              Press <kbd className={styles.inlineKey}>Esc</kbd> or click outside
              to close
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
