/**
 * Particle Background - Animated particle effect
 * Disabled when user prefers reduced motion.
 */

import React, { useEffect, useRef, useState } from "react";
import { colors, hexToRgb } from "@/config/design-tokens";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./ParticleBackground.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

export const ParticleBackground: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 768,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handle = () => setIsMobile(mq.matches);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    if (reduceMotion || isMobile) return;

    const primaryRgb = hexToRgb(
      isDark ? colors.primary[400] : colors.primary[800],
    );
    const accentRgb = hexToRgb(
      isDark ? colors.accent[400] : colors.accent[600],
    );
    const mixRgb = (
      a: [number, number, number],
      b: [number, number, number],
      t: number,
    ): [number, number, number] => [
      Math.round(a[0] * (1 - t) + b[0] * t),
      Math.round(a[1] * (1 - t) + b[1] * t),
      Math.round(a[2] * (1 - t) + b[2] * t),
    ];
    const lineRgb = mixRgb(primaryRgb, accentRgb, isDark ? 0.2 : 0.28);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles - Reduced count for better performance
    const particleCount = Math.min(
      30, // Reduced from 50
      Math.floor((window.innerWidth * window.innerHeight) / 25000), // Increased divisor
    );
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3, // Slower movement
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5, // Smaller particles
      opacity: Math.random() * 0.3 + 0.1, // Lower opacity
    }));

    // Optimized connection distance check - avoid expensive sqrt
    const connectionDistanceSq = 100 * 100; // 100px squared

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles first
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryRgb[0]}, ${primaryRgb[1]}, ${primaryRgb[2]}, ${particle.opacity})`;
        ctx.fill();
      });

      // Draw connections - optimized with distance squared check
      for (let i = 0; i < particlesRef.current.length; i++) {
        const particle = particlesRef.current[i];
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distanceSq = dx * dx + dy * dy; // Use squared distance

          if (distanceSq < connectionDistanceSq) {
            const distance = Math.sqrt(distanceSq);
            const lineAlpha =
              0.045 * (1 - distance / 100) * (isDark ? 1 : 0.85);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(${lineRgb[0]}, ${lineRgb[1]}, ${lineRgb[2]}, ${lineAlpha})`;
            ctx.lineWidth = 0.5; // Thinner lines
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDark, reduceMotion, isMobile]);

  if (reduceMotion || isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className={styles.particleBackground}
      aria-hidden="true"
      data-print="hide"
    />
  );
};
