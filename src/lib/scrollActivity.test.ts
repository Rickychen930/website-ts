import { isFastScroll, onFastScroll, onScrollTick } from "./scrollActivity";

const scrollTo = (y: number) => {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  window.dispatchEvent(new Event("scroll"));
};

describe("scrollActivity", () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test("flags a flick, then settles", () => {
    const seen: boolean[] = [];
    const off = onFastScroll((fast) => seen.push(fast));

    scrollTo(10); // slow
    expect(isFastScroll()).toBe(false);
    scrollTo(400); // 390px in one event
    expect(isFastScroll()).toBe(true);

    jest.advanceTimersByTime(200);
    expect(isFastScroll()).toBe(false);
    expect(seen).toEqual([true, false]);
    off();
  });

  test("ticks while scrolling and once after it settles", () => {
    const tick = jest.fn();
    const off = onScrollTick(tick);

    scrollTo(500);
    scrollTo(510);
    jest.advanceTimersByTime(300);
    expect(tick).toHaveBeenCalled();

    const calls = tick.mock.calls.length;
    jest.advanceTimersByTime(1000);
    expect(tick.mock.calls.length).toBeGreaterThanOrEqual(calls);
    off();
  });
});
