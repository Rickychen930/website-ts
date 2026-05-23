/**
 * Magnetic — subtle cursor pull on CTAs (pointer devices only).
 */

import React, { useRef, useCallback, useEffect } from "react";
import styles from "./Magnetic.module.css";

export interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = "",
  strength = 0.28,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const enabledRef = useRef(true);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    enabledRef.current = finePointer && !reducedMotion;
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabledRef.current) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength],
  );

  const handleLeave = useCallback(() => {
    if (!enabledRef.current) return;
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.magnetic} ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};
