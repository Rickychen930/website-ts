import React from "react";
import { motion, useTransform, type MotionValue } from "@/lib/motion";
import styles from "./Chip3D.module.css";

interface Chip3DProps {
  /** Tilt around X / Y in degrees (usually from the pointer) */
  rx: MotionValue<number>;
  ry: MotionValue<number>;
  /** 0 = stacked, 1 = fully exploded */
  explode: MotionValue<number>;
  className?: string;
}

/** Resting height → exploded height, in px along the stack axis */
const LAYERS = [
  { key: "board", z: -64, zx: -170 },
  { key: "pins", z: -22, zx: -62 },
  { key: "die", z: 18, zx: 56 },
  { key: "lid", z: 56, zx: 170 },
] as const;

const TAGS = [
  { label: "LLM", x: "6%", y: "8%", z: 120, zx: 250 },
  { label: "REST", x: "86%", y: "10%", z: 90, zx: 215 },
  { label: "SQL", x: "88%", y: "68%", z: 70, zx: 190 },
  { label: "React", x: "2%", y: "80%", z: 100, zx: 235 },
  { label: "Python", x: "40%", y: "-10%", z: 130, zx: 270 },
] as const;

/* Circuit traces on the board, drawn on a 100×100 grid */
const TRACES = [
  "M0 18h22l6 6h18",
  "M0 40h14l8 8h12",
  "M0 62h26l6-6h14",
  "M0 84h18l8 8h24",
  "M100 16h-24l-6 6h-16",
  "M100 38h-16l-8 8h-14",
  "M100 60h-28l-6-6h-14",
  "M100 82h-20l-8 8h-22",
  "M20 0v20l6 6v16",
  "M44 0v14l-6 6v18",
  "M64 0v22l6 6v14",
  "M84 0v16l-6 6v20",
  "M22 100v-18l6-6v-14",
  "M46 100v-14l-6-6v-16",
  "M68 100v-20l6-6v-14",
  "M86 100v-16l-6-6v-18",
];

const Layer: React.FC<{
  z: number;
  zx: number;
  explode: MotionValue<number>;
  className: string;
  children?: React.ReactNode;
}> = ({ z, zx, explode, className, children }) => {
  const depth = useTransform(explode, [0, 1], [z, zx]);
  return (
    <motion.div className={className} style={{ z: depth }}>
      {children}
    </motion.div>
  );
};

const FloatTag: React.FC<{
  tag: (typeof TAGS)[number];
  explode: MotionValue<number>;
  index: number;
}> = ({ tag, explode, index }) => {
  const depth = useTransform(explode, [0, 1], [tag.z, tag.zx]);
  return (
    <motion.span
      className={styles.tag}
      style={{ z: depth, left: tag.x, top: tag.y }}
      aria-hidden="true"
    >
      <span
        className={styles.tagFace}
        style={{ animationDelay: `${index * -0.9}s` }}
      >
        {tag.label}
      </span>
    </motion.span>
  );
};

/**
 * A processor die in exploded isometric view, built from CSS 3D layers.
 * The rig tilts with the pointer; layers separate as `explode` rises.
 */
export const Chip3D: React.FC<Chip3DProps> = ({
  rx,
  ry,
  explode,
  className,
}) => (
  <div
    className={[styles.scene, className].filter(Boolean).join(" ")}
    aria-hidden="true"
  >
    <motion.div className={styles.rig} style={{ rotateX: rx, rotateY: ry }}>
      <div className={styles.sway}>
        <span className={styles.shadow} />
        {LAYERS.map((l) => (
          <Layer
            key={l.key}
            z={l.z}
            zx={l.zx}
            explode={explode}
            className={`${styles.layer} ${styles[l.key]}`}
          >
            {l.key === "board" && (
              <svg
                className={styles.traces}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {TRACES.map((d) => (
                  <path key={d} d={d} />
                ))}
              </svg>
            )}
            {l.key === "die" && (
              <span className={styles.cells}>
                {Array.from({ length: 36 }).map((_, i) => (
                  <i key={i} style={{ "--i": i } as React.CSSProperties} />
                ))}
              </span>
            )}
            {l.key === "lid" && (
              <>
                <span className={styles.mono}>RC</span>
                <span className={styles.lidMeta}>AI · FULL-STACK</span>
                <span className={styles.sheen} />
              </>
            )}
          </Layer>
        ))}
        {TAGS.map((t, i) => (
          <FloatTag key={t.label} tag={t} explode={explode} index={i} />
        ))}
      </div>
    </motion.div>
  </div>
);
