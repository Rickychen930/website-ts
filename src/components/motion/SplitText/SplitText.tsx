import React from "react";
import { motion, useReducedMotion } from "@/lib/motion";
import styles from "./SplitText.module.css";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  delay = 0,
  staggerDelay = 0.025,
}) => {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className={styles.word}>
          {word.split("").map((char, ci) => {
            const globalIndex =
              words.slice(0, wi).reduce((acc, w) => acc + w.length, 0) + ci;
            return (
              <span key={ci} className={styles.charWrapper}>
                <motion.span
                  className={styles.char}
                  initial={{ opacity: 0, y: "110%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    delay: delay + globalIndex * staggerDelay,
                  }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {wi < words.length - 1 && (
            <span className={styles.charWrapper}>
              <motion.span
                className={styles.char}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay:
                    delay +
                    words.slice(0, wi + 1).reduce((a, w) => a + w.length, 0) *
                      staggerDelay,
                }}
              >
                {" "}
              </motion.span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
};
