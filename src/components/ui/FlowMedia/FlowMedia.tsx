import React, { useEffect, useRef, useState } from "react";
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

/**
 * Video that only loads and plays while near the viewport, pausing when it
 * leaves — saves battery and data. Priority videos load immediately.
 */
const FlowVideo: React.FC<{
  item: FlowMediaItem;
  priority: boolean;
  onError: () => void;
}> = ({ item, priority, onError }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(priority);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === "undefined") {
      setArmed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={styles.asset}
      src={armed ? flowSrc(item) : undefined}
      poster={flowPoster(item)}
      autoPlay
      muted
      loop
      playsInline
      preload={priority ? "auto" : "none"}
      aria-label={item.alt}
      onError={onError}
    />
  );
};

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
            {item.id}.{item.kind === "video" ? "mp4" : "jpg"}
          </span>
        )}
      </div>
    );
  }

  if (stage === "video") {
    return (
      <div className={cls}>
        <FlowVideo
          item={item}
          priority={priority}
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
