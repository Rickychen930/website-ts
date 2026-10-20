import React from "react";
import { motion } from "@/lib/motion";
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
export const AtlasSection: React.FC = () => (
  <section
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
              Ten parts of the machine my code runs on — from silicon to signal.
            </p>
          </div>
        </div>
      }
    >
      {HARDWARE_ATLAS.map((item, i) => (
        <motion.figure
          key={item.id}
          className={[styles.card, i % 2 === 1 && styles.cardLow]
            .filter(Boolean)
            .join(" ")}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px -5% 0px 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.frame} data-tilt="">
            <FlowMedia item={item} />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.latin}>{item.subtitle}</span>
            <span className={styles.where}>{item.caption}</span>
          </figcaption>
        </motion.figure>
      ))}
    </HorizontalScroll>
  </section>
);
