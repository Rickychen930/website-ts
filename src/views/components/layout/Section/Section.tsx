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
  /** Full-width gradient + grid intro (inner pages, matches home aesthetic) */
  surface?: "default" | "hero";
  /** Use semantic h1 for the section title (e.g. article / topic pages) */
  titleHeadingLevel?: 1 | 2;
  /** Omit soft orbs when this section already has custom art (e.g. Home hero) */
  suppressAmbientOrbs?: boolean;
  /** Drop inner horizontal padding + max-width so the section controls inset (e.g. Home hero). */
  containerBleed?: boolean;
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
  surface = "default",
  titleHeadingLevel = 2,
  suppressAmbientOrbs = false,
  containerBleed = false,
  ...props
}) => {
  const titleId = id ? `${id}-title` : undefined;
  const titleVariant = titleHeadingLevel === 1 ? "h1" : "h2";
  const titleTag = titleHeadingLevel === 1 ? "h1" : "h2";
  const headerClass =
    headerAlign === "start" ? styles.headerStart : styles.header;
  const plainClass = titleDecoration === "none" ? ` ${styles.headerPlain}` : "";

  return (
    <section
      id={id}
      className={`${styles.section} ${variant === "alt" ? styles.sectionAlt : ""} ${surface === "hero" ? styles.sectionSurfaceHero : ""} ${className}`.trim()}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      {surface === "hero" ? (
        <div className={styles.surfaceHeroAccentOrbs} aria-hidden="true" />
      ) : null}
      {variant === "alt" && surface !== "hero" && !suppressAmbientOrbs ? (
        <div className={styles.sectionAltAccentOrbs} aria-hidden="true" />
      ) : null}
      {variant === "default" &&
      surface === "default" &&
      !suppressAmbientOrbs ? (
        <div className={styles.sectionDefaultAccentOrbs} aria-hidden="true" />
      ) : null}
      <div
        className={`${styles.container}${containerBleed ? ` ${styles.containerBleed}` : ""}`}
      >
        {(label || title || subtitle || info) && (
          <header className={`${headerClass}${plainClass}`.trim()}>
            {label && (
              <span className={styles.label} aria-hidden="true">
                {label}
              </span>
            )}
            {title && (
              <Typography
                variant={titleVariant}
                weight="bold"
                className={
                  titleHeadingLevel === 1
                    ? `${styles.title} ${styles.titleAsPageH1}`
                    : styles.title
                }
                as={titleTag}
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
