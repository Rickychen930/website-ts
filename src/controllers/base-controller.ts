/**
 * BaseController - Base class for all controllers
 * Implements common controller patterns following OOP and SOLID principles
 * 
 * Principles Applied:
 * - OOP: Base class with inheritance support
 * - SOLID:
 *   - SRP: Single responsibility for common controller operations
 *   - OCP: Open for extension, closed for modification
 *   - LSP: Liskov Substitution Principle - subclasses can replace base class
 *   - DIP: Depends on abstractions (UserProfile type)
 * - DRY: Eliminates code duplication across controllers
 * - KISS: Simple, clear base implementation
 */

import { UserProfile } from "../types/user";
import { logError } from "../utils/logger";
import { ErrorMessages } from "../constants";

/**
 * Base Controller Interface
 * Defines contract for all controllers
 */
export interface IBaseController {
  /**
   * Check if section should be displayed
   * @param profile - User profile
   * @returns Whether to display the section
   */
  shouldDisplay(profile: UserProfile): boolean;
}

/**
 * Base Controller Class
 * Provides common functionality for all controllers
 * Follows Template Method Pattern
 */
export abstract class BaseController implements IBaseController {
  /**
   * Get data from profile (to be implemented by subclasses)
   * @param profile - User profile
   * @returns Extracted data or null
   */
  protected abstract getData(profile: UserProfile): unknown | null;

  /**
   * Validate data (to be implemented by subclasses)
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected abstract isValid(data: unknown): boolean;

  /**
   * Check if section should be displayed
   * Template method pattern - defines algorithm structure
   * @param profile - User profile
   * @returns Whether to display the section
   */
  public shouldDisplay(profile: UserProfile): boolean {
    if (!profile) {
      return false;
    }

    try {
      const data = this.getData(profile);
      return data !== null && this.isValid(data);
    } catch (error) {
      logError(
        ErrorMessages.LOAD_DATA_FAILED,
        error,
        this.constructor.name
      );
      return false;
    }
  }

  /**
   * Safely get data with error handling
   * @param profile - User profile
   * @returns Data or null if error
   */
  protected safeGetData(profile: UserProfile): unknown | null {
    try {
      return this.getData(profile);
    } catch (error) {
      logError(
        ErrorMessages.LOAD_DATA_FAILED,
        error,
        this.constructor.name
      );
      return null;
    }
  }

  /**
   * Validate data with error handling
   * @param data - Data to validate
   * @returns Whether data is valid
   */
  protected safeIsValid(data: unknown): boolean {
    try {
      return this.isValid(data);
    } catch (error) {
      logError(
        ErrorMessages.INVALID_INPUT,
        error,
        this.constructor.name
      );
      return false;
    }
  }
}

