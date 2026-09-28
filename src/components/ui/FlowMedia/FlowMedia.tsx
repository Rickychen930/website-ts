import React, { useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { flowPoster, flowSrc, type FlowMediaItem } from "@/config/flowMedia";
import styles from "./FlowMedia.module.css";

interface FlowMediaProps {
  item: FlowMediaItem;
  className?: string;
  /** Load eagerly (above the fold) */
  priority?: boolean;
  /** Optional override, e.g. a project's own screenshot */
  srcOverride?: string;
  /** Show the pending-asset label on the placeholder plate */
  showPendingLabel?: boolean;
}

type Stage = "video" | "image" | "placeholder";

/* Topographic contour lines — reads as a site-survey plate while media is pending */
const Contours: React.FC = () => (
  <svg
    className={styles.contours}
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
      <ellipse
        key={i}
        cx={250 - i * 6}
        cy={170 + i * 3}
        rx={40 + i * 34}
        ry={22 + i * 20}
        transform={`rotate(${-12 + i * 2} 250 170)`}
      />
    ))}
  </svg>
);

export const FlowMedia: React.FC<FlowMediaProps> = ({
  item,
  className,
  priority = false,
  srcOverride,
  showPendingLabel = true,
}) => {
  const reduceMotion = useReducedMotion();
  const wantsVideo = item.kind === "video" && !srcOverride && !reduceMotion;
  const [stage, setStage] = useState<Stage>(wantsVideo ? "video" : "image");

  const cls = [styles.media, styles[item.theme], className]
    .filter(Boolean)
    .join(" ");

  if (stage === "placeholder") {
    return (
      <div className={cls} role="img" aria-label={item.alt}>
        <Contours />
        {showPendingLabel && (
          <span className={styles.pending}>
            Google Flow · {item.id}.{item.kind === "video" ? "mp4" : "jpg"}
          </span>
        )}
      </div>
    );
  }

  if (stage === "video") {
    return (
      <div className={cls}>
        <video
          className={styles.asset}
          src={flowSrc(item)}
          poster={flowPoster(item)}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? "auto" : "metadata"}
          aria-label={item.alt}
          onError={() => setStage("image")}
        />
      </div>
    );
  }

  return (
    <div className={cls}>
      <img
        className={styles.asset}
        src={srcOverride ?? flowPoster(item)}
        alt={item.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onError={() => setStage("placeholder")}
      />
    </div>
  );
};
