import React, { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "@/lib/motion";
import { useLocation } from "react-router-dom";
import styles from "./CurtainTransition.module.css";

interface CurtainTransitionProps {
  children: React.ReactNode;
}

const routeLabel = (pathname: string): string => {
  if (pathname === "/") return "Terra Australis";
  if (pathname === "/projects") return "Selected Works";
  if (pathname.startsWith("/projects/")) return "Case Study";
  if (pathname === "/resume") return "Résumé";
  return "Off the map";
};

/** Charcoal panel that sweeps across on every route change, naming the page */
export const CurtainTransition: React.FC<CurtainTransitionProps> = ({
  children,
}) => {
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (location.hash) return;
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return (
    <>
      {!reduce && (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname + "-curtain"}
            className={styles.curtain}
            initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{
              duration: 0.9,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.35,
            }}
            aria-hidden="true"
          >
            <motion.span
              className={styles.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: [0, 1, 1, 0], y: [24, 0, 0, -12] }}
              transition={{ duration: 0.9, times: [0, 0.35, 0.7, 1] }}
            >
              {routeLabel(location.pathname)}
            </motion.span>
          </motion.div>
        </AnimatePresence>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduce ? false : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
