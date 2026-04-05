/**
 * Section Component - Layout Component
 * Consistent section wrapper
 */

import React from "react";
import { Typography } from "@/views/components/ui/Typography";
import styles from "./Section.module.css";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  subtitle?: string;
  /** Small label above title (eyebrow) e.g. "Selected work", "In numbers" */
  label?: string;
  /** Optional mini info line below subtitle */
  info?: string;
  id?: string;
  /** Use alternate background band for visual rhythm */
  variant?: "default" | "alt";
  /** Center (default) or left-aligned header for editorial rhythm */
  headerAlign?: "center" | "start";
  /** Gold underlines on label/title; `none` reduces repetition on dense pages */
  titleDecoration?: "underline" | "none";
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  label,
  info,
  id,
  children,
  className = "",
  variant = "default",
  headerAlign = "center",
  titleDecoration = "underline",
  ...props
}) => {
  const titleId = id ? `${id}-title` : undefined;
  const headerClass =
    headerAlign === "start" ? styles.headerStart : styles.header;
  const plainClass = titleDecoration === "none" ? ` ${styles.headerPlain}` : "";

  return (
    <section
      id={id}
      className={`${styles.section} ${variant === "alt" ? styles.sectionAlt : ""} ${className}`.trim()}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      <div className={styles.container}>
        {(label || title || subtitle || info) && (
          <header className={`${headerClass}${plainClass}`.trim()}>
            {label && (
              <span className={styles.label} aria-hidden="true">
                {label}
              </span>
            )}
            {title && (
              <Typography
                variant="h2"
                weight="bold"
                className={styles.title}
                as="h2"
                id={titleId}
              >
                {title}
              </Typography>
            )}
            {subtitle && (
              <Typography
                variant="body"
                color="secondary"
                className={styles.subtitle}
                as="p"
              >
                {subtitle}
              </Typography>
            )}
            {info && (
              <Typography
                variant="small"
                color="tertiary"
                className={styles.info}
                as="p"
              >
                {info}
              </Typography>
            )}
          </header>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
