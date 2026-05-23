/** Shared project display helpers. */

export function formatProjectCategory(category: string): string {
  if (!category.trim()) return "Project";
  return category.charAt(0).toUpperCase() + category.slice(1);
}
