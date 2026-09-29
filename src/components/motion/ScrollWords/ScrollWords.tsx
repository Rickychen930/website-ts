import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "@/lib/motion";
import styles from "./ScrollWords.module.css";

interface ScrollWordsProps {
  text: string;
  className?: string;
  as?: "p" | "h2" | "div";
}

const Word: React.FC<{
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className={styles.word} style={{ opacity }}>
      {word}{" "}
    </motion.span>
  );
};

/** Paragraph whose words light up one by one as it scrolls through view */
export const ScrollWords: React.FC<ScrollWordsProps> = ({
  text,
  className,
  as: Tag = "p",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 50%"],
  });
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <div ref={ref}>
      <Tag className={className} aria-label={text}>
        {reduce
          ? text
          : words.map((w, i) => (
              <Word
                key={i}
                word={w}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              />
            ))}
      </Tag>
    </div>
  );
};
