/**
 * GlowingText - Glowing Text Effect Component
 * Adds glowing effect to text
 */

import React, { memo, useMemo } from 'react';
import './GlowingText.css';

export interface IGlowingTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  className?: string;
  'aria-label'?: string;
}

/**
 * GlowingText Component
 * Displays text with glowing effect
 * Optimized with memo and useMemo for performance
 */
const GlowingTextComponent: React.FC<IGlowingTextProps> = ({
  children,
  intensity = 'medium',
  color,
  className = '',
  'aria-label': ariaLabel,
}) => {
  // Memoize class names and styles
  const intensityClass = useMemo(() => `glowing-text--${intensity}`, [intensity]);
  const style = useMemo(
    () => (color ? { '--glow-color': color } as React.CSSProperties : undefined),
    [color]
  );

  return (
    <span 
      className={`glowing-text ${intensityClass} ${className}`}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </span>
  );
};

// Memoize to prevent unnecessary re-renders
export const GlowingText = memo(GlowingTextComponent);
