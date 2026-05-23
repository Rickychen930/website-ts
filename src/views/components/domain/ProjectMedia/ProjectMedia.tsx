/**
 * ProjectMedia — image with fallback initial for project cards/rows.
 */

import React from "react";
import { useProjectImage } from "@/hooks/useProjectImage";
import styles from "./ProjectMedia.module.css";

export interface ProjectMediaProps {
  projectId: string;
  imageUrl?: string;
  title: string;
  loading?: "eager" | "lazy";
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}

export const ProjectMedia: React.FC<ProjectMediaProps> = ({
  projectId,
  imageUrl,
  title,
  loading = "lazy",
  width = 640,
  height = 427,
  className = "",
  imageClassName = "",
  fallbackClassName = "",
}) => {
  const { src, showImage, onError } = useProjectImage(imageUrl, projectId);
  const initial = title.trim().charAt(0).toUpperCase() || "·";

  return (
    <div className={`${styles.media} ${className}`}>
      {showImage && src ? (
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          referrerPolicy="no-referrer"
          className={imageClassName}
          onError={onError}
        />
      ) : (
        <span className={`${styles.fallback} ${fallbackClassName}`} aria-hidden>
          {initial}
        </span>
      )}
    </div>
  );
};
