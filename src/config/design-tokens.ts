/**
 * Design Tokens - For JS/canvas and theme context only.
 * Aligned with src/styles/design-tokens.css — modern AI / IT (slate + sky cyan + violet hints).
 */

export const colors = {
  primary: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
  },
  accent: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
  },
  neutral: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
  success: {
    50: "#f0fdfa",
    500: "#0d9488",
    600: "#0f766e",
    700: "#115e59",
  },
  error: {
    50: "#fef2f2",
    500: "#dc2626",
    600: "#b91c1c",
    700: "#991b1b",
  },
  warning: {
    50: "#fffbeb",
    500: "#d97706",
    600: "#b45309",
    700: "#92400e",
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
      "Plus Jakarta Sans",
      "Segoe UI",
      "system-ui",
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
      "Space Grotesk",
      "Segoe UI",
      "system-ui",
      "sans-serif",
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
  glow: "0 0 28px rgba(14, 165, 233, 0.25)",
  glowStrong: "0 0 42px rgba(14, 165, 233, 0.32)",
  inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
} as const;

export const gradients = {
  primary:
    "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
  primarySoft:
    "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
  accent: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
  hero: "linear-gradient(165deg, #f8fafc 0%, #f1f5f9 40%, #e0f2fe 100%)",
  heroDark:
    "linear-gradient(165deg, #020617 0%, #0f172a 100%)",
  glass:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
  card: "linear-gradient(165deg, #ffffff 0%, #f8fafc 100%)",
  heroModern:
    "linear-gradient(165deg, #f1f5f9 0%, #f8fafc 50%, #ffffff 70%, #e0f2fe 100%)",
  textGradient:
    "linear-gradient(135deg, #0f172a 0%, #0284c7 55%, #6366f1 100%)",
  textGradientBlue:
    "linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)",
  glow: "radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, transparent 70%)",
  mesh: "radial-gradient(at 0% 0%, rgba(14, 165, 233, 0.08) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(99, 102, 241, 0.07) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(15, 23, 42, 0.06) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(14, 165, 233, 0.05) 0px, transparent 50%)",
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
