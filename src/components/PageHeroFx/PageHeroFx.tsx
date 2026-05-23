/**
 * PageHeroFx — ambient hero layers (scanlines + grid) without stock photos.
 */

import React from "react";
import styles from "./PageHeroFx.module.css";

export const PageHeroFx: React.FC = () => (
  <>
    <div className={styles.scanlines} aria-hidden="true" />
    <div className={styles.grid} aria-hidden="true" />
  </>
);
