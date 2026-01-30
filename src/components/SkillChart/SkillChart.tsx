/**
 * Skill Chart Component - Interactive skill visualization
 * Creative circular progress dan bar charts
 */

import React from "react";
import styles from "./SkillChart.module.css";

export interface SkillData {
  name: string;
  level: number; // 0-100
  category?: string;
  icon?: string;
  color?: string;
}

interface SkillChartProps {
  skills: SkillData[];
  variant?: "circular" | "bar" | "radial";
  showPercentage?: boolean;
  className?: string;
}

export const SkillChart: React.FC<SkillChartProps> = ({
  skills,
  variant = "circular",
  showPercentage = true,
  className = "",
}) => {
  if (variant === "circular") {
    return (
      <div
        className={`${styles.skillChart} ${styles.circular} ${className}`}
        role="list"
        aria-label="Skills"
      >
        {skills.map((skill) => (
          <div
            key={skill.name}
            className={styles.circularSkill}
            role="listitem"
          >
            <div className={styles.circularContainer}>
              <svg className={styles.circularSvg} viewBox="0 0 120 120">
                <circle
                  className={styles.circularBackground}
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                />
                <circle
                  className={styles.circularProgress}
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - skill.level / 100)}`}
                  style={
                    skill.color
                      ? ({
                          "--skill-color": skill.color,
                        } as React.CSSProperties)
                      : undefined
                  }
                />
              </svg>
              <div className={styles.circularContent}>
                {skill.icon && (
                  <span className={styles.skillIcon}>{skill.icon}</span>
                )}
                {showPercentage && (
                  <span className={styles.skillPercentage}>{skill.level}%</span>
                )}
              </div>
            </div>
            <p className={styles.skillName}>{skill.name}</p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "bar") {
    return (
      <div
        className={`${styles.skillChart} ${styles.bar} ${className}`}
        role="list"
        aria-label="Skills"
      >
        {skills.map((skill) => (
          <div key={skill.name} className={styles.barSkill} role="listitem">
            <div className={styles.barHeader}>
              <div className={styles.barInfo}>
                {skill.icon && (
                  <span className={styles.skillIcon}>{skill.icon}</span>
                )}
                <span className={styles.skillName}>{skill.name}</span>
              </div>
              {showPercentage && (
                <span className={styles.skillPercentage}>{skill.level}%</span>
              )}
            </div>
            <div className={styles.barContainer}>
              <div
                className={styles.barProgress}
                style={
                  {
                    width: `${skill.level}%`,
                    ...(skill.color
                      ? ({
                          "--skill-color": skill.color,
                        } as React.CSSProperties)
                      : {}),
                  } as React.CSSProperties
                }
              >
                <div className={styles.barGlow} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};
