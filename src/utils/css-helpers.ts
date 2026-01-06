/**
 * CSS Helpers - Utility Functions for CSS Classes
 * Professional, Code-Based, DRY, KISS
 * 
 * Architecture Principles:
 * - DRY: Reusable class name builders
 * - KISS: Simple, clear functions
 * - Type-safe: TypeScript support
 * 
 * Usage:
 * import { cn, btnClass, inputClass } from '@/utils/css-helpers';
 * 
 * <button className={btnClass('primary', 'large')}>Click</button>
 * <div className={cn('card', 'card--elevated', isActive && 'card--active')}>
 */

/**
 * Combine class names (similar to clsx/classnames)
 * Filters out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Build button class names
 * @param variant - Button variant (primary, secondary, danger, outline, ghost)
 * @param size - Button size (small, default, large)
 * @param additional - Additional classes
 */
export function btnClass(
  variant: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' = 'primary',
  size: 'small' | 'default' | 'large' | 'icon' = 'default',
  additional?: string
): string {
  const base = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = size !== 'default' ? `btn--${size}` : '';
  
  return cn(base, variantClass, sizeClass, additional);
}

/**
 * Build input class names
 * @param state - Input state (normal, error, success)
 * @param size - Input size (small, default, large)
 * @param additional - Additional classes
 */
export function inputClass(
  state: 'normal' | 'error' | 'success' = 'normal',
  size: 'small' | 'default' | 'large' = 'default',
  additional?: string
): string {
  const base = 'input';
  const stateClass = state !== 'normal' ? `input--${state}` : '';
  const sizeClass = size !== 'default' ? `input--${size}` : '';
  
  return cn(base, stateClass, sizeClass, additional);
}

/**
 * Build card class names
 * @param variant - Card variant (default, elevated, outlined, minimal)
 * @param additional - Additional classes
 */
export function cardClass(
  variant: 'default' | 'elevated' | 'outlined' | 'minimal' = 'default',
  additional?: string
): string {
  const base = 'card';
  const variantClass = variant !== 'default' ? `card--${variant}` : '';
  
  return cn(base, variantClass, additional);
}

/**
 * Build form class names
 * @param element - Form element (form, group, label, actions)
 * @param modifier - Optional modifier
 * @param additional - Additional classes
 */
export function formClass(
  element: 'form' | 'group' | 'label' | 'actions',
  modifier?: string,
  additional?: string
): string {
  const base = `form__${element}`;
  const modifierClass = modifier ? `${base}--${modifier}` : '';
  
  return cn(base, modifierClass, additional);
}

/**
 * Build empty state class names
 * @param size - Empty state size (small, default, large)
 * @param additional - Additional classes
 */
export function emptyStateClass(
  size: 'small' | 'default' | 'large' = 'default',
  additional?: string
): string {
  const base = 'empty-state';
  const sizeClass = size !== 'default' ? `${base}--${size}` : '';
  
  return cn(base, sizeClass, additional);
}

/**
 * Build loading class names
 * @param size - Loading size (small, default, large, inline)
 * @param additional - Additional classes
 */
export function loadingClass(
  size: 'small' | 'default' | 'large' | 'inline' = 'default',
  additional?: string
): string {
  const base = 'loading';
  const sizeClass = size !== 'default' ? `${base}--${size}` : '';
  
  return cn(base, sizeClass, additional);
}

/**
 * Build BEM class names
 * @param block - Block name
 * @param element - Element name (optional)
 * @param modifier - Modifier name (optional)
 */
export function bemClass(
  block: string,
  element?: string,
  modifier?: string
): string {
  if (element && modifier) {
    return `${block}__${element}--${modifier}`;
  }
  if (element) {
    return `${block}__${element}`;
  }
  if (modifier) {
    return `${block}--${modifier}`;
  }
  return block;
}

/**
 * Export all helpers
 */
export const CSSHelpers = {
  cn,
  btnClass,
  inputClass,
  cardClass,
  formClass,
  emptyStateClass,
  loadingClass,
  bemClass,
};

