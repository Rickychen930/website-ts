/**
 * SkipLinks Component - Enhanced skip navigation for accessibility
 * Provides skip links to main content and navigation
 */

import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SkipLinks.module.css";

export const SkipLinks: React.FC = () => {
  const location = useLocation();

  const handleSkip = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      // Announce to screen readers
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = styles.srOnly;
      announcement.textContent = `Skipped to ${targetId === "main-content" ? "main content" : "navigation"}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  };

  return (
    <nav className={styles.skipLinks} aria-label="Skip navigation">
      <a
        href="#main-content"
        className={styles.skipLink}
        onClick={(e) => handleSkip(e, "main-content")}
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      <a
        href="#main-navigation"
        className={styles.skipLink}
        onClick={(e) => handleSkip(e, "main-navigation")}
        aria-label="Skip to navigation"
      >
        Skip to navigation
      </a>
      {location.pathname === "/contact" && (
        <a
          href="#contact-form"
          className={styles.skipLink}
          onClick={(e) => handleSkip(e, "contact-form")}
          aria-label="Skip to contact form"
        >
          Skip to contact form
        </a>
      )}
    </nav>
  );
};
