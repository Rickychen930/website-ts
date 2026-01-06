/**
 * Image Optimization Utilities
 * Provides utilities for optimizing images (WebP, responsive images, etc.)
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpg" | "png";
  responsive?: boolean;
}

export interface ResponsiveImageSizes {
  srcSet: string;
  sizes: string;
}

/**
 * Generate WebP image URL
 * Note: Requires server-side support or CDN with image transformation
 */
export function getWebPUrl(
  src: string,
  options?: ImageOptimizationOptions,
): string {
  if (!src) return src;

  // If already WebP, return as is
  if (src.endsWith(".webp")) return src;

  // For CDN services (example: Cloudinary, Imgix, etc.)
  // This is a template - adjust based on your CDN
  const params: string[] = [];

  if (options?.width) params.push(`w_${options.width}`);
  if (options?.height) params.push(`h_${options.height}`);
  if (options?.quality) params.push(`q_${options.quality}`);
  params.push("f_webp");

  // Example: If using Cloudinary
  // return src.replace(/\.(jpg|jpeg|png)$/i, `.webp?${params.join(',')}`);

  // For now, return original (implement based on your image service)
  return src;
}

/**
 * Generate responsive image srcSet
 */
export function generateResponsiveSrcSet(
  baseSrc: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920],
): ResponsiveImageSizes {
  const srcSet = widths
    .map((width) => {
      // Generate optimized URL for each width
      // Adjust based on your image service/CDN
      const optimizedSrc = getWebPUrl(baseSrc, { width, format: "webp" });
      return `${optimizedSrc} ${width}w`;
    })
    .join(", ");

  const sizes = `
    (max-width: 320px) 320px,
    (max-width: 640px) 640px,
    (max-width: 768px) 768px,
    (max-width: 1024px) 1024px,
    (max-width: 1280px) 1280px,
    1920px
  `.trim();

  return { srcSet, sizes };
}

/**
 * Check if browser supports WebP
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src =
      "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  });
}

/**
 * Check if browser supports AVIF
 */
export function supportsAVIF(): Promise<boolean> {
  return new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => {
      resolve(avif.height === 2);
    };
    avif.src =
      "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=";
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalFormat(): Promise<"webp" | "avif" | "jpg"> {
  if (await supportsAVIF()) return "avif";
  if (await supportsWebP()) return "webp";
  return "jpg";
}

/**
 * Generate optimized image URL with format detection
 */
export async function getOptimizedImageUrl(
  src: string,
  options?: ImageOptimizationOptions,
): Promise<string> {
  if (!src) return src;

  const format = options?.format || (await getOptimalFormat());

  return getWebPUrl(src, { ...options, format });
}

/**
 * Preload critical images
 */
export function preloadImage(src: string, as: "image" = "image"): void {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = as;
  link.href = src;
  // @ts-ignore - fetchPriority is a newer HTML attribute
  link.fetchPriority = "high";
  document.head.appendChild(link);
}

/**
 * Lazy load image with intersection observer
 */
export function lazyLoadImage(
  img: HTMLImageElement,
  src: string,
  options?: { rootMargin?: string; threshold?: number },
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: load immediately
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.src = src;
            observer.unobserve(img);
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Failed to load image"));
          }
        });
      },
      {
        rootMargin: options?.rootMargin || "50px",
        threshold: options?.threshold || 0.01,
      },
    );

    observer.observe(img);
  });
}

/**
 * Get image dimensions from URL (requires server support)
 */
export async function getImageDimensions(
  src: string,
): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve(null);
    };
    img.src = src;
  });
}

/**
 * Generate placeholder image (blur/color)
 */
export function generatePlaceholder(
  width: number,
  height: number,
  color: string = "#f0f0f0",
): string {
  // Generate a simple colored placeholder
  // In production, consider using blur-up technique or low-quality image placeholders
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }
  return canvas.toDataURL();
}
