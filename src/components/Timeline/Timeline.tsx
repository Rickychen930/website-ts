/**
 * Timeline Component - Visual timeline untuk experience dan education
 * Creative design dengan interactive elements
 */

import React, { useState } from "react";
import styles from "./Timeline.module.css";

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  icon?: string;
  color?: string;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = "vertical",
  className = "",
}) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  return (
    <div
      className={`${styles.timeline} ${styles[orientation]} ${className}`}
      role="list"
      aria-label="Timeline"
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`${styles.timelineItem} ${activeItem === item.id ? styles.active : ""}`}
          role="listitem"
          onMouseEnter={() => setActiveItem(item.id)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <div className={styles.timelineMarker}>
            <div
              className={styles.markerDot}
              style={
                item.color
                  ? ({ "--item-color": item.color } as React.CSSProperties)
                  : undefined
              }
            >
              {item.icon && (
                <span className={styles.markerIcon}>{item.icon}</span>
              )}
            </div>
            {index < items.length - 1 && (
              <div className={styles.timelineLine} />
            )}
          </div>

          <div className={styles.timelineContent}>
            <div className={styles.timelineCard}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemSubtitle}>{item.subtitle}</p>
                </div>
                <span className={styles.itemPeriod}>{item.period}</span>
              </div>
              <p className={styles.itemDescription}>{item.description}</p>
              {item.tags && item.tags.length > 0 && (
                <div className={styles.itemTags}>
                  {item.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
