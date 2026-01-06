# Source Code Structure

Dokumen ini menjelaskan struktur lengkap folder `src/` setelah refactoring.

## 📁 Struktur Direktori

```
src/
├── App.tsx                    # Root React component
├── index.tsx                  # Application entry point
├── index.css                  # Global styles
├── react-app-env.d.ts        # TypeScript declarations
│
├── assets/
│   └── css/                   # Stylesheets
│       ├── tokens.css         # Design tokens (CSS variables)
│       ├── main-page.css      # Main page styles
│       ├── navbar.css         # Navbar styles
│       ├── card.css           # Card component styles
│       ├── flow-item.css      # Flow item styles
│       ├── back-to-top-button.css
│       ├── error-boundary.css
│       ├── loading-skeleton.css
│       ├── tech-showcase.css
│       ├── footer-section.css
│       ├── about-me-components.css
│       ├── about-me-section.css
│       ├── academic-section.css
│       ├── certification-section.css
│       ├── contact-section.css
│       ├── honors-section.css
│       ├── languages-section.css
│       ├── projects-section.css
│       ├── soft-skills-section.css
│       ├── technical-skills-section.css
│       └── work-experience-section.css
│
├── config/
│   └── main-page-config.ts    # Main page configuration
│
├── controllers/               # MVC Controllers
│   ├── about-me-controller.ts
│   ├── academic-controller.ts
│   ├── certification-controller.ts
│   ├── contact-controller.ts
│   ├── footer-controller.ts
│   ├── honors-controller.ts
│   ├── language-controller.ts
│   ├── main-page-controller.ts
│   ├── navbar-controller.ts
│   ├── project-controller.ts
│   ├── soft-skills-controller.ts
│   ├── technical-skills-controller.ts
│   └── work-experience-controller.ts
│
├── models/                    # MVC Models
│   ├── about-me-model.ts
│   ├── academic-model.ts
│   ├── certification-model.ts
│   ├── contact-model.ts
│   ├── footer-model.ts
│   ├── honors-model.ts
│   ├── language-model.ts
│   ├── project-model.ts
│   ├── section-model.ts
│   ├── soft-skills-model.ts
│   ├── technical-skills-model.ts
│   └── work-experience-model.ts
│
├── routes/
│   └── app-routes.tsx         # React Router configuration
│
├── services/                  # API Services
│   ├── api.ts                 # API client
│   └── user-service.ts        # User service
│
├── types/                     # TypeScript Type Definitions
│   ├── navbar.ts
│   ├── ui.ts
│   └── user.ts
│
├── utils/                     # Utility Functions
│   ├── scroll-observer-manager.ts
│   └── smooth-scroll-manager.ts
│
└── views/                     # View Layer (React Components)
    ├── components/            # Reusable Components
    │   ├── common/           # ✅ Common UI components
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── flow-item.tsx
    │   │   ├── image.tsx
    │   │   ├── input-field.tsx
    │   │   ├── label.tsx
    │   │   ├── tech-showcase.tsx
    │   │   └── index.ts
    │   │
    │   ├── ui/               # ✅ UI components
    │   │   ├── back-to-top-button.tsx
    │   │   ├── error-boundary.tsx
    │   │   ├── error.tsx
    │   │   ├── loading.tsx
    │   │   ├── loading-skeleton.tsx
    │   │   └── index.ts
    │   │
    │   ├── profile/          # ✅ Profile components
    │   │   ├── profile-action.tsx
    │   │   ├── profile-stat.tsx
    │   │   └── index.ts
    │   │
    │   ├── navbar/           # Navigation components
    │   │   ├── Navbar.tsx
    │   │   ├── NavbarContainer.tsx
    │   │   ├── NavbarBrand.tsx
    │   │   ├── NavbarLinks.tsx
    │   │   ├── NavbarMobileMenu.tsx
    │   │   ├── NavbarToggle.tsx
    │   │   ├── NavbarBackdrop.tsx
    │   │   ├── NavbarLink.tsx
    │   │   ├── utils/
    │   │   └── index.ts
    │   │
    │   ├── footer/           # Footer components
    │   │   ├── MainPageFooter.tsx
    │   │   ├── FooterQuickLinks.tsx
    │   │   ├── FooterSocialLinks.tsx
    │   │   ├── FooterTechStack.tsx
    │   │   ├── FooterCopyright.tsx
    │   │   ├── FooterStats.tsx
    │   │   ├── FooterCodeSnippet.tsx
    │   │   └── index.ts
    │   │
    │   ├── about-me/         # About Me section components
    │   ├── academic/         # Academic section components
    │   ├── certification/    # Certification section components
    │   ├── contact/          # Contact section components
    │   ├── honors/           # Honors section components
    │   ├── languages/        # Languages section components
    │   ├── projects/         # Projects section components
    │   ├── soft-skills/      # Soft skills section components
    │   ├── technical-skills/ # Technical skills section components
    │   └── work-experience/  # Work experience section components
    │
    └── pages/                # Page Components
        ├── base-page.tsx     # Base page class
        ├── main-page.tsx     # Main page component
        └── sections/         # Page sections
            ├── about-me-section.tsx
            ├── academic-section.tsx
            ├── certifications-section.tsx
            ├── contact-section.tsx
            ├── honors-section.tsx
            ├── languages-section.tsx
            ├── projects-section.tsx
            ├── soft-skills-section.tsx
            ├── technical-skills-section.tsx
            └── work-experience-section.tsx
```

## 📝 Naming Conventions

### File Names
- **kebab-case** untuk semua file TypeScript/TSX
- Tanpa suffix `-component` (sudah jelas dari konteks folder)
- Contoh: `button.tsx`, `card.tsx`, `loading.tsx`

### Component Exports
- **PascalCase** untuk component names
- Contoh: `Button`, `Card`, `LoadingComponent`

### Folder Names
- **kebab-case** untuk semua folder
- Contoh: `common/`, `ui/`, `profile/`

### CSS Files
- **kebab-case** untuk CSS files
- Tanpa suffix `-component` untuk component styles
- Contoh: `card.css`, `flow-item.css`, `navbar.css`

## 🔧 Import Patterns

### Barrel Exports
Setiap folder component memiliki `index.ts` untuk centralized exports:

```typescript
// Common components
import { Card, Button, Image } from "../components/common";

// UI components
import { LoadingComponent, ErrorBoundary } from "../components/ui";

// Profile components
import { ProfileStat, ProfileAction } from "../components/profile";
```

### Direct Imports
Untuk components yang tidak menggunakan barrel exports:

```typescript
// Navbar
import Navbar from "../components/navbar";

// Footer
import { MainPageFooterComponent } from "../components/footer";
```

## ✅ Best Practices

1. **Barrel Exports** - Gunakan `index.ts` untuk centralized exports
2. **Consistent Naming** - Ikuti konvensi naming yang sudah ditetapkan
3. **Logical Grouping** - Components dikelompokkan berdasarkan fungsi
4. **Clean Imports** - Gunakan barrel exports untuk import yang lebih bersih
5. **Clear Structure** - Struktur yang mudah dinavigasi dan dirawat

