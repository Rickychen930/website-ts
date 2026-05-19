# Coding Standards — website-ts

Standar penulisan kode untuk frontend React, backend Express, dan CSS. Mengacu pada **SOLID**, **OOP**, **KISS**, **DRY**, arsitektur **component-based** dan **method-based**.

---

## Prinsip umum

| Prinsip             | Arti di proyek ini                                                         |
| ------------------- | -------------------------------------------------------------------------- |
| **SOLID**           | Class/service satu tugas; extend via props/variant; depend on abstractions |
| **OOP**             | Domain model sebagai class (`ProfileModel`) dengan behavior                |
| **KISS**            | Solusi paling sederhana yang benar; hindari abstraction prematur           |
| **DRY**             | Ekstrak setelah pola muncul 2×; jangan helper satu baris                   |
| **Component-based** | UI = komponen kecil yang composable                                        |
| **Method-based**    | Logika di method class/service, bukan di event handler 200 baris           |

---

## TypeScript

### Konfigurasi

- `strict: true` di `tsconfig.json`
- Path alias: `@/` → `src/`
- Hindari `any`; gunakan `unknown` + type guard jika perlu
- Hindari `as any` kecuali interoperabilitas sementara (document TODO)

### Penamaan

| Jenis             | Konvensi       | Contoh                              |
| ----------------- | -------------- | ----------------------------------- |
| File komponen     | PascalCase     | `ProjectCard.tsx`                   |
| File util/service | camelCase      | `dateUtils.ts`, `ProfileService.ts` |
| Interface / type  | PascalCase     | `Profile`, `ButtonProps`            |
| Class             | PascalCase     | `ProfileModel`, `ProfileController` |
| Konstanta         | UPPER_SNAKE    | `CACHE_DURATION`, `MAX_RETRIES`     |
| CSS module class  | kebab atau BEM | `button--primary`                   |

### Types & domain

- Semua entitas profil di `src/types/domain.ts`
- Model implement interface domain: `export class ProfileModel implements Profile`
- `readonly` + `Object.freeze` untuk array di constructor model

```typescript
// ✅ Factory + immutable
public static create(data: Profile): ProfileModel {
  return new ProfileModel(data);
}

// ✅ Domain method
public getFeaturedProjects(count: number): readonly Project[] {
  return this.projects.filter((p) => p.featured).slice(0, count);
}
```

---

## Arsitektur frontend (MVC)

### Lapisan

```
View (React)  →  Controller  →  Service  →  API / Cache
                      ↓
                   Model (domain)
```

### Aturan per lapisan

**Views / Pages**

- Hanya rendering, hooks untuk lifecycle, pemanggilan controller/context
- Tidak fetch `fetch()` langsung di komponen domain UI
- Maksimal ~150 baris; pecah sub-komponen jika lebih

**Controllers** (`src/controllers/`)

- Orchestration: memanggil service, expose method untuk view
- Constructor injection untuk service
- Tidak import React

```typescript
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  public async loadProfile(): Promise<ProfileModel> {
    return this.profileService.fetchProfile();
  }
}
```

**Services** (`src/services/`)

- HTTP, cache, retry, mapping ke `ProfileModel.create()`
- Tidak tahu tentang JSX/DOM

**Models** (`src/models/`)

- Data + perilaku domain
- Tidak ada side effect network

**Contexts** (`src/contexts/`)

- State global (theme, profile, admin auth)
- Provider tipis; logika berat tetap di service

---

## React components

### Struktur file

```
Button/
├── index.ts          # export { Button } from './Button'
├── Button.tsx
└── Button.module.css
```

### Pola komponen

```typescript
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classNames} {...props} />;
};
```

### Rules

- Functional components + hooks (tidak class component kecuali ErrorBoundary jika ada)
- Default props via destructuring default values
- Spread `...props` ke elemen native untuk a11y (`aria-*`, `onClick`)
- `key` stabil pada list (id, bukan index jika data berubah)
- Lazy load pages: `React.lazy(() => import('./Home'))`

### Hooks

- Prefix `use` — `useActiveSection`, `useTheme`
- Custom hook jika logic dipakai ≥ 2 komponen
- Dependency array `useEffect` lengkap; jangan disable eslint tanpa alasan

---

## CSS & styling

### Wajib

1. **CSS Modules** per komponen: `Component.module.css`
2. **Token only** dari `src/styles/design-tokens.css`
3. Urutan properti mengikuti Stylelint (`display` → `position` → … → `transition`)
4. Responsive: `@media (width <= 768px)` (sintaks modern)

### Dilarang di `*.module.css`

- Hex/rgb literal untuk warna tema
- Magic numbers untuk spacing (kecuali `1px` hairline border jika diperlukan)
- `!important` kecuali utility a11y/global

### Global styles

| File                      | Isi                   |
| ------------------------- | --------------------- |
| `design-tokens.css`       | Semua variabel        |
| `base.css`                | Reset, body, headings |
| `layout-system.css`       | Container, utilities  |
| `accessibility.css`       | Focus, skip, contrast |
| `mobile-enhancements.css` | Touch, mobile tweaks  |

---

## Backend (Express)

### Struktur

```
routes → middleware → controller → model (Mongoose)
```

### Controller

- Satu class per resource domain
- Method async; `try/catch`; status HTTP eksplisit
- Tidak embed query kompleks di route file — panggil model/static

### Validasi & keamanan

- `express-validator` di route atau middleware
- `sanitizeInput` untuk XSS
- `helmet`, `cors`, rate limit pada endpoint publik
- Jangan log secrets / full `MONGODB_URI`

### Response

```typescript
// ✅ Konsisten
res.status(200).json({ data: profile });
res.status(404).json({ error: "Not found", message: "Profile not found" });
res.status(503).json({ error: "Database not connected", message: "…" });
```

---

## SOLID — contoh konkret

### Single Responsibility

```typescript
// ✅ ProfileService hanya urusan profile + cache
// ✅ ContactService hanya contact form
// ❌ Satu "ApiService" raksasa untuk semua endpoint
```

### Open/Closed

```typescript
// ✅ Tambah variant button tanpa ubah struktur DOM inti
variant?: "primary" | "secondary" | "outline" | "ghost";
```

### Dependency Inversion

```typescript
// ✅ Controller terima service (testable)
constructor(profileService: ProfileService) {
  this.profileService = profileService;
}
```

---

## Error handling

| Layer           | Pola                                           |
| --------------- | ---------------------------------------------- |
| Service         | Throw atau return Result; retry dengan backoff |
| Controller (FE) | Propagate ke context; tampilkan error UI       |
| Controller (BE) | `catch` → log + JSON error                     |
| React           | Error Boundary untuk subtree kritis            |
| User            | Pesan manusiawi, bukan stack trace             |

---

## Testing

- Framework: Jest + React Testing Library
- File: `*.test.tsx` / `__tests__/`
- Coverage threshold global: **70%** (branches, functions, lines, statements)
- Test perilaku user (`getByRole`, `userEvent`), bukan implementasi internal
- Mock service/API, bukan seluruh React tree jika tidak perlu

```typescript
it("renders primary button", () => {
  render(<Button variant="primary">Submit</Button>);
  expect(screen.getByRole("button", { name: /submit/i })).toBeEnabled();
});
```

---

## Lint & format

```bash
npm run lint          # ESLint src — max-warnings 0
npm run lint:fix
npm run css:check     # CSS architecture
```

- ESLint: `react-app` + TypeScript eslint
- Stylelint: `stylelint-config-standard` + property order plugin
- Prettier tersedia di devDependencies — format sebelum commit
- Husky + lint-staged pada pre-commit (jika dikonfigurasi)

---

## Git & commit

- Pesan commit: imperative, fokus **why** (`fix: prevent profile cache stale after admin update`)
- Jangan commit `.env`, credentials, `backend/logs/`
- Scope kecil per PR; satu concern utama

---

## Import order

1. React / library eksternal
2. `@/` alias (types, services, components)
3. Relative (`./Button.module.css`)

```typescript
import React from "react";
import { ProfileService } from "@/services/ProfileService";
import styles from "./Card.module.css";
```

---

## Komentar

- JSDoc singkat di class public dan export utama
- Tidak komentar yang mengulang kode (`// set theme to dark`)
- Komentar untuk: business rule non-obvious, workaround, batasan API

---

## Checklist PR / review

### Fungsional

- [ ] Perilaku sesuai requirement; edge case kosong ditangani
- [ ] Tidak regress a11y (keyboard, screen reader labels)

### Arsitektur

- [ ] Logika bisnis tidak di JSX
- [ ] Tidak duplikasi fetch/transform
- [ ] Tipe domain dipakai, bukan struktur ad-hoc

### UI

- [ ] Hanya design tokens di CSS baru
- [ ] Responsif di 375px, 768px, 1280px
- [ ] `prefers-reduced-motion` dihormati untuk animasi baru

### Keamanan

- [ ] Input disanitize (backend)
- [ ] Tidak expose secret di client bundle

### Kualitas

- [ ] `npm run lint` lulus
- [ ] Test ditambah/diperbarui jika logic kritis berubah

---

## Anti-patterns

| Anti-pattern                     | Alternatif                      |
| -------------------------------- | ------------------------------- |
| God component 500+ baris         | Pecah page + domain components  |
| `useEffect` fetch di setiap card | Fetch sekali di page/context    |
| Prop drilling 5 level            | Context atau composition        |
| Copy-paste CSS grid              | Shared layout class / `Section` |
| `console.log` di production path | Logger terstruktur / hapus      |
| Index as key pada sortable list  | Stable `id`                     |

---

## Referensi cepat

| Topik               | File                                   |
| ------------------- | -------------------------------------- |
| Proyek & arsitektur | [project.md](./project.md)             |
| Token & UI          | [design-system.md](./design-system.md) |
| AI context          | [CLAUDE.md](./CLAUDE.md)               |

---

_Standar ini mengikat kontributor manusia dan AI — jika ragu, utamakan konsistensi dengan kode terdekat di folder yang sama._
