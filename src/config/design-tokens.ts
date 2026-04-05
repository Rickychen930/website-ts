/**
 * Design Tokens - For JS/canvas and theme context only.
 *
 * Visual styling source of truth: src/styles/design-tokens.css (Portfolio: navy / gold).
 * This file must stay aligned with that palette for canvas-driven visuals.
 * Do not use these hex values in CSS; use CSS variables from design-tokens.css instead.
 */

export const colors = {
  primary: {
    50: "#f0f4f8",
    100: "#d9e2ec",
    200: "#bcccdc",
    300: "#9fb3c8",
    400: "#829ab1",
    500: "#627d98",
    600: "#486581",
    700: "#334e68",
    800: "#243b53",
    900: "#102a43",
  },
  accent: {
    50: "#fdf8e6",
    100: "#f9e9b8",
    200: "#f4d98a",
    300: "#ecc94b",
    400: "#d4af37",
    500: "#b8860b",
    600: "#9a7209",
    700: "#7d5d07",
  },
  neutral: {
    50: "#fafaf8",
    100: "#f5f4f0",
    200: "#e8e6e1",
    300: "#d4d1c9",
    400: "#9c9890",
    500: "#6b6760",
    600: "#4a4742",
    700: "#33312e",
    800: "#1f1e1c",
    900: "#141413",
  },
  success: {
    50: "#f0fdfa",
    500: "#0d9488",
    600: "#0f766e",
    700: "#115e59",
  },
  error: {
    50: "#fef2f2",
    500: "#b91c1c",
    600: "#991b1b",
    700: "#7f1d1d",
  },
  warning: {
    50: "#fffbeb",
    500: "#b45309",
    600: "#92400e",
    700: "#78350f",
  },
} as const;

/** Parse hex color to [r, g, b] for canvas/JS use (e.g. rgba(r, g, b, alpha)). */
export function hexToRgb(hex: string): [number, number, number] {
  const n = hex.replace(/^#/, "");
  const v = parseInt(n, 16);
  if (n.length === 3) {
    return [(v >> 8) * 17, ((v >> 4) & 0xf) * 17, (v & 0xf) * 17];
  }
  return [(v >> 16) & 0xff, (v >> 8) & 0xff, v & 0xff];
}

export const spacing = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
  "4xl": "6rem",
  "5xl": "8rem",
} as const;

export const typography = {
  fontFamily: {
    sans: [
      "DM Sans",
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "sans-serif",
    ],
    mono: [
      "JetBrains Mono",
      "Fira Code",
      "Menlo",
      "Monaco",
      "Consolas",
      "Liberation Mono",
      "Courier New",
      "monospace",
    ],
    display: [
      "Cormorant Garamond",
      "Georgia",
      "Times New Roman",
      "serif",
    ],
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const borderRadius = {
  none: "0",
  sm: "0.125rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
  glow: "0 0 20px rgba(184, 134, 11, 0.25)",
  glowStrong: "0 0 30px rgba(184, 134, 11, 0.35)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
} as const;

export const gradients = {
  primary:
    "linear-gradient(135deg, #243b53 0%, #334e68 50%, #486581 100%)",
  primarySoft:
    "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 50%, #bcccdc 100%)",
  accent: "linear-gradient(135deg, #d4af37 0%, #b8860b 100%)",
  hero: "linear-gradient(135deg, #fafaf8 0%, #ffffff 40%, #f5f4f0 100%)",
  heroDark:
    "linear-gradient(135deg, #102a43 0%, #243b53 50%, #334e68 100%)",
  glass:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
  card: "linear-gradient(135deg, #ffffff 0%, #fafaf8 100%)",
  heroModern:
    "linear-gradient(135deg, #f5f4f0 0%, #fafaf8 35%, #ffffff 60%, #f0f4f8 100%)",
  textGradient:
    "linear-gradient(135deg, #102a43 0%, #243b53 45%, #b8860b 100%)",
  textGradientBlue:
    "linear-gradient(135deg, #334e68 0%, #243b53 50%, #102a43 100%)",
  glow: "radial-gradient(circle, rgba(184, 134, 11, 0.12) 0%, transparent 70%)",
  mesh: "radial-gradient(at 0% 0%, rgba(16, 42, 67, 0.06) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(184, 134, 11, 0.06) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(16, 42, 67, 0.06) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(184, 134, 11, 0.06) 0px, transparent 50%)",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export const transitions = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
} as const;

export const zIndex = {
  base: 0,
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
} as const;
