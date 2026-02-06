/**
 * Cursor Effect - Custom cursor with glow effect
 * Hidden on touch devices and when user prefers reduced motion.
 */

import React, { useEffect, useState, useRef } from "react";
import styles from "./CursorEffect.module.css";

export const CursorEffect: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const rafRef = useRef<number | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setEnabled(!reduceMotion && !isTouch);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const updateCursor = (e: MouseEvent) => {
      // Update ref immediately for smooth tracking
      positionRef.current = { x: e.clientX, y: e.clientY };

      // Throttle state updates using requestAnimationFrame
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setPosition(positionRef.current);
          rafRef.current = null;
        });
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        className={`${styles.cursor} ${isHovering ? styles.cursorHover : ""}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        aria-hidden="true"
        data-print="hide"
      />
      <div
        className={styles.cursorDot}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
        aria-hidden="true"
        data-print="hide"
      />
    </>
  );
};
