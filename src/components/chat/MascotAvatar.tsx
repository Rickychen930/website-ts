import React, { useState } from "react";
import { flowPoster, MASCOT } from "@/config/flowMedia";
import styles from "./ChatWidget.module.css";

interface MascotAvatarProps {
  variant?: "avatar" | "full";
  className?: string;
}

/** Kobi the quokka — Google Flow image with an inline SVG fallback */
export const MascotAvatar: React.FC<MascotAvatarProps> = ({
  variant = "avatar",
  className,
}) => {
  const [failed, setFailed] = useState(false);
  const cls = [styles.mascot, styles[`mascot_${variant}`], className]
    .filter(Boolean)
    .join(" ");

  if (failed) {
    return (
      <span className={cls} aria-hidden="true">
        <svg viewBox="0 0 64 64" className={styles.mascotSvg}>
          <circle cx="18" cy="18" r="8" className={styles.fur} />
          <circle cx="46" cy="18" r="8" className={styles.fur} />
          <ellipse cx="32" cy="36" rx="20" ry="19" className={styles.fur} />
          <ellipse cx="32" cy="43" rx="11" ry="8" className={styles.muzzle} />
          <circle cx="25" cy="32" r="2.6" className={styles.eye} />
          <circle cx="39" cy="32" r="2.6" className={styles.eye} />
          <ellipse cx="32" cy="40" rx="3" ry="2" className={styles.eye} />
          <path d="M27 45 Q32 50 37 45" className={styles.smile} />
        </svg>
      </span>
    );
  }

  return (
    <img
      src={flowPoster(variant === "full" ? MASCOT.full : MASCOT.avatar)}
      alt=""
      aria-hidden="true"
      className={cls}
      width={variant === "full" ? 160 : 64}
      height={variant === "full" ? 200 : 64}
      decoding="async"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
};
