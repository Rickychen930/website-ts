import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion";
import styles from "./CountUp.module.css";

interface CountUpProps {
  target: number;
  suffix?: string;
  label: string;
  duration?: number;
}

/** Large serif figure that counts up once when scrolled into view */
export const CountUp: React.FC<CountUpProps> = ({
  target,
  suffix = "",
  label,
  duration = 1600,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, duration]);

  return (
    <div ref={ref} className={styles.stat} data-spotlight="">
      <span className={styles.value}>
        {count}
        {suffix}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
