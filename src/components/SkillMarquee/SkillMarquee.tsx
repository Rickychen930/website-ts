/**
 * SkillMarquee — infinite horizontal skill strip (GPU-composited).
 */

import React, { useMemo } from "react";
import styles from "./SkillMarquee.module.css";

export interface SkillMarqueeProps {
  skills: readonly string[];
  className?: string;
}

export const SkillMarquee: React.FC<SkillMarqueeProps> = ({
  skills,
  className = "",
}) => {
  const items = useMemo(() => {
    const unique = [...new Set(skills.map((s) => s.trim()).filter(Boolean))];
    return unique.slice(0, 16);
  }, [skills]);

  if (items.length === 0) return null;

  const doubled = [...items, ...items];

  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden="true">
      <div className={styles.fadeLeft} />
      <div className={styles.track}>
        {doubled.map((skill, i) => (
          <span key={`${skill}-${i}`} className={styles.chip}>
            {skill}
          </span>
        ))}
      </div>
      <div className={styles.fadeRight} />
    </div>
  );
};
