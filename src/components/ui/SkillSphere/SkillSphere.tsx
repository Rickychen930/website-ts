import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/motion";
import styles from "./SkillSphere.module.css";

export interface SphereItem {
  name: string;
  /** 1–4, drives type size */
  level: number;
  /** Category key — hovering a tag lights up its siblings */
  group: string;
}

interface SkillSphereProps {
  items: readonly SphereItem[];
  className?: string;
}

const AUTO_SPEED = 0.0032; // rad/frame
const FOV = 2.3;

/** Evenly spread points on a unit sphere (Fibonacci lattice) */
const lattice = (n: number) =>
  Array.from({ length: n }, (_, i) => {
    const y = 1 - ((i + 0.5) * 2) / n;
    const r = Math.sqrt(1 - y * y);
    const phi = i * Math.PI * (3 - Math.sqrt(5));
    return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r };
  });

/**
 * Draggable 3D tag sphere. Pure DOM + one rAF loop: tags are projected with a
 * simple perspective, sized and faded by depth. Drag to spin (with inertia),
 * hover a tag to light up its whole category. Runs only while on screen.
 */
export const SkillSphere: React.FC<SkillSphereProps> = ({
  items,
  className,
}) => {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const pts = lattice(items.length);
    let ax = -0.35; // tilt
    let ay = 0; // spin
    let vx = 0;
    let vy = reduce ? 0 : AUTO_SPEED;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let hot = "";
    let visible = false;
    let raf = 0;

    const draw = () => {
      const R = el.clientWidth * 0.31;
      const cx = Math.cos(ax);
      const sx = Math.sin(ax);
      const cy = Math.cos(ay);
      const sy = Math.sin(ay);
      pts.forEach((p, i) => {
        const node = tags.current[i];
        if (!node) return;
        // rotate around Y, then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const k = FOV / (FOV - z2); // perspective
        const depth = (z2 + 1) / 2; // 0 back … 1 front
        const dim = hot && node.dataset.group !== hot ? 0.22 : 1;
        node.style.transform = `translate3d(${(x1 * R * k).toFixed(1)}px, ${(
          y2 *
          R *
          k
        ).toFixed(1)}px, 0) translate(-50%, -50%) scale(${(0.7 * k).toFixed(
          3,
        )})`;
        node.style.opacity = String((0.18 + 0.82 * depth) * dim);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter =
          depth < 0.35 ? `blur(${(0.35 - depth) * 2.4}px)` : "";
      });
    };

    const tick = () => {
      raf = 0;
      if (!dragging) {
        // coast, then ease back to the idle spin (paused while a tag is hot)
        vx *= 0.94;
        vy += ((hot || reduce ? 0 : AUTO_SPEED) - vy) * 0.035;
        ax += vx;
        ay += vy;
      }
      draw();
      const settled =
        reduce && !dragging && Math.abs(vx) < 1e-4 && Math.abs(vy) < 1e-4;
      if (visible && !settled) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
      el.dataset.drag = "true";
      kick();
    };
    const onMove = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-group]",
      );
      const g = t?.dataset.group ?? "";
      if (g !== hot) {
        hot = g;
        kick();
      }
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      ay += dx * 0.008;
      ax = Math.max(-1.2, Math.min(1.2, ax - dy * 0.008));
      vy = dx * 0.008;
      vx = -dy * 0.008;
    };
    const onUp = () => {
      dragging = false;
      delete el.dataset.drag;
      kick();
    };
    const onLeave = () => {
      hot = "";
      kick();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(el);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("pointerleave", onLeave);
    draw();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [items, reduce]);

  return (
    <div
      ref={box}
      className={[styles.sphere, className].filter(Boolean).join(" ")}
      role="img"
      aria-label="Interactive 3D sphere of my skills. Drag to rotate."
    >
      <span className={styles.core} aria-hidden="true" />
      <span className={`${styles.ring} ${styles.ringA}`} aria-hidden="true" />
      <span className={`${styles.ring} ${styles.ringB}`} aria-hidden="true" />
      {items.map((it, i) => (
        <span
          key={it.name}
          ref={(n) => {
            tags.current[i] = n;
          }}
          className={`${styles.tag} ${styles[`g_${it.group}`] ?? ""}`}
          data-group={it.group}
          style={{ fontSize: `${0.74 + it.level * 0.11}rem` }}
          aria-hidden="true"
        >
          {it.name}
        </span>
      ))}
    </div>
  );
};
