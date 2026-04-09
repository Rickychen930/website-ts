/**
 * SkillBadge Component - Domain Component
 * Displays technical skill with proficiency indicator
 */

import React from "react";
import type { TechnicalSkill } from "@/types/domain";
import styles from "./SkillBadge.module.css";

export interface SkillBadgeProps {
  skill: TechnicalSkill;
  showProficiency?: boolean;
  /** `card`: panel layout (default). `chip`: compact pill for dense matrices. */
  variant?: "card" | "chip";
}

function proficiencyDots(proficiency: TechnicalSkill["proficiency"]): number {
  const map: Record<TechnicalSkill["proficiency"], number> = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };
  return map[proficiency] ?? 1;
}

function getProficiencyLevel(
  proficiency: TechnicalSkill["proficiency"],
): number {
  const levels: Record<TechnicalSkill["proficiency"], number> = {
    beginner: 25,
    intermediate: 50,
    advanced: 75,
    expert: 100,
  };
  return levels[proficiency] || 0;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  showProficiency = false,
  variant = "card",
}) => {
  const proficiencyLevel = getProficiencyLevel(skill.proficiency);
  const dots = proficiencyDots(skill.proficiency);

  if (variant === "chip") {
    return (
      <div className={styles.skillChip}>
        <span className={styles.chipName}>{skill.name}</span>
        {showProficiency && (
          <span
            className={styles.chipDots}
            aria-label={`${skill.proficiency} proficiency`}
          >
            {Array.from({ length: 4 }, (_, i) => (
              <span
                key={i}
                className={
                  i < dots ? styles.chipDotFilled : styles.chipDotEmpty
                }
              />
            ))}
          </span>
        )}
        <span className={styles.chipMeta}>
          {showProficiency && (
            <span className={styles.chipLevel}>{skill.proficiency}</span>
          )}
          {showProficiency && skill.yearsOfExperience ? (
            <span className={styles.chipSep} aria-hidden="true">
              ·
            </span>
          ) : null}
          {skill.yearsOfExperience ? (
            <span>
              {skill.yearsOfExperience}{" "}
              {skill.yearsOfExperience === 1 ? "yr" : "yrs"}
            </span>
          ) : null}
        </span>
      </div>
    );
  }

  return (
    <div className={styles.skillBadge}>
      <span className={styles.name}>{skill.name}</span>
      {showProficiency && (
        <div className={styles.proficiency}>
          <div className={styles.proficiencyBar}>
            <div
              className={styles.proficiencyFill}
              style={{ width: `${proficiencyLevel}%` }}
              aria-label={`${skill.proficiency} proficiency`}
            />
          </div>
          <span className={styles.proficiencyLabel}>{skill.proficiency}</span>
        </div>
      )}
      {skill.yearsOfExperience && (
        <span className={styles.experience}>
          {skill.yearsOfExperience}{" "}
          {skill.yearsOfExperience === 1 ? "year" : "years"}
        </span>
      )}
    </div>
  );
};
