/**
 * NexusScene — interactive particle network (performance-tuned).
 */

import React, { useEffect, useRef } from "react";
import styles from "./NexusScene.module.css";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  radius: number;
}

const CONNECT_DIST = 140;
const MOUSE_RADIUS = 180;
const CELL_SIZE = CONNECT_DIST;

function particleCount(): number {
  if (typeof window === "undefined") return 48;
  const w = window.innerWidth;
  if (w < 640) return 28;
  if (w < 1024) return 44;
  return 60;
}

export const NexusScene: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const activeRef = useRef(true);
  const scrollingRef = useRef(false);
  const reducedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return undefined;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return undefined;

    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const count = reducedRef.current ? 24 : particleCount();

    const initParticles = (w: number, h: number) => {
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        z: Math.random(),
        radius: 1 + Math.random() * 2,
      }));
    };

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length === 0) {
        initParticles(width, height);
      }
    };

    let pendingMouse: { x: number; y: number } | null = null;
    const flushMouse = () => {
      if (pendingMouse) {
        mouseRef.current = pendingMouse;
        pendingMouse = null;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pendingMouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    const onVisibility = () => {
      activeRef.current = !document.hidden;
      if (activeRef.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const isDark = () => document.documentElement.classList.contains("dark");

    const buildGrid = (particles: Particle[], w: number, h: number) => {
      const cols = Math.ceil(w / CELL_SIZE) + 1;
      const grid: number[][] = Array.from({ length: cols * cols }, () => []);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const col = Math.floor(p.x / CELL_SIZE);
        const row = Math.floor(p.y / CELL_SIZE);
        const idx = row * cols + col;
        if (grid[idx]) grid[idx].push(i);
      }
      return { grid, cols };
    };

    const staticDrawnRef = { current: false };

    const draw = () => {
      rafRef.current = 0;

      if (!activeRef.current || scrollingRef.current) return;

      if (reducedRef.current && staticDrawnRef.current) return;

      flushMouse();

      ctx.clearRect(0, 0, width, height);

      const dark = isDark();
      const accentRgb = dark ? "0, 229, 255" : "6, 182, 212";
      const magentaRgb = "255, 45, 146";
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const animate = !reducedRef.current;

      if (animate) {
        for (const p of particles) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MOUSE_RADIUS && dist > 0) {
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            p.vx -= (dx / dist) * force * 0.08;
            p.vy -= (dy / dist) * force * 0.08;
          }

          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.99;
          p.vy *= 0.99;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }
      }

      const { grid, cols } = buildGrid(particles, width, height);
      const drawn = new Set<string>();

      for (let row = 0; row <= Math.ceil(height / CELL_SIZE); row++) {
        for (let col = 0; col <= Math.ceil(width / CELL_SIZE); col++) {
          const cellIdx = row * cols + col;
          const cell = grid[cellIdx];
          if (!cell) continue;

          for (const i of cell) {
            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                const nCell = grid[(row + dr) * cols + (col + dc)];
                if (!nCell) continue;
                for (const j of nCell) {
                  if (j <= i) continue;
                  const key = i < j ? `${i}-${j}` : `${j}-${i}`;
                  if (drawn.has(key)) continue;

                  const a = particles[i];
                  const b = particles[j];
                  const dx = a.x - b.x;
                  const dy = a.y - b.y;
                  const dist = Math.hypot(dx, dy);
                  if (dist < CONNECT_DIST) {
                    drawn.add(key);
                    const alpha =
                      (1 - dist / CONNECT_DIST) * 0.35 * ((a.z + b.z) / 2);
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${accentRgb}, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                  }
                }
              }
            }
          }
        }
      }

      for (const p of particles) {
        const size = p.radius * (0.6 + p.z * 0.8);
        const alpha = 0.3 + p.z * 0.5;
        const color =
          p.z > 0.65
            ? `rgba(${magentaRgb}, ${alpha})`
            : `rgba(${accentRgb}, ${alpha})`;

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();

        if (p.z > 0.7 && animate) {
          ctx.beginPath();
          ctx.fillStyle = `rgba(${accentRgb}, ${alpha * 0.3})`;
          ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (reducedRef.current) {
        staticDrawnRef.current = true;
      } else {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(
      ([entry]) => {
        activeRef.current = entry.isIntersecting && !document.hidden;
        if (activeRef.current && !rafRef.current) {
          rafRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0 },
    );
    io.observe(root);

    let scrollEndTimer = 0;
    const onScroll = () => {
      scrollingRef.current = true;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        scrollingRef.current = false;
        if (activeRef.current && !rafRef.current) {
          rafRef.current = requestAnimationFrame(draw);
        }
      }, 120);
    };

    resize();
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(scrollEndTimer);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.scene} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.orbs}>
        <span className={`${styles.orb} ${styles.orbCyan}`} />
        <span className={`${styles.orb} ${styles.orbMagenta}`} />
        <span className={`${styles.orb} ${styles.orbGold}`} />
      </div>
      <div className={styles.gridFloor} />
    </div>
  );
};
