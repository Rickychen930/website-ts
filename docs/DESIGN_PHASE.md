# Design Phase – Website Portfolio

**Versi:** 1.0  
**Mengacu pada:** PM_PROJECT_BRIEF.md

---

## 1. Information Architecture (IA)

### 1.1 Sitemap (Publik)

```
/ (Home)
├── Hero + featured projects + stats + testimonials + current role
├── /about       → Bio, skills, education, certifications, honors
├── /projects    → All projects, filter by category
├── /experience  → Work experience timeline
├── /contact     → Contact form + contact info
├── /privacy     → Privacy policy
└── /terms       → Terms of use
```

### 1.2 Sitemap (Admin)

```
/admin
├── /admin/login
└── /admin/* (setelah login)
    ├── /admin/dashboard   → Overview stats
    ├── /admin/profile    → Edit name, title, location, bio
    ├── /admin/projects   → CRUD projects
    ├── /admin/experience → CRUD experience
    ├── /admin/skills     → CRUD technical & soft skills
    ├── /admin/testimonials
    ├── /admin/stats
    ├── /admin/academics
    ├── /admin/certifications
    ├── /admin/honors
    ├── /admin/contacts   → Contact info (email, links)
    └── /admin/messages   → Contact form submissions (read/delete)
```

### 1.3 Content Hierarchy (per halaman)

- **Home**: Satu hero (nama, title, CTA) → Featured projects → Stats → Testimonials → Current role.
- **About**: Satu intro → Skills (teknis lalu soft) → Education → Certifications → Honors (optional languages).
- **Projects**: Filter → Grid cards (title, category, dates, links).
- **Experience**: Timeline vertikal (company, role, dates, deskripsi).
- **Contact**: Form (name, email, message) + info kontak + social links.

---

## 2. User Flows

### 2.1 Pengunjung – “Melihat profil dan menghubungi”

1. Land di **Home** (atau deep link).
2. Scan hero + featured projects.
3. (Opsional) **About** untuk skill & pendidikan.
4. (Opsional) **Projects** / **Experience** untuk detail.
5. **Contact** → isi form → submit → konfirmasi sukses.

### 2.2 Admin – “Update konten”

1. Buka **/admin** → redirect ke **/admin/login**.
2. Masukkan **Admin secret** → login.
3. Pilih section di sidebar (e.g. **Projects**).
4. Add/Edit/Delete item → **Save all**.
5. (Otomatis) refetch → data publik ter-update.
6. Log out atau tutup.

### 2.3 Pengunjung – “Mencari sesuatu”

1. Klik ikon **Search** (header, desktop).
2. Ketik kata kunci → hasil: projects, experience, skills, dll.
3. Klik hasil → navigasi ke halaman terkait.

---

## 3. Design Principles (sudah dipakai)

- **Consistency**: Design tokens (warna, spacing, typography, shadow) dipakai di semua komponen.
- **Accessibility**: Focus visible, contrast, touch target ≥44px, reduced motion, semantic HTML.
- **Responsive**: Mobile-first, breakpoints jelas.
- **Performance**: Lazy route, cache API, asset wajar.

---

## 4. Prioritas Perbaikan (untuk Implementasi)

Berdasarkan PM (success criteria, NFR) dan best practice:

| Prioritas | Item                                                | Kategori | Deskripsi singkat                                                                    |
| --------- | --------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| P0        | Pastikan semua halaman punya title & meta yang unik | SEO      | Setiap route set meta title/description (sudah ada useSEO; verifikasi tiap halaman). |
| P0        | Skip link & landmark                                | A11y     | Skip to main content, role="main", heading hierarchy (sudah; verifikasi).            |
| P1        | Error state yang konsisten                          | UX       | Halaman error/empty pakai komponen/pola yang sama.                                   |
| P1        | Loading state konsisten                             | UX       | Skeleton atau loading spinner seragam di list/cards.                                 |
| P1        | Form validation feedback                            | UX       | Contact form: error inline, aria-describedby (periksa sudah).                        |
| P2        | Performance: preload critical assets                | Perf     | Preload font/hero asset jika perlu (font sudah preload).                             |
| P2        | Print styles                                        | UX       | Print-friendly (hide nav/footer/background, tampilkan konten).                       |
| P2        | Breadcrumb atau “Back” di halaman dalam             | UX       | Opsional: link “Back to Projects” di detail konteks.                                 |
| P3        | Microcopy & empty states                            | UX       | Pesan jelas saat tidak ada projects/testimonials.                                    |
| P3        | Analytics & monitoring                              | Ops      | Event penting (contact submit, download CV) jika analytics dipakai.                  |

### Status implementasi prioritas

- **P0 (SEO)**: `useSEO` dipakai di Home, About, Projects, Experience, Contact, Privacy, Terms; tiap halaman punya title/description unik.
- **P0 (A11y)**: Skip link & landmark sudah; heading hierarchy diverifikasi.
- **P1 (Error/Loading)**: Komponen `PageError` dipakai seragam di semua halaman publik; retry memakai `refetch()`. Loading tetap pakai `Loading` fullScreen.
- **P1 (Form validation)**: Contact form punya `aria-describedby` untuk error inline.
- **P2 (Print)**: Header dan Footer punya `data-print="hide"`; komponen lain (BackToTop, ScrollProgress, ParticleBackground, CursorEffect) sudah hide saat print.
- **P2 (Back link)**: Komponen `BackToHome` dipakai di About, Projects, Experience, Contact (tautan "← Back to Home" di atas konten).
- **P3 (Microcopy & empty states)**: Empty state di Projects, Experience, dan About (skills) diperjelas dengan judul/id a11y (`aria-labelledby`), dan microcopy ramah pengguna (saran "explore other sections", "check back later", dll.).
- **P3 (Analytics & monitoring)**: Utilitas `src/utils/analytics.ts` menyediakan `trackPageView` dan `trackEvent`. Event `contact_submit` dan `download_resume` dipanggil saat form kontak sukses dan saat tombol download CV diklik. Saat GA/Plausible/custom dikonfigurasi, event akan terkirim.
- **BackToHome** juga dipakai di halaman Privacy dan Terms.

---

## 5. Acceptance Criteria (Design)

- [x] Setiap halaman publik punya judul dan meta description yang unik dan relevan.
- [x] Navigasi keyboard dan screen reader dapat mengakses semua area utama (skip link, landmarks).
- [x] Error dan empty state punya teks dan (jika ada) aksi yang jelas (PageError + Retry).
- [x] Setelah admin save, data yang tampil di publik sesuai dengan yang disimpan (refetch).
- [x] Design system (tokens) dipakai konsisten; tidak ada hardcoded warna/spacing di komponen baru.

---

## 6. Referensi

- `DESIGN_SYSTEM_SYNC.md` – Token dan konsistensi
- `docs/UI_UX_DESIGN_AUDIT_REPORT_FINAL.md` – Audit UI/UX
- `docs/QUICK_DESIGN_REFERENCE.md` – Referensi cepat
