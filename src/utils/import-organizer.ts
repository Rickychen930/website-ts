/**
 * Import Organizer Utility
 * Professional import organization and validation
 *
 * This utility helps organize imports according to best practices:
 * 1. External dependencies (React, libraries)
 * 2. Internal absolute imports (@/...)
 * 3. Internal relative imports (../...)
 * 4. Type imports
 * 5. CSS/Asset imports
 */

export interface ImportGroup {
  type: "external" | "absolute" | "relative" | "types" | "assets";
  imports: string[];
}

/**
 * Import categories for organization
 */
export enum ImportCategory {
  EXTERNAL = "external",
  ABSOLUTE = "absolute",
  RELATIVE = "relative",
  TYPES = "types",
  ASSETS = "assets",
}

/**
 * Organize imports into groups
 * @param imports - Array of import statements
 * @returns Organized import groups
 */
export function organizeImports(imports: string[]): ImportGroup[] {
  const groups: ImportGroup[] = [];
  const external: string[] = [];
  const absolute: string[] = [];
  const relative: string[] = [];
  const types: string[] = [];
  const assets: string[] = [];

  imports.forEach((imp) => {
    const trimmed = imp.trim();

    // Skip empty lines
    if (!trimmed) return;

    // Type imports
    if (trimmed.startsWith("import type") || trimmed.includes("type ")) {
      types.push(trimmed);
      return;
    }

    // Asset imports (CSS, images, etc.)
    if (
      trimmed.endsWith(".css") ||
      trimmed.endsWith(".scss") ||
      trimmed.endsWith(".sass") ||
      trimmed.endsWith(".less") ||
      trimmed.match(/\.(png|jpg|jpeg|gif|svg|webp|ico)$/)
    ) {
      assets.push(trimmed);
      return;
    }

    // Absolute imports (using @ alias or absolute paths)
    if (trimmed.includes("from '@/") || trimmed.includes("from '@")) {
      absolute.push(trimmed);
      return;
    }

    // Relative imports
    if (trimmed.includes("from '../") || trimmed.includes("from './")) {
      relative.push(trimmed);
      return;
    }

    // External dependencies (everything else)
    external.push(trimmed);
  });

  // Build groups in order
  if (external.length > 0) {
    groups.push({ type: "external", imports: external });
  }
  if (absolute.length > 0) {
    groups.push({ type: "absolute", imports: absolute });
  }
  if (relative.length > 0) {
    groups.push({ type: "relative", imports: relative });
  }
  if (types.length > 0) {
    groups.push({ type: "types", imports: types });
  }
  if (assets.length > 0) {
    groups.push({ type: "assets", imports: assets });
  }

  return groups;
}

/**
 * Sort imports within a group alphabetically
 * @param imports - Array of import statements
 * @returns Sorted imports
 */
export function sortImports(imports: string[]): string[] {
  return [...imports].sort((a, b) => {
    // Extract the module name for comparison
    const getModuleName = (imp: string): string => {
      const match = imp.match(/from\s+['"](.+?)['"]/);
      return match ? match[1] : "";
    };

    const aModule = getModuleName(a);
    const bModule = getModuleName(b);

    return aModule.localeCompare(bModule);
  });
}

/**
 * Format organized imports with proper spacing
 * @param groups - Organized import groups
 * @returns Formatted import string
 */
export function formatImports(groups: ImportGroup[]): string {
  const lines: string[] = [];

  groups.forEach((group, index) => {
    if (group.imports.length === 0) return;

    const sorted = sortImports(group.imports);
    lines.push(...sorted);

    // Add blank line between groups (except after last group)
    if (index < groups.length - 1) {
      lines.push("");
    }
  });

  return lines.join("\n");
}

/**
 * Validate import order
 * @param imports - Array of import statements
 * @returns Validation result with errors
 */
export function validateImportOrder(imports: string[]): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  // Call organizeImports to validate structure, result not used
  organizeImports(imports);

  // Check if external imports come before internal
  let foundAbsolute = false;
  let foundRelative = false;

  imports.forEach((imp, index) => {
    const trimmed = imp.trim();
    if (!trimmed) return;

    // Check if absolute import appears before external
    if (trimmed.includes("from '@/") && !foundAbsolute) {
      const hasExternalBefore = imports
        .slice(0, index)
        .some(
          (i) =>
            !i.includes("from '@/") &&
            !i.includes("from '../") &&
            !i.includes("from './"),
        );

      if (!hasExternalBefore) {
        foundAbsolute = true;
      }
    }

    // Check if relative import appears before absolute
    if (
      (trimmed.includes("from '../") || trimmed.includes("from './")) &&
      !foundRelative
    ) {
      const hasAbsoluteBefore = imports
        .slice(0, index)
        .some((i) => i.includes("from '@/"));

      if (hasAbsoluteBefore) {
        foundRelative = true;
      } else {
        errors.push(
          `Relative import at line ${index + 1} should come after absolute imports`,
        );
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Professional import order template
 */
export const IMPORT_ORDER_TEMPLATE = `
// 1. External dependencies (React, libraries)
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

// 2. Internal absolute imports (using @ alias)
import { Colors, Strings } from '@/constants';
import { UserService } from '@/services/user-service';
import { UserProfile } from '@/types/user';

// 3. Internal relative imports
import { ComponentName } from './component';
import { helperFunction } from '../utils/helper';

// 4. Type imports (if separated)
import type { SomeType } from '@/types/some-type';

// 5. CSS/Asset imports (at the end)
import './component.css';
import '@/assets/css/global.css';
`.trim();
