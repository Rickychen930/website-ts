/** Height the floating nav covers; used for the active-section line */
export const NAV_OFFSET = 96;

/**
 * Smooth-scroll to a home-page section anchor. Header clearance comes from
 * `scroll-padding-top` on <html>, which both Lenis and native scrolling honour.
 */
export const scrollToSection = (id: string): boolean => {
  const el = document.getElementById(id);
  if (!el) return false;
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
};
