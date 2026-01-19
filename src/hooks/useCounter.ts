/**
 * useCounter Hook - Animated counter for numbers
 */

import { useEffect, useState } from "react";

export interface UseCounterOptions {
  duration?: number;
  startOnView?: boolean;
}

export const useCounter = (target: number, options: UseCounterOptions = {}) => {
  const { duration = 2000, startOnView = true } = options;
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(!startOnView);

  useEffect(() => {
    if (!hasStarted) return;

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
  }, [target, duration, hasStarted]);

  const start = () => {
    setHasStarted(true);
  };

  return { count, start, hasStarted };
};
