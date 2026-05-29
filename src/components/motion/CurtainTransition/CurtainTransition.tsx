import React from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { useLocation } from "react-router-dom";
import styles from "./CurtainTransition.module.css";

interface CurtainTransitionProps {
  children: React.ReactNode;
}

export const CurtainTransition: React.FC<CurtainTransitionProps> = ({
  children,
}) => {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname + "-curtain"}
          className={styles.curtain}
          initial={{ y: "100%" }}
          animate={{ y: [null, "0%", "-100%"] }}
          transition={{
            duration: 0.6,
            times: [0, 0.4, 1],
            ease: [0.76, 0, 0.24, 1],
          }}
          aria-hidden="true"
        />
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeIn", delay: 0.1 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
