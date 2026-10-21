import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "@/lib/motion";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll/HorizontalScroll";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { Ribbon } from "@/components/motion/Ribbon/Ribbon";
import {
  HARDWARE_ATLAS,
  STACK_NAMES,
  HARDWARE_NAMES,
} from "@/config/flowMedia";
import styles from "./AtlasSection.module.css";

/** Hardware atlas — the machine, part by part, pinned horizontal travel */
/**
 * Coverflow: while the section is on screen, write each card's signed distance
 * from the viewport centre to --cf/--cfd (CSS turns that into rotateY/translateZ).
 */
const useCoverflow = (
  root: React.RefObject<HTMLElement | null>,
  enabled: boolean,
): void => {
  useEffect(() => {
    const el = root.current;
    if (!el || !enabled) return;
    let raf = 0;
    let visible = false;
    const tick = () => {
      raf = 0;
      const vw = window.innerWidth;
      const cards = el.querySelectorAll<HTMLElement>("[data-cf]");
      // Read every rect first, then write — interleaving forces a layout per card
      const cfs = Array.from(cards, (card) => {
        const r = card.getBoundingClientRect();
        const d = (r.left + r.width / 2 - vw / 2) / (vw * 0.42);
        return Math.max(-1.3, Math.min(1.3, d));
      });
      cards.forEach((card, i) => {
        card.style.setProperty("--cf", cfs[i].toFixed(3));
        card.style.setProperty(
          "--cfd",
          Math.min(1, Math.abs(cfs[i])).toFixed(3),
        );
      });
      if (visible) raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [root, enabled]);
};

export const AtlasSection: React.FC = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  useCoverflow(ref, !reduce);
  return (
    <section
      ref={ref}
      id="atlas"
      className={`${styles.section} band-sand`}
      aria-label="Hardware atlas — the parts software runs on"
      data-section="atlas"
    >
      <div className={styles.ribbons}>
        <Ribbon items={HARDWARE_NAMES} tilt={-3} speed={40} />
        <Ribbon items={STACK_NAMES} tilt={2.5} speed={44} reverse tone="navy" />
      </div>
      <HorizontalScroll
        header={
          <div className={styles.head}>
            <div className={styles.rule}>
              <span className="eyebrow">Hardware atlas</span>
            </div>
            <div className={styles.headRow}>
              <RevealText
                as="h2"
                className={styles.heading}
                lines={["Under", <em key="s">the hood.</em>]}
              />
              <p className={styles.intro}>
                Ten parts of the machine my code runs on — from silicon to
                signal.
              </p>
            </div>
          </div>
        }
      >
        {HARDWARE_ATLAS.map((item, i) => (
          <motion.figure
            key={item.id}
            data-cf=""
            className={[styles.card, i % 2 === 1 && styles.cardLow]
              .filter(Boolean)
              .join(" ")}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px -5% 0px 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.cf}>
              <div className={styles.frame} data-tilt="">
                <FlowMedia item={item} />
              </div>
              <figcaption className={styles.caption}>
                <span className={styles.title}>{item.title}</span>
                <span className={styles.latin}>{item.subtitle}</span>
                <span className={styles.where}>{item.caption}</span>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </HorizontalScroll>
    </section>
  );
};
