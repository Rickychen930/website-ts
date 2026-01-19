/**
 * HonorCard Component - Domain Component
 * Displays honors/awards
 */

import React from "react";
import type { Honor } from "@/types/domain";
import { Card } from "@/views/components/ui/Card";
import { Typography } from "@/views/components/ui/Typography";
import { formatDate } from "@/utils/dateUtils";
import styles from "./HonorCard.module.css";

export interface HonorCardProps {
  honor: Honor;
}

export const HonorCard: React.FC<HonorCardProps> = ({ honor }) => {
  return (
    <Card variant="elevated" className={styles.honorCard}>
      <div className={styles.header}>
        <Typography variant="h5" weight="semibold">
          {honor.title}
        </Typography>
        <Typography variant="small" color="tertiary">
          {honor.issuer}
        </Typography>
      </div>

      <div className={styles.content}>
        <Typography variant="small" color="secondary">
          {formatDate(honor.date)}
        </Typography>
        {honor.description && (
          <Typography
            variant="body"
            color="secondary"
            className={styles.description}
          >
            {honor.description}
          </Typography>
        )}
      </div>

      {honor.url && (
        <a
          href={honor.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Learn More
        </a>
      )}
    </Card>
  );
};
