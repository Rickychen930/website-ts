/**
 * Header Component - Layout Component
 * Main navigation header
 */

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "@/components/Search";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const { profile } = useProfile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/projects", label: "Projects" },
    { path: "/experience", label: "Experience" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <div className={styles.container}>
        <Link
          to="/"
          className={styles.logo}
          aria-label={`${profile?.name || "Home"} - Home`}
        >
          <img
            src="/logo192.png"
            alt={`${profile?.name || "Ricky Chen"} logo - Home`}
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
        >
          {navItems.map((item) => (
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

        <div className={styles.headerActions}>
          <div className={styles.searchWrapper}>
            <Search className={styles.headerSearch} />
          </div>
          <ThemeToggle />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          aria-haspopup="true"
          type="button"
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
