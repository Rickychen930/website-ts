/**
 * First-visit brand intro timing. Evaluated once at import so page
 * animations can offset themselves (JS via introOffset, CSS via
 * --intro-offset) and play as the curtain lifts, not hidden under it.
 */
const KEY = "rc-intro-seen";

/** Seconds the intro holds before the curtain starts to lift */
export const INTRO_HOLD = 1.1;

const reduce =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const firstVisit = (() => {
  if (typeof window === "undefined" || reduce) return false;
  try {
    const seen = sessionStorage.getItem(KEY);
    sessionStorage.setItem(KEY, "1");
    return !seen;
  } catch {
    return true;
  }
})();

export const isIntro = (): boolean => firstVisit;

/** Extra delay for entrance animations on the first page */
export const introOffset = (): number => (firstVisit ? INTRO_HOLD * 0.75 : 0);

if (typeof document !== "undefined") {
  document.documentElement.style.setProperty(
    "--intro-offset",
    `${introOffset()}s`,
  );
}
