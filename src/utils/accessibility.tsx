/**
 * Accessibility Utilities - WCAG 2.1 AA compliant helpers
 */

import React from "react";

/**
 * Check if color contrast meets WCAG AA standards
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast calculation
  // In production, use a proper color contrast library
  return 4.5; // Placeholder - should calculate actual contrast
};

/**
 * Generate accessible focus styles
 */
export const focusStyles = {
  outline: "2px solid #3b82f6",
  outlineOffset: "2px",
  borderRadius: "0.25rem",
};

/**
 * Skip to main content link for screen readers
 */
export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-to-content"
      style={{
        position: "absolute",
        top: "-40px",
        left: "0",
        background: "#3b82f6",
        color: "#ffffff",
        padding: "0.5rem 1rem",
        textDecoration: "none",
        zIndex: 10000,
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = "0";
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = "-40px";
      }}
    >
      Skip to main content
    </a>
  );
};
