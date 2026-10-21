import React from "react";
import { Link } from "react-router-dom";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FLOW_MEDIA } from "@/config/flowMedia";
import styles from "./NotFound.module.css";

const SIGNAL = FLOW_MEDIA.signalLost;

export const NotFound: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.media} aria-hidden="true">
      <FlowMedia item={SIGNAL} priority showPendingLabel={false} />
    </div>
    <div className={styles.scrim} aria-hidden="true" />
    <div className={styles.content}>
      <span className={styles.code}>404 · Page not found</span>
      <RevealText
        as="h1"
        immediate
        delay={0.35}
        className={styles.title}
        lines={["Signal", <em key="h">lost.</em>]}
      />
      <p className={styles.desc}>
        This route returns 404 — the page may have moved or never existed.
      </p>
      <Link to="/" className={styles.link}>
        ← Back to home
      </Link>
    </div>
  </div>
);
