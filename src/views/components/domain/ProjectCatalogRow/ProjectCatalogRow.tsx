/**
 * ProjectCatalogRow — horizontal catalog row for the projects page.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/domain";
import { formatDateRange } from "@/utils/dateUtils";
import { resolveProjectImageSrc } from "@/utils/resolveProjectImageSrc";
import styles from "./ProjectCatalogRow.module.css";

export interface ProjectCatalogRowProps {
  project: Project;
  index?: number;
}

export const ProjectCatalogRow: React.FC<ProjectCatalogRowProps> = ({
  project,
  index = 0,
}) => {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project.id, project.imageUrl]);

  const resolvedSrc = resolveProjectImageSrc(project.imageUrl);
  const showImage = Boolean(resolvedSrc) && !imageFailed;
  const tech = project.technologies.slice(0, 5);

  return (
    <Link
      to={`/projects/${project.id}`}
      className={styles.row}
      aria-labelledby={`catalog-${project.id}-title`}
    >
      <span className={styles.index} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className={styles.thumb} aria-hidden={!showImage}>
        {showImage ? (
          <img
            src={resolvedSrc}
            alt=""
            width={160}
            height={120}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className={styles.thumbFallback}>
            {project.title.trim().charAt(0).toUpperCase() || "·"}
          </span>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{project.category}</span>
          {project.isActive ? (
            <span className={styles.active}>Active</span>
          ) : null}
          <time dateTime={project.startDate} className={styles.date}>
            {formatDateRange(project.startDate, project.endDate)}
          </time>
        </div>

        <h3 id={`catalog-${project.id}-title`} className={styles.title}>
          {project.title}
        </h3>

        <p className={styles.excerpt}>{project.description}</p>

        {tech.length > 0 ? (
          <ul className={styles.tech} aria-label="Technologies">
            {tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <span className={styles.arrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
};
