/**
 * Logger Utility
 * Centralized logging service for the application
 * Replaces console.log/error/warn with proper logging
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: unknown;
  timestamp: string;
  context?: string;
}

class Logger {
  private level: LogLevel;
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Keep last 100 logs in memory

  constructor() {
    // Set log level based on environment
    if (process.env.NODE_ENV === 'production') {
      this.level = LogLevel.WARN; // Only warnings and errors in production
    } else {
      this.level = LogLevel.DEBUG; // All logs in development
    }
  }

  /**
   * Set log level
   */
  setLevel(level: LogLevel): void {
    this.level = level;
  }

  /**
   * Get current log level
   */
  getLevel(): LogLevel {
    return this.level;
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: unknown, context?: string): void {
    if (level < this.level) {
      return; // Don't log if below threshold
    }

    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
      context,
    };

    // Add to in-memory logs
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Remove oldest log
    }

    // Output to console based on level
    const logMethod = this.getConsoleMethod(level);
    if (context) {
      logMethod(`[${context}] ${message}`, data || '');
    } else {
      logMethod(message, data || '');
    }

    // In production, send errors to external service (e.g., Sentry)
    if (level === LogLevel.ERROR && process.env.NODE_ENV === 'production') {
      this.sendToErrorService(entry);
    }
  }

  /**
   * Get console method based on log level
   */
  private getConsoleMethod(level: LogLevel): typeof console.log {
    switch (level) {
      case LogLevel.DEBUG:
        return console.debug;
      case LogLevel.INFO:
        return console.info;
      case LogLevel.WARN:
        return console.warn;
      case LogLevel.ERROR:
        return console.error;
      default:
        return console.log;
    }
  }

  /**
   * Send error to external error tracking service
   */
  private sendToErrorService(entry: LogEntry): void {
    // TODO: Integrate with error tracking service (e.g., Sentry)
    // For now, just keep in memory
    if (process.env.REACT_APP_ERROR_TRACKING_ENABLED === 'true') {
      // Future: Send to Sentry or similar service
    }
  }

  /**
   * Debug log
   */
  debug(message: string, data?: unknown, context?: string): void {
    this.log(LogLevel.DEBUG, message, data, context);
  }

  /**
   * Info log
   */
  info(message: string, data?: unknown, context?: string): void {
    this.log(LogLevel.INFO, message, data, context);
  }

  /**
   * Warning log
   */
  warn(message: string, data?: unknown, context?: string): void {
    this.log(LogLevel.WARN, message, data, context);
  }

  /**
   * Error log
   */
  error(message: string, error?: unknown, context?: string): void {
    const errorData = error instanceof Error
      ? {
          message: error.message,
          stack: error.stack,
          name: error.name,
        }
      : error;

    this.log(LogLevel.ERROR, message, errorData, context);
  }

  /**
   * Get logs (for debugging)
   */
  getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter(log => log.level >= level);
    }
    return [...this.logs];
  }

  /**
   * Clear logs
   */
  clearLogs(): void {
    this.logs = [];
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logDebug = (message: string, data?: unknown, context?: string) =>
  logger.debug(message, data, context);
export const logInfo = (message: string, data?: unknown, context?: string) =>
  logger.info(message, data, context);
export const logWarn = (message: string, data?: unknown, context?: string) =>
  logger.warn(message, data, context);
export const logError = (message: string, error?: unknown, context?: string) =>
  logger.error(message, error, context);

