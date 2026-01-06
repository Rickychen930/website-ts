# Performance Optimization Guide

## Overview

Dokumen ini menjelaskan optimasi performance yang sudah diimplementasikan dan best practices untuk website ini.

## ✅ Implemented Optimizations

### 1. Image Optimization

**File:** `src/utils/image-optimization.ts`

**Features:**

- WebP/AVIF format detection
- Responsive image generation (srcset)
- Lazy loading utilities
- Image preloading
- Placeholder generation

**Usage:**

```typescript
import {
  getOptimizedImageUrl,
  generateResponsiveSrcSet,
} from "@/utils/image-optimization";

// Get optimized image URL
const optimizedUrl = await getOptimizedImageUrl("/image.jpg", {
  width: 800,
  format: "webp",
});

// Generate responsive srcset
const { srcSet, sizes } = generateResponsiveSrcSet(
  "/image.jpg",
  [320, 640, 1024, 1920],
);
```

### 2. Code Splitting

**Already Implemented:**

- Route-based code splitting dengan `React.lazy()`
- Component lazy loading dengan `LazySection`
- Dynamic imports untuk heavy components

### 3. Bundle Size Monitoring

**Script:** `scripts/analyze-bundle.js`

**Usage:**

```bash
npm run build
npm run analyze:bundle
```

**Output:**

- JavaScript bundle sizes
- CSS bundle sizes
- Image sizes
- Recommendations untuk optimization

### 4. Performance Monitoring

**File:** `src/utils/performance-monitor.ts`

**Tracks:**

- Long tasks (>50ms)
- Slow resources (>1s)
- Navigation timing
- Web Vitals (LCP, FID, CLS)

**Usage:**

```typescript
import { performanceMonitor } from "@/utils/performance-monitor";

// Get metrics
const metrics = performanceMonitor.getMetrics();
const avgLCP = performanceMonitor.getAverageMetric("lcp");
```

## 📊 Performance Targets

### Web Vitals Targets:

- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Bundle Size Targets:

- **Initial JS Bundle:** < 200KB (gzipped)
- **Total CSS:** < 100KB (gzipped)
- **Individual Images:** < 500KB

## 🚀 Best Practices

### Images:

1. ✅ Use WebP/AVIF format when supported
2. ✅ Implement responsive images (srcset)
3. ✅ Lazy load images below the fold
4. ✅ Use appropriate image dimensions
5. ✅ Compress images before upload

### JavaScript:

1. ✅ Code splitting untuk routes
2. ✅ Dynamic imports untuk heavy components
3. ✅ Tree shaking untuk remove unused code
4. ✅ Minify dan compress (gzip/brotli)

### CSS:

1. ✅ Remove unused CSS
2. ✅ Use CSS-in-JS untuk component styles
3. ✅ Critical CSS inline
4. ✅ Defer non-critical CSS

### Caching:

1. ✅ Service Worker untuk offline support
2. ✅ Cache static assets (1 year)
3. ✅ Cache API responses appropriately
4. ✅ Use CDN for static assets

## 🔧 Optimization Tools

### Build-time:

- `npm run analyze:bundle` - Analyze bundle sizes
- Webpack Bundle Analyzer (optional)
- Lighthouse CI (optional)

### Runtime:

- Performance Monitor (built-in)
- Chrome DevTools Performance tab
- Lighthouse audits

## 📈 Monitoring

### Development:

- Performance monitor logs to console
- Metrics available via `performanceMonitor.getMetrics()`

### Production:

- Integrate with analytics (Google Analytics, etc.)
- Use error tracking (Sentry) for performance issues
- Monitor Core Web Vitals

## 🎯 Next Steps

1. **Service Worker:**
   - Implement PWA features
   - Offline support
   - Background sync

2. **CDN Integration:**
   - Use CDN for images
   - Use CDN for static assets
   - Image transformation service

3. **Advanced Optimizations:**
   - HTTP/2 Server Push
   - Resource Hints (preload, prefetch, dns-prefetch)
   - Critical CSS extraction

---

**Last Updated:** $(date)
