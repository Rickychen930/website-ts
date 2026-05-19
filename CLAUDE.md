# CLAUDE.md — Panduan untuk AI Assistant

Konteks proyek untuk Claude / Cursor saat mengedit **website-ts**. Baca ini sebelum mengubah kode.

---

## Apa proyek ini?

Portfolio fullstack **TypeScript**: React 19 (port 3000) + Express 5 + MongoDB (port 4000). Arsitektur **MVC + Clean Architecture**, UI **component-based**, styling **token-driven** (tema **Signal**).

**Owner content:** Ricky Chen — fullstack / AI engineer, Sydney.

---

## Perintah penting

```bash
npm run dev              # FE + BE bersamaan
npm run lint             # ESLint src (max-warnings 0)
npm run test:ci          # Jest + coverage
npm run build:all        # Production FE + BE
npm run seed             # Seed MongoDB
npm run css:check        # Cek hardcoded CSS
```

Environment: salin `config/env.example` → `.env` (jangan commit `.env`).

---

## Struktur mental

```
src/views/pages/     → halaman (compose sections)
src/views/components/ui/       → atom (Button, Card, Typography)
src/views/components/layout/   → Section, Header, Footer
src/views/components/domain/   → ProjectCard, ExperienceItem, …
src/components/      → shared non-MVC (effects, a11y widgets)
src/controllers/     → orchestration (NO React)
src/services/        → API, cache, retry
src/models/          → ProfileModel (immutable domain class)
src/types/domain.ts  → semua tipe profil
backend/src/         → Express MVC mirror
```

**Alias import:** `@/` = `src/`

---

## Aturan WAJIB

### 1. Design tokens

- **Single source:** `src/styles/design-tokens.css`
- Di `*.module.css`: **hanya** `var(--…)` untuk warna, spacing, radius, shadow, font
- **Jangan** menambah hex/rgb untuk tema di komponen
- Dark mode: class `.dark` — jangan duplikasi palet di komponen

### 2. Arsitektur

- **Jangan** fetch API di komponen domain/UI atom
- **Jangan** logika bisnis berat di JSX — gunakan Service / Model method / Controller
- **DRY:** reuse `Section`, `Button`, `Card`, utils yang ada
- **KISS:** perubahan minimal; ikuti pola file tetangga

### 3. React

- Functional components + TypeScript props interface
- CSS Modules: `import styles from './X.module.css'`
- Pages: lazy load jika menambah route baru (ikuti pola `routes/`)
- A11y: semantic HTML, `aria-*`, focus visible, touch ≥ 44px mobile

### 4. Backend

- Controller tipis → model Mongoose
- Validasi + sanitize input
- Jangan bocorkan secrets di response/log

### 5. Git

- **Jangan commit** kecuali user minta eksplisit
- **Jangan** amend/push force tanpa permintaan
- Jangan ubah `git config`

---

## SOLID singkat

| Huruf | Lakukan                                               |
| ----- | ----------------------------------------------------- |
| S     | Service/Controller/Component satu tanggung jawab      |
| O     | Extend via props (`variant`, `size`) bukan copy-paste |
| L     | Props extends native HTML attributes                  |
| I     | Tipe kecil di `domain.ts`, bukan satu blob            |
| D     | Inject service ke controller                          |

---

## Menambah fitur — urutan

1. Baca komponen/service serupa di folder sama
2. Tambah types di `types/domain.ts` jika perlu
3. Backend: model → controller → route (jika data baru)
4. Frontend: service → model method → controller/context → UI
5. CSS dengan token + responsive `@media (width <= 768px)`
6. `npm run lint` ; test jika logic kritis

---

## File kunci

| File                                   | Fungsi                           |
| -------------------------------------- | -------------------------------- |
| `src/styles/design-tokens.css`         | Semua CSS variables              |
| `src/services/ProfileService.ts`       | Fetch profile + cache + fallback |
| `src/models/ProfileModel.ts`           | Domain class immutable           |
| `src/controllers/ProfileController.ts` | FE orchestration                 |
| `src/contexts/ThemeContext.tsx`        | Light/dark toggle                |
| `src/routes/`                          | React Router + lazy pages        |
| `backend/src/main.ts`                  | Express entry                    |

---

## Responsive

- Mobile-first; breakpoint umum **768px** dan **640px**
- Lihat `src/styles/layout-system.css`, `mobile-enhancements.css`
- Hormati `prefers-reduced-motion` untuk animasi baru

---

## Dokumentasi manusia

- [project.md](./project.md) — overview & arsitektur
- [design-system.md](./design-system.md) — token & komponen
- [coding-standard.md](./coding-standard.md) — standar kode lengkap
- [docs/](./docs/) — deploy, audit, changelog

---

## Hal yang sering salah (hindari)

1. Mengacu `src/config/design-tokens.ts` — **tidak ada**; pakai `design-tokens.css`
2. Hardcode warna di CSS module baru
3. God component dengan fetch + transform + render
4. Membuat helper abstraction untuk satu pemakaian
5. Menambah dependency berat tanpa persetujuan user
6. Commit `.env` atau secrets

---

## Bahasa

- Kode & identifier: **English**
- Komentar: English singkat
- Respons ke user: ikuti bahasa user (Indonesia / English)

---

## Scope perubahan

- Hanya edit file yang relevan dengan task
- Jangan refactor luas tanpa diminta
- Jangan buat doc baru di `docs/` kecuali diminta (kecuali 4 file root ini)

---

_Update file ini jika arsitektur atau SOT token berubah._
