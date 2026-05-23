/**
 * ProjectCatalogRow — horizontal catalog row for the projects page.
 */

import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "@/types/domain";
import { formatDateRange } from "@/utils/dateUtils";
import { formatProjectCategory } from "@/utils/projectFormat";
import { ProjectMedia } from "@/views/components/domain/ProjectMedia";
import styles from "./ProjectCatalogRow.module.css";

export interface ProjectCatalogRowProps {
  project: Project;
  index?: number;
}

export const ProjectCatalogRow: React.FC<ProjectCatalogRowProps> = ({
  project,
  index = 0,
}) => {
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

      <div className={styles.thumb}>
        <ProjectMedia
          projectId={project.id}
          imageUrl={project.imageUrl}
          title={project.title}
          width={160}
          height={120}
          fallbackClassName={styles.thumbFallback}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>
            {formatProjectCategory(project.category)}
          </span>
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
