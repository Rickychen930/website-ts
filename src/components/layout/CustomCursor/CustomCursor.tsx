import React, { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.css";

type CursorContext = "default" | "view" | "copy" | "open" | "link";

const LABELS: Record<CursorContext, string> = {
  default: "",
  view: "View",
  copy: "Copy",
  open: "Open ↗",
  link: "→",
};

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<CursorContext>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let ringX = 0;
    let ringY = 0;
    let raf: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      if (!dotRef.current || !ringRef.current) return;
      if (!visible) setVisible(true);

      const { clientX: x, clientY: y } = e;

      dotRef.current.style.transform = `translate(${x}px, ${y}px)`;

      // lerp ring
      cancelAnimationFrame(raf);
      const animate = () => {
        ringX = lerp(ringX, x, 0.12);
        ringY = lerp(ringY, y, 0.12);
        if (ringRef.current) {
          ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
        }
        const dx = Math.abs(ringX - x);
        const dy = Math.abs(ringY - y);
        if (dx > 0.1 || dy > 0.1) {
          raf = requestAnimationFrame(animate);
        }
      };
      raf = requestAnimationFrame(animate);

      // Detect context from element under cursor
      const el = document.elementFromPoint(x, y);
      if (!el) {
        setContext("default");
        return;
      }

      const emailEl = el.closest("[data-cursor='copy']");
      const projectEl = el.closest("[data-cursor='view']");
      const externalEl = el.closest("[data-cursor='open']");
      const linkEl = el.closest("a, button");

      if (emailEl) setContext("copy");
      else if (projectEl) setContext("view");
      else if (externalEl) setContext("open");
      else if (linkEl) setContext("link");
      else setContext("default");
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  const isActive = context !== "default";
  const label = LABELS[context];

  return (
    <>
      <div
        ref={dotRef}
        className={styles.dot}
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={[styles.ring, isActive && styles.ringActive]
          .filter(Boolean)
          .join(" ")}
        style={{ opacity: visible ? 1 : 0 }}
        aria-hidden="true"
      >
        {label && <span className={styles.label}>{label}</span>}
      </div>
    </>
  );
};
