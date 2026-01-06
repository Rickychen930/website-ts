/**
 * Environment Variable Validator
 * Validates required environment variables at startup
 */

import { logger } from './logger';

interface EnvVar {
  name: string;
  required: boolean;
  defaultValue?: string;
  validator?: (value: string) => boolean;
  errorMessage?: string;
}

const requiredEnvVars: EnvVar[] = [
  {
    name: 'MONGODB_URI',
    required: true,
    validator: (value) => value.startsWith('mongodb://') || value.startsWith('mongodb+srv://'),
    errorMessage: 'MONGODB_URI must be a valid MongoDB connection string',
  },
  {
    name: 'PORT',
    required: false,
    defaultValue: '4000',
    validator: (value) => {
      const port = Number(value);
      return !isNaN(port) && port > 0 && port < 65536;
    },
    errorMessage: 'PORT must be a valid number between 1 and 65535',
  },
  {
    name: 'NODE_ENV',
    required: false,
    defaultValue: 'development',
    validator: (value) => ['development', 'production', 'test'].includes(value),
    errorMessage: 'NODE_ENV must be one of: development, production, test',
  },
];

const optionalEnvVars: EnvVar[] = [
  {
    name: 'ALLOWED_ORIGINS',
    required: false,
    validator: (value) => value.split(',').length > 0,
    errorMessage: 'ALLOWED_ORIGINS must be a comma-separated list of origins',
  },
  {
    name: 'SSL_CERT_PATH',
    required: false,
    validator: (value) => value.length > 0,
  },
  {
    name: 'SSL_KEY_PATH',
    required: false,
    validator: (value) => value.length > 0,
  },
  {
    name: 'LOG_LEVEL',
    required: false,
    validator: (value) => ['DEBUG', 'INFO', 'WARN', 'ERROR'].includes(value.toUpperCase()),
    errorMessage: 'LOG_LEVEL must be one of: DEBUG, INFO, WARN, ERROR',
  },
];

/**
 * Validate environment variables
 */
export function validateEnv(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validate required variables
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar.name];

    if (envVar.required && !value) {
      errors.push(`❌ Required environment variable ${envVar.name} is not set`);
      continue;
    }

    // Use default value if provided and value is missing
    if (!value && envVar.defaultValue) {
      process.env[envVar.name] = envVar.defaultValue;
      logger.info(`Using default value for ${envVar.name}: ${envVar.defaultValue}`, undefined, 'EnvValidator');
      continue;
    }

    // Validate value if validator provided
    if (value && envVar.validator && !envVar.validator(value)) {
      errors.push(
        `❌ Invalid value for ${envVar.name}: ${envVar.errorMessage || 'Validation failed'}`
      );
    }
  }

  // Validate optional variables (only if they are set)
  for (const envVar of optionalEnvVars) {
    const value = process.env[envVar.name];
    if (value && envVar.validator && !envVar.validator(value)) {
      errors.push(
        `⚠️ Invalid value for optional ${envVar.name}: ${envVar.errorMessage || 'Validation failed'}`
      );
    }
  }

  if (errors.length > 0) {
    logger.error('Environment validation failed', { errors }, 'EnvValidator');
    return { isValid: false, errors };
  }

  logger.info('Environment variables validated successfully', undefined, 'EnvValidator');
  return { isValid: true, errors: [] };
}

/**
 * Get validated environment variable
 */
export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name];
  if (!value && defaultValue) {
    return defaultValue;
  }
  if (!value) {
    throw new Error(`Environment variable ${name} is not set and no default value provided`);
  }
  return value;
}

/**
 * Get validated number environment variable
 */
export function getEnvNumber(name: string, defaultValue?: number): number {
  const value = process.env[name];
  if (!value && defaultValue !== undefined) {
    return defaultValue;
  }
  if (!value) {
    throw new Error(`Environment variable ${name} is not set and no default value provided`);
  }
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`Environment variable ${name} is not a valid number`);
  }
  return num;
}

/**
 * Get validated boolean environment variable
 */
export function getEnvBoolean(name: string, defaultValue?: boolean): boolean {
  const value = process.env[name];
  if (!value && defaultValue !== undefined) {
    return defaultValue;
  }
  if (!value) {
    throw new Error(`Environment variable ${name} is not set and no default value provided`);
  }
  return value.toLowerCase() === 'true' || value === '1';
}

