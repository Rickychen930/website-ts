/**
 * ExperienceItem Component - Domain Component
 * Displays work experience in timeline format
 */

import React from "react";
import type { Experience, TechnicalSkill } from "@/types/domain";
import { Typography } from "@/views/components/ui/Typography";
import { SkillBadge } from "@/views/components/domain/SkillBadge";
import { formatDateRange, getDuration } from "@/utils/dateUtils";
import styles from "./ExperienceItem.module.css";

export interface ExperienceItemProps {
  experience: Experience;
  technicalSkills?: readonly TechnicalSkill[];
}

export const ExperienceItem: React.FC<ExperienceItemProps> = ({
  experience,
  technicalSkills = [],
}) => {
  // Resolve skillIds to actual technical skills
  const relatedSkills = experience.skillIds
    ? technicalSkills.filter((skill) =>
        experience.skillIds?.includes(skill.name),
      )
    : [];
  return (
    <article
      className={styles.experienceItem}
      aria-labelledby={`experience-${experience.id}-title`}
    >
      <div className={styles.timeline} aria-hidden="true">
        <div className={styles.timelineDot} />
        {!experience.isCurrent && <div className={styles.timelineLine} />}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <div>
            <Typography
              variant="h5"
              weight="semibold"
              as="h3"
              id={`experience-${experience.id}-title`}
            >
              {experience.position}
            </Typography>
            <Typography variant="body" weight="medium" color="primary" as="p">
              {experience.company}
            </Typography>
            <Typography
              variant="small"
              color="tertiary"
              as="p"
              aria-label="Location"
            >
              📍 {experience.location}
            </Typography>
          </div>
          <div className={styles.meta}>
            <Typography
              variant="small"
              weight="medium"
              as="time"
              dateTime={experience.startDate}
            >
              {formatDateRange(experience.startDate, experience.endDate)}
            </Typography>
            <Typography variant="caption" color="tertiary" as="span">
              {getDuration(experience.startDate, experience.endDate)}
            </Typography>
            {experience.isCurrent && (
              <span
                className={styles.currentBadge}
                aria-label="Current position"
              >
                Current
              </span>
            )}
          </div>
        </header>

        <Typography
          variant="body"
          color="secondary"
          className={styles.description}
        >
          {experience.description}
        </Typography>

        {experience.achievements.length > 0 && (
          <ul className={styles.achievements}>
            {experience.achievements.map((achievement, index) => (
              <li key={index}>
                <Typography variant="small" color="secondary">
                  {achievement}
                </Typography>
              </li>
            ))}
          </ul>
        )}

        {experience.technologies.length > 0 && (
          <div className={styles.technologies}>
            <Typography
              variant="small"
              weight="semibold"
              color="secondary"
              className={styles.technologiesLabel}
            >
              Technologies:
            </Typography>
            {experience.technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {relatedSkills.length > 0 && (
          <div className={styles.relatedSkills}>
            <Typography
              variant="small"
              weight="semibold"
              color="secondary"
              className={styles.skillsLabel}
            >
              Related Skills:
            </Typography>
            <div className={styles.skillsGrid}>
              {relatedSkills.map((skill) => (
                <SkillBadge
                  key={skill.id}
                  skill={skill}
                  showProficiency={false}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
