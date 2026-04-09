/**
 * TestimonialCard Component - Domain Component
 * Displays client/colleague testimonial
 */

import React, { useMemo } from "react";
import type { Testimonial } from "@/types/domain";
import { Typography } from "@/views/components/ui/Typography";
import { formatDate } from "@/utils/dateUtils";
import styles from "./TestimonialCard.module.css";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const w = parts[0]!;
    return w.slice(0, 2).toUpperCase();
  }
  const first = parts[0]![0] ?? "";
  const last = parts[parts.length - 1]![0] ?? "";
  return `${first}${last}`.toUpperCase();
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  const initials = useMemo(
    () => authorInitials(testimonial.author),
    [testimonial.author],
  );

  return (
    <article
      className={styles.card}
      aria-labelledby={`tm-author-${testimonial.id}`}
    >
      <div className={styles.decorQuote} aria-hidden="true">
        “
      </div>

      <header className={styles.header}>
        {testimonial.avatarUrl ? (
          <img
            src={testimonial.avatarUrl}
            alt=""
            className={styles.avatar}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </span>
        )}
        <div className={styles.headerText}>
          <Typography
            variant="small"
            weight="semibold"
            className={styles.authorName}
            as="p"
            id={`tm-author-${testimonial.id}`}
          >
            {testimonial.author}
          </Typography>
          <Typography
            variant="caption"
            color="tertiary"
            className={styles.meta}
          >
            {testimonial.role}
            {testimonial.company ? ` · ${testimonial.company}` : ""}
          </Typography>
        </div>
      </header>

      <blockquote className={styles.quote}>
        <p className={styles.quoteBody}>{testimonial.content}</p>
      </blockquote>

      <footer className={styles.footer}>
        <time className={styles.date} dateTime={testimonial.date}>
          {formatDate(testimonial.date)}
        </time>
      </footer>
    </article>
  );
};
