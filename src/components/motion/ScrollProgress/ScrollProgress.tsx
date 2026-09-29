import React from "react";
import { motion, useScroll, useSpring } from "@/lib/motion";
import styles from "./ScrollProgress.module.css";

/** Hairline reading-progress bar pinned to the top of the viewport */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div className={styles.bar} style={{ scaleX }} aria-hidden="true" />
  );
};
