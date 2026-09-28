import React from "react";
import { Link } from "react-router-dom";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FLOW_MEDIA } from "@/config/flowMedia";
import styles from "./NotFound.module.css";

const ROAD = FLOW_MEDIA.outbackRoad;

export const NotFound: React.FC = () => (
  <div className={styles.page}>
    <div className={styles.media} aria-hidden="true">
      <FlowMedia item={ROAD} priority showPendingLabel={false} />
    </div>
    <div className={styles.scrim} aria-hidden="true" />
    <div className={styles.content}>
      <span className={styles.code}>404 · Off the map</span>
      <RevealText
        as="h1"
        immediate
        delay={0.6}
        className={styles.title}
        lines={["Nothing out", <em key="h">here.</em>]}
      />
      <p className={styles.desc}>
        This road doesn’t lead anywhere — the page may have moved or never
        existed.
      </p>
      <Link to="/" className={styles.link}>
        ← Head back to town
      </Link>
      <span className={styles.coords}>
        {ROAD.title} · {ROAD.caption}
      </span>
    </div>
  </div>
);
