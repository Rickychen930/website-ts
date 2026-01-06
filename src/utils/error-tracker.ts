/**
 * Error Tracker Utility
 * Enhanced error tracking with context and user information
 * Can be extended to integrate with Sentry, LogRocket, etc.
 */

import { logError } from "./logger";

export interface ErrorContext {
  userId?: string;
  userAgent?: string;
  url?: string;
  timestamp?: string;
  component?: string;
  action?: string;
  additionalData?: Record<string, unknown>;
}

export interface TrackedError {
  message: string;
  error: Error | unknown;
  context: ErrorContext;
  severity: "low" | "medium" | "high" | "critical";
}

/**
 * Error Tracker Class
 */
export class ErrorTracker {
  private errors: TrackedError[] = [];
  private maxErrors = 50; // Keep last 50 errors in memory
  private enabled: boolean;

  constructor() {
    this.enabled = process.env.REACT_APP_ERROR_TRACKING_ENABLED === "true";
  }

  /**
   * Track an error
   */
  track(
    message: string,
    error: Error | unknown,
    context?: Partial<ErrorContext>,
    severity: TrackedError["severity"] = "medium",
  ): void {
    const errorContext: ErrorContext = {
      userAgent:
        typeof navigator !== "undefined" ? navigator.userAgent : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
      timestamp: new Date().toISOString(),
      ...context,
    };

    const trackedError: TrackedError = {
      message,
      error,
      context: errorContext,
      severity,
    };

    // Add to in-memory storage
    this.errors.push(trackedError);
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // Log locally
    logError(message, error, context?.component);

    // Send to external service if enabled
    if (this.enabled) {
      this.sendToExternalService(trackedError);
    }
  }

  /**
   * Send error to external tracking service
   */
  private async sendToExternalService(error: TrackedError): Promise<void> {
    const trackingUrl = process.env.REACT_APP_ERROR_TRACKING_URL;

    if (!trackingUrl) {
      return; // No tracking URL configured
    }

    try {
      // Prepare error data (sanitize sensitive information)
      const errorData = {
        message: error.message,
        error:
          error.error instanceof Error
            ? {
                name: error.error.name,
                message: error.error.message,
                stack: error.error.stack,
              }
            : String(error.error),
        context: this.sanitizeContext(error.context),
        severity: error.severity,
        timestamp: error.context.timestamp,
      };

      // Send to external service
      await fetch(trackingUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorData),
        // Don't block on error tracking
        keepalive: true,
      }).catch(() => {
        // Fail silently if error tracking fails
      });
    } catch (err) {
      // Fail silently
    }
  }

  /**
   * Sanitize context to remove sensitive data
   */
  private sanitizeContext(context: ErrorContext): ErrorContext {
    const sanitized = { ...context };

    // Remove potentially sensitive data
    delete (sanitized as any).password;
    delete (sanitized as any).token;
    delete (sanitized as any).apiKey;

    return sanitized;
  }

  /**
   * Get tracked errors
   */
  getErrors(severity?: TrackedError["severity"]): TrackedError[] {
    if (severity) {
      return this.errors.filter((e) => e.severity === severity);
    }
    return [...this.errors];
  }

  /**
   * Clear errors
   */
  clearErrors(): void {
    this.errors = [];
  }

  /**
   * Get error count
   */
  getErrorCount(severity?: TrackedError["severity"]): number {
    if (severity) {
      return this.errors.filter((e) => e.severity === severity).length;
    }
    return this.errors.length;
  }

  /**
   * Enable/disable error tracking
   */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

/**
 * Global error tracker instance
 */
export const errorTracker = new ErrorTracker();

/**
 * Convenience function to track errors
 */
export function trackError(
  message: string,
  error: Error | unknown,
  context?: Partial<ErrorContext>,
  severity: TrackedError["severity"] = "medium",
): void {
  errorTracker.track(message, error, context, severity);
}

/**
 * Track React component errors
 */
export function trackComponentError(
  error: Error,
  errorInfo: React.ErrorInfo,
  componentName?: string,
): void {
  trackError(
    `Component error in ${componentName || "Unknown"}`,
    error,
    {
      component: componentName,
      additionalData: {
        componentStack: errorInfo.componentStack,
      },
    },
    "high",
  );
}

/**
 * Track API errors
 */
export function trackApiError(
  error: Error | unknown,
  endpoint: string,
  method: string = "GET",
): void {
  trackError(
    `API error: ${method} ${endpoint}`,
    error,
    {
      action: "api_call",
      additionalData: {
        endpoint,
        method,
      },
    },
    "medium",
  );
}

/**
 * Setup global error handlers
 */
export function setupGlobalErrorHandlers(): void {
  if (typeof window === "undefined") return;

  // Unhandled errors
  window.addEventListener("error", (event) => {
    trackError(
      "Unhandled error",
      event.error || new Error(event.message),
      {
        url: event.filename,
        additionalData: {
          lineno: event.lineno,
          colno: event.colno,
        },
      },
      "high",
    );
  });

  // Unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    trackError(
      "Unhandled promise rejection",
      event.reason,
      {
        action: "promise_rejection",
      },
      "high",
    );
  });
}

// Auto-setup in production
if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
  setupGlobalErrorHandlers();
}
