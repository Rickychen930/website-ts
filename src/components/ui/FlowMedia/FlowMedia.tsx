import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";
import { isFastScroll, onFastScroll, onScrollTick } from "@/lib/scrollActivity";
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
  /**
   * "visible" plays while on screen; "hover" keeps a poster still and plays
   * only while the card is hovered or focused (touch screens fall back to visible)
   */
  play?: "visible" | "hover";
}

type Stage = "video" | "image" | "placeholder";

/**
 * Video that only loads and plays while near the viewport, pausing when it
 * leaves — saves battery and data. Priority videos load immediately.
 */
const FlowVideo: React.FC<{
  item: FlowMediaItem;
  priority: boolean;
  play: "visible" | "hover";
  onError: () => void;
}> = ({ item, priority, play, onError }) => {
  const ref = useRef<HTMLVideoElement>(null);
  // `armed` = near the viewport: poster and source may load.
  const [armed, setArmed] = useState(priority);
  // Above-the-fold video starts its download only after the page has loaded,
  // so scripts and the poster (already the first frame) get the bandwidth first.
  const [pageLoaded, setPageLoaded] = useState(!priority);

  useEffect(() => {
    if (!priority) return;
    if (document.readyState === "complete") {
      setPageLoaded(true);
      return;
    }
    const done = () => setPageLoaded(true);
    window.addEventListener("load", done, { once: true });
    return () => window.removeEventListener("load", done);
  }, [priority]);

  useEffect(() => {
    const video = ref.current;
    if (!video || typeof IntersectionObserver === "undefined") {
      setArmed(true);
      return;
    }
    // Constant 1x playback: changing playbackRate while scrolling forced the
    // decoder to re-time every frame and made the footage stutter.
    let visible = false;
    let hovering = false;
    const hoverMode =
      play === "hover" && window.matchMedia("(hover: hover)").matches;
    const host = hoverMode
      ? video.closest<HTMLElement>("a, [data-hover-host]")
      : null;
    // A later section slides over earlier stacked ones, leaving their videos
    // "in view" but buried. Ask what is actually on top at the video's centre;
    // overlays that belong to the video's own section don't count.
    const buried = () => {
      const host = video.closest("section");
      if (!host) return false;
      const r = video.getBoundingClientRect();
      const x = Math.min(
        Math.max(r.left + r.width / 2, 0),
        window.innerWidth - 1,
      );
      const y = Math.min(
        Math.max(r.top + r.height / 2, 0),
        window.innerHeight - 1,
      );
      const top = document.elementFromPoint(x, y);
      return !!top && !host.contains(top);
    };
    const sync = () => {
      const wanted = !hoverMode || hovering;
      if (wanted && visible && !isFastScroll() && !buried()) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
        // Back to the poster frame when a hover preview ends
        if (hoverMode && !hovering && video.currentTime > 0) {
          video.currentTime = 0;
        }
      }
    };
    const setHover = (on: boolean) => () => {
      hovering = on;
      sync();
    };
    const enter = setHover(true);
    const leave = setHover(false);
    host?.addEventListener("pointerenter", enter);
    host?.addEventListener("pointerleave", leave);
    host?.addEventListener("focusin", enter);
    host?.addEventListener("focusout", leave);

    // Load well before the clip scrolls in, so it is ready when it arrives…
    const loader = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setArmed(true),
      { rootMargin: "600px 0px" },
    );
    // …but only decode while it is on screen, and for side-scrolling rows
    // (the atlas) only the cards in the middle of the viewport
    const player = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "0px -22% 0px -22%", threshold: 0.01 },
    );
    loader.observe(video);
    player.observe(video);
    const offFast = onFastScroll(sync);
    const offTick = onScrollTick(sync);
    return () => {
      loader.disconnect();
      player.disconnect();
      offFast();
      offTick();
      host?.removeEventListener("pointerenter", enter);
      host?.removeEventListener("pointerleave", leave);
      host?.removeEventListener("focusin", enter);
      host?.removeEventListener("focusout", leave);
    };
  }, [play]);

  return (
    <video
      ref={ref}
      className={styles.asset}
      src={armed && pageLoaded ? flowSrc(item) : undefined}
      poster={armed ? flowPoster(item) : undefined}
      autoPlay={play === "visible"}
      muted
      loop
      playsInline
      preload={play === "hover" ? "metadata" : "auto"}
      aria-label={item.alt}
      onError={onError}
    />
  );
};

/* Circuit traces — reads as a PCB plate while media is pending */
const TRACES = [
  "M0 60h90l20 20h120l20-20h150",
  "M0 120h50l30 30h90l20-20h210",
  "M0 190h120l25-25h80l30 30h145",
  "M0 250h70l20-20h160l25 25h125",
  "M140 0v40l20 20v40",
  "M260 0v70l-20 20v60",
  "M320 300v-60l20-20v-50",
  "M80 300v-40l-20-20",
];
const Traces: React.FC = () => (
  <svg
    className={styles.contours}
    viewBox="0 0 400 300"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    {TRACES.map((d) => (
      <path key={d} d={d} />
    ))}
    {[
      [110, 80],
      [250, 40],
      [200, 150],
      [290, 165],
      [100, 230],
      [340, 220],
    ].map(([cx, cy]) => (
      <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={4} />
    ))}
  </svg>
);

export const FlowMedia: React.FC<FlowMediaProps> = ({
  item,
  className,
  priority = false,
  srcOverride,
  showPendingLabel = true,
  play = "visible",
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
        <Traces />
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
          play={play}
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
