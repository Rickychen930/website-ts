import React from "react";
import { Link } from "react-router-dom";
import { Backdrop } from "@/components/ui/Backdrop/Backdrop";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import styles from "./NotFound.module.css";

export const NotFound: React.FC = () => (
  <div className={styles.page}>
    <Backdrop />
    <div className={styles.content}>
      <span className={styles.code}>Error 404 · Page not found</span>
      <RevealText
        as="h1"
        immediate
        delay={0.35}
        className={styles.title}
        lines={["404 —", <em key="h">route not found.</em>]}
      />
      <p className={styles.desc}>
        The page may have moved or never existed. Let’s get you back on track.
      </p>
      <Link to="/" className={styles.link}>
        ← Back to home
      </Link>
    </div>
  </div>
);
