/**
 * SkipLinks Component - Enhanced skip navigation for accessibility
 * Provides skip links to main content and navigation
 */

import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./SkipLinks.module.css";

export const SkipLinks: React.FC = () => {
  const location = useLocation();

  const getSkipAnnouncement = (targetId: string): string => {
    if (targetId === "main-content") return "main content";
    if (targetId === "main-navigation") return "navigation";
    if (targetId === "contact-form") return "contact form";
    if (targetId === "learning") return "curriculum";
    if (targetId === "learning-section") return "section topics";
    if (targetId === "learning-topic-detail") return "topic page";
    if (targetId === "learning-topic-content") return "article content";
    return targetId;
  };

  const handleSkip = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.focus({ preventScroll: true });
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      const announcement = document.createElement("div");
      announcement.setAttribute("role", "status");
      announcement.setAttribute("aria-live", "polite");
      announcement.setAttribute("aria-atomic", "true");
      announcement.className = "sr-only";
      announcement.textContent = `Skipped to ${getSkipAnnouncement(targetId)}`;
      document.body.appendChild(announcement);
      setTimeout(() => document.body.removeChild(announcement), 1000);
    }
  };

  return (
    <nav
      className={styles.skipLinks}
      aria-label="Skip navigation"
      data-print="hide"
    >
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
      {(location.pathname === "/learning" ||
        location.pathname.startsWith("/learning/")) && (
        <>
          <a
            href={
              location.pathname === "/learning"
                ? "#learning"
                : /^\/learning\/[^/]+$/.test(location.pathname)
                  ? "#learning-section"
                  : "#learning-topic-detail"
            }
            className={styles.skipLink}
            onClick={(e) => {
              const target =
                location.pathname === "/learning"
                  ? "learning"
                  : /^\/learning\/[^/]+$/.test(location.pathname)
                    ? "learning-section"
                    : "learning-topic-detail";
              handleSkip(e, target);
            }}
            aria-label="Skip to curriculum"
          >
            Skip to curriculum
          </a>
          {/^\/learning\/[^/]+\/[^/]+$/.test(location.pathname) && (
            <a
              href="#learning-topic-content"
              className={styles.skipLink}
              onClick={(e) => handleSkip(e, "learning-topic-content")}
              aria-label="Skip to article content"
            >
              Skip to article
            </a>
          )}
        </>
      )}
    </nav>
  );
};
