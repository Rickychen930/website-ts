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
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{
                  display: "inline",
                  marginRight: "0.3em",
                  verticalAlign: "middle",
                }}
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {experience.location}
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
            {experience.technologies.map((tech, index) => (
              <span key={index} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}

        {relatedSkills.length > 0 && (
          <div className={styles.relatedSkills}>
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
