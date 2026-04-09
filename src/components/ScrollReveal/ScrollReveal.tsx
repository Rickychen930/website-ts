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
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const bottomInsetPx = () =>
      Math.min(50, Math.max(24, Math.round(window.innerHeight * 0.08)));

    const createObserver = () => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setIsVisible(true);
              }, delay);
              obs.unobserve(entry.target);
            }
          });
        },
        {
          /* 0 = any pixel visible. A single tall wrapper (e.g. Projects: filters + full grid)
             can fail 0.1 threshold when only the top is on screen — content stays opacity:0. */
          threshold: 0,
          rootMargin: `0px 0px -${bottomInsetPx()}px 0px`,
        },
      );
      return obs;
    };

    let observer = createObserver();
    observer.observe(element);

    const onResize = () => {
      observer.disconnect();
      observer = createObserver();
      observer.observe(element);
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [delay]);

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
