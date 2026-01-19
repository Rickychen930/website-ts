/**
 * TestimonialCard Component - Domain Component
 * Displays client/colleague testimonial
 */

import React from "react";
import type { Testimonial } from "@/types/domain";
import { Card } from "@/views/components/ui/Card";
import { Typography } from "@/views/components/ui/Typography";
import { formatDate } from "@/utils/dateUtils";
import styles from "./TestimonialCard.module.css";

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
}) => {
  return (
    <Card variant="elevated" className={styles.testimonialCard}>
      <div className={styles.quote}>
        <svg
          className={styles.quoteIcon}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      <Typography variant="body" color="secondary" className={styles.content}>
        {testimonial.content}
      </Typography>

      <div className={styles.footer}>
        <div className={styles.author}>
          {testimonial.avatarUrl && (
            <img
              src={testimonial.avatarUrl}
              alt={testimonial.author}
              className={styles.avatar}
            />
          )}
          <div>
            <Typography variant="small" weight="semibold">
              {testimonial.author}
            </Typography>
            <Typography variant="caption" color="tertiary">
              {testimonial.role} at {testimonial.company}
            </Typography>
          </div>
        </div>
        <Typography variant="caption" color="tertiary">
          {formatDate(testimonial.date)}
        </Typography>
      </div>
    </Card>
  );
};
