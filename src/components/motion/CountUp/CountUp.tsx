import React, { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "@/lib/motion";
import styles from "./CountUp.module.css";

interface CountUpProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  ringPercent?: number;
}

export const CountUp: React.FC<CountUpProps> = ({
  target,
  suffix = "",
  prefix = "",
  duration = 1500,
  label,
  ringPercent = 80,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const shouldReduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [ringFill, setRingFill] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      setCount(target);
      setRingFill(ringPercent);
      return;
    }

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      setRingFill(eased * ringPercent);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration, ringPercent, shouldReduce]);

  const size = 100;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (ringFill / 100) * circumference;

  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.ringWrapper}>
        <svg width={size} height={size} className={styles.ring}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--accent-1)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <span className={styles.number}>
          {prefix}
          {count}
          {suffix}
        </span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
