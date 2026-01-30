/**
 * Interactive Background - Dynamic animated background patterns
 */

import React, { useEffect, useRef } from "react";
import { colors, hexToRgb } from "@/config/design-tokens";
import { useTheme } from "@/contexts/ThemeContext";
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
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (variant !== "mesh" || !canvasRef.current) return;

    const primaryRgb = hexToRgb(
      isDark ? colors.primary[400] : colors.primary[500],
    );
    const accentRgb = hexToRgb(
      isDark ? colors.accent[400] : colors.accent[500],
    );

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
          `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, ${0.08 + Math.sin(time) * 0.03})`,
        );
        gradient.addColorStop(
          0.5,
          `rgba(${accentRgb[0]}, ${accentRgb[1]}, ${accentRgb[2]}, ${0.06 + Math.cos(time) * 0.02})`,
        );
        gradient.addColorStop(
          1,
          `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, ${0.08 + Math.sin(time * 1.2) * 0.03})`,
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
  }, [variant, isDark]);

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
