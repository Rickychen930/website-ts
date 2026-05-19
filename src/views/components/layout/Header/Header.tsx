/**
 * Header Component - Portfolio navigation
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { DownloadResume } from "@/components/DownloadResume";
import { SITE_BRAND_NAME } from "@/config/site-defaults";
import styles from "./Header.module.css";

const NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/experience", label: "Experience" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
] as const;

export const Header: React.FC = () => {
  const { profile } = useProfile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          rafRef.current = null;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const isActive = (path: string): boolean => {
    if (path === "/") return location.pathname === "/";
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      role="banner"
      data-print="hide"
    >
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.logo}
          aria-label={`${profile?.name || SITE_BRAND_NAME} - Home`}
        >
          <img
            src="/logo192.png"
            alt={`${profile?.name || SITE_BRAND_NAME} — home`}
            className={styles.logoImage}
            width="48"
            height="48"
          />
        </Link>

        <nav
          id="main-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}
          role="navigation"
          aria-label="Main navigation"
          data-print="hide"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${isActive(item.path) ? styles.navLinkActive : ""}`}
              onClick={() => setIsMenuOpen(false)}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.headerActions} data-print="hide">
          <DownloadResume compact className={styles.headerDownloadCta} />
          <ThemeToggle />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          type="button"
          data-print="hide"
        >
          <span className={styles.menuIcon} aria-hidden="true" />
          <span className={styles.menuIcon} aria-hidden="true" />
          <span className={styles.menuIcon} aria-hidden="true" />
          <span className="visually-hidden">
            {isMenuOpen ? "Close menu" : "Open menu"}
          </span>
        </button>
      </div>
    </header>
  );
};
