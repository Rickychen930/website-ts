/**
 * Resolves project thumbnail URLs for <img src>.
 * Supports https/http, protocol-relative //, root paths /file, and paths without leading slash.
 */
export function resolveProjectImageSrc(
  imageUrl: string | undefined,
): string | undefined {
  if (!imageUrl?.trim()) return undefined;
  let t = imageUrl.trim();

  if (/^https?:\/\//i.test(t)) return t;

  if (t.startsWith("//")) {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}${t}`;
    }
    return `https:${t}`;
  }

  if (t.toLowerCase().startsWith("public/")) {
    t = `/${t.slice(7)}`;
  }

  if (t.startsWith("/")) {
    if (typeof window !== "undefined") {
      return `${window.location.origin}${t}`;
    }
    return t;
  }

  if (typeof window !== "undefined") {
    return `${window.location.origin}/${t.replace(/^\/+/, "")}`;
  }

  return `/${t.replace(/^\/+/, "")}`;
}
