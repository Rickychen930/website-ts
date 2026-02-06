/**
 * useCounter Hook - Animated counter for numbers
 * Respects prefers-reduced-motion: no animation when user prefers reduced motion.
 */

import { useEffect, useState } from "react";

export interface UseCounterOptions {
  duration?: number;
  startOnView?: boolean;
}

const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useCounter = (target: number, options: UseCounterOptions = {}) => {
  const { duration = 2000, startOnView = true } = options;
  const skipAnimation = prefersReducedMotion();
  const [count, setCount] = useState(skipAnimation ? target : 0);
  const [hasStarted, setHasStarted] = useState(skipAnimation || !startOnView);

  useEffect(() => {
    if (!hasStarted) return;
    if (skipAnimation) {
      setCount(target);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [target, duration, hasStarted, skipAnimation]);

  const start = () => {
    setHasStarted(true);
  };

  return { count, start, hasStarted };
};
