import React from "react";
import { motion } from "@/lib/motion";
import { HorizontalScroll } from "@/components/motion/HorizontalScroll/HorizontalScroll";
import { RevealText } from "@/components/motion/RevealText/RevealText";
import { FlowMedia } from "@/components/ui/FlowMedia/FlowMedia";
import { Ribbon } from "@/components/motion/Ribbon/Ribbon";
import { FIELD_ATLAS, PLACE_NAMES, SPECIES_NAMES } from "@/config/flowMedia";
import styles from "./AtlasSection.module.css";

/** Field atlas — Australian fauna & flora, pinned horizontal travel */
export const AtlasSection: React.FC = () => (
  <section
    id="atlas"
    className={`${styles.section} band-sand`}
    aria-label="Field atlas of Australian flora and fauna"
    data-section="atlas"
  >
    <div className={styles.ribbons}>
      <Ribbon items={SPECIES_NAMES} tilt={-3} speed={40} />
      <Ribbon items={PLACE_NAMES} tilt={2.5} speed={44} reverse tone="navy" />
    </div>
    <HorizontalScroll
      header={
        <div className={styles.head}>
          <div className={styles.rule}>
            <span className="eyebrow">
              <span className={styles.index}>04 /</span> Field atlas
            </span>
            <span className={styles.ruleMeta}>
              Flora &amp; fauna of the continent
            </span>
          </div>
          <div className={styles.headRow}>
            <RevealText
              as="h2"
              className={styles.heading}
              lines={["Native", <em key="s">species.</em>]}
            />
            <p className={styles.intro}>
              Between builds, a study of what lives here. Ten specimens, each
              rendered with Google Flow — observed the way an architect studies
              a site before drawing a line.
            </p>
          </div>
        </div>
      }
    >
      {FIELD_ATLAS.map((item, i) => (
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
          <div className={styles.frame}>
            <FlowMedia item={item} />
          </div>
          <figcaption className={styles.caption}>
            <span className={styles.num}>
              No.{String(i + 1).padStart(2, "0")}
            </span>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.latin}>{item.subtitle}</span>
            <span className={styles.where}>{item.caption}</span>
          </figcaption>
        </motion.figure>
      ))}
    </HorizontalScroll>
  </section>
);
