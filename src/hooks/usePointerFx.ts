import { useEffect } from "react";

const TILT_MAX = 4; // degrees
const MAGNET_PULL = 7; // px

/**
 * One delegated pointer listener drives three opt-in effects via CSS vars:
 * - [data-spotlight] → --mx/--my (cursor position inside the element)
 * - [data-tilt]      → --rx/--ry (subtle 3D tilt)
 * - [data-magnetic]  → --mgx/--mgy (pull toward the cursor)
 * Desktop fine pointers only; off for reduced motion. One write per frame.
 */
export const usePointerFx = (enabled = true): void => {
  useEffect(() => {
    if (!enabled) return;
    const ok = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!ok.matches) return;

    let raf = 0;
    let last: PointerEvent | null = null;
    let tiltEl: HTMLElement | null = null;
    let magnetEl: HTMLElement | null = null;

    const reset = (el: HTMLElement | null, vars: string[]) => {
      vars.forEach((v) => el?.style.removeProperty(v));
    };

    const frame = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as Element | null;

      const spot = target?.closest<HTMLElement>("[data-spotlight]");
      if (spot) {
        const r = spot.getBoundingClientRect();
        spot.style.setProperty("--mx", `${e.clientX - r.left}px`);
        spot.style.setProperty("--my", `${e.clientY - r.top}px`);
      }

      const tilt = target?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (tilt !== tiltEl) reset(tiltEl, ["--rx", "--ry"]);
      tiltEl = tilt;
      if (tilt) {
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--rx", `${(-py * TILT_MAX).toFixed(2)}deg`);
        tilt.style.setProperty("--ry", `${(px * TILT_MAX).toFixed(2)}deg`);
      }

      const magnet = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (magnet !== magnetEl) reset(magnetEl, ["--mgx", "--mgy"]);
      magnetEl = magnet;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        magnet.style.setProperty("--mgx", `${(dx * MAGNET_PULL).toFixed(1)}px`);
        magnet.style.setProperty("--mgy", `${(dy * MAGNET_PULL).toFixed(1)}px`);
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onLeave = () => {
      reset(tiltEl, ["--rx", "--ry"]);
      reset(magnetEl, ["--mgx", "--mgy"]);
      tiltEl = magnetEl = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      onLeave();
    };
  }, [enabled]);
};
