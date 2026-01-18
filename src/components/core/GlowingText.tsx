/**
 * GlowingText - Glowing Text Effect Component
 * Adds glowing effect to text
 */

import React from 'react';
import './GlowingText.css';

export interface IGlowingTextProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
  className?: string;
}

/**
 * GlowingText Component
 * Displays text with glowing effect
 */
export const GlowingText: React.FC<IGlowingTextProps> = ({
  children,
  intensity = 'medium',
  color,
  className = '',
}) => {
  const intensityClass = `glowing-text--${intensity}`;
  const style = color ? { '--glow-color': color } : undefined;

  return (
    <span className={`glowing-text ${intensityClass} ${className}`} style={style as React.CSSProperties}>
      {children}
    </span>
  );
};
