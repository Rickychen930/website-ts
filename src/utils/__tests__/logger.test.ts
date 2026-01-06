/**
 * Unit tests for Logger utility
 */

import { logger, LogLevel, logDebug, logInfo, logWarn, logError } from '../logger';

describe('Logger', () => {
  const originalConsole = {
    debug: console.debug,
    info: console.info,
    warn: console.warn,
    error: console.error,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    console.debug = jest.fn();
    console.info = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
    logger.clearLogs();
  });

  afterAll(() => {
    console.debug = originalConsole.debug;
    console.info = originalConsole.info;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  });

  describe('Log Levels', () => {
    it('should log debug messages in development', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      logger.setLevel(LogLevel.DEBUG);
      logger.debug('Debug message');

      expect(console.debug).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('should not log debug messages when level is INFO', () => {
      logger.setLevel(LogLevel.INFO);
      logger.debug('Debug message');

      expect(console.debug).not.toHaveBeenCalled();
    });

    it('should log info messages', () => {
      logger.setLevel(LogLevel.INFO);
      logger.info('Info message');

      expect(console.info).toHaveBeenCalled();
    });

    it('should log warn messages', () => {
      logger.setLevel(LogLevel.WARN);
      logger.warn('Warning message');

      expect(console.warn).toHaveBeenCalled();
    });

    it('should log error messages', () => {
      logger.setLevel(LogLevel.ERROR);
      logger.error('Error message');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Convenience Functions', () => {
    it('should log debug via convenience function', () => {
      logger.setLevel(LogLevel.DEBUG);
      logDebug('Debug message', { data: 'test' }, 'TestContext');

      expect(console.debug).toHaveBeenCalled();
    });

    it('should log info via convenience function', () => {
      logger.setLevel(LogLevel.INFO);
      logInfo('Info message', { data: 'test' }, 'TestContext');

      expect(console.info).toHaveBeenCalled();
    });

    it('should log warn via convenience function', () => {
      logger.setLevel(LogLevel.WARN);
      logWarn('Warning message', { data: 'test' }, 'TestContext');

      expect(console.warn).toHaveBeenCalled();
    });

    it('should log error via convenience function', () => {
      logger.setLevel(LogLevel.ERROR);
      logError('Error message', new Error('Test error'), 'TestContext');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Log Storage', () => {
    it('should store logs in memory', () => {
      logger.setLevel(LogLevel.DEBUG);
      logger.info('Test message', { data: 'test' }, 'Context');

      const logs = logger.getLogs();
      expect(logs.length).toBeGreaterThan(0);
      expect(logs[0]).toHaveProperty('level');
      expect(logs[0]).toHaveProperty('message', 'Test message');
      expect(logs[0]).toHaveProperty('timestamp');
      expect(logs[0]).toHaveProperty('context', 'Context');
    });

    it('should filter logs by level', () => {
      logger.setLevel(LogLevel.DEBUG);
      logger.debug('Debug message');
      logger.info('Info message');
      logger.warn('Warning message');
      logger.error('Error message');

      const errorLogs = logger.getLogs(LogLevel.ERROR);
      expect(errorLogs.length).toBe(1);
      expect(errorLogs[0].message).toBe('Error message');
    });

    it('should clear logs', () => {
      logger.setLevel(LogLevel.DEBUG);
      logger.info('Test message');
      
      expect(logger.getLogs().length).toBeGreaterThan(0);

      logger.clearLogs();
      expect(logger.getLogs().length).toBe(0);
    });

    it('should limit stored logs to maxLogs', () => {
      logger.setLevel(LogLevel.DEBUG);
      
      // Create more logs than maxLogs (default 100)
      for (let i = 0; i < 150; i++) {
        logger.info(`Message ${i}`);
      }

      const logs = logger.getLogs();
      expect(logs.length).toBeLessThanOrEqual(100);
    });
  });

  describe('Error Handling', () => {
    it('should handle Error objects', () => {
      logger.setLevel(LogLevel.ERROR);
      const error = new Error('Test error');
      logger.error('Error occurred', error, 'TestContext');

      expect(console.error).toHaveBeenCalled();
      const logs = logger.getLogs(LogLevel.ERROR);
      expect(logs[0].data).toHaveProperty('message', 'Test error');
      expect(logs[0].data).toHaveProperty('stack');
      expect(logs[0].data).toHaveProperty('name', 'Error');
    });

    it('should handle non-Error objects', () => {
      logger.setLevel(LogLevel.ERROR);
      logger.error('Error occurred', 'String error', 'TestContext');

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('Context', () => {
    it('should include context in log messages', () => {
      logger.setLevel(LogLevel.INFO);
      logger.info('Test message', undefined, 'TestContext');

      expect(console.info).toHaveBeenCalledWith(
        expect.stringContaining('[TestContext]'),
        expect.anything()
      );
    });

    it('should work without context', () => {
      logger.setLevel(LogLevel.INFO);
      logger.info('Test message');

      expect(console.info).toHaveBeenCalled();
    });
  });
});

