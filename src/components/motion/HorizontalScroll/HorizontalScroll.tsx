import React, { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "@/lib/motion";
import styles from "./HorizontalScroll.module.css";

interface HorizontalScrollProps {
  children: React.ReactNode;
  /** Content pinned above the track (heading, intro) */
  header?: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}

const DESKTOP = "(min-width: 769px)";

/**
 * Pins the viewport and converts vertical scroll into horizontal travel.
 * Falls back to native swipe/scroll-snap on mobile and reduced motion.
 */
export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  header,
  className,
  "aria-label": ariaLabel,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(DESKTOP);
    const measure = () => {
      const enabled = mq.matches && !reduce;
      setPinned(enabled);
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    mq.addEventListener?.("change", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      mq.removeEventListener?.("change", measure);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const x = useSpring(rawX, { stiffness: 120, damping: 30, mass: 0.4 });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div
      ref={outerRef}
      className={[styles.outer, pinned && styles.pinned, className]
        .filter(Boolean)
        .join(" ")}
      style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
      aria-label={ariaLabel}
    >
      <div className={styles.sticky}>
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.viewport}>
          <motion.div
            ref={trackRef}
            className={styles.track}
            style={pinned ? { x } : undefined}
          >
            {children}
          </motion.div>
        </div>
        {pinned && (
          <div className={styles.progressTrack} aria-hidden="true">
            <motion.span
              className={styles.progressFill}
              style={{ scaleX: progress }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
