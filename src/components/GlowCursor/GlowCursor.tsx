/**
 * GlowCursor — holographic cursor glow (pointer devices only).
 */

import React, { useEffect, useRef, useState } from "react";
import styles from "./GlowCursor.module.css";

export const GlowCursor: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reducedMotion) return undefined;

    document.body.classList.add("nx-cursor-active");
    setActive(true);

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      setActive(false);
      document.body.classList.remove("nx-cursor-active");
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const visibleClass = active ? styles.visible : "";

  return (
    <>
      <div
        ref={glowRef}
        className={`${styles.glow} ${visibleClass}`}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className={`${styles.dot} ${visibleClass}`}
        aria-hidden="true"
      />
    </>
  );
};
