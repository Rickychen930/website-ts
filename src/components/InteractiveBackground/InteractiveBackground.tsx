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
  const animationFrameRef = useRef<number | undefined>(undefined);

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

    // Mesh gradient animation - Optimized with slower update rate
    let lastTime = 0;
    const targetFPS = 30; // Reduce to 30fps for better performance
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Throttle to 30fps instead of 60fps
      if (currentTime - lastTime >= frameInterval) {
        const time = currentTime * 0.0005; // Slower animation
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height,
        );

        gradient.addColorStop(
          0,
          `rgba(59, 130, 246, ${0.08 + Math.sin(time) * 0.03})`, // Lower opacity
        );
        gradient.addColorStop(
          0.5,
          `rgba(34, 197, 94, ${0.06 + Math.cos(time) * 0.02})`,
        );
        gradient.addColorStop(
          1,
          `rgba(59, 130, 246, ${0.08 + Math.sin(time * 1.2) * 0.03})`,
        );

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        lastTime = currentTime;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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
