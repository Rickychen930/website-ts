/**
 * KeyboardShortcuts - Keyboard Shortcuts Handler
 * Best practice for keyboard navigation and shortcuts
 * 
 * Features:
 * - Global keyboard shortcuts
 * - Context-aware shortcuts
 * - Accessibility support
 * - Help dialog
 */

import React, { useEffect, useCallback, memo } from 'react';

export interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  handler: (e: KeyboardEvent) => void;
  description?: string;
  preventDefault?: boolean;
}

export interface IKeyboardShortcutsProps {
  shortcuts: KeyboardShortcut[];
  enabled?: boolean;
  showHelp?: boolean;
}

/**
 * KeyboardShortcuts Component
 * Handles keyboard shortcuts globally
 */
const KeyboardShortcutsComponent: React.FC<IKeyboardShortcutsProps> = ({
  shortcuts,
  enabled = true,
  showHelp = false,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;

      // Find matching shortcut
      const shortcut = shortcuts.find((s) => {
        return (
          s.key === e.key &&
          (s.ctrlKey === undefined || s.ctrlKey === e.ctrlKey) &&
          (s.shiftKey === undefined || s.shiftKey === e.shiftKey) &&
          (s.altKey === undefined || s.altKey === e.altKey) &&
          (s.metaKey === undefined || s.metaKey === e.metaKey)
        );
      });

      if (shortcut) {
        if (shortcut.preventDefault !== false) {
          e.preventDefault();
        }
        shortcut.handler(e);
      }
    },
    [shortcuts, enabled]
  );

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, enabled]);

  // Show help dialog (Ctrl+? or Cmd+?)
  useEffect(() => {
    if (!showHelp) return;

    const handleHelp = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        // Show help dialog with all shortcuts
        const helpText = shortcuts
          .filter((s) => s.description)
          .map((s) => {
            const modifiers = [
              s.ctrlKey && 'Ctrl',
              s.metaKey && 'Cmd',
              s.shiftKey && 'Shift',
              s.altKey && 'Alt',
            ]
              .filter(Boolean)
              .join(' + ');
            return `${modifiers} + ${s.key}: ${s.description}`;
          })
          .join('\n');

        // In production, show a proper help modal
        if (process.env.NODE_ENV === 'development') {
          console.log('Keyboard Shortcuts:\n', helpText);
        }
      }
    };

    document.addEventListener('keydown', handleHelp);
    return () => document.removeEventListener('keydown', handleHelp);
  }, [shortcuts, showHelp]);

  return null; // This component doesn't render anything
};

export const KeyboardShortcuts = memo(KeyboardShortcutsComponent);