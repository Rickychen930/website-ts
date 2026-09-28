import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    /** Active Lenis instance (desktop only) */
    __lenis?: Lenis;
  }
}

/**
 * Inertial smooth scrolling on desktop (wheel / trackpad) so every
 * scroll-linked effect glides instead of stepping. Off for touch and
 * reduced motion; lazy-loaded so it never blocks first paint.
 */
export const useSmoothScroll = (enabled = true): void => {
  useEffect(() => {
    if (!enabled) return;
    const ok = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    if (!ok.matches) return;

    let raf = 0;
    let lenis: Lenis | null = null;
    let cancelled = false;

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({
        lerp: 0.085,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        anchors: { offset: -80, duration: 1.2 },
      });
      window.__lenis = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [enabled]);
};
