/**
 * GradientAnimation - Animated Gradient Background
 * Creates animated gradient background effect
 */

import React from 'react';
import './GradientAnimation.css';

export interface IGradientAnimationProps {
  colors?: string[];
  speed?: 'slow' | 'normal' | 'fast';
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  className?: string;
  children?: React.ReactNode;
}

/**
 * GradientAnimation Component
 * Creates animated gradient background
 */
export const GradientAnimation: React.FC<IGradientAnimationProps> = ({
  colors = ['#2563eb', '#7c3aed', '#db2777'],
  speed = 'normal',
  direction = 'diagonal',
  className = '',
  children,
}) => {
  const speedClass = `gradient-animation--${speed}`;
  const directionClass = `gradient-animation--${direction}`;
  const gradientColors = colors.join(', ');

  const style: React.CSSProperties = {
    background: `linear-gradient(${direction === 'horizontal' ? '90deg' : direction === 'vertical' ? '0deg' : '45deg'}, ${gradientColors})`,
    backgroundSize: direction === 'diagonal' ? '400% 400%' : '200% 200%',
  };

  return (
    <div
      className={`gradient-animation ${speedClass} ${directionClass} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
