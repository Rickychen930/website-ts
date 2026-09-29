import { useEffect, type RefObject } from "react";

/** Viewport shrinking by more than this means an on-screen keyboard, not a toolbar collapse. */
const KEYBOARD_THRESHOLD_PX = 120;

/**
 * Keeps the phone chat sheet glued to the *visual* viewport while open.
 *
 * iOS Safari (and Android Chrome by default) don't shrink the layout viewport
 * when the keyboard opens — they pan it. We mirror visualViewport height and
 * offset into CSS vars on the panel, flag `data-keyboard`, lock page scroll and
 * keep the newest message pinned. Writes go straight to the DOM inside rAF so
 * resize/scroll never re-render React.
 */
export function useChatViewport(
  active: boolean,
  panelRef: RefObject<HTMLElement | null>,
  listRef: RefObject<HTMLElement | null>,
  scrollLockClass: string,
): void {
  useEffect(() => {
    const panel = panelRef.current;
    if (!active || !panel) return;
    const vv = window.visualViewport;
    const root = document.documentElement;
    let raf = 0;

    const apply = () => {
      raf = 0;
      if (!vv) return;
      const list = listRef.current;
      const pinned = list
        ? list.scrollHeight - list.scrollTop - list.clientHeight < 48
        : false;
      panel.style.setProperty("--kobi-vvh", `${Math.round(vv.height)}px`);
      panel.style.setProperty("--kobi-vvt", `${Math.round(vv.offsetTop)}px`);
      panel.toggleAttribute(
        "data-keyboard",
        window.innerHeight - vv.height > KEYBOARD_THRESHOLD_PX,
      );
      if (list && pinned) list.scrollTop = list.scrollHeight;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    root.classList.add(scrollLockClass);
    window.__lenis?.stop();
    apply();
    vv?.addEventListener("resize", schedule);
    vv?.addEventListener("scroll", schedule);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      vv?.removeEventListener("resize", schedule);
      vv?.removeEventListener("scroll", schedule);
      panel.style.removeProperty("--kobi-vvh");
      panel.style.removeProperty("--kobi-vvt");
      panel.removeAttribute("data-keyboard");
      root.classList.remove(scrollLockClass);
      window.__lenis?.start();
    };
  }, [active, panelRef, listRef, scrollLockClass]);
}
