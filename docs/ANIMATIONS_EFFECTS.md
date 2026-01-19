# Animations & Effects - Premium Portfolio Experience

## Overview

Portfolio website telah dilengkapi dengan animasi dan efek premium yang memberikan kesan profesional dan modern.

## ✅ Efek yang Telah Ditambahkan

### 1. **Scroll-Triggered Animations**

- **Fade In**: Elemen muncul dengan fade effect saat scroll
- **Fade In Up**: Elemen muncul dari bawah dengan fade
- **Stagger Animation**: Animasi berurutan untuk list items
- **Intersection Observer**: Deteksi saat elemen masuk viewport

**File**: `src/hooks/useScrollReveal.ts`

### 2. **Animated Counter**

- **Number Animation**: Counter yang animasi dari 0 ke target number
- **Easing Function**: Smooth ease-out animation
- **Scroll Triggered**: Mulai animasi saat elemen terlihat

**File**: `src/hooks/useCounter.ts`
**Digunakan di**: `StatItem` component

### 3. **Hero Section Animations**

- **Fade In**: Hero section muncul dengan fade
- **Stagger Text**: Title, subtitle, location, bio muncul berurutan
- **Floating Background**: Background pattern dengan float animation
- **Rotating Gradient**: Subtle rotating gradient effect

**File**: `src/views/pages/Home/Home.module.css`

### 4. **Card Hover Effects**

- **Lift Effect**: Cards naik saat hover dengan shadow
- **Scale Effect**: Slight scale up pada hover
- **Glow Effect**: Subtle glow pada hover
- **Smooth Transitions**: Cubic-bezier easing untuk smooth motion

**Components**: ProjectCard, SkillBadge, Card

### 5. **Button Animations**

- **Ripple Effect**: Ripple animation saat hover
- **Lift Effect**: Button naik dengan shadow
- **Smooth Transitions**: 0.3s cubic-bezier transitions

**File**: `src/views/components/ui/Button/Button.module.css`

### 6. **Timeline Animations**

- **Pulsing Dot**: Timeline dot dengan pulse animation
- **Fade In**: Experience items muncul dengan fade
- **Smooth Transitions**: Smooth appearance

**File**: `src/views/components/domain/ExperienceItem/ExperienceItem.module.css`

### 7. **Grid Stagger Animations**

- **Projects Grid**: Setiap project card muncul dengan delay
- **Stats Grid**: Stats muncul dengan stagger effect
- **Testimonials Grid**: Testimonials dengan sequential animation

**File**: `src/views/pages/Home/Home.module.css`

### 8. **Header Animation**

- **Fade In Down**: Header muncul dari atas
- **Smooth Appearance**: Smooth entrance animation

**File**: `src/views/components/layout/Header/Header.module.css`

### 9. **Section Animations**

- **Fade In**: Sections muncul dengan fade
- **Scroll Reveal**: Sections muncul saat scroll ke viewport

**File**: `src/views/components/layout/Section/Section.module.css`

### 10. **Loading Animations**

- **Spinner**: Smooth rotating spinner
- **Skeleton Loading**: Shimmer effect untuk loading states

**File**: `src/styles/animations.css`

## Animation Types

### Fade Animations

- `fadeIn`: Basic fade in
- `fadeInUp`: Fade in dari bawah
- `fadeInDown`: Fade in dari atas
- `fadeInLeft`: Fade in dari kiri
- `fadeInRight`: Fade in dari kanan

### Scale Animations

- `scaleIn`: Scale dari kecil ke besar
- `scaleUp`: Scale up effect

### Slide Animations

- `slideInRight`: Slide dari kanan
- `slideInLeft`: Slide dari kiri

### Special Effects

- `pulse`: Pulsing effect
- `glow`: Glowing effect
- `float`: Floating animation
- `bounceIn`: Bounce entrance
- `shimmer`: Shimmer loading effect

## Custom Hooks

### useScrollReveal

```typescript
const { elementRef, isVisible } = useScrollReveal({
  threshold: 0.1,
  rootMargin: "0px",
  triggerOnce: true,
});
```

### useCounter

```typescript
const { count, start, hasStarted } = useCounter(targetNumber, {
  duration: 2000,
  startOnView: true,
});
```

## Performance Optimizations

### 1. **Reduced Motion Support**

- Respects `prefers-reduced-motion`
- Disables animations untuk users yang prefer reduced motion

### 2. **GPU Acceleration**

- Uses `transform` dan `opacity` untuk smooth animations
- Hardware-accelerated transitions

### 3. **Intersection Observer**

- Efficient scroll detection
- Only animates when elements are visible

### 4. **RequestAnimationFrame**

- Smooth counter animations
- 60fps performance

## Animation Timing

### Durations

- **Fast**: 0.2s - 0.3s (hover effects)
- **Normal**: 0.5s - 0.8s (entrance animations)
- **Slow**: 1s - 1.5s (hero section)

### Easing Functions

- **ease-out**: Most common (smooth deceleration)
- **cubic-bezier(0.4, 0, 0.2, 1)**: Material design easing
- **ease-in-out**: Smooth start and end

### Delays

- **Stagger**: 0.1s - 0.2s between items
- **Sequential**: 0.1s - 0.7s for hero elements

## Components dengan Animations

✅ **StatItem** - Animated counter dengan scroll reveal
✅ **ProjectCard** - Hover lift dengan glow
✅ **SkillBadge** - Scale in dengan hover effects
✅ **ExperienceItem** - Fade in dengan pulsing dot
✅ **Button** - Ripple effect dengan lift
✅ **Card** - Fade in dengan hover effects
✅ **Header** - Fade in down
✅ **Section** - Fade in dengan scroll reveal
✅ **Hero** - Stagger text animations

## CSS Classes Available

### Animation Classes

- `.animate-fade-in`
- `.animate-fade-in-up`
- `.animate-fade-in-down`
- `.animate-scale-in`
- `.animate-slide-in-right`
- `.animate-slide-in-left`
- `.animate-pulse`
- `.animate-glow`
- `.animate-float`
- `.animate-bounce-in`

### Utility Classes

- `.hover-lift` - Lift effect on hover
- `.hover-glow` - Glow effect on hover
- `.smooth-transition` - Smooth transitions
- `.text-gradient` - Animated gradient text
- `.scroll-reveal` - Scroll reveal animation

### Stagger Classes

- `.stagger-1` through `.stagger-5` - Sequential delays

## Best Practices

1. **Performance First**: Menggunakan transform dan opacity
2. **Accessibility**: Respects reduced motion preference
3. **Smooth**: Cubic-bezier easing untuk natural motion
4. **Subtle**: Animations tidak mengganggu konten
5. **Purposeful**: Setiap animation memiliki tujuan

## Status

✅ **Semua Efek Premium Implemented**

- Scroll animations ✅
- Hover effects ✅
- Counter animations ✅
- Stagger effects ✅
- Smooth transitions ✅
- Performance optimized ✅
- Accessibility compliant ✅

---

**Terakhir Diperbarui**: Sekarang
**Status**: ✅ **ANIMATIONS & EFFECTS COMPLETE**
