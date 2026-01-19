/**
 * AnimatedSection - Framer Motion Wrapper
 * Provides smooth animations for sections using framer-motion
 */

import React, { memo } from 'react';
import { motion, MotionProps } from 'framer-motion';

export interface IAnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  triggerOnce?: boolean;
  threshold?: number;
  'aria-label'?: string;
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
 * Optimized with memo and reduced motion support
 */
const AnimatedSectionComponent: React.FC<IAnimatedSectionProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  className = '',
  animation = 'fadeIn',
  triggerOnce = true,
  threshold = 0.1,
  'aria-label': ariaLabel,
}) => {
  const variants = animationVariants[animation];

  // Check for reduced motion preference
  const prefersReducedMotion = 
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Motion props with reduced motion support
  const motionProps: MotionProps = prefersReducedMotion
    ? {
        initial: false,
        animate: 'visible',
        variants: { visible: { opacity: 1 } },
      }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: triggerOnce, margin: '-100px', amount: threshold },
        transition: {
          duration,
          delay,
          ease: [0.4, 0, 0.2, 1], // Custom easing for smoother feel
        },
        variants,
      };

  return (
    <motion.div
      {...motionProps}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.div>
  );
};

// Memoize to prevent unnecessary re-renders
export const AnimatedSection = memo(AnimatedSectionComponent);
