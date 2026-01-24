/**
 * Loading Component - Reusable loading indicator with skeleton support
 * Version 3: Added skeleton loading option
 */

import React from "react";
import { Skeleton } from "@/components/Skeleton";
import styles from "./Loading.module.css";

export interface LoadingProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
  useSkeleton?: boolean;
  skeletonVariant?: "text" | "circular" | "rectangular" | "card" | "avatar";
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  fullScreen = false,
  message,
  useSkeleton = false,
  skeletonVariant = "card",
}) => {
  if (useSkeleton) {
    if (fullScreen) {
      return (
        <div className={styles.fullScreen}>
          <div className={styles.skeletonContainer}>
            <Skeleton variant={skeletonVariant} width="100%" height="100%" />
            {message && <p className={styles.message}>{message}</p>}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.container}>
        <Skeleton variant={skeletonVariant} width="100%" height="200px" />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    );
  }

  const containerClass = fullScreen ? styles.fullScreen : styles.container;
  const spinnerClass = `${styles.spinner} ${styles[`spinner--${size}`]}`;

  return (
    <div className={containerClass}>
      <div className={spinnerClass} aria-label="Loading" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
