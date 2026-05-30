import React from "react";
import { motion } from "@/lib/motion";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => (
  <div className={styles.page}>
    <motion.div
      className={styles.content}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.25, 0, 0, 1], duration: 0.6 }}
    >
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Nothing here.</h1>
      <p className={styles.desc}>
        The page you're looking for doesn't exist or was moved.
      </p>
      <Link to="/" className={styles.link}>
        ← Back home
      </Link>
    </motion.div>
  </div>
);
