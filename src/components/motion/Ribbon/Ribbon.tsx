import React from "react";
import styles from "./Ribbon.module.css";

interface RibbonProps {
  items: readonly string[];
  /** Seconds per loop */
  speed?: number;
  reverse?: boolean;
  /** Tilt in degrees, e.g. -3 */
  tilt?: number;
  tone?: "sand" | "navy";
  className?: string;
}

/** Endless marquee ribbon — duplicated run translated by -50% */
export const Ribbon: React.FC<RibbonProps> = ({
  items,
  speed = 38,
  reverse = false,
  tilt = 0,
  tone = "sand",
  className,
}) => {
  const run = [...items, ...items];
  return (
    <div
      className={[styles.ribbon, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
      style={{ rotate: `${tilt}deg` }}
      aria-hidden="true"
    >
      <div
        className={[styles.track, reverse && styles.reverse]
          .filter(Boolean)
          .join(" ")}
        style={{ animationDuration: `${speed}s` }}
      >
        {run.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.star}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
};
