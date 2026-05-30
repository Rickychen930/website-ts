import React from "react";
import { motion, useReducedMotion, Variants } from "@/lib/motion";

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.25, 0, 0, 1], duration: 0.6 },
  },
};

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  y = 32,
  className,
  as: Tag = "div",
  stagger = false,
}) => {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={itemVariants}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = ((motion as any)[Tag as string] ??
    motion.div) as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ ease: [0.25, 0, 0, 1], duration, delay }}
    >
      {children}
    </MotionTag>
  );
};
