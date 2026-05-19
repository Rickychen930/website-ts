/**
 * ProjectSpotlight — featured projects grid (equal editorial cards).
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/domain";
import { formatDateRange } from "@/utils/dateUtils";
import { resolveProjectImageSrc } from "@/utils/resolveProjectImageSrc";
import styles from "./ProjectSpotlight.module.css";

export interface ProjectSpotlightProps {
  projects: readonly Project[];
}

function formatCategory(category: string): string {
  if (!category.trim()) return "Project";
  return category.charAt(0).toUpperCase() + category.slice(1);
}

function SpotlightCard({
  project,
  featured,
}: {
  project: Project;
  featured: boolean;
}) {
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [project.id, project.imageUrl]);

  const resolvedSrc = resolveProjectImageSrc(project.imageUrl);
  const showImage = Boolean(resolvedSrc) && !imageFailed;
  const highlight = project.achievements[0] ?? project.description;

  return (
    <article
      className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
    >
      <Link
        to={`/projects/${project.id}`}
        className={styles.cardLink}
        aria-labelledby={`spotlight-${project.id}-title`}
      >
        <div className={styles.media}>
          {featured ? (
            <span className={styles.featuredBadge}>Featured</span>
          ) : null}
          {showImage ? (
            <img
              src={resolvedSrc}
              alt=""
              width={640}
              height={427}
              loading={featured ? "eager" : "lazy"}
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className={styles.mediaFallback} aria-hidden>
              {project.title.trim().charAt(0).toUpperCase() || "·"}
            </span>
          )}
        </div>

        <div className={styles.cardBody}>
          <div className={styles.cardMeta}>
            <span className={styles.category}>
              {formatCategory(project.category)}
            </span>
            {project.isActive ? (
              <span className={styles.active}>Active</span>
            ) : null}
          </div>

          <h3 id={`spotlight-${project.id}-title`} className={styles.cardTitle}>
            {project.title}
          </h3>

          <time className={styles.cardDate} dateTime={project.startDate}>
            {formatDateRange(project.startDate, project.endDate)}
          </time>

          <p className={styles.cardExcerpt}>{highlight}</p>

          <span className={styles.cardCta}>
            View case study
            <span className={styles.cardCtaIcon} aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}

export const ProjectSpotlight: React.FC<ProjectSpotlightProps> = ({
  projects,
}) => {
  if (projects.length === 0) return null;

  const countClass =
    projects.length === 1
      ? styles.count1
      : projects.length === 2
        ? styles.count2
        : styles.count3;

  return (
    <div
      className={`${styles.spotlight} ${countClass}`}
      role="list"
      aria-label="Featured projects"
    >
      {projects.map((project, index) => (
        <div key={project.id} role="listitem" className={styles.spotlightItem}>
          <SpotlightCard project={project} featured={index === 0} />
        </div>
      ))}
    </div>
  );
};
