import React from "react";
import { motion, useScroll } from "@/lib/motion";
import styles from "./ScrollProgress.module.css";

/** Hairline reading-progress bar pinned to the top of the viewport */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = scrollYProgress;
  return (
    <motion.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />
  );
};
