/**
 * Theme Toggle Component
 * Professional theme switcher for light/dark mode
 */

import React, { Component, ReactNode } from "react";
import { getTheme, toggleTheme, Theme } from "../../../utils/theme";
import "../../../assets/css/theme-toggle.css";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

interface ThemeToggleState {
  theme: Theme;
}

export class ThemeToggle extends Component<ThemeToggleProps, ThemeToggleState> {
  constructor(props: ThemeToggleProps) {
    super(props);
    this.state = {
      theme: getTheme(),
    };
  }

  private storageHandler?: (e: StorageEvent) => void;
  private mediaQuery?: MediaQueryList;
  private mediaQueryHandler?: () => void;

  componentDidMount(): void {
    // Listen for theme changes
    if (typeof window !== "undefined") {
      this.storageHandler = (e: StorageEvent) => {
        if (e.key === "portfolio-theme") {
          this.setState({ theme: getTheme() });
        }
      };

      window.addEventListener("storage", this.storageHandler);

      // Also listen for system preference changes
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      this.mediaQueryHandler = () => {
        const currentTheme = getTheme();
        if (currentTheme === "auto") {
          this.setState({ theme: "auto" });
        }
      };

      if (this.mediaQuery.addEventListener) {
        this.mediaQuery.addEventListener("change", this.mediaQueryHandler);
      } else if (this.mediaQuery.addListener) {
        // Fallback for older browsers
        this.mediaQuery.addListener(this.mediaQueryHandler);
      }
    }
  }

  componentWillUnmount(): void {
    // Cleanup event listeners to prevent memory leaks
    if (typeof window !== "undefined") {
      if (this.storageHandler) {
        window.removeEventListener("storage", this.storageHandler);
        this.storageHandler = undefined;
      }

      if (this.mediaQuery && this.mediaQueryHandler) {
        if (this.mediaQuery.removeEventListener) {
          this.mediaQuery.removeEventListener("change", this.mediaQueryHandler);
        } else if (this.mediaQuery.removeListener) {
          // Fallback for older browsers
          this.mediaQuery.removeListener(this.mediaQueryHandler);
        }
        this.mediaQuery = undefined;
        this.mediaQueryHandler = undefined;
      }
    }
  }

  private handleToggle = (): void => {
    const newTheme = toggleTheme();
    this.setState({ theme: newTheme });
  };

  private getIcon(): string {
    const { theme } = this.state;

    if (theme === "dark") {
      return "🌙";
    } else if (theme === "auto") {
      return "🔄";
    } else {
      return "☀️";
    }
  }

  private getLabel(): string {
    const { theme } = this.state;

    if (theme === "dark") {
      return "Dark Mode";
    } else if (theme === "auto") {
      return "Auto Mode";
    } else {
      return "Light Mode";
    }
  }

  private getAriaLabel(): string {
    const { theme } = this.state;
    return `Switch to ${theme === "light" ? "dark" : theme === "dark" ? "auto" : "light"} mode`;
  }

  render(): ReactNode {
    const { className = "", showLabel = false } = this.props;
    const { theme } = this.state;

    return (
      <button
        className={`theme-toggle ${className}`.trim()}
        onClick={this.handleToggle}
        type="button"
        aria-label={this.getAriaLabel()}
        title={this.getLabel()}
        data-theme={theme}
      >
        <span className="theme-toggle-icon" aria-hidden="true">
          {this.getIcon()}
        </span>
        {showLabel && (
          <span className="theme-toggle-label">{this.getLabel()}</span>
        )}
      </button>
    );
  }
}

export default ThemeToggle;
