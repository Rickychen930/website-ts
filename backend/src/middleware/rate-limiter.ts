/**
 * Rate Limiting Middleware
 * Protects API endpoints from abuse
 */

import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

interface RateLimitOptions {
  windowMs: number; // Time window in milliseconds
  max: number; // Maximum number of requests per window
  message?: string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private options: Required<RateLimitOptions>;

  constructor(options: RateLimitOptions) {
    this.options = {
      windowMs: options.windowMs,
      max: options.max,
      message: options.message || 'Too many requests, please try again later.',
      skipSuccessfulRequests: options.skipSuccessfulRequests || false,
      skipFailedRequests: options.skipFailedRequests || false,
    };

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  /**
   * Get client identifier from request
   */
  private getClientId(req: Request): string {
    // Try to get IP from various sources
    const forwarded = req.headers['x-forwarded-for'];
    const ip = forwarded
      ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0].trim())
      : req.socket.remoteAddress || req.ip || 'unknown';

    // Combine IP with optional user identifier
    const userAgent = req.headers['user-agent'] || 'unknown';
    return `${ip}-${userAgent.substring(0, 50)}`;
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach((key) => {
      if (this.store[key].resetTime < now) {
        delete this.store[key];
      }
    });
  }

  /**
   * Reset rate limit for a client
   */
  reset(key: string): void {
    delete this.store[key];
  }

  /**
   * Middleware function
   */
  middleware() {
    return (req: Request, res: Response, next: NextFunction): void => {
      const clientId = this.getClientId(req);
      const now = Date.now();

      // Get or create rate limit entry
      let entry = this.store[clientId];

      if (!entry || entry.resetTime < now) {
        // Create new entry or reset expired one
        entry = {
          count: 0,
          resetTime: now + this.options.windowMs,
        };
        this.store[clientId] = entry;
      }

      // Increment count
      entry.count++;

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', this.options.max.toString());
      res.setHeader('X-RateLimit-Remaining', Math.max(0, this.options.max - entry.count).toString());
      res.setHeader('X-RateLimit-Reset', new Date(entry.resetTime).toISOString());

      // Check if limit exceeded
      if (entry.count > this.options.max) {
        logger.warn('Rate limit exceeded', {
          clientId,
          count: entry.count,
          max: this.options.max,
          path: req.path,
        }, 'RateLimiter');

        return res.status(429).json({
          error: this.options.message,
          retryAfter: Math.ceil((entry.resetTime - now) / 1000),
        });
      }

      // Continue to next middleware
      next();
    };
  }
}

/**
 * Create rate limiter instance
 */
export function createRateLimiter(options: RateLimitOptions) {
  return new RateLimiter(options);
}

/**
 * Pre-configured rate limiters
 */
export const contactFormRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: 'Too many contact form submissions. Please try again later.',
});

export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: 'Too many API requests. Please slow down.',
});

