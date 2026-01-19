/**
 * Achievement Badge Component - Showcase achievements dan certifications
 */

import React from "react";
import styles from "./AchievementBadge.module.css";

export interface Achievement {
  id: string;
  title: string;
  issuer?: string;
  date?: string;
  icon?: string;
  badge?: string;
  description?: string;
  link?: string;
  color?: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  variant = "default",
  className = "",
}) => {
  return (
    <div
      className={`${styles.achievementBadge} ${styles[variant]} ${className}`}
      style={
        {
          "--badge-color": achievement.color || "#3b82f6",
        } as React.CSSProperties
      }
    >
      <div className={styles.badgeContainer}>
        {achievement.badge && (
          <img
            src={achievement.badge}
            alt={achievement.title}
            className={styles.badgeImage}
          />
        )}
        {achievement.icon && !achievement.badge && (
          <div className={styles.badgeIcon}>{achievement.icon}</div>
        )}
        {!achievement.badge && !achievement.icon && (
          <div className={styles.badgePlaceholder}>🏆</div>
        )}
      </div>

      <div className={styles.badgeContent}>
        <h3 className={styles.badgeTitle}>{achievement.title}</h3>
        {achievement.issuer && (
          <p className={styles.badgeIssuer}>{achievement.issuer}</p>
        )}
        {achievement.date && variant === "detailed" && (
          <p className={styles.badgeDate}>{achievement.date}</p>
        )}
        {achievement.description && variant === "detailed" && (
          <p className={styles.badgeDescription}>{achievement.description}</p>
        )}
      </div>

      {achievement.link && (
        <a
          href={achievement.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.badgeLink}
          aria-label={`View ${achievement.title} details`}
        >
          View →
        </a>
      )}
    </div>
  );
};
