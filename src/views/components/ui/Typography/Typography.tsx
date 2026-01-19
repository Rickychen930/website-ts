/**
 * Typography Component - Atomic UI Component
 * Consistent text styling system
 */

import React from "react";
import styles from "./Typography.module.css";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "small"
  | "caption";
export type TypographyWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold";
export type TypographyColor = "primary" | "secondary" | "tertiary" | "inverse";

export interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  as?: keyof React.JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  // Allow element-specific attributes (e.g., dateTime for <time> element)
  dateTime?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  weight = "normal",
  color = "primary",
  as,
  children,
  className = "",
  ...rest
}) => {
  const Component = (as ||
    getDefaultTag(variant)) as keyof React.JSX.IntrinsicElements;

  const classNames = [
    styles.typography,
    styles[`typography--${variant}`],
    styles[`typography--weight-${weight}`],
    styles[`typography--color-${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return React.createElement(
    Component,
    { className: classNames, ...rest },
    children,
  );
};

function getDefaultTag(
  variant: TypographyVariant,
): keyof React.JSX.IntrinsicElements {
  if (variant.startsWith("h")) {
    return variant as keyof React.JSX.IntrinsicElements;
  }
  return "p";
}
