/**
 * TypingEffect - Typing Animation Component
 * Creates a typing effect for text display
 */

import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import './TypingEffect.css';

export interface ITypingEffectProps {
  text: string | string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
  showCursor?: boolean;
  className?: string;
  onComplete?: () => void;
  'aria-label'?: string;
}

/**
 * TypingEffect Component
 * Displays text with typing animation effect
 * Optimized with React.memo and useCallback for performance
 */
const TypingEffectComponent: React.FC<ITypingEffectProps> = ({
  text,
  speed = 100,
  deleteSpeed = 50,
  delay = 1000,
  loop = true,
  showCursor = true,
  className = '',
  onComplete,
  'aria-label': ariaLabel,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPausing, setIsPausing] = useState(false);

  const texts = useMemo(() => Array.isArray(text) ? text : [text], [text]);

  useEffect(() => {
    if (isPausing) {
      const timeout = setTimeout(() => {
        setIsPausing(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    const currentText = texts[currentIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1));
        } else {
          // Finished typing, pause then delete
          if (loop || currentIndex < texts.length - 1) {
            setIsPausing(true);
          }
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          if (currentIndex < texts.length - 1) {
            setCurrentIndex((prev) => prev + 1);
          } else if (loop) {
            setCurrentIndex(0);
          }
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex, isDeleting, isPausing, texts, speed, deleteSpeed, delay, loop]);

  // Memoize the complete callback
  const handleComplete = useCallback(() => {
    if (onComplete && !loop && currentIndex === texts.length - 1 && displayedText === texts[currentIndex]) {
      onComplete();
    }
  }, [onComplete, loop, currentIndex, displayedText, texts]);

  useEffect(() => {
    if (!loop && currentIndex === texts.length - 1 && displayedText === texts[currentIndex] && !isDeleting && !isPausing) {
      handleComplete();
    }
  }, [displayedText, currentIndex, texts, loop, isDeleting, isPausing, handleComplete]);

  return (
    <span 
      className={`typing-effect ${className}`}
      aria-label={ariaLabel || `Typing: ${displayedText}`}
      aria-live="polite"
    >
      {displayedText}
      {showCursor && (
        <span 
          className="typing-effect__cursor" 
          aria-hidden="true"
        >
          |
        </span>
      )}
    </span>
  );
};

// Memoize component to prevent unnecessary re-renders
export const TypingEffect = memo(TypingEffectComponent);
