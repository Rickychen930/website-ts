# Components Directory

Folder ini berisi semua React components yang digunakan dalam aplikasi, diorganisir berdasarkan kategori dan fungsi.

## 📁 Struktur Folder

```
components/
├── common/              # Reusable UI components
│   ├── button-component.tsx
│   ├── card-component.tsx
│   ├── image-component.tsx
│   ├── input-field-component.tsx
│   ├── label-component.tsx
│   ├── flow-item-component.tsx
│   ├── tech-showcase-component.tsx
│   └── index.ts
│
├── ui/                  # UI components (loading, error, navigation)
│   ├── loading-component.tsx
│   ├── loading-skeleton.tsx
│   ├── error-boundary.tsx
│   ├── error-component.tsx
│   ├── back-to-top-button.tsx
│   └── index.ts
│
├── profile/             # Profile-related components
│   ├── profile-action-component.tsx
│   ├── profile-stat-component.tsx
│   └── index.ts
│
├── navbar/             # Navigation bar components
│   ├── navbar-component.tsx
│   ├── NavbarContainer.tsx
│   ├── NavbarBrand.tsx
│   ├── NavbarLinks.tsx
│   ├── NavbarMobileMenu.tsx
│   ├── utils/
│   └── index.ts
│
├── footer/             # Footer components
│   ├── main-page-footer-component.tsx
│   ├── FooterQuickLinks.tsx
│   ├── FooterSocialLinks.tsx
│   ├── FooterTechStack.tsx
│   ├── FooterCopyright.tsx
│   ├── FooterStats.tsx
│   ├── FooterCodeSnippet.tsx
│   └── index.ts
│
├── about-me/           # About Me section components
├── academic/           # Academic section components
├── certification/      # Certification section components
├── contact/            # Contact section components
├── honors/             # Honors section components
├── languages/          # Languages section components
├── projects/           # Projects section components
├── soft-skills/       # Soft skills section components
├── technical-skills/   # Technical skills section components
├── testimonials/      # Testimonials & Recommendations section components
└── work-experience/    # Work experience section components
```

## 📦 Kategori Components

### Common Components (`common/`)

Reusable UI components yang digunakan di berbagai bagian aplikasi:

- **Button** - Button component dengan berbagai variant
- **Card** - Card container component
- **Image** - Optimized image component
- **InputField** - Form input field component
- **Label** - Form label component
- **FlowItem** - Animated flow item component
- **TechShowcase** - Technical skills showcase component

### UI Components (`ui/`)

User interface components untuk loading, errors, dan navigation:

- **LoadingComponent** - Loading indicator component
- **LoadingSkeleton** - Skeleton loading component
- **ErrorBoundary** - React error boundary component
- **ErrorComponent** - Error display component
- **BackToTopButton** - Scroll to top button component

### Profile Components (`profile/`)

Components terkait dengan display user profile:

- **ProfileAction** - Profile action button component
- **ProfileStat** - Profile statistics display component

### Section Components

Components khusus untuk setiap section:

- **about-me/** - About Me section components
- **academic/** - Academic section components
- **certification/** - Certification section components
- **contact/** - Contact section components
- **honors/** - Honors section components
- **languages/** - Languages section components
- **projects/** - Projects section components
- **soft-skills/** - Soft skills section components
- **technical-skills/** - Technical skills section components
- **testimonials/** - Testimonials & Recommendations section components
- **work-experience/** - Work experience section components

## 🔧 Usage

### Import dari Common Components

```typescript
import { Card, Button, Image } from "../components/common";
```

### Import dari UI Components

```typescript
import { LoadingComponent, ErrorBoundary } from "../components/ui";
```

### Import dari Profile Components

```typescript
import { ProfileStat, ProfileAction } from "../components/profile";
```

### Import dari Navbar

```typescript
import Navbar from "../components/navbar";
// atau
import { NavbarContainer, NavbarBrand } from "../components/navbar";
```

### Import dari Footer

```typescript
import { MainPageFooterComponent } from "../components/footer";
```

## 📝 Best Practices

1. **Barrel Exports**: Setiap folder memiliki `index.ts` untuk centralized exports
2. **Component Organization**: Components dikelompokkan berdasarkan fungsi dan reusability
3. **Naming Convention**:
   - Component files: `kebab-case.tsx`
   - Component names: `PascalCase`
4. **CSS Organization**: CSS files disimpan di `src/assets/css/` atau bersama component jika spesifik
