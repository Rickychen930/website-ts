/**
 * useActiveSection - Tracks which section heading is in view for TOC highlight (scroll spy).
 * Uses IntersectionObserver; respects prefers-reduced-motion (no scroll-linked updates if reduced).
 */

import { useState, useEffect, useRef } from "react";

const ROOT_MARGIN = "-10% 0px -70% 0px";
const THRESHOLD = 0;

export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(
    sectionIds.length > 0 ? sectionIds[0] : null,
  );
  const observedRef = useRef<Set<string>>(new Set());
  const rafRef = useRef<number | null>(null);

  const sectionIdsKey = sectionIds.join(",");

  useEffect(() => {
    if (sectionIds.length === 0) {
      setActiveId(null);
      return;
    }

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setActiveId(sectionIds[0]);
      return;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (elements.length === 0) {
      setActiveId(sectionIds[0]);
      return;
    }

    const observed = observedRef;

    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            observed.current.add(entry.target.id);
          } else {
            observed.current.delete(entry.target.id);
          }
        }
        const visible = elements.filter((el) => observed.current.has(el.id));
        if (visible.length === 0) {
          setActiveId(sectionIds[0]);
          return;
        }
        const byTop = [...visible].sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top,
        );
        setActiveId(byTop[0]?.id ?? sectionIds[0]);
      });
    };

    const observer = new IntersectionObserver(onIntersect, {
      rootMargin: ROOT_MARGIN,
      threshold: THRESHOLD,
    });

    elements.forEach((el) => observer.observe(el));
    setActiveId(sectionIds[0]);

    return () => {
      observer.disconnect();
      observed.current.clear();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
    // sectionIdsKey is the stable string of ids; sectionIds array ref may change every render
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sectionIdsKey encodes sectionIds
  }, [sectionIdsKey]);

  return activeId;
}
