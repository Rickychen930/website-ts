/**
 * CSS Migration Helper
 * Utility functions to help migrate existing components to new CSS architecture
 * Professional, Code-Based, DRY, KISS
 * 
 * Usage:
 * import { migrateClassName, findHardcodedValues } from '@/utils/css-migration-helper';
 */

/**
 * Migrate old class names to new BEM structure
 * @param oldClassName - Old class name
 * @param block - BEM block name
 * @returns New BEM class name
 */
export function migrateClassName(
  oldClassName: string,
  block: string
): string {
  // Convert camelCase or kebab-case to BEM
  const normalized = oldClassName
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-+/, '');

  // If it's already in BEM format, return as is
  if (normalized.includes('__') || normalized.includes('--')) {
    return normalized;
  }

  // If it starts with block name, convert to BEM element
  if (normalized.startsWith(block)) {
    const element = normalized.replace(new RegExp(`^${block}-?`), '');
    if (element) {
      return `${block}__${element}`;
    }
  }

  // If it's a modifier pattern (contains variant, state, etc.)
  if (normalized.includes('-variant-') || normalized.includes('-state-')) {
    const parts = normalized.split('-');
    const modifierIndex = parts.findIndex(p => p === 'variant' || p === 'state');
    if (modifierIndex > 0) {
      const modifier = parts.slice(modifierIndex + 1).join('-');
      return `${block}--${modifier}`;
    }
  }

  return normalized;
}

/**
 * Find hardcoded CSS values in a string
 * @param cssString - CSS string to analyze
 * @returns Array of found hardcoded values
 */
export function findHardcodedValues(cssString: string): Array<{
  value: string;
  property: string;
  line: number;
}> {
  const results: Array<{ value: string; property: string; line: number }> = [];
  const lines = cssString.split('\n');

  // Common hardcoded patterns
  const colorPattern = /(color|background|border-color):\s*#[0-9a-fA-F]{3,6}/;
  const spacingPattern = /(padding|margin|gap|top|bottom|left|right):\s*\d+px/;
  const fontSizePattern = /font-size:\s*\d+px/;
  const borderRadiusPattern = /border-radius:\s*\d+px/;
  const boxShadowPattern = /box-shadow:\s*[^;]+/;

  lines.forEach((line, index) => {
    if (colorPattern.test(line)) {
      const match = line.match(/(\w+):\s*(#[0-9a-fA-F]{3,6})/);
      if (match) {
        results.push({
          property: match[1],
          value: match[2],
          line: index + 1,
        });
      }
    }

    if (spacingPattern.test(line)) {
      const match = line.match(/(\w+):\s*(\d+px)/);
      if (match) {
        results.push({
          property: match[1],
          value: match[2],
          line: index + 1,
        });
      }
    }

    if (fontSizePattern.test(line)) {
      const match = line.match(/font-size:\s*(\d+px)/);
      if (match) {
        results.push({
          property: 'font-size',
          value: match[1],
          line: index + 1,
        });
      }
    }

    if (borderRadiusPattern.test(line)) {
      const match = line.match(/border-radius:\s*(\d+px)/);
      if (match) {
        results.push({
          property: 'border-radius',
          value: match[1],
          line: index + 1,
        });
      }
    }
  });

  return results;
}

/**
 * Suggest CSS variable replacement for a value
 * @param property - CSS property name
 * @param value - CSS value
 * @returns Suggested CSS variable name or null
 */
export function suggestCSSVariable(
  property: string,
  value: string
): string | null {
  // Color mappings
  if (property.includes('color') || property.includes('background')) {
    if (value === '#667eea' || value === '#764ba2') {
      return 'var(--color-accent-primary)';
    }
    if (value === '#ffffff' || value === '#fff') {
      return 'var(--color-bg-card)';
    }
    if (value === '#1f2d3d' || value === '#1a2332') {
      return 'var(--color-text-heading)';
    }
  }

  // Spacing mappings
  if (property.includes('padding') || property.includes('margin')) {
    if (value === '2.5rem' || value === '40px') {
      return 'var(--spacing-card-padding)';
    }
    if (value === '1.75rem' || value === '28px') {
      return 'var(--spacing-card-padding-mobile)';
    }
  }

  // Border radius mappings
  if (property === 'border-radius') {
    if (value === '24px' || value === '1.5rem') {
      return 'var(--spacing-card-radius)';
    }
    if (value === '18px' || value === '1.125rem') {
      return 'var(--spacing-card-radius-mobile)';
    }
  }

  // Font size mappings
  if (property === 'font-size') {
    if (value === '2rem' || value === '32px') {
      return 'var(--font-size-title)';
    }
    if (value === '1rem' || value === '16px') {
      return 'var(--font-size-base)';
    }
  }

  return null;
}

/**
 * Generate migration report
 * @param cssString - CSS string to analyze
 * @param blockName - BEM block name
 * @returns Migration report
 */
export function generateMigrationReport(
  cssString: string,
  blockName: string
): {
  hardcodedValues: Array<{ value: string; property: string; line: number; suggestion: string | null }>;
  classNames: Array<{ old: string; new: string }>;
} {
  const hardcodedValues = findHardcodedValues(cssString);
  const suggestions = hardcodedValues.map(hv => ({
    ...hv,
    suggestion: suggestCSSVariable(hv.property, hv.value),
  }));

  // Extract class names from CSS
  const classNames: Array<{ old: string; new: string }> = [];
  const classPattern = /\.([a-zA-Z0-9_-]+)\s*\{/g;
  let match;

  while ((match = classPattern.exec(cssString)) !== null) {
    const oldClassName = match[1];
    const newClassName = migrateClassName(oldClassName, blockName);
    if (oldClassName !== newClassName) {
      classNames.push({ old: oldClassName, new: newClassName });
    }
  }

  return {
    hardcodedValues: suggestions,
    classNames,
  };
}

/**
 * Export all helpers
 */
export const CSSMigrationHelper = {
  migrateClassName,
  findHardcodedValues,
  suggestCSSVariable,
  generateMigrationReport,
};

