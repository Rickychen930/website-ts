/**
 * Theme Toggle - Dark mode toggle button
 */

import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ThemeToggle.module.css";

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      type="button"
    >
      <div className={styles.toggleContainer}>
        <span className={`${styles.icon} ${styles.sunIcon}`} aria-hidden="true">
          ☀️
        </span>
        <span
          className={`${styles.icon} ${styles.moonIcon}`}
          aria-hidden="true"
        >
          🌙
        </span>
        <div
          className={`${styles.slider} ${isDark ? styles.sliderDark : ""}`}
        />
      </div>
    </button>
  );
};
