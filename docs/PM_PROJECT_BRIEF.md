# PM – Project Brief: Website Portfolio (Website-TS)

**Versi:** 1.0  
**Tanggal:** 2025  
**Status:** Living document

---

## 1. Vision & Tujuan

### Vision

Menjadi portfolio profesional yang mewakili kemampuan teknis dan pengalaman pemilik (Software Engineer & AI Researcher), mudah diakses, dapat dirawat via admin, serta memenuhi standar aksesibilitas dan performa.

### Tujuan Bisnis

- **Personal branding**: Menampilkan keahlian, proyek, dan testimonial dengan kredibel.
- **Lead generation**: Memudahkan recruiter/klien menghubungi lewat contact form dan link.
- **Operasional**: Konten dapat diubah lewat admin dashboard tanpa deploy ulang.

### Tujuan Pengguna

- **Recruiter/HR**: Cepat menemukan pengalaman, skill, dan proyek yang relevan.
- **Klien/Partner**: Memahami profil dan cara menghubungi.
- **Pemilik situs**: Mengelola konten (CRUD) dan melihat pesan kontak dengan aman.

---

## 2. Stakeholder

| Stakeholder       | Peran                  | Kebutuhan utama                         |
| ----------------- | ---------------------- | --------------------------------------- |
| Pemilik portfolio | Product owner, admin   | Update konten, lihat pesan, branding    |
| Pengunjung        | Recruiter, klien, umum | Info jelas, kontak mudah, performa baik |
| Developer         | Maintenance & evolusi  | Codebase rapi, dokumentasi, testing     |

---

## 3. Scope

### In scope (Fase ini)

- **Publik**: Home, About, Projects, Experience, Contact, Privacy, Terms.
- **Admin**: Login (secret), dashboard overview, CRUD profile/projects/experience/skills/testimonials/stats/academics/certifications/honors/contacts, daftar & hapus pesan kontak.
- **Teknis**: Sinkronisasi data (refetch setelah admin save), design system konsisten, aksesibilitas (WCAG 2.1 AA), responsive, dark mode.
- **Dokumentasi**: PM, Design, sync data & types, admin, deployment.

### Out of scope (Saat ini)

- Blog atau CMS artikel.
- Multi-user atau multi-portfolio.
- Pembayaran/booking.
- Aplikasi mobile native.

---

## 4. Requirements

### 4.1 Functional

| ID  | Requirement                                                              | Prioritas | Status |
| --- | ------------------------------------------------------------------------ | --------- | ------ |
| F1  | Menampilkan profil (nama, title, lokasi, bio)                            | Must      | Done   |
| F2  | Menampilkan daftar proyek dengan filter kategori                         | Must      | Done   |
| F3  | Menampilkan pengalaman kerja (timeline)                                  | Must      | Done   |
| F4  | Menampilkan skills (teknis & soft), pendidikan, sertifikasi, penghargaan | Must      | Done   |
| F5  | Form kontak + pengiriman ke backend                                      | Must      | Done   |
| F6  | Admin: login dengan secret                                               | Must      | Done   |
| F7  | Admin: CRUD semua section konten + simpan ke API                         | Must      | Done   |
| F8  | Admin: daftar pesan kontak + hapus                                       | Must      | Done   |
| F9  | Setelah admin save, data publik ter-update (refetch)                     | Must      | Done   |
| F10 | SEO: meta tags, structured data, sitemap                                 | Should    | Done   |
| F11 | Pencarian dalam situs (projects, experience, dll.)                       | Should    | Done   |
| F12 | Download resume/CV (link/PDF)                                            | Should    | Done   |

### 4.2 Non-Functional

| ID  | Requirement            | Target / Kriteria                              |
| --- | ---------------------- | ---------------------------------------------- |
| NF1 | Performance (LCP)      | LCP &lt; 2.5s (desktop/mobile)                 |
| NF2 | Accessibility          | WCAG 2.1 AA (focus, contrast, touch targets)   |
| NF3 | Responsive             | Mobile-first, breakpoints 640/768/1024         |
| NF4 | Security               | HTTPS, env secrets, rate limit, sanitize input |
| NF5 | Availability (backend) | Health check, graceful shutdown                |
| NF6 | Maintainability        | TypeScript, design tokens, docs                |

---

## 5. Success Criteria

- **Kualitas**: Build sukses, tidak ada critical lint/type errors, critical path (navigasi + contact + admin save) berjalan.
- **Data**: Perubahan di admin langsung tercermin di halaman publik setelah save (refetch).
- **Dokumentasi**: PM dan Design terdokumentasi; developer baru dapat mengikuti docs untuk setup dan kontribusi.

---

## 6. Risks & Mitigasi

| Risk                    | Impact | Mitigasi                                          |
| ----------------------- | ------ | ------------------------------------------------- |
| Backend/DB down         | High   | Fallback data (dev), error state UI, health check |
| Admin secret bocor      | High   | Secret di env only, HTTPS, rate limit             |
| Cache lama setelah edit | Medium | refetch() setelah admin save (implemented)        |
| Breaking change API     | Medium | Domain types sync doc, versioning jika perlu      |

---

## 7. Deliverables (Fase ini)

- [x] PM Project Brief (dokumen ini)
- [x] Design Phase document (IA, flows, prioritas)
- [x] Implementasi perbaikan prioritas (dari Design)
- [x] Admin dashboard + CRUD + sync
- [x] Dokumentasi sync data & types

---

## 8. Referensi

- `docs/FEATURES_CHECKLIST.md` – Fitur yang sudah ada
- `docs/SYNC_DATA_AND_TYPES.md` – Alur data dan sinkronisasi
- `docs/ADMIN_DASHBOARD.md` – Cara pakai admin
- `DESIGN_SYSTEM_SYNC.md` – Design tokens dan konsistensi
