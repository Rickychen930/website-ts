/**
 * Unit tests for Environment Variable Validator
 */

import { validateEnv, getEnvVar, getEnvNumber, getEnvBoolean } from '../env-validator';

describe('Environment Variable Validator', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('validateEnv', () => {
    it('should validate required MONGODB_URI', () => {
      delete process.env.MONGODB_URI;

      const result = validateEnv();

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain(
        expect.stringContaining('MONGODB_URI')
      );
    });

    it('should validate MONGODB_URI format', () => {
      process.env.MONGODB_URI = 'invalid-uri';

      const result = validateEnv();

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('MONGODB_URI') && e.includes('Invalid'))).toBe(true);
    });

    it('should accept valid MONGODB_URI', () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.NODE_ENV = 'test';

      const result = validateEnv();

      expect(result.isValid).toBe(true);
    });

    it('should use default PORT when not provided', () => {
      delete process.env.PORT;
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.NODE_ENV = 'test';

      const result = validateEnv();

      expect(result.isValid).toBe(true);
      expect(process.env.PORT).toBe('4000');
    });

    it('should validate PORT range', () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.PORT = '70000'; // Invalid port

      const result = validateEnv();

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('PORT'))).toBe(true);
    });

    it('should validate NODE_ENV values', () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.NODE_ENV = 'invalid';

      const result = validateEnv();

      expect(result.isValid).toBe(false);
      expect(result.errors.some(e => e.includes('NODE_ENV'))).toBe(true);
    });

    it('should validate optional LOG_LEVEL', () => {
      process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
      process.env.LOG_LEVEL = 'INVALID';

      const result = validateEnv();

      // Should warn but not fail
      expect(result.errors.some(e => e.includes('LOG_LEVEL'))).toBe(true);
    });
  });

  describe('getEnvVar', () => {
    it('should return environment variable value', () => {
      process.env.TEST_VAR = 'test-value';

      const value = getEnvVar('TEST_VAR');

      expect(value).toBe('test-value');
    });

    it('should return default value when variable is not set', () => {
      delete process.env.TEST_VAR;

      const value = getEnvVar('TEST_VAR', 'default-value');

      expect(value).toBe('default-value');
    });

    it('should throw error when variable is not set and no default', () => {
      delete process.env.TEST_VAR;

      expect(() => {
        getEnvVar('TEST_VAR');
      }).toThrow('Environment variable TEST_VAR is not set');
    });
  });

  describe('getEnvNumber', () => {
    it('should return number from environment variable', () => {
      process.env.TEST_NUMBER = '123';

      const value = getEnvNumber('TEST_NUMBER');

      expect(value).toBe(123);
      expect(typeof value).toBe('number');
    });

    it('should return default number when variable is not set', () => {
      delete process.env.TEST_NUMBER;

      const value = getEnvNumber('TEST_NUMBER', 456);

      expect(value).toBe(456);
    });

    it('should throw error for invalid number', () => {
      process.env.TEST_NUMBER = 'not-a-number';

      expect(() => {
        getEnvNumber('TEST_NUMBER');
      }).toThrow('not a valid number');
    });

    it('should throw error when variable is not set and no default', () => {
      delete process.env.TEST_NUMBER;

      expect(() => {
        getEnvNumber('TEST_NUMBER');
      }).toThrow('Environment variable TEST_NUMBER is not set');
    });
  });

  describe('getEnvBoolean', () => {
    it('should return true for "true" string', () => {
      process.env.TEST_BOOL = 'true';

      const value = getEnvBoolean('TEST_BOOL');

      expect(value).toBe(true);
    });

    it('should return true for "1" string', () => {
      process.env.TEST_BOOL = '1';

      const value = getEnvBoolean('TEST_BOOL');

      expect(value).toBe(true);
    });

    it('should return false for "false" string', () => {
      process.env.TEST_BOOL = 'false';

      const value = getEnvBoolean('TEST_BOOL');

      expect(value).toBe(false);
    });

    it('should return default boolean when variable is not set', () => {
      delete process.env.TEST_BOOL;

      const value = getEnvBoolean('TEST_BOOL', true);

      expect(value).toBe(true);
    });

    it('should throw error when variable is not set and no default', () => {
      delete process.env.TEST_BOOL;

      expect(() => {
        getEnvBoolean('TEST_BOOL');
      }).toThrow('Environment variable TEST_BOOL is not set');
    });
  });
});

