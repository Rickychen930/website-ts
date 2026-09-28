import React, { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./Section.module.css";

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  /** Chapter index shown in the eyebrow, e.g. "02" */
  index?: string;
  /** Eyebrow label, e.g. "Selected works" */
  label?: string;
  /** Right-aligned annotation, e.g. coordinates */
  meta?: React.ReactNode;
  /** Band palette: navy (default), cream sand, or the deeper navy */
  tone?: "default" | "sand" | "deep";
  /**
   * Stacked chapter: the section pins while the next one slides over it,
   * easing back to 0.94 under a darkening veil (desktop only).
   */
  stack?: boolean;
  "aria-label"?: string;
}

const DESKTOP = "(min-width: 769px)";

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className,
  index,
  label,
  meta,
  tone = "default",
  stack = false,
  "aria-label": ariaLabel,
}) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery(DESKTOP);
  const stacking = stack && desktop && !reduce;

  // Pin offset so tall chapters scroll fully before sticking
  useEffect(() => {
    const el = ref.current;
    if (!el || !stacking) return;
    const ro = new ResizeObserver(() =>
      el.style.setProperty("--chapter-h", `${el.offsetHeight}px`),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, [stacking]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.6]);

  return (
    <section
      ref={ref}
      id={id}
      className={[
        styles.section,
        styles[tone],
        tone === "sand" && "band-sand",
        stacking && styles.stacked,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel ?? label}
      data-section={id}
    >
      <motion.div
        className={styles.chapter}
        style={stacking ? { scale } : undefined}
      >
        <div className={styles.inner}>
          {(index || label || meta) && (
            <div className={styles.head}>
              <span className="eyebrow">
                {index && <span className={styles.index}>{index}</span>}
                {label}
              </span>
              {meta && <span className={styles.meta}>{meta}</span>}
            </div>
          )}
          {children}
        </div>
      </motion.div>
      {stacking && (
        <motion.div
          className={styles.veil}
          style={{ opacity: veil }}
          aria-hidden="true"
        />
      )}
    </section>
  );
};
