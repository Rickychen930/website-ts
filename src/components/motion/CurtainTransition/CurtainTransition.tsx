import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "@/lib/motion";
import { useLocation } from "react-router-dom";
import { INTRO_HOLD, isIntro } from "./intro";
import styles from "./CurtainTransition.module.css";

interface CurtainTransitionProps {
  children: React.ReactNode;
}

const EASE = [0.76, 0, 0.24, 1] as const;
const NAME = "Ricky Chen";

const routeLabel = (pathname: string): string => {
  if (pathname === "/") return "Home";
  if (pathname === "/projects") return "Projects";
  if (pathname.startsWith("/projects/")) return "Project";
  if (pathname === "/resume") return "Résumé";
  return "Page not found";
};

/** First visit: logo, name and role over an aurora glow, then a two-layer wipe */
const Intro: React.FC = () => (
  <>
    <span className={styles.aurora} aria-hidden="true" />
    <div className={styles.introInner}>
      <motion.img
        src="/logo192.png"
        alt=""
        className={styles.logo}
        initial={{ scale: 0.4, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      />
      <span className={styles.name}>
        {NAME.split("").map((ch, i) => (
          <span key={i} className={styles.charMask}>
            <motion.span
              className={ch === " " ? styles.space : styles.char}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.6,
                ease: EASE,
                delay: 0.15 + i * 0.035,
              }}
            >
              {ch}
            </motion.span>
          </span>
        ))}
      </span>
      <motion.span
        className={styles.role}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        Software Engineer · AI &amp; Full-Stack
      </motion.span>
      <span className={styles.track}>
        <motion.span
          className={styles.bar}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTRO_HOLD - 0.1, ease: [0.65, 0, 0.35, 1] }}
        />
      </span>
    </div>
  </>
);

/** Navy panel + trailing accent band sweep up on every route change */
export const CurtainTransition: React.FC<CurtainTransitionProps> = ({
  children,
}) => {
  const location = useLocation();
  const reduce = useReducedMotion();
  // Only the first page of the session gets the full intro; the first
  // navigation away retires it for good
  const introPath = useRef<string | null>(isIntro() ? location.pathname : null);
  if (introPath.current && introPath.current !== location.pathname) {
    introPath.current = null;
  }
  const intro = introPath.current === location.pathname;

  useEffect(() => {
    if (location.hash) return;
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const hold = intro ? INTRO_HOLD : 0.2;
  const wipe = intro ? 0.9 : 0.7;
  const lift = { clipPath: "inset(0% 0% 100% 0%)" };

  return (
    <>
      {!reduce && (
        <AnimatePresence mode="wait">
          <div key={location.pathname + "-curtain"} aria-hidden="true">
            <motion.div
              className={styles.trail}
              initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
              animate={lift}
              transition={{ duration: wipe, ease: EASE, delay: hold + 0.12 }}
            />
            <motion.div
              className={styles.curtain}
              initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
              animate={lift}
              transition={{ duration: wipe, ease: EASE, delay: hold }}
            >
              {intro ? (
                <Intro />
              ) : (
                <motion.span
                  className={styles.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -12] }}
                  transition={{ duration: 0.7, times: [0, 0.35, 0.7, 1] }}
                >
                  {routeLabel(location.pathname)}
                </motion.span>
              )}
            </motion.div>
          </div>
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: hold + 0.1,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
