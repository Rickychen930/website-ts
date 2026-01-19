/**
 * Theme Configuration
 * Centralized theme system with light/dark mode support
 */

import {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  zIndex,
} from "./design-tokens";

export interface Theme {
  colors: typeof colors;
  spacing: typeof spacing;
  typography: typeof typography;
  borderRadius: typeof borderRadius;
  shadows: typeof shadows;
  breakpoints: typeof breakpoints;
  transitions: typeof transitions;
  zIndex: typeof zIndex;
  mode: "light" | "dark";
}

export const lightTheme: Theme = {
  colors: {
    ...colors,
    background: {
      primary: colors.neutral[50],
      secondary: "#ffffff",
      tertiary: colors.neutral[100],
    },
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[700],
      tertiary: colors.neutral[500],
      inverse: "#ffffff",
    },
    border: {
      primary: colors.neutral[200],
      secondary: colors.neutral[300],
    },
  } as any,
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  zIndex,
  mode: "light",
};

export const darkTheme: Theme = {
  colors: {
    ...colors,
    background: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
    },
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      inverse: colors.neutral[900],
    },
    border: {
      primary: colors.neutral[700],
      secondary: colors.neutral[600],
    },
  } as any,
  spacing,
  typography,
  borderRadius,
  shadows,
  breakpoints,
  transitions,
  zIndex,
  mode: "dark",
};

export const defaultTheme = lightTheme;
