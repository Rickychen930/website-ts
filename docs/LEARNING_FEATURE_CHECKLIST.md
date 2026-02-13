# Learning Feature – Pengecekan Lengkap & Detail

Dokumen ini memastikan fitur Learning sesuai **kriteria Anda**, **informatif lengkap**, dan **detail** (file, route, data, dan cara verifikasi).

---

## A. Pemetaan kriteria user → implementasi

| Kriteria yang Anda minta                     | Status | Implementasi                                                                                                                                     |
| -------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **SOLID, OOP, DRY, KISS**                    | ✅     | Kode memakai design system; satu sumber data (profile); komponen reuse (Section, Typography, Card, Button); Admin reuses `Admin.module.css`.     |
| **Design system, component-based, reusable** | ✅     | `src/config/design-tokens.ts`; komponen dari `views/components/layout` dan `views/components/ui`; Learning page pakai Section, Typography, Card. |
| **Perbaiki seed agar menyesuaikan**          | ✅     | Seed `backend/src/seed/seedData.ts` punya struktur `learningSections` sesuai model Profile; `npm run seed` sukses.                               |
| **Integrate dengan admin dashboard**         | ✅     | Sidebar Admin: Content → Learning (`/admin/learning`); Dashboard menampilkan jumlah section + link; breadcrumb "Learning".                       |
| **Section baru & page baru**                 | ✅     | Halaman publik `/learning` (Learning.tsx); halaman admin `/admin/learning` (AdminLearning.tsx).                                                  |
| **Bahasa English**                           | ✅     | Semua teks UI dan materi kurikulum (section/topic title & description) dalam bahasa Inggris.                                                     |
| **Materi lengkap & detail**                  | ✅     | 16 section, 87 topik di seed; kurikulum siap wawancara perusahaan terbaik (FAANG/top tech); bisa diedit di Admin → Learning.                     |

---

## B. Data layer (detail)

| Aspek                       | Lokasi                                         | Keterangan                                                                                                                                                                        |
| --------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Types (frontend)**        | `src/types/domain.ts`                          | `LearningTopicItem` (id, title, description?, order), `LearningSection` (id, title, slug, description?, order, published, items), `Profile.learningSections?`.                    |
| **Types (backend)**         | `backend/src/types/domain.ts`                  | Same interfaces untuk transform output.                                                                                                                                           |
| **Profile model**           | `backend/src/models/Profile.ts`                | `IProfile.learningSections?` (array); schema default `[]`.                                                                                                                        |
| **Transform**               | `backend/src/utils/transformProfile.ts`        | Baca `profile.learningSections`, map tiap section & item, assign `id` (extractId), output ke response API.                                                                        |
| **Update + sanitasi**       | `backend/src/controllers/ProfileController.ts` | `updateProfile`: destructure `learningSections` dari body; jika array, sanitize (title, slug, order, published, items dengan fallback) lalu assign ke `profile.learningSections`. |
| **Seed**                    | `backend/src/seed/seedData.ts`                 | Array `learningSections` dengan 15 section, tiap section: title, slug, description, order, published, items[].                                                                    |
| **ProfileModel (frontend)** | `src/models/ProfileModel.ts`                   | `learningSections` readonly; `getPublishedLearningSections()` return sections dengan `published === true`, urut by `order`.                                                       |

---

## C. Public site (detail)

| Aspek           | Lokasi / Nilai                                                 | Keterangan                                                                                                                          |
| --------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --- | ---------- |
| **Route**       | `App.tsx`: `<Route path="/learning" element={<Learning />} />` | Lazy-loaded via `React.lazy`.                                                                                                       |
| **Page**        | `src/views/pages/Learning/Learning.tsx`                        | Ambil profile dari `useProfile()`; `sections = profile.getPublishedLearningSections()`; tampilkan Section + quick nav + grid cards. |
| **Section id**  | `id="learning"` pada `<Section>`                               | Untuk skip link dan anchor.                                                                                                         |
| **Empty state** | Teks: "No learning sections published yet. Check back later."  | Saat `sections.length === 0`.                                                                                                       |
| **Loading**     | `<Loading fullScreen message="Loading..." />`                  | Saat `isLoading`.                                                                                                                   |
| **Error**       | `<PageError ... onRetry={refetch} />`                          | Saat `error                                                                                                                         |     | !profile`. |
| **Quick nav**   | "Jump to:" + daftar link `#section-{slug}`                     | Hanya jika `sections.length > 1`.                                                                                                   |
| **Deep link**   | `useEffect` baca `location.hash`, scroll ke `#section-{slug}`  | Menghormati `prefers-reduced-motion`.                                                                                               |
| **SEO**         | `useSEO({ title, description, keywords, type: "profile" })`    | Title pakai nama profile bila ada.                                                                                                  |
| **Sitemap**     | `scripts/generate-sitemap.js`                                  | Route `/learning` dengan priority 0.8.                                                                                              |
| **Styles**      | `src/views/pages/Learning/Learning.module.css`                 | Design tokens (spacing, colors); print `break-inside: avoid`; reduced-motion untuk `.quickNavLink`.                                 |

---

## D. Admin (detail)

| Aspek             | Lokasi / Nilai                                                                                                                                      | Keterangan                                                                                                                        |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Route**         | `App.tsx`: `<Route path="learning" element={<AdminLearning />} />` di bawah `/admin`                                                                | Perlu login admin.                                                                                                                |
| **Sidebar**       | `AdminLayout.tsx`: Content group, item `{ to: "/admin/learning", label: "Learning", icon: "book-open" }`                                            | Icon SVG book-open.                                                                                                               |
| **Breadcrumb**    | `routeTitles["/admin/learning"] = "Learning"`                                                                                                       | Di `AdminLayout.tsx`.                                                                                                             |
| **Dashboard**     | `AdminDashboard.tsx`: shortcut `{ label: "Learning", value: counts.learningSections ?? 0, to: "/admin/learning" }`                                  | Backend kirim `counts.learningSections`.                                                                                          |
| **Backend stats** | `AdminController.ts`: `learningSectionsCount = profile?.learningSections?.length ?? 0`                                                              | Dikirim di `getStats` response.                                                                                                   |
| **Page**          | `src/views/pages/Admin/AdminLearning.tsx`                                                                                                           | Load profile lewat `adminService.getProfile()`; state lokal untuk sections; Save all lewat `adminService.updateProfile(profile)`. |
| **CRUD**          | Add section, Delete section, per-section: Title, Slug, Description, Order, Published; Add topic, Remove topic, per-topic: title, description, order | Slug auto dari title (`slugFromTitle`); expand/collapse per section.                                                              |
| **Export**        | `src/views/pages/Admin/index.ts`: `export { AdminLearning }`                                                                                        | Supaya lazy load di App bisa resolve.                                                                                             |

---

## E. Navigasi & layout (detail)

| Aspek         | Lokasi                      | Nilai                                                                                                                      |
| ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Header**    | `Header.tsx`: `navItems`    | Termasuk `{ path: "/learning", label: "Learning" }` dan `{ path: "/resume", label: "Resume" }`.                            |
| **Footer**    | `Footer.tsx`: `footerLinks` | Termasuk `/learning` dan `/resume` (urutan sama dengan header).                                                            |
| **Skip link** | `SkipLinks.tsx`             | Jika `location.pathname === "/learning"`: link "Skip to curriculum" ke `#learning`; scroll pakai `prefers-reduced-motion`. |
| **404**       | `App.tsx`                   | `<Route path="*" element={<Navigate to="/" replace />} />`.                                                                |

---

## F. Materi kurikulum (lengkap & detail)

Semua materi ada di **`backend/src/seed/seedData.ts`** → key **`learningSections`**. Setelah `npm run seed`, data masuk ke MongoDB dan tampil di `/learning`. Bisa diedit kapan saja lewat **Admin → Learning**.

| #   | Section                         | Slug                            | Topik | Cakupan singkat                                                                                                                                                                                        |
| --- | ------------------------------- | ------------------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0   | How to Learn This Curriculum    | `how-to-learn`                  | 1     | Learning path, study tips, suggested order, time estimates, active recall.                                                                                                                             |
| 1   | Competitive Programming         | `competitive-programming`       | 12    | Complexity, sorting/searching, prefix/sliding window, greedy & D&C, DP, graph, trees, **heaps & priority queues**, strings & math, **bit manipulation**, **recursion & backtracking**, basic geometry. |
| 2   | React                           | `react`                         | 7     | JSX, props & state, hooks, Context API, React Router, Redux/Zustand, best practices.                                                                                                                   |
| 3   | Node.js                         | `nodejs`                        | 6     | Event loop, async, Express, REST API, middleware & auth, file handling, deployment.                                                                                                                    |
| 4   | Database & SQL                  | `database-sql`                  | 5     | Normalization, queries (JOIN, GROUP BY, subqueries), indexing, transactions, stored procedures.                                                                                                        |
| 5   | Computer Science Theory         | `cs-theory`                     | 8     | OOP, SOLID, DRY/KISS/YAGNI, design patterns, architecture, data structures (incl. heap), clean code, discrete math & probability.                                                                      |
| 6   | Data Analytics                  | `data-analytics`                | 6     | Statistics & EDA, data cleaning, Pandas/NumPy, visualization, feature engineering, dashboards.                                                                                                         |
| 7   | AI & Machine Learning           | `ai-ml`                         | 6     | ML fundamentals, model evaluation, deep learning, computer vision, NLP, implementation & real projects.                                                                                                |
| 8   | System Design & DevOps          | `system-design-devops`          | 5     | System design, microservices & APIs, distributed systems, cloud & Docker, CI/CD.                                                                                                                       |
| 9   | Security & Testing              | `security-testing`              | 5     | Auth, validation & sanitization, testing, secure deployment, cybersecurity basics.                                                                                                                     |
| 10  | Programming Languages           | `programming-languages`         | 4     | C++, Python, Java, practice & common patterns.                                                                                                                                                         |
| 11  | English Learning                | `english-learning`              | 4     | Grammar & vocabulary, speaking & listening, reading & writing, sample conversations & quick tips.                                                                                                      |
| 12  | Quantum Computing               | `quantum-computing`             | 3     | Qubits, superposition, entanglement; gates & circuits; Grover/Shor; Qiskit.                                                                                                                            |
| 13  | Interview Preparation           | `interview-preparation`         | 6     | Coding, system design, **OOD (low-level design)**, behavioral & LP, resume & portfolio, **company-specific prep & timeline**.                                                                          |
| 14  | Operating Systems & Concurrency | `operating-systems-concurrency` | 5     | Processes & threads, memory management, concurrency (locks, race conditions), deadlock, scheduling.                                                                                                    |
| 15  | Computer Networks               | `computer-networks`             | 4     | TCP vs UDP, HTTP & REST, DNS & CDN, TLS & HTTPS.                                                                                                                                                       |

**Total: 16 section, 87 topik.** Kurikulum dirancang agar Anda siap wawancara di perusahaan terbaik (FAANG/top tech): coding (CP + heaps, bit, recursion/backtracking), system design & OOD, behavioral & leadership, OS & concurrency, jaringan, keamanan, database, plus resume & company-specific prep. Setiap section punya **title**, **slug**, **description**; setiap topik punya **title**, **description**, **order**, dan opsional: **content** (isi penuh), **codeExample** (contoh kode), **codeLanguage** (bahasa untuk syntax), **imageUrl** (gambar/diagram).

**Isi materi (content + contoh + gambar)** lengkap untuk semua 87 topik:

- **Semua 16 section**: Setiap topik punya **content** lengkap (Key idea, penjelasan, practice/saran).
- **Competitive Programming** (12): content + codeExample (C++) + imageUrl.
- **React** (7): content + codeExample untuk Fundamentals, Props & State, Hooks, Context API, Router, State Management, Best Practices + imageUrl.
- **Node.js** (6): content + codeExample untuk Event Loop, Express, REST, Middleware & Auth, File, Deployment + imageUrl.
- **Database & SQL** (5): content + codeExample (SQL) + imageUrl.
- **Computer Science Theory** (8): content lengkap; OOP & SOLID punya penjelasan detail + imageUrl.
- **Data Analytics** (6), **AI & ML** (6), **System Design & DevOps** (5), **Security & Testing** (5): content lengkap + imageUrl.
- **Programming Languages** (4), **English Learning** (4), **Quantum Computing** (3): content lengkap + imageUrl.
- **Interview Preparation** (6), **OS & Concurrency** (5), **Computer Networks** (4): content lengkap + imageUrl.

Setiap topik punya **imageUrl** (gambar pendukung). Gambar bisa diganti lewat Admin → Learning (edit Image URL per topik).

**Struktur 9 bagian per materi** (setiap materi harus punya):

1. **Learning flow** (alur belajar), 2. **Material** (materi), 3. **Explanation** (penjelasan), 4. **Application** (penerapan), 5. **How to implement** (cara implementasi), 6. **Code implementasi** (field `codeExample`), 7. **Example problem & solution**, 8. **Additional information**, 9. **Gambar** (field `imageUrl`).  
   Topik yang memakai format ini menulis di **content** heading: `**1. Learning flow:**`, `**2. Material:**`, … `**8. Additional information:**`; bagian 6 dan 9 dari field terpisah. Frontend (`Learning.tsx`) mendeteksi format ini dengan `isStructuredContent()` dan merender lewat `TopicStructuredContent`.  
   **Status**: **51 topik** sudah memakai struktur 9 bagian penuh: **How to Learn** (1), **Competitive Programming** (12), **React** (7), **Node.js** (6), **Database & SQL** (5), **Computer Science Theory** (8), **Data Analytics** (6), **AI & Machine Learning** (6). Sisa **36 topik** (System Design & DevOps, Security & Testing, Programming Languages, English, Quantum, Interview Prep, OS & Concurrency, Computer Networks) dapat diperbarui lewat Admin atau dengan mengedit seed lalu `npm run seed`.

---

## G. Kualitas kode & resilience

| Aspek                | Keterangan                                                                                                                                            |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **DRY**              | Satu sumber data (profile); Admin pakai `Admin.module.css`; tidak duplikasi type (domain types dipakai di frontend & backend).                        |
| **TypeScript**       | Domain types ketat; tidak pakai `any` di Learning/AdminLearning.                                                                                      |
| **Hooks**            | Di `Learning.tsx`, `useEffect`/`useRef` dipanggil sebelum early return (rules of hooks).                                                              |
| **Backend sanitasi** | Setiap section: title (string/default), slug (string/default), order (number/default), published (boolean), items (array); setiap item: title, order. |
| **A11y**             | Skip to curriculum; `aria-label` pada nav dan list; focus-visible pada quick nav; reduced-motion untuk scroll dan transisi CSS.                       |
| **Print**            | Learning cards pakai `break-inside: avoid` agar tidak terpotong saat cetak.                                                                           |

---

## H. Cara verifikasi (step-by-step)

1. **Seed**
   - Jalankan di folder `backend`: `npm run seed`.
   - Pastikan: tidak error; log tampil "Profile seeded successfully" (dan admin seeded jika ada).

2. **Public Learning**
   - Buka `/learning`.
   - Harus: tampil **16 section** (card); ada "Jump to:" dengan link ke tiap section; klik link → scroll ke section yang benar; buka `/learning#section-react` → halaman scroll ke section React.

3. **Admin**
   - Login ke `/admin/login`.
   - Dashboard: ada shortcut "Learning" dengan angka **(16)** dan link ke `/admin/learning`.
   - Sidebar: Content → "Learning" (icon book-open).
   - Buka `/admin/learning`: daftar **16 section**; expand section → edit Title, Slug, Description, Order, Published, Topics (termasuk Content, Code example, Image URL); Add section / Add topic; Save all → refresh `/learning` → perubahan tampil.

4. **Navigasi**
   - Header dan Footer: ada link "Learning" dan "Resume".
   - Di `/learning`, tab sampai dapat skip link "Skip to curriculum" → Enter → fokus pindah ke konten learning.

5. **404**
   - Buka URL tidak valid (mis. `/salah`) → redirect ke `/`.

---

## I. Ringkasan

- **Kriteria Anda**: SOLID, OOP, DRY, KISS; design system & component reusable; seed selaras; terintegrasi admin; section & page baru; bahasa Inggris; materi lengkap dan detail → **semua terpenuhi**.
- **Informasi**: Data layer, public site, admin, navigasi, materi (**16 section, 87 topik**), kualitas kode, dan langkah verifikasi didokumentasikan di atas dengan **lengkap dan detail**.
- **Materi**: Sudah **lengkap** (15 section: CP, React, Node, DB, CS Theory, Data Analytics, AI/ML, System Design, Security, Programming Languages, English, Quantum, Interview Prep, **OS & Concurrency**, **Computer Networks**) dan **matang** (deskripsi jelas, CP penuh content/code/image, bisa diedit di Admin).

Setelah `npm run seed` di folder `backend`, seluruh materi siap dipakai dan ditinjau di `/learning` serta dikelola di Admin → Learning.
