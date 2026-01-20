/**
 * AccessibilityAnnouncer Component - Announces page changes to screen readers
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const AccessibilityAnnouncer: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Announce page change to screen readers
    const pageNames: Record<string, string> = {
      "/": "Home page",
      "/about": "About page",
      "/projects": "Projects page",
      "/experience": "Experience page",
      "/contact": "Contact page",
    };

    const pageName = pageNames[location.pathname] || "Page";

    // Create announcement element
    const announcement = document.createElement("div");
    announcement.setAttribute("role", "status");
    announcement.setAttribute("aria-live", "polite");
    announcement.setAttribute("aria-atomic", "true");
    announcement.className = "sr-only";
    announcement.textContent = `Navigated to ${pageName}`;
    document.body.appendChild(announcement);

    // Remove after announcement
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);

    // Focus main content on route change
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.focus();
    }
  }, [location.pathname]);

  return null;
};
