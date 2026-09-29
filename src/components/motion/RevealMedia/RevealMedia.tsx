import React, { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "@/lib/motion";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import type { FlowMediaItem } from "@/config/flowMedia";
import styles from "./RevealMedia.module.css";

interface RevealMediaProps {
  item: FlowMediaItem;
  className?: string;
  /** Plate frame class — controls aspect / height from the parent */
  frameClassName?: string;
  /** Parallax travel in % of the frame (0 disables) */
  parallax?: number;
  /** Direction of the wipe-in reveal */
  from?: "bottom" | "left" | "right";
  priority?: boolean;
  srcOverride?: string;
  /** Render an architectural caption under the plate */
  caption?: boolean;
  delay?: number;
}

const CLIP_FROM: Record<NonNullable<RevealMediaProps["from"]>, string> = {
  bottom: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

/**
 * Plate that wipes in when entering the viewport, then drifts with a
 * scroll-linked parallax — the core "architectural monograph" gesture.
 */
export const RevealMedia: React.FC<RevealMediaProps> = ({
  item,
  className,
  frameClassName,
  parallax = 12,
  from = "bottom",
  priority,
  srcOverride,
  caption = false,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallax / 2}%`, `${parallax / 2}%`],
  );

  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")}>
      <motion.div
        ref={ref}
        className={[styles.frame, frameClassName].filter(Boolean).join(" ")}
        initial={reduce ? false : { clipPath: CLIP_FROM[from] }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <motion.div
          className={styles.parallax}
          style={
            reduce || !parallax
              ? undefined
              : { y, top: `-${parallax / 2}%`, bottom: `-${parallax / 2}%` }
          }
          initial={reduce ? false : { scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }}
        >
          <FlowMedia
            item={item}
            priority={priority}
            srcOverride={srcOverride}
          />
        </motion.div>
      </motion.div>
      {caption && (
        <figcaption className={styles.caption}>
          {item.title} — {item.subtitle}
        </figcaption>
      )}
    </figure>
  );
};
