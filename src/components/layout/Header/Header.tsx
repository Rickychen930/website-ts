import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, LayoutGroup } from "@/lib/motion";
import { useTheme } from "@/contexts/ThemeContext";
import { NAV_OFFSET, scrollToSection } from "@/utils/scrollToSection";
import styles from "./Header.module.css";

/** Same names, same order as the section eyebrows on the home page */
export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Experience" },
  { id: "stack", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path
      d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

export const Header: React.FC = () => {
  const { theme, toggle } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  // Keep the bar visible while a nav click is scrolling the page
  const holdUntil = useRef(0);

  // Scroll state: glass on scroll, hide on the way down, show on the way up,
  // and the active section = last anchor that crossed the nav line.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const delta = y - lastY.current;
      setScrolled(y > 48);
      if (Date.now() < holdUntil.current) setHidden(false);
      else if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 240);
      lastY.current = y;

      if (pathname !== "/") return;
      const line = NAV_OFFSET + window.innerHeight * 0.25;
      let current = "";
      for (const { id } of NAV_LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

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
    setHidden(false);
    if (pathname.startsWith("/projects")) setActive("projects");
    else if (pathname !== "/") setActive("");
  }, [pathname]);

  const goTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    holdUntil.current = Date.now() + 1800;
    if (pathname === "/" && scrollToSection(id)) return;
    navigate(`/#${id}`);
  };

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
        hidden && !menuOpen && styles.hidden,
      ]
        .filter(Boolean)
        .join(" ")}
      role="banner"
    >
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} aria-label="Ricky Chen — home">
          <img
            src="/logo192.png"
            alt=""
            width={44}
            height={44}
            className={styles.logoImg}
            decoding="async"
          />
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          <LayoutGroup id="main-nav">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={(e) => goTo(e, id)}
                className={[styles.navLink, active === id && styles.navActive]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={active === id ? "location" : undefined}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className={styles.navPill}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <span className={styles.navText}>{label}</span>
              </a>
            ))}
          </LayoutGroup>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                className={styles.iconSwap}
                initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <Link to="/resume" className={styles.resume} data-magnetic="">
            Résumé
          </Link>
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
              {NAV_LINKS.map(({ id, label }, i) => (
                <motion.a
                  key={id}
                  href={`/#${id}`}
                  onClick={(e) => goTo(e, id)}
                  className={styles.mobileLink}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.15 + i * 0.05,
                  }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>
            <Link
              to="/resume"
              className={styles.mobileCta}
              onClick={() => setMenuOpen(false)}
            >
              View résumé
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
