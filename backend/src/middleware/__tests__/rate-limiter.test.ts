/**
 * Unit tests for Rate Limiter Middleware
 */

import { Request, Response, NextFunction } from "express";
import {
  createRateLimiter,
  apiRateLimiter,
  contactFormRateLimiter,
} from "../rate-limiter";

describe("RateLimiter", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();

    mockRequest = {
      headers: {
        "user-agent": "test-agent",
      },
      socket: {
        remoteAddress: "127.0.0.1",
      } as any,
      ip: "127.0.0.1",
      path: "/test",
    } as Partial<Request> as Request;

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      setHeader: jest.fn().mockReturnThis(),
    };

    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("createRateLimiter", () => {
    it("should allow requests within limit", () => {
      const limiter = createRateLimiter({
        windowMs: 60000, // 1 minute
        max: 5,
      });

      const middleware = limiter.middleware();

      // Make 5 requests
      for (let i = 0; i < 5; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(5);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should block requests exceeding limit", () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 3,
      });

      const middleware = limiter.middleware();

      // Make 4 requests (exceeds limit)
      for (let i = 0; i < 4; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(3);
      expect(mockResponse.status).toHaveBeenCalledWith(429);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.any(String),
          retryAfter: expect.any(Number),
        }),
      );
    });

    it("should set rate limit headers", () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 10,
      });

      const middleware = limiter.middleware();
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "X-RateLimit-Limit",
        "10",
      );
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "X-RateLimit-Remaining",
        "9",
      );
      expect(mockResponse.setHeader).toHaveBeenCalledWith(
        "X-RateLimit-Reset",
        expect.any(String),
      );
    });

    it("should reset limit after window expires", () => {
      const limiter = createRateLimiter({
        windowMs: 1000, // 1 second
        max: 2,
      });

      const middleware = limiter.middleware();

      // Make 2 requests (at limit)
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      middleware(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(2);

      // Try 3rd request (should be blocked)
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);

      // Advance time past window
      jest.advanceTimersByTime(1001);

      // Reset mocks
      (mockResponse.status as jest.Mock).mockClear();
      (mockNext as jest.Mock).mockClear();

      // Now should allow request again
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    it("should handle requests with no origin", () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 5,
      });

      const middleware = limiter.middleware();
      const requestWithoutOrigin = {
        ...mockRequest,
        headers: {},
      };

      middleware(
        requestWithoutOrigin as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it("should use forwarded IP when available", () => {
      const limiter = createRateLimiter({
        windowMs: 60000,
        max: 5,
      });

      const middleware = limiter.middleware();
      const requestWithForwarded = {
        ...mockRequest,
        headers: {
          "x-forwarded-for": "192.168.1.1",
          "user-agent": "test-agent",
        },
      };

      middleware(
        requestWithForwarded as Request,
        mockResponse as Response,
        mockNext,
      );

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe("apiRateLimiter", () => {
    it("should have correct configuration", () => {
      const middleware = apiRateLimiter.middleware();

      // Make 60 requests (at limit)
      for (let i = 0; i < 60; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(60);
      expect(mockResponse.status).not.toHaveBeenCalled();

      // 61st request should be blocked
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);
    });
  });

  describe("contactFormRateLimiter", () => {
    it("should have correct configuration", () => {
      const middleware = contactFormRateLimiter.middleware();

      // Make 5 requests (at limit)
      for (let i = 0; i < 5; i++) {
        middleware(mockRequest as Request, mockResponse as Response, mockNext);
      }

      expect(mockNext).toHaveBeenCalledTimes(5);
      expect(mockResponse.status).not.toHaveBeenCalled();

      // 6th request should be blocked
      middleware(mockRequest as Request, mockResponse as Response, mockNext);
      expect(mockResponse.status).toHaveBeenCalledWith(429);
    });
  });
});
