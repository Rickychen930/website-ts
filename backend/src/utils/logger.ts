/**
 * Logger Utility for Backend
 * Centralized logging service for the backend
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
  private maxLogs = 1000; // Keep last 1000 logs in memory for backend

  constructor() {
    // Set log level based on environment
    const envLevel = process.env.LOG_LEVEL?.toUpperCase();
    if (envLevel === 'DEBUG') {
      this.level = LogLevel.DEBUG;
    } else if (envLevel === 'INFO') {
      this.level = LogLevel.INFO;
    } else if (envLevel === 'WARN') {
      this.level = LogLevel.WARN;
    } else if (envLevel === 'ERROR') {
      this.level = LogLevel.ERROR;
    } else if (process.env.NODE_ENV === 'production') {
      this.level = LogLevel.INFO; // Info and above in production
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

    // Format message with emoji for better readability
    const emoji = this.getEmoji(level);
    const prefix = context ? `[${context}]` : '';
    const formattedMessage = `${emoji} ${prefix} ${message}`;

    // Output to console based on level
    const logMethod = this.getConsoleMethod(level);
    if (data) {
      logMethod(formattedMessage, data);
    } else {
      logMethod(formattedMessage);
    }

    // In production, send errors to external service
    if (level === LogLevel.ERROR && process.env.NODE_ENV === 'production') {
      this.sendToErrorService(entry);
    }
  }

  /**
   * Get emoji for log level
   */
  private getEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '🔍';
      case LogLevel.INFO:
        return '✅';
      case LogLevel.WARN:
        return '⚠️';
      case LogLevel.ERROR:
        return '❌';
      default:
        return '📝';
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
    // For now, could write to file or send to monitoring service
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

