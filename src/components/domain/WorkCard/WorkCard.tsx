import React from "react";
import { Link } from "react-router-dom";
import { RevealMedia } from "@/components/motion/RevealMedia/RevealMedia";
import type { FlowMediaItem } from "@/config/flowMedia";
import type { Project } from "@/types/domain";
import { PROJECT_CATEGORY_LABEL } from "@/config/site-defaults";
import styles from "./WorkCard.module.css";

interface WorkCardProps {
  project: Project;
  plate: FlowMediaItem;
  /** Frame shape; parent grids alternate these for rhythm */
  shape?: "portrait" | "landscape" | "square";
  className?: string;
}

const yearOf = (d?: string) => (d ? new Date(d).getFullYear() : "");

export const WorkCard: React.FC<WorkCardProps> = ({
  project,
  plate,
  shape = "portrait",
  className,
}) => (
  <article className={[styles.card, className].filter(Boolean).join(" ")}>
    <Link
      to={`/projects/${project.id}`}
      className={styles.link}
      data-tilt=""
      data-spotlight=""
      aria-label={`${project.title} — view case study`}
    >
      <div className={styles.mediaWrap}>
        <RevealMedia
          item={plate}
          frameClassName={styles[shape]}
          parallax={14}
        />
        <span className={styles.view} aria-hidden="true">
          View case study →
        </span>
      </div>
      <div className={styles.meta}>
        <span className={styles.category}>
          {PROJECT_CATEGORY_LABEL[project.category]}
        </span>
        <span className={styles.year}>
          {project.isActive && (
            <span className={styles.live} aria-hidden="true" />
          )}
          {yearOf(project.startDate)}
          {project.isActive ? " · Active" : ""}
        </span>
      </div>
      <h3 className={styles.title}>{project.title}</h3>
      <p className={styles.desc}>{project.description}</p>
      <ul className={styles.tags} aria-label="Technologies">
        {project.technologies.slice(0, 4).map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </Link>
  </article>
);
