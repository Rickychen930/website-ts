import React from "react";
import styles from "./Backdrop.module.css";

interface BackdropProps {
  /** Show the fine engineering grid */
  grid?: boolean;
  className?: string;
}

/**
 * Code-drawn atmosphere: slow drifting aurora blobs over a masked grid.
 * Purely decorative — no imagery to load, themes via tokens.
 */
export const Backdrop: React.FC<BackdropProps> = ({
  grid = true,
  className,
}) => (
  <div
    className={[styles.backdrop, className].filter(Boolean).join(" ")}
    aria-hidden="true"
  >
    <span className={`${styles.blob} ${styles.b1}`} />
    <span className={`${styles.blob} ${styles.b2}`} />
    <span className={`${styles.blob} ${styles.b3}`} />
    {grid && <span className={styles.grid} />}
  </div>
);
