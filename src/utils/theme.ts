/**
 * Theme Management
 * Professional dark mode and theme switching
 */

export type Theme = "light" | "dark" | "auto";

const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_ATTRIBUTE = "data-theme";

/**
 * Get system preference
 */
function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/**
 * Apply theme to document
 */
function applyTheme(theme: Theme): void {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  let effectiveTheme: "light" | "dark";

  if (theme === "auto") {
    effectiveTheme = getSystemPreference();
  } else {
    effectiveTheme = theme;
  }

  root.setAttribute(THEME_ATTRIBUTE, effectiveTheme);
  root.classList.toggle("dark-theme", effectiveTheme === "dark");
}

/**
 * Get current theme
 */
export function getTheme(): Theme {
  if (typeof window === "undefined") return "light";
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  return stored || "light";
}

/**
 * Set theme
 */
export function setTheme(theme: Theme): void {
  if (typeof window === "undefined") return;
  
  localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
}

/**
 * Initialize theme
 */
export function initializeTheme(): void {
  const theme = getTheme();
  applyTheme(theme);

  // Listen for system preference changes
  if (typeof window !== "undefined") {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      const currentTheme = getTheme();
      if (currentTheme === "auto") {
        applyTheme("auto");
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
  }
}

/**
 * Toggle between light and dark
 */
export function toggleTheme(): Theme {
  const current = getTheme();
  let newTheme: Theme;

  if (current === "light") {
    newTheme = "dark";
  } else if (current === "dark") {
    newTheme = "auto";
  } else {
    newTheme = "light";
  }

  setTheme(newTheme);
  return newTheme;
}

