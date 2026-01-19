/**
 * ParticleBackground - Animated Particle Background
 * Creates animated particles in the background
 */

import React, { useEffect, useRef, useCallback, memo, useState } from 'react';
import './ParticleBackground.css';

export interface IParticleBackgroundProps {
  particleCount?: number;
  speed?: number;
  size?: number;
  color?: string;
  className?: string;
  interactive?: boolean;
  maxConnections?: number;
  connectionDistance?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

/**
 * ParticleBackground Component
 * Creates animated particle background effect
 * Optimized with performance improvements and reduced motion support
 */
const ParticleBackgroundComponent: React.FC<IParticleBackgroundProps> = ({
  particleCount = 50,
  speed = 0.5,
  size = 2,
  color = 'rgba(6, 182, 212, 0.3)',
  className = '',
  interactive = false,
  maxConnections = 5,
  connectionDistance = 150,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Optimized resize handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }
  }, []);

  // Initialize particles
  const initializeParticles = useCallback((canvas: HTMLCanvasElement): Particle[] => {
    const particles: Particle[] = [];
    const width = canvas.offsetWidth || canvas.width;
    const height = canvas.offsetHeight || canvas.height;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * size + size / 2,
      });
    }
    return particles;
  }, [particleCount, speed, size]);

  // Mouse interaction handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, [interactive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion
    if (isReducedMotion) {
      return; // Don't animate if user prefers reduced motion
    }

    // Set canvas size with high DPI support
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
    }

    // Initialize particles
    particlesRef.current = initializeParticles(canvas);

    // Optimized animation loop with performance improvements
    const animate = () => {
      const width = canvas.offsetWidth || canvas.width;
      const height = canvas.offsetHeight || canvas.height;
      
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update and draw particles with optimizations
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        
        // Interactive mouse attraction
        if (interactive && mouse.x && mouse.y) {
          const dx = mouse.x - particle.x;
          const dy = mouse.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.vx += (dx / distance) * force * 0.01;
            particle.vy += (dy / distance) * force * 0.01;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with damping
        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -0.9;
          particle.x = Math.max(0, Math.min(width, particle.x));
        }
        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -0.9;
          particle.y = Math.max(0, Math.min(height, particle.y));
        }

        // Draw particle with gradient for better visual
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius
        );
        gradient.addColorStop(0, color.replace('0.3', '0.6'));
        gradient.addColorStop(1, color);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      // Optimized connection drawing with max connections limit
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        let connectionCount = 0;
        
        for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
          const otherParticle = particles[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = color.replace('0.3', opacity.toString());
            ctx.lineWidth = 0.5;
            ctx.stroke();
            connectionCount++;
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (interactive && canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [particleCount, speed, size, color, interactive, maxConnections, connectionDistance, isReducedMotion, resizeCanvas, initializeParticles, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-background ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  );
};

// Memoize component to prevent unnecessary re-renders
export const ParticleBackground = memo(ParticleBackgroundComponent);
