/**
 * SoftSkillBadge Component - Domain Component
 * Displays soft skill with category indicator
 */

import React from "react";
import type { SoftSkill } from "@/types/domain";
import styles from "./SoftSkillBadge.module.css";

export interface SoftSkillBadgeProps {
  softSkill: SoftSkill;
  showCategory?: boolean;
}

const categoryLabels: Record<SoftSkill["category"], string> = {
  leadership: "Leadership",
  communication: "Communication",
  "problem-solving": "Problem Solving",
  collaboration: "Collaboration",
  adaptability: "Adaptability",
  other: "Other",
};

export const SoftSkillBadge: React.FC<SoftSkillBadgeProps> = ({
  softSkill,
  showCategory = false,
}) => {
  return (
    <div className={styles.softSkillBadge}>
      <span className={styles.name}>{softSkill.name}</span>
      {showCategory && (
        <span
          className={styles.category}
          aria-label={`Category: ${categoryLabels[softSkill.category]}`}
        >
          {categoryLabels[softSkill.category]}
        </span>
      )}
    </div>
  );
};
