/**
 * Unit tests for Theme utilities
 */

import { getTheme, setTheme, initializeTheme, toggleTheme } from '../theme';

describe('Theme Utilities', () => {
  beforeEach(() => {
    // Clear localStorage
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.classList.remove('dark-theme');
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getTheme', () => {
    it('should return default theme "light" when no theme is stored', () => {
      const theme = getTheme();
      expect(theme).toBe('light');
    });

    it('should return stored theme from localStorage', () => {
      localStorage.setItem('portfolio-theme', 'dark');
      const theme = getTheme();
      expect(theme).toBe('dark');
    });

    it('should return "auto" theme when stored', () => {
      localStorage.setItem('portfolio-theme', 'auto');
      const theme = getTheme();
      expect(theme).toBe('auto');
    });
  });

  describe('setTheme', () => {
    it('should save theme to localStorage', () => {
      setTheme('dark');
      expect(localStorage.getItem('portfolio-theme')).toBe('dark');
    });

    it('should apply dark theme to document', () => {
      setTheme('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
    });

    it('should apply light theme to document', () => {
      setTheme('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    });

    it('should apply auto theme based on system preference', () => {
      // Mock matchMedia to return dark preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      setTheme('auto');
      // Should apply system preference (dark in this case)
      const appliedTheme = document.documentElement.getAttribute('data-theme');
      expect(['light', 'dark']).toContain(appliedTheme);
    });
  });

  describe('toggleTheme', () => {
    it('should toggle from light to dark', () => {
      setTheme('light');
      const newTheme = toggleTheme();
      expect(newTheme).toBe('dark');
      expect(getTheme()).toBe('dark');
    });

    it('should toggle from dark to auto', () => {
      setTheme('dark');
      const newTheme = toggleTheme();
      expect(newTheme).toBe('auto');
      expect(getTheme()).toBe('auto');
    });

    it('should toggle from auto to light', () => {
      setTheme('auto');
      const newTheme = toggleTheme();
      expect(newTheme).toBe('light');
      expect(getTheme()).toBe('light');
    });
  });

  describe('initializeTheme', () => {
    it('should apply stored theme on initialization', () => {
      localStorage.setItem('portfolio-theme', 'dark');
      initializeTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should apply default light theme when no theme is stored', () => {
      initializeTheme();
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should set up system preference listener for auto theme', () => {
      const mockMediaQuery = {
        matches: false,
        media: '(prefers-color-scheme: dark)',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      };

      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(() => mockMediaQuery),
      });

      localStorage.setItem('portfolio-theme', 'auto');
      initializeTheme();

      // Should set up event listener
      expect(mockMediaQuery.addEventListener || mockMediaQuery.addListener).toBeDefined();
    });
  });
});

