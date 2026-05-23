/**
 * TiltCard — 3D perspective tilt on pointer hover.
 */

import React, { useRef, useCallback } from "react";
import styles from "./TiltCard.module.css";

export interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 12,
  glare = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`;

      if (glare && glareRef.current) {
        const px = ((e.clientX - rect.left) / rect.width) * 100;
        const py = ((e.clientY - rect.top) / rect.height) * 100;
        glareRef.current.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
        glareRef.current.style.opacity = "1";
      }
    },
    [maxTilt, glare],
  );

  const handleLeave = useCallback(() => {
    const el = cardRef.current;
    if (el) {
      el.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }
    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.tilt} nx-glass nx-card-glow ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {glare ? (
        <div ref={glareRef} className={styles.glare} aria-hidden="true" />
      ) : null}
      <div className={styles.content}>{children}</div>
    </div>
  );
};
