/**
 * ThemeToggle - Theme Switcher Component
 * Professional dark mode toggle with smooth transitions
 * 
 * Features:
 * - Light/Dark/Auto theme switching
 * - Smooth animations
 * - Keyboard accessible
 * - ARIA labels for accessibility
 */

import React, { Component } from 'react';
import { getTheme, setTheme, toggleTheme, Theme } from '../../utils/theme';
import './ThemeToggle.css';

export interface IThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

interface IThemeToggleState {
  theme: Theme;
  isAnimating: boolean;
  isDropdownOpen: boolean;
}

/**
 * ThemeToggle Component
 * Toggle between light, dark, and auto themes
 */
export class ThemeToggle extends Component<IThemeToggleProps, IThemeToggleState> {
  private mediaQuery: MediaQueryList | null = null;
  private mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;

  private dropdownRef: React.RefObject<HTMLDivElement | null> = React.createRef();
  private optionRefs: React.RefObject<HTMLButtonElement | null>[] = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ];

  constructor(props: IThemeToggleProps) {
    super(props);
    this.state = {
      theme: getTheme(),
      isAnimating: false,
      isDropdownOpen: false,
    };
  }

  componentDidMount(): void {
    // Listen for theme changes from other components
    window.addEventListener('storage', this.handleStorageChange);
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keydown', this.handleKeyDown);
    
    // Listen for system preference changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      if (this.mediaQuery.addEventListener) {
        this.mediaQueryHandler = () => {
          if (this.state.theme === 'auto') {
            this.forceUpdate();
          }
        };
        this.mediaQuery.addEventListener('change', this.mediaQueryHandler);
      }
    }
  }

  componentWillUnmount(): void {
    window.removeEventListener('storage', this.handleStorageChange);
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.mediaQuery && this.mediaQueryHandler) {
      if (this.mediaQuery.removeEventListener) {
        this.mediaQuery.removeEventListener('change', this.mediaQueryHandler);
      }
    }
  }

  private handleStorageChange = (e: StorageEvent): void => {
    if (e.key === 'portfolio-theme') {
      const newTheme = (e.newValue as Theme) || 'light';
      this.setState({ theme: newTheme });
    }
  };

  private handleToggle = (): void => {
    // If dropdown is open, close it
    if (this.state.isDropdownOpen) {
      this.setState({ isDropdownOpen: false });
      return;
    }
    
    this.setState({ isAnimating: true });
    
    const newTheme = toggleTheme();
    this.setState({ theme: newTheme });
    
    // Reset animation state
    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 300);
  };

  private handleDropdownToggle = (e?: React.MouseEvent | React.KeyboardEvent): void => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState((prevState) => ({ isDropdownOpen: !prevState.isDropdownOpen }));
  };

  private handleClickOutside = (e: MouseEvent): void => {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(e.target as Node)
    ) {
      this.setState({ isDropdownOpen: false });
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    // Close dropdown on Escape
    if (e.key === 'Escape' && this.state.isDropdownOpen) {
      this.setState({ isDropdownOpen: false });
    }

    // Handle arrow key navigation in dropdown
    if (this.state.isDropdownOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      const currentIndex = this.optionRefs.findIndex(
        (ref) => ref.current === document.activeElement
      );
      const themes: Theme[] = ['light', 'dark', 'auto'];
      
      let nextIndex: number;
      if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < themes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : themes.length - 1;
      }

      if (this.optionRefs[nextIndex]?.current) {
        this.optionRefs[nextIndex].current?.focus();
      }
    }
  };

  private handleOptionKeyDown = (e: React.KeyboardEvent, theme: Theme): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.handleThemeSelect(theme);
    }
  };

  private handleThemeSelect = (theme: Theme): void => {
    if (theme === this.state.theme) {
      this.setState({ isDropdownOpen: false });
      return;
    }
    
    this.setState({ isAnimating: true, theme, isDropdownOpen: false });
    setTheme(theme);
    
    setTimeout(() => {
      this.setState({ isAnimating: false });
    }, 300);
  };

  private getThemeIcon = (): string => {
    const { theme } = this.state;
    
    if (theme === 'auto') {
      return '🌓'; // Auto/system
    }
    
    const effectiveTheme = theme === 'dark' ? 'dark' : 'light';
    return effectiveTheme === 'dark' ? '🌙' : '☀️';
  };

  private getThemeLabel = (): string => {
    const { theme } = this.state;
    
    switch (theme) {
      case 'light':
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'auto':
        return 'Auto (System)';
      default:
        return 'Theme';
    }
  };

  private getNextThemeLabel = (): string => {
    const { theme } = this.state;
    
    switch (theme) {
      case 'light':
        return 'Switch to Dark Mode';
      case 'dark':
        return 'Switch to Auto Mode';
      case 'auto':
        return 'Switch to Light Mode';
      default:
        return 'Toggle Theme';
    }
  };

  render(): React.ReactNode {
    const { className = '', showLabel = false, size = 'medium' } = this.props;
    const { theme, isAnimating, isDropdownOpen } = this.state;
    const sizeClass = `theme-toggle--${size}`;

    return (
      <div className={`theme-toggle ${sizeClass} ${className}`} ref={this.dropdownRef}>
        <button
          type="button"
          className={`theme-toggle__button ${isAnimating ? 'theme-toggle__button--animating' : ''} ${isDropdownOpen ? 'theme-toggle__button--open' : ''}`}
          onClick={this.handleDropdownToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.handleDropdownToggle(e);
            } else if (e.key === 'ArrowDown' && !isDropdownOpen) {
              e.preventDefault();
              this.setState({ isDropdownOpen: true });
            }
          }}
          aria-label={this.getNextThemeLabel()}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
          aria-pressed={theme !== 'auto' ? (theme === 'dark') : undefined}
          title={this.getNextThemeLabel()}
        >
          <span 
            className="theme-toggle__icon"
            aria-hidden="true"
            role="img"
          >
            {this.getThemeIcon()}
          </span>
          {showLabel && (
            <span className="theme-toggle__label">
              {this.getThemeLabel()}
            </span>
          )}
        </button>
        
        {/* Dropdown menu for direct theme selection */}
        <div 
          className={`theme-toggle__dropdown ${isDropdownOpen ? 'theme-toggle__dropdown--open' : ''}`}
          role="menu"
          aria-label="Theme options"
        >
          <button
            ref={this.optionRefs[0]}
            type="button"
            role="menuitemradio"
            className={`theme-toggle__option ${theme === 'light' ? 'theme-toggle__option--active' : ''}`}
            onClick={() => this.handleThemeSelect('light')}
            onKeyDown={(e) => this.handleOptionKeyDown(e, 'light')}
            aria-label="Light Mode"
            aria-checked={theme === 'light'}
          >
            ☀️ Light
          </button>
          <button
            ref={this.optionRefs[1]}
            type="button"
            role="menuitemradio"
            className={`theme-toggle__option ${theme === 'dark' ? 'theme-toggle__option--active' : ''}`}
            onClick={() => this.handleThemeSelect('dark')}
            onKeyDown={(e) => this.handleOptionKeyDown(e, 'dark')}
            aria-label="Dark Mode"
            aria-checked={theme === 'dark'}
          >
            🌙 Dark
          </button>
          <button
            ref={this.optionRefs[2]}
            type="button"
            role="menuitemradio"
            className={`theme-toggle__option ${theme === 'auto' ? 'theme-toggle__option--active' : ''}`}
            onClick={() => this.handleThemeSelect('auto')}
            onKeyDown={(e) => this.handleOptionKeyDown(e, 'auto')}
            aria-label="Auto Mode (System)"
            aria-checked={theme === 'auto'}
          >
            🌓 Auto
          </button>
        </div>
      </div>
    );
  }
}

export default ThemeToggle;
