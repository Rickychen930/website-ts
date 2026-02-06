/**
 * BackToHome - Navigation link back to home (optional P2: breadcrumb/back)
 */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./BackToHome.module.css";

export const BackToHome: React.FC = () => (
  <Link
    to="/"
    className={styles.link}
    aria-label="Back to home"
  >
    <span className={styles.icon} aria-hidden>←</span>
    Back to Home
  </Link>
);
