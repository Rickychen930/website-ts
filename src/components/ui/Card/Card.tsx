import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "@/lib/motion";
import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  tilt = false,
  glow = false,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
    mass: 0.5,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const cls = [styles.card, glow && styles.glow, className]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.div
      ref={ref}
      className={cls}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={glow ? { borderColor: "var(--border-hover)" } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
};
