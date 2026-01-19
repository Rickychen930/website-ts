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
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({
  skill,
  showProficiency = false,
}) => {
  const proficiencyLevel = getProficiencyLevel(skill.proficiency);

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
