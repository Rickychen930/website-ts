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
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  title,
  subtitle,
  id,
  children,
  className = "",
  ...props
}) => {
  const titleId = id ? `${id}-title` : undefined;

  return (
    <section
      id={id}
      className={`${styles.section} ${className}`}
      aria-labelledby={title ? titleId : undefined}
      {...props}
    >
      <div className={styles.container}>
        {(title || subtitle) && (
          <header className={styles.header}>
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
          </header>
        )}
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
};
