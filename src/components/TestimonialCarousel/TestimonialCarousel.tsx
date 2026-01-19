/**
 * Testimonial Carousel - Smooth carousel dengan autoplay
 */

import React, { useState, useEffect, useRef } from "react";
import styles from "./TestimonialCarousel.module.css";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoplay && !isPaused && testimonials.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, autoplayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, isPaused, autoplayInterval, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <div
      className={`${styles.carousel} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Testimonials carousel"
    >
      <div className={styles.carouselContainer}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={styles.carouselSlide}>
              <div className={styles.testimonialCard}>
                {testimonial.rating && (
                  <div
                    className={styles.rating}
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`${styles.star} ${
                          i < testimonial.rating! ? styles.starFilled : ""
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                )}
                <blockquote className={styles.testimonialContent}>
                  "{testimonial.content}"
                </blockquote>
                <div className={styles.testimonialAuthor}>
                  {testimonial.avatar && (
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={styles.avatar}
                    />
                  )}
                  <div className={styles.authorInfo}>
                    <p className={styles.authorName}>{testimonial.name}</p>
                    <p className={styles.authorRole}>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className={styles.carouselNav}>
        <button
          onClick={goToPrevious}
          className={styles.navButton}
          aria-label="Previous testimonial"
          type="button"
        >
          ←
        </button>
        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ""}`}
              aria-label={`Go to testimonial ${index + 1}`}
              type="button"
            />
          ))}
        </div>
        <button
          onClick={goToNext}
          className={styles.navButton}
          aria-label="Next testimonial"
          type="button"
        >
          →
        </button>
      </div>
    </div>
  );
};
