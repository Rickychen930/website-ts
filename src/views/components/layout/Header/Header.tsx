/**
 * Header Component - Layout Component
 * Main navigation header
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/contexts/ProfileContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Search } from "@/components/Search";
import styles from "./Header.module.css";

const MAIN_NAV_ITEMS = [
  { path: "/", label: "Home" },
  { path: "/projects", label: "Projects" },
  { path: "/learning", label: "Learning" },
];

const DROPDOWN_NAV_ITEMS = [
  { path: "/about", label: "About" },
  { path: "/experience", label: "Experience" },
  { path: "/resume", label: "Resume" },
  { path: "/contact", label: "Contact" },
];

export const Header: React.FC = () => {
  const { profile } = useProfile();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafRef = useRef<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          setIsDropdownOpen(false);
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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const isDropdownActive = DROPDOWN_NAV_ITEMS.some((item) =>
    isActive(item.path),
  );

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
          data-print="hide"
        >
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${isActive(item.path) ? styles.navLinkActive : ""}`}
              onClick={closeAll}
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          <div ref={dropdownRef} className={styles.navDropdown}>
            <button
              type="button"
              className={`${styles.navDropdownTrigger} ${isDropdownActive ? styles.navLinkActive : ""}`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
              aria-controls="nav-dropdown-menu"
              id="nav-dropdown-trigger"
            >
              More
              <span
                className={`${styles.navDropdownChevron} ${isDropdownOpen ? styles.navDropdownChevronOpen : ""}`}
                aria-hidden="true"
              >
                ▾
              </span>
            </button>
            <ul
              id="nav-dropdown-menu"
              className={`${styles.navDropdownMenu} ${isDropdownOpen ? styles.navDropdownMenuOpen : ""}`}
              role="menu"
              aria-labelledby="nav-dropdown-trigger"
            >
              {DROPDOWN_NAV_ITEMS.map((item) => (
                <li key={item.path} role="none">
                  <Link
                    to={item.path}
                    className={`${styles.navDropdownLink} ${isActive(item.path) ? styles.navLinkActive : ""}`}
                    role="menuitem"
                    onClick={closeAll}
                    aria-current={isActive(item.path) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            to="/admin/login"
            className={`${styles.navLink} ${isActive("/admin/login") ? styles.navLinkActive : ""}`}
            onClick={closeAll}
            aria-current={isActive("/admin/login") ? "page" : undefined}
          >
            Login
          </Link>
        </nav>

        <div className={styles.headerActions} data-print="hide">
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
