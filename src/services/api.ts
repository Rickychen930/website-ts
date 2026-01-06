/**
 * Enhanced API Service
 * Professional API client with error handling, retry logic, caching, and TypeScript types
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface ApiError {
  message: string;
  status?: number;
  statusText?: string;
  code?: string;
  originalError?: unknown;
}

export interface RequestConfig extends RequestInit {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  cache?: RequestCache;
  cacheTime?: number; // Cache time in milliseconds
}

/**
 * API Client Configuration
 */
const DEFAULT_CONFIG: {
  timeout: number;
  retries: number;
  retryDelay: number;
  headers: HeadersInit;
} = {
  timeout: 15000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * In-memory cache for API responses
 */
const responseCache = new Map<string, { data: unknown; timestamp: number; cacheTime: number }>();

/**
 * Get cache key from URL and config
 */
function getCacheKey(url: string, config?: RequestConfig): string {
  return `${url}:${JSON.stringify(config?.body || {})}`;
}

/**
 * Check if cached response is still valid
 */
function isCacheValid(key: string, cacheTime: number): boolean {
  const cached = responseCache.get(key);
  if (!cached) return false;
  return Date.now() - cached.timestamp < cacheTime;
}

/**
 * Get cached response if valid
 */
function getCachedResponse<T>(key: string): T | null {
  const cached = responseCache.get(key);
  if (!cached) return null;
  if (Date.now() - cached.timestamp >= cached.cacheTime) {
    responseCache.delete(key);
    return null;
  }
  return cached.data as T;
}

/**
 * Set response in cache
 */
function setCachedResponse<T>(key: string, data: T, cacheTime: number): void {
  responseCache.set(key, {
    data,
    timestamp: Date.now(),
    cacheTime,
  });
}

/**
 * Create AbortController with timeout
 */
function createTimeoutController(timeout: number): AbortController {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  // Store timeout ID for cleanup
  (controller as AbortController & { _timeoutId?: NodeJS.Timeout })._timeoutId = timeoutId;
  
  return controller;
}

/**
 * Cleanup timeout
 */
function cleanupTimeout(controller: AbortController): void {
  const timeoutId = (controller as AbortController & { _timeoutId?: NodeJS.Timeout })._timeoutId;
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
}

/**
 * Sleep utility for retry delays
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Enhanced fetch with retry logic
 */
async function fetchWithRetry<T>(
  url: string,
  config: RequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = DEFAULT_CONFIG.timeout,
    retries = DEFAULT_CONFIG.retries,
    retryDelay = DEFAULT_CONFIG.retryDelay,
    cache,
    cacheTime,
    ...fetchConfig
  } = config;

  // Check cache first (only for GET requests)
  if (fetchConfig.method === undefined || fetchConfig.method === 'GET') {
    if (cache === 'force-cache' || cacheTime) {
      const cacheKey = getCacheKey(url, config);
      const cached = getCachedResponse<T>(cacheKey);
      if (cached !== null) {
        return {
          data: cached,
          status: 200,
          statusText: 'OK (Cached)',
          headers: new Headers(),
        };
      }
    }
  }

  let lastError: Error | null = null;
  let timeoutController: AbortController | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      timeoutController = createTimeoutController(timeout);
      
      const response = await fetch(url, {
        ...fetchConfig,
        signal: timeoutController.signal,
        headers: {
          ...DEFAULT_CONFIG.headers,
          ...fetchConfig.headers,
        },
      });

      cleanupTimeout(timeoutController);
      timeoutController = null;

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = (await response.json()) as T;

      // Cache successful GET responses
      if ((fetchConfig.method === undefined || fetchConfig.method === 'GET') && cacheTime) {
        const cacheKey = getCacheKey(url, config);
        setCachedResponse(cacheKey, data, cacheTime);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      if (timeoutController) {
        cleanupTimeout(timeoutController);
        timeoutController = null;
      }
      
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on certain errors
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }
        if (error.message.includes('HTTP 4')) {
          // Don't retry on client errors (4xx)
          throw error;
        }
      }

      // If this is the last attempt, throw the error
      if (attempt === retries) {
        break;
      }

      // Wait before retrying with exponential backoff
      const delay = retryDelay * Math.pow(2, attempt);
      await sleep(delay);
    }
  }

  throw lastError || new Error('Request failed after retries');
}

/**
 * Enhanced API Client
 */
export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || process.env.REACT_APP_API_URL || '';
    
    if (!this.baseUrl && process.env.NODE_ENV === 'development') {
      const { logWarn } = require('../utils/logger');
      logWarn('REACT_APP_API_URL is not defined', undefined, 'ApiClient');
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetchWithRetry<T>(url, {
      ...config,
      method: 'GET',
    });
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetchWithRetry<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: unknown, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetchWithRetry<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    return fetchWithRetry<T>(url, {
      ...config,
      method: 'DELETE',
    });
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    responseCache.clear();
  }

  /**
   * Clear specific cache entry
   */
  clearCacheEntry(endpoint: string, config?: RequestConfig): void {
    const cacheKey = getCacheKey(`${this.baseUrl}${endpoint}`, config);
    responseCache.delete(cacheKey);
  }
}

/**
 * Default API client instance
 */
export const apiClient = new ApiClient();

/**
 * Legacy function for backward compatibility
 */
export async function getUsers() {
  const response = await apiClient.get('/api/users', {
    cacheTime: 60000, // Cache for 1 minute
  });
  return response.data;
}
