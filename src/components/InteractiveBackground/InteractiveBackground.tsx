/**
 * Interactive Background - Dynamic animated background patterns
 */

import React, { useEffect, useRef } from "react";
import styles from "./InteractiveBackground.module.css";

interface InteractiveBackgroundProps {
  variant?: "grid" | "dots" | "waves" | "mesh";
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  variant = "mesh",
  intensity = "medium",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (variant !== "mesh" || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mesh gradient animation
    const animate = () => {
      const time = Date.now() * 0.001;
      const gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height,
      );

      gradient.addColorStop(
        0,
        `rgba(59, 130, 246, ${0.1 + Math.sin(time) * 0.05})`,
      );
      gradient.addColorStop(
        0.5,
        `rgba(34, 197, 94, ${0.08 + Math.cos(time) * 0.04})`,
      );
      gradient.addColorStop(
        1,
        `rgba(59, 130, 246, ${0.1 + Math.sin(time * 1.5) * 0.05})`,
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [variant]);

  if (variant === "mesh") {
    return (
      <canvas
        ref={canvasRef}
        className={`${styles.interactiveBackground} ${styles.mesh} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`${styles.interactiveBackground} ${styles[variant]} ${styles[intensity]} ${className}`}
      aria-hidden="true"
    />
  );
};
