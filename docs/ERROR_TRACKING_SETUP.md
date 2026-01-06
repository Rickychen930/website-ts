# Error Tracking Setup Guide

## Overview

Error tracking adalah essential untuk production applications. Dokumen ini menjelaskan cara setup error tracking untuk website ini.

## Recommended Solutions

### 1. Sentry (Recommended)

**Why Sentry:**

- Free tier untuk personal projects
- Excellent React & Node.js support
- Real-time error notifications
- Source maps support
- Performance monitoring
- User context tracking

**Installation:**

```bash
npm install --save @sentry/react @sentry/node
```

**Frontend Setup (`src/index.tsx`):**

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

**Backend Setup (`backend/src/main.ts`):**

```typescript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

**Error Boundary Integration:**

```typescript
import * as Sentry from "@sentry/react";

export class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
    });
  }
}
```

### 2. LogRocket (Alternative)

**Why LogRocket:**

- Session replay
- Network monitoring
- Redux/State inspection
- More expensive but powerful

**Installation:**

```bash
npm install --save logrocket
```

### 3. Custom Error Tracking

**Current Implementation:**

- Logger utility sudah ada di `src/utils/logger.ts`
- Bisa extend untuk send ke external service

**Example Extension:**

```typescript
// src/utils/error-tracker.ts
export async function trackError(
  error: Error,
  context?: Record<string, unknown>,
): Promise<void> {
  // Log locally
  logError(error.message, error, "ErrorTracker");

  // Send to external service (if configured)
  if (process.env.REACT_APP_ERROR_TRACKING_ENABLED === "true") {
    try {
      await fetch(process.env.REACT_APP_ERROR_TRACKING_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: {
            message: error.message,
            stack: error.stack,
            name: error.name,
          },
          context,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    } catch (err) {
      // Fail silently if error tracking fails
      console.warn("Failed to send error to tracking service", err);
    }
  }
}
```

## Environment Variables

Add to `.env`:

```bash
# Sentry
REACT_APP_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Or Custom Error Tracking
REACT_APP_ERROR_TRACKING_ENABLED=true
REACT_APP_ERROR_TRACKING_URL=https://your-error-tracking-service.com/api/errors
```

## Best Practices

1. **Don't Track Sensitive Data**
   - Never send passwords, tokens, or PII
   - Sanitize error messages before sending

2. **User Context**
   - Add user ID (if authenticated)
   - Add session ID
   - Add page/route information

3. **Error Filtering**
   - Filter out known/expected errors
   - Don't track development errors
   - Rate limit error reporting

4. **Source Maps**
   - Enable source maps in production
   - Upload to Sentry for better debugging

## Implementation Priority

1. **High Priority:**
   - Setup Sentry (free tier)
   - Integrate with Error Boundary
   - Track API errors

2. **Medium Priority:**
   - Add user context
   - Setup performance monitoring
   - Add custom error tags

3. **Low Priority:**
   - Session replay
   - Advanced analytics
   - Custom dashboards

## Testing Error Tracking

```typescript
// Test error tracking in development
if (process.env.NODE_ENV === "development") {
  // Trigger test error
  setTimeout(() => {
    throw new Error("Test error for tracking");
  }, 5000);
}
```

## Resources

- [Sentry React Docs](https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry Node.js Docs](https://docs.sentry.io/platforms/node/)
- [Error Tracking Best Practices](https://docs.sentry.io/product/best-practices/)

---

**Note:** Error tracking setup adalah optional tapi highly recommended untuk production applications.
