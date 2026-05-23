/**
 * Scroll Reveal - Enhanced scroll animations with Intersection Observer
 */

import React, { useEffect, useRef, useState, ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  className?: string;
  style?: React.CSSProperties;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
  style,
}) => {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [isVisible, setIsVisible] = useState(reducedMotion);
  const elementRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const element = elementRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const reveal = () => setIsVisible(true);

          if (delay > 0) {
            timeoutRef.current = window.setTimeout(reveal, delay);
          } else {
            reveal();
          }
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [delay, reducedMotion]);

  return (
    <div
      ref={elementRef}
      className={`${styles.scrollReveal} ${styles[direction]} ${isVisible ? styles.visible : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
