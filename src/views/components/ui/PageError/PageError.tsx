/**
 * PageError - Consistent error state for public pages (profile load failure)
 * Use with Loading for standardized loading/error UX.
 */

import React from "react";
import { Typography } from "@/views/components/ui/Typography";
import { Button } from "@/views/components/ui/Button";
import styles from "./PageError.module.css";

export interface PageErrorProps {
  /** Short title, e.g. "Failed to load profile" */
  title: string;
  /** User-facing message (error message or fallback) */
  message: string;
  /** Optional tip (e.g. "Run npm run seed in backend") */
  tip?: React.ReactNode;
  /** Retry button label */
  retryLabel?: string;
  /** Called when user clicks Retry; pass refetch from ProfileContext */
  onRetry: () => void;
  /** Optional class name */
  className?: string;
}

export const PageError: React.FC<PageErrorProps> = ({
  title,
  message,
  tip,
  retryLabel = "Retry",
  onRetry,
  className,
}) => (
  <div
    className={[styles.pageError, className].filter(Boolean).join(" ")}
    role="alert"
    aria-live="assertive"
  >
    <Typography variant="h3">{title}</Typography>
    <Typography variant="body" color="secondary">
      {message}
    </Typography>
    {tip && (
      <Typography variant="small" color="tertiary" className={styles.tip}>
        {tip}
      </Typography>
    )}
    <Button
      onClick={onRetry}
      variant="primary"
      className={styles.retryButton}
      aria-label={retryLabel}
    >
      {retryLabel}
    </Button>
  </div>
);
