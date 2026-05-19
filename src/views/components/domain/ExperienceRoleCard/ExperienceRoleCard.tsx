/**
 * ExperienceRoleCard — full role panel for the experience page timeline.
 */

import React from "react";
import type { Experience, TechnicalSkill } from "@/types/domain";
import { formatDateRange, getDuration } from "@/utils/dateUtils";
import styles from "./ExperienceRoleCard.module.css";

export interface ExperienceRoleCardProps {
  experience: Experience;
  technicalSkills?: readonly TechnicalSkill[];
  emphasis?: boolean;
}

export const ExperienceRoleCard: React.FC<ExperienceRoleCardProps> = ({
  experience,
  emphasis = false,
}) => {
  const achievements = experience.achievements.slice(0, 4);
  const tech = experience.technologies.slice(0, 8);

  return (
    <article
      className={`${styles.card} ${emphasis ? styles.cardEmphasis : ""}`}
      aria-labelledby={`role-${experience.id}-title`}
    >
      <header className={styles.header}>
        <div className={styles.headerMain}>
          {experience.isCurrent ? (
            <span className={styles.badge}>Current</span>
          ) : null}
          <h3 id={`role-${experience.id}-title`} className={styles.position}>
            {experience.position}
          </h3>
          <p className={styles.company}>{experience.company}</p>
          <p className={styles.location}>{experience.location}</p>
        </div>
        <div className={styles.headerMeta}>
          <time dateTime={experience.startDate} className={styles.dates}>
            {formatDateRange(experience.startDate, experience.endDate)}
          </time>
          <span className={styles.duration}>
            {getDuration(experience.startDate, experience.endDate)}
          </span>
        </div>
      </header>

      <p className={styles.description}>{experience.description}</p>

      {achievements.length > 0 ? (
        <ul className={styles.achievements}>
          {achievements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ) : null}

      {tech.length > 0 ? (
        <ul className={styles.tech} aria-label="Technologies">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : null}
    </article>
  );
};
