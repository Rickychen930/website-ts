/**
 * Unit tests for Rate Limiter middleware
 */

import { Request, Response, NextFunction } from 'express';
import { createRateLimiter, contactFormRateLimiter, apiRateLimiter } from '../rate-limiter';

describe('Rate Limiter', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {
        'user-agent': 'test-agent',
      },
      socket: {
        remoteAddress: '127.0.0.1',
      } as any,
      ip: '127.0.0.1',
      path: '/test',
    };

    mockResponse = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  describe('createRateLimiter', () => {
    it('should create rate limiter with custom options', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 10,
        message: 'Custom message',
      });

      expect(limiter).toBeDefined();
    });

    it('should allow requests within limit', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 5,
      });

      const middleware = limiter.middleware();

      // Make 5 requests (within limit)
      for (let i = 0; i < 5; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(5);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it('should block requests exceeding limit', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 2,
      });

      const middleware = limiter.middleware();

      // Make 3 requests (exceeding limit)
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(2);
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(String),
          retryAfter: expect.any(Number),
        })
      );
    });

    it('should set rate limit headers', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 10,
      });

      const middleware = limiter.middleware();
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.setHeader).toHaveBeenCalledWith('X-RateLimit-Limit', '10');
      expect(mockResponse.setHeader).toHaveBeenCalledWith('X-RateLimit-Remaining', expect.any(String));
      expect(mockResponse.setHeader).toHaveBeenCalledWith('X-RateLimit-Reset', expect.any(String));
    });

    it('should reset limit after window expires', (done: jest.DoneCallback) => {
      const limiter = createRateLimiter({
        windowMs: 100, // Very short window for testing
        max: 2,
      });

      const middleware = limiter.middleware();

      // Make 2 requests (at limit)
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      // Third request should be blocked
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);

      // Wait for window to expire
      setTimeout(() => {
        mockResponse.status = jest.fn().mockReturnThis();
        mockResponse.json = jest.fn().mockReturnThis();
        mockNext = jest.fn();

        // Should allow request after window expires
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
        expect(mockNext).toHaveBeenCalled();
        expect(mockResponse.status).not.toHaveBeenCalledWith(429);
        done();
      }, 150);
    });

    it('should handle requests with x-forwarded-for header', () => {
      mockRequest.headers = {
        'x-forwarded-for': '192.168.1.1',
        'user-agent': 'test-agent',
      };

      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 1,
      });

      const middleware = limiter.middleware();
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle requests without IP', () => {
      mockRequest = {
        ...mockRequest,
        socket: undefined,
        ip: undefined,
      };

      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 1,
      });

      const middleware = limiter.middleware();
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('contactFormRateLimiter', () => {
    it('should have correct configuration', () => {
      const middleware = contactFormRateLimiter.middleware();
      expect(middleware).toBeDefined();
    });

    it('should limit to 5 requests per 15 minutes', () => {
      const middleware = contactFormRateLimiter.middleware();

      // Make 5 requests (at limit)
      for (let i = 0; i < 5; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(5);

      // 6th request should be blocked
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);
    });
  });

  describe('apiRateLimiter', () => {
    it('should have correct configuration', () => {
      const middleware = apiRateLimiter.middleware();
      expect(middleware).toBeDefined();
    });

    it('should limit to 60 requests per minute', () => {
      const middleware = apiRateLimiter.middleware();

      // Make 60 requests (at limit)
      for (let i = 0; i < 60; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(60);

      // 61st request should be blocked
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);
    });
  });

  describe('reset', () => {
    it('should reset rate limit for a client', () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 1,
      });

      const middleware = limiter.middleware();

      // Make request
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);

      // Second request should be blocked
      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();
      mockNext = jest.fn();
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);

      // Reset and try again
      const clientId = '127.0.0.1-test-agent';
      limiter.reset(clientId);

      mockResponse.status = jest.fn().mockReturnThis();
      mockResponse.json = jest.fn().mockReturnThis();
      mockNext = jest.fn();
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalled();
    });
  });
});

