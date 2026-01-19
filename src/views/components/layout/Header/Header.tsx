/**
 * Header Component - Layout Component
 * Main navigation header
 */

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@/views/components/ui/Typography";
import { ThemeToggle } from "@/components/ThemeToggle";
import styles from "./Header.module.css";

export const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <header className={styles.header} role="banner">
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Ricky Chen - Home">
          <Typography variant="h5" weight="bold" as="span">
            Ricky Chen
          </Typography>
        </Link>

        <nav
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
          <ThemeToggle />
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
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
