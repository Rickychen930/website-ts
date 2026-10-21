/**
 * Shared "is the page being flicked?" signal. Decoding several 1080p videos
 * while the page flies past costs frames nobody can see, so media pauses
 * while this is true and resumes once scrolling settles.
 */
type Listener = (fast: boolean) => void;

const FAST_PX_PER_EVENT = 48; // ≈ 2900 px/s at 60 Hz
const SETTLE_MS = 140;

const TICK_MS = 250;

const listeners = new Set<Listener>();
const ticks = new Set<() => void>();
let tickTimer = 0;
let settleTimer = 0;
let fast = false;
let lastY = 0;
let timer = 0;
let bound = false;

const emit = (next: boolean): void => {
  if (next === fast) return;
  fast = next;
  listeners.forEach((l) => l(next));
};

const runTicks = (): void => ticks.forEach((t) => t());

const onScroll = (): void => {
  // Throttled while scrolling, plus once more when it settles
  if (!tickTimer) {
    tickTimer = window.setTimeout(() => {
      tickTimer = 0;
      runTicks();
    }, TICK_MS);
  }
  window.clearTimeout(settleTimer);
  settleTimer = window.setTimeout(runTicks, SETTLE_MS);
  const y = window.scrollY;
  const dy = Math.abs(y - lastY);
  lastY = y;
  if (dy > FAST_PX_PER_EVENT) emit(true);
  if (!fast) return;
  window.clearTimeout(timer);
  timer = window.setTimeout(() => emit(false), SETTLE_MS);
};

export const isFastScroll = (): boolean => fast;

const bind = (): void => {
  if (bound) return;
  lastY = window.scrollY;
  window.addEventListener("scroll", onScroll, { passive: true });
  bound = true;
};

export const onFastScroll = (listener: Listener): (() => void) => {
  bind();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

/** Called at most every 250 ms while scrolling, and once after it settles */
export const onScrollTick = (tick: () => void): (() => void) => {
  bind();
  ticks.add(tick);
  return () => {
    ticks.delete(tick);
  };
};
