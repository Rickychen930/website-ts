import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "@/lib/motion";
import styles from "./Ribbon.module.css";

interface RibbonProps {
  items: readonly string[];
  /** Seconds per loop at rest */
  speed?: number;
  reverse?: boolean;
  /** Tilt in degrees, e.g. -3 */
  tilt?: number;
  tone?: "sand" | "navy";
  className?: string;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * Endless marquee that reacts to scroll: faster (and flips direction) with
 * scroll velocity, leans into the motion with a small skew, and eases to a
 * crawl on hover. Static for reduced motion.
 */
export const Ribbon: React.FC<RibbonProps> = ({
  items,
  speed = 38,
  reverse = false,
  tilt = 0,
  tone = "sand",
  className,
}) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const direction = useRef(reverse ? -1 : 1);
  const hoverFactor = useRef(1);
  const hovering = useRef(false);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1200], [0, 4], {
    clamp: false,
  });
  const skewX = useTransform(smoothVelocity, [-2000, 2000], [8, -8]);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  // Percent of the track per second (one run = 50% of the track)
  const baseVelocity = 50 / speed;

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    // Ease toward a slow crawl while hovered
    hoverFactor.current +=
      ((hovering.current ? 0.2 : 1) - hoverFactor.current) * 0.08;
    const vf = velocityFactor.get();
    const base = reverse ? -1 : 1;
    if (vf < 0) direction.current = -base;
    else if (vf > 0) direction.current = base;
    const moveBy =
      direction.current *
      baseVelocity *
      (delta / 1000) *
      hoverFactor.current *
      (1 + Math.abs(vf));
    baseX.set(baseX.get() - moveBy);
  });

  // Two identical runs; each run repeats the list so it always overfills
  const run = [...items, ...items];

  return (
    <div
      className={[styles.ribbon, styles[tone], className]
        .filter(Boolean)
        .join(" ")}
      style={{ rotate: `${tilt}deg` }}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      aria-hidden="true"
    >
      <motion.div className={styles.track} style={reduce ? undefined : { x }}>
        {[0, 1].map((copy) => (
          <motion.div
            key={copy}
            className={styles.run}
            style={reduce ? undefined : { skewX }}
          >
            {run.map((item, i) => (
              <span key={i} className={styles.item}>
                {item}
                <span className={styles.star}>✦</span>
              </span>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
