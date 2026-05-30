import React from "react";
import styles from "./Footer.module.css";

export const Footer: React.FC = () => (
  <footer className={styles.footer} role="contentinfo">
    <div className={styles.inner}>
      <span className={styles.copy}>
        © {new Date().getFullYear()} Ricky Chen
      </span>
      <span className={styles.built}>Built with React · Sydney</span>
    </div>
  </footer>
);
