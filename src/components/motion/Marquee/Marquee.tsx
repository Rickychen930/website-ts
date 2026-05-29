import React, { useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useReducedMotion } from "@/lib/motion";
import styles from "./Marquee.module.css";

export interface MarqueeItem {
  name: string;
  proficiency?: "Expert" | "Advanced" | "Intermediate" | "Beginner";
}

interface MarqueeProps {
  items: MarqueeItem[];
  direction?: "left" | "right";
  speed?: number;
}

const ProficiencyDot: React.FC<{ level?: string }> = ({ level }) => {
  const colors: Record<string, string> = {
    Expert: "var(--accent-1)",
    Advanced: "var(--accent-2)",
    Intermediate: "var(--text-muted)",
    Beginner: "var(--text-dim)",
  };
  return (
    <span
      style={{
        display: "inline-block",
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: colors[level ?? "Intermediate"] ?? "var(--text-dim)",
        marginRight: 4,
      }}
    />
  );
};

const MarqueeItemCard: React.FC<{ item: MarqueeItem }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={styles.item}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.itemName}>{item.name}</span>
      <AnimatePresence>
        {hovered && item.proficiency && (
          <motion.span
            className={styles.tooltip}
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <ProficiencyDot level={item.proficiency} />
            {item.proficiency}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  direction = "left",
  speed = 40,
}) => {
  const shouldReduce = useReducedMotion();
  const doubled = [...items, ...items];

  return (
    <div
      className={styles.track}
      onMouseEnter={(e) => {
        (
          e.currentTarget.querySelector(`.${styles.inner}`) as HTMLElement
        )?.style.setProperty("animation-play-state", "paused");
      }}
      onMouseLeave={(e) => {
        (
          e.currentTarget.querySelector(`.${styles.inner}`) as HTMLElement
        )?.style.setProperty("animation-play-state", "running");
      }}
    >
      <div
        className={styles.inner}
        style={{
          animationName:
            direction === "left" ? "marquee-left" : "marquee-right",
          animationDuration: `${speed}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: shouldReduce ? "paused" : "running",
        }}
      >
        {doubled.map((item, i) => (
          <MarqueeItemCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};
