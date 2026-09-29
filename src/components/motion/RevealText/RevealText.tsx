import React from "react";
import { motion, useReducedMotion, type Variants } from "@/lib/motion";
import styles from "./RevealText.module.css";

type Tag = "h1" | "h2" | "h3" | "p" | "span" | "div";

interface RevealTextProps {
  /** Each entry is rendered as one masked line */
  lines: React.ReactNode[];
  as?: Tag;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll (hero headings) */
  immediate?: boolean;
  "aria-label"?: string;
}

const lineVariants: Variants = {
  hidden: { y: "110%" },
  visible: (c: { delay: number }) => ({
    y: "0%",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: c.delay },
  }),
};

/**
 * Masked line-by-line rise — typographic reveal used for all headings.
 * The in-view trigger lives on the (unclipped) wrapper; lines follow via
 * variants, so the observer never watches an element hidden by its mask.
 */
export const RevealText: React.FC<RevealTextProps> = ({
  lines,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  "aria-label": ariaLabel,
}) => {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag] as typeof motion.div;

  if (reduce) {
    return (
      <Tag className={className} aria-label={ariaLabel}>
        {lines.map((line, i) => (
          <span key={i} className={styles.mask}>
            <span className={styles.line}>{line}</span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      aria-label={ariaLabel}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" }
        : {
            whileInView: "visible",
            viewport: { once: true, margin: "0px 0px -10% 0px" },
          })}
    >
      {lines.map((line, i) => (
        <span key={i} className={styles.mask}>
          <motion.span
            className={styles.line}
            variants={lineVariants}
            custom={{ delay: delay + i * stagger }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};
