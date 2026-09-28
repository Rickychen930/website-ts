import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "@/lib/motion";
import { useTheme } from "@/contexts/ThemeContext";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/#about", id: "about", label: "Practice" },
  { href: "/#projects", id: "projects", label: "Works" },
  { href: "/#work", id: "work", label: "Chronology" },
  { href: "/#atlas", id: "atlas", label: "Atlas" },
  { href: "/#contact", id: "contact", label: "Contact" },
];

const sydneyTime = () =>
  new Date().toLocaleTimeString("en-AU", {
    timeZone: "Australia/Sydney",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const Header: React.FC = () => {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState(sydneyTime);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTime(sydneyTime()), 30_000);
    return () => clearInterval(t);
  }, []);

  // Lock scrolling behind the full-screen menu (Lenis or native)
  useEffect(() => {
    if (menuOpen) window.__lenis?.stop();
    else window.__lenis?.start();
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      window.__lenis?.start();
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    if (pathname.startsWith("/projects")) setActive("projects");
    else setActive("");
  }, [pathname]);

  // Section-based active state on the home page
  useEffect(() => {
    if (pathname !== "/") return;
    const observers: IntersectionObserver[] = [];
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  // Routes whose first screen is full-bleed media (home + 404)
  const isKnownPage =
    pathname === "/projects" ||
    pathname === "/resume" ||
    pathname.startsWith("/projects/");
  const overMedia = !isKnownPage && !scrolled && !menuOpen;

  return (
    <header
      className={[
        styles.header,
        (scrolled || menuOpen) && styles.scrolled,
        overMedia && styles.overMedia,
      ]
        .filter(Boolean)
        .join(" ")}
      role="banner"
    >
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Ricky Chen — home">
          <span className={styles.wordmark}>Ricky Chen</span>
          <span className={styles.studio}>Studio · Sydney</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(({ href, id, label }, i) => (
            <a
              key={id}
              href={href}
              className={[styles.navLink, active === id && styles.navActive]
                .filter(Boolean)
                .join(" ")}
              aria-current={active === id ? "true" : undefined}
            >
              <span className={styles.navIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <span className={styles.clock} aria-label={`Sydney time ${time}`}>
            SYD {time}
          </span>
          <button
            className={styles.textBtn}
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "day" : "night"} mode`}
          >
            {theme === "dark" ? "Day" : "Night"}
          </button>
          <a href="/resume" className={styles.resume}>
            Résumé ↗
          </a>
          <button
            className={styles.menuBtn}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={styles.menuLine} data-open={menuOpen} />
            <span className={styles.menuLine} data-open={menuOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile navigation" className={styles.mobileNav}>
              {[
                ...NAV_LINKS,
                { href: "/resume", id: "resume", label: "Résumé" },
              ].map(({ href, id, label }, i) => (
                <a
                  key={id}
                  href={href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.navIndex}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
            <p className={styles.mobileFoot}>
              33.8688° S, 151.2093° E — Sydney, Australia
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
