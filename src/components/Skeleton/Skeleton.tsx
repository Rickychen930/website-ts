/**
 * Skeleton Component - Advanced loading skeleton with multiple variants
 */

import React from "react";
import styles from "./Skeleton.module.css";

interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular" | "card" | "avatar";
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
  animation?: "pulse" | "wave" | "none";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "text",
  width,
  height,
  lines = 1,
  className = "",
  animation = "wave",
}) => {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height)
    style.height = typeof height === "number" ? `${height}px` : height;

  if (variant === "text" && lines > 1) {
    return (
      <div className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${styles.skeleton} ${styles[variant]} ${styles[animation]}`}
            style={{
              ...style,
              width: index === lines - 1 ? "80%" : "100%",
              marginBottom: index < lines - 1 ? "0.5rem" : 0,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${styles[animation]} ${className}`}
      style={style}
      aria-hidden="true"
      aria-label="Loading content"
    />
  );
};
