/**
 * SplitText — staggered character reveal for hero headlines.
 */

import React from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./SplitText.module.css";

export interface SplitTextProps {
  text: string;
  className?: string;
  /** Seconds between each character */
  stagger?: number;
  as?: "span" | "h1";
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  stagger = 0.028,
  as: Tag = "span",
}) => {
  const reduced = useReducedMotion() ?? false;

  if (reduced || !text.trim()) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`${styles.split} ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className={styles.char}
          style={{ animationDelay: `${i * stagger}s` }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </Tag>
  );
};
