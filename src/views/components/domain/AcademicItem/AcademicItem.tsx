/**
 * AcademicItem Component - Domain Component
 * Displays academic/education information
 */

import React from "react";
import type { Academic } from "@/types/domain";
import { Typography } from "@/views/components/ui/Typography";
import { formatDateRange } from "@/utils/dateUtils";
import styles from "./AcademicItem.module.css";

export interface AcademicItemProps {
  academic: Academic;
}

export const AcademicItem: React.FC<AcademicItemProps> = ({ academic }) => {
  return (
    <div className={styles.academicItem}>
      <div className={styles.header}>
        <Typography variant="h5" weight="semibold">
          {academic.degree}
        </Typography>
        <Typography variant="body" weight="medium" color="primary">
          {academic.institution}
        </Typography>
        <Typography variant="small" color="tertiary">
          {academic.field}
        </Typography>
        <Typography variant="small" color="secondary">
          {formatDateRange(academic.startDate, academic.endDate)}
        </Typography>
      </div>
      {academic.description && (
        <Typography
          variant="body"
          color="secondary"
          className={styles.description}
        >
          {academic.description}
        </Typography>
      )}
    </div>
  );
};
