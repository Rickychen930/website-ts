/**
 * StatItem Component - Domain Component
 * Displays statistics/metrics with animated counter
 */

import React, { useEffect } from "react";
import type { Stat } from "@/types/domain";
import { Typography } from "@/views/components/ui/Typography";
import { useCounter } from "@/hooks/useCounter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./StatItem.module.css";

export interface StatItemProps {
  stat: Stat;
  index?: number;
}

export const StatItem: React.FC<StatItemProps> = ({ stat, index = 0 }) => {
  const { elementRef, isVisible } = useScrollReveal({ threshold: 0.5 });
  const numericValue = typeof stat.value === "number" ? stat.value : 0;
  const { count, start } = useCounter(numericValue, { startOnView: false });

  useEffect(() => {
    if (isVisible) {
      // Delay start based on index for stagger effect
      setTimeout(() => {
        start();
      }, index * 100);
    }
  }, [isVisible, start, index]);

  const displayValue = typeof stat.value === "number" ? count : stat.value;

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${styles.statItem} scroll-reveal ${isVisible ? "revealed" : ""}`}
    >
      <Typography variant="h2" weight="bold" className={styles.value}>
        {displayValue}
        {stat.unit && <span className={styles.unit}>{stat.unit}</span>}
      </Typography>
      <Typography variant="body" weight="medium" className={styles.label}>
        {stat.label}
      </Typography>
      {stat.description && (
        <Typography
          variant="small"
          color="tertiary"
          className={styles.description}
        >
          {stat.description}
        </Typography>
      )}
    </div>
  );
};
