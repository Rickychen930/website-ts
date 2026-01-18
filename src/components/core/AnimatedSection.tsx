/**
 * AnimatedSection - Framer Motion Wrapper
 * Provides smooth animations for sections using framer-motion
 */

import React from 'react';
import { motion } from 'framer-motion';

export interface IAnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * AnimatedSection Component
 * Wraps content with framer-motion animations
 */
export const AnimatedSection: React.FC<IAnimatedSectionProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  animation = 'fadeIn',
}) => {
  const variants = animationVariants[animation];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
