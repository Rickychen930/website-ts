import { useEffect } from "react";
import { frame, cancelFrame } from "framer-motion";
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

    let lenis: Lenis | null = null;
    let cancelled = false;
    const tick = ({ timestamp }: { timestamp: number }) =>
      lenis?.raf(timestamp);

    void import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor({
        lerp: 0.1,
        wheelMultiplier: 0.9,
        autoRaf: false,
        smoothWheel: true,
        anchors: { duration: 1.2 },
      });
      window.__lenis = lenis;
      // Step Lenis inside framer-motion's own frame loop so scroll position and
      // scroll-linked transforms update in the same frame (no 1-frame lag/jitter)
      frame.update(tick, true);
    });

    return () => {
      cancelled = true;
      cancelFrame(tick);
      lenis?.destroy();
      if (window.__lenis === lenis) delete window.__lenis;
    };
  }, [enabled]);
};
