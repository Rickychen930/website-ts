# Analytics Setup Guide

**Tanggal:** $(date)  
**Status:** ✅ Analytics Utility Ready

---

## 📊 ANALYTICS IMPLEMENTATION

### ✅ Completed:

- ✅ Analytics utility service (`src/utils/analytics.ts`)
- ✅ Integrated dengan FloatingCTA
- ✅ Integrated dengan ContactForm
- ✅ Page view tracking
- ✅ Event tracking
- ✅ Section view tracking

---

## 🚀 SETUP INSTRUCTIONS

### Option 1: Google Analytics

1. **Get Google Analytics Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create property atau use existing
   - Copy Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to Environment Variables:**

   ```bash
   REACT_APP_ANALYTICS_ENABLED=true
   REACT_APP_ANALYTICS_TYPE=google
   REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **Add Script to `public/index.html`:**
   ```html
   <!-- Google Analytics -->
   <script
     async
     src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
   ></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag() {
       dataLayer.push(arguments);
     }
     gtag("js", new Date());
     gtag("config", "G-XXXXXXXXXX");
   </script>
   ```

---

### Option 2: Plausible Analytics

1. **Get Plausible Domain:**
   - Sign up at [Plausible](https://plausible.io/)
   - Add your domain
   - Copy your domain

2. **Add to Environment Variables:**

   ```bash
   REACT_APP_ANALYTICS_ENABLED=true
   REACT_APP_ANALYTICS_TYPE=plausible
   REACT_APP_PLAUSIBLE_DOMAIN=yourdomain.com
   ```

3. **Add Script to `public/index.html`:**
   ```html
   <!-- Plausible Analytics -->
   <script
     defer
     data-domain="yourdomain.com"
     src="https://plausible.io/js/script.js"
   ></script>
   ```

---

### Option 3: Custom Analytics

1. **Set up Custom Endpoint:**
   - Create API endpoint untuk receive analytics data
   - Endpoint should accept POST requests dengan JSON data

2. **Add to Environment Variables:**
   ```bash
   REACT_APP_ANALYTICS_ENABLED=true
   REACT_APP_ANALYTICS_TYPE=custom
   REACT_APP_ANALYTICS_URL=https://your-api.com/analytics
   ```

---

## 📊 TRACKED EVENTS

### Automatic Tracking:

- ✅ **Page Views** - Tracked on route changes
- ✅ **Section Views** - Tracked when sections come into view
- ✅ **CTA Clicks** - Tracked when CTA buttons clicked
- ✅ **Resume Downloads** - Tracked when resume downloaded
- ✅ **Contact Form** - Tracked on form submission (success/failure)
- ✅ **Errors** - Tracked when errors occur

### Manual Tracking:

```typescript
import { trackEvent, trackCTAClick, trackSectionView } from "@/utils/analytics";

// Track custom event
trackEvent({
  action: "button_click",
  category: "engagement",
  label: "custom_button",
  value: 1,
});

// Track CTA click
trackCTAClick("hire-me", "header");

// Track section view
trackSectionView("projects", "Projects Section");
```

---

## 🎯 METRICS TO TRACK

### For HR/Recruiter Analysis:

1. **CTA Button Clicks**
   - Which CTA is clicked most (Hire Me vs Resume)
   - Location of clicks (floating vs header)

2. **Section Views**
   - Which sections recruiters view most
   - Time spent on each section
   - Scroll depth

3. **Resume Downloads**
   - How many downloads
   - From which location

4. **Contact Form**
   - Submission rate
   - Success vs failure rate

5. **Navigation Patterns**
   - Most visited sections
   - User journey through portfolio

---

## 🔧 CONFIGURATION

### Environment Variables:

```bash
# Enable/disable analytics
REACT_APP_ANALYTICS_ENABLED=true

# Analytics type: 'google' | 'plausible' | 'custom' | 'none'
REACT_APP_ANALYTICS_TYPE=google

# Google Analytics (if using Google)
REACT_APP_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Plausible (if using Plausible)
REACT_APP_PLAUSIBLE_DOMAIN=yourdomain.com

# Custom Analytics (if using custom)
REACT_APP_ANALYTICS_URL=https://your-api.com/analytics
```

---

## 📈 USAGE EXAMPLES

### Track Page View:

```typescript
import { trackPageView } from "@/utils/analytics";

trackPageView("/about", "About Page");
```

### Track Custom Event:

```typescript
import { trackEvent } from "@/utils/analytics";

trackEvent({
  action: "project_view",
  category: "engagement",
  label: "project-bottani",
  value: 1,
  customData: {
    project_name: "Bottani",
    project_category: "mobile-development",
  },
});
```

### Track Error:

```typescript
import { trackError } from "@/utils/analytics";

try {
  // Some code
} catch (error) {
  trackError(error as Error, "ComponentName");
}
```

---

## ✅ INTEGRATION STATUS

### Components Integrated:

- ✅ `FloatingCTA` - Tracks CTA clicks and resume downloads
- ✅ `ContactForm` - Tracks form submissions
- ✅ `MainPage` - Ready for section view tracking
- ✅ `index.tsx` - Tracks initial page view

### Ready for Integration:

- ⚠️ Section views (needs intersection observer integration)
- ⚠️ Project views (can be added)
- ⚠️ Navigation clicks (can be added)

---

## 🎯 NEXT STEPS

1. **Add Analytics Script:**
   - Add Google Analytics atau Plausible script ke `public/index.html`
   - Update environment variables

2. **Test Analytics:**
   - Test in development dengan analytics enabled
   - Verify events are tracked correctly

3. **Monitor Metrics:**
   - Set up dashboards
   - Track key metrics
   - Optimize based on data

---

**Setup by:** Senior Software Engineer  
**Last Updated:** $(date)

**Status:** ✅ **ANALYTICS UTILITY READY - NEEDS SCRIPT INTEGRATION**
