# Admin Dashboard

Dashboard untuk menganalisis dan mengedit **semua** konten website. Semua data di bawah disimpan di backend (MongoDB) dan disinkronkan dengan halaman publik lewat API profile.

## Sync (satu sumber kebenaran)

- **Backend:** Satu dokumen `profiles` + koleksi `admins`. Profile berisi: name, title, location, bio, academics, certifications, contacts, experiences, honors, languages, projects, softSkills, stats, technicalSkills, testimonials.
- **API:** `GET /api/profile` (publik) mengembalikan profile yang sudah di-transform. Admin mengubah data lewat `PUT /api/admin/profile` dengan body profile lengkap.
- **Frontend:** Halaman admin memuat profile via `GET /api/profile`, mengedit section per halaman, lalu menyimpan seluruh profile dengan `PUT /api/admin/profile`. Setelah save, `ProfileContext` di-refetch sehingga situs publik langsung menampilkan data terbaru.

## Semua yang bisa diatur dari Admin

| Menu Admin         | Data yang diatur                                                                                                                                    | Simpan          |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| **Profile**        | name, title, location, bio                                                                                                                          | Save profile    |
| **Projects**       | title, description, longDescription, technologies, category, startDate, endDate, isActive, githubUrl, liveUrl, imageUrl, achievements, architecture | Save all        |
| **Experience**     | company, position, location, startDate, endDate, isCurrent, description, achievements, technologies, skillIds                                       | Save all        |
| **Skills**         | Technical skills (name, category, proficiency, yearsOfExperience) + Soft skills (name, category)                                                    | Save all        |
| **Testimonials**   | author, role, company, content, date, avatarUrl                                                                                                     | Save all        |
| **Stats**          | label, value, unit, description                                                                                                                     | Save all        |
| **Academics**      | institution, degree, field, startDate, endDate, description                                                                                         | Save all        |
| **Certifications** | name, issuer, issueDate, expiryDate, credentialId, credentialUrl                                                                                    | Save all        |
| **Honors**         | title, issuer, date, description, url                                                                                                               | Save all        |
| **Contact info**   | type, value, label, isPrimary (email, linkedin, github, dll) — tepat satu primary                                                                   | Save all        |
| **Messages**       | Lihat dan hapus pesan dari form kontak (tidak mengedit profile)                                                                                     | Delete per item |

## Setup

1. **Backend:** Password admin disimpan hanya di backend (DB, di-hash). Set di env **sebelum** jalankan seed:
   - `ADMIN_SEED_PASSWORD=<rahasia-kuat>` (atau `ADMIN_SECRET`) di `.env` root.
   - Jalankan `npm run seed` agar admin terbentuk. Login dengan password yang sama.

2. **Frontend:** Pakai `REACT_APP_API_URL` yang sama untuk API.

## Cara akses

1. Buka **`/admin`** atau **`/admin/login`** di browser.
2. Masukkan **Admin secret** (nilai `ADMIN_SECRET` yang Anda set).
3. Setelah login, Anda diarahkan ke **Dashboard** dan bisa navigasi lewat sidebar.

## Fitur (CRUD penuh)

- **Overview (Dashboard):** Ringkasan jumlah projects, experience, skills, testimonials, stats, dan pesan kontak; plus waktu terakhir profile di-update.
- **Profile:** Update nama, title, location, bio (simpan lewat "Save profile").
- **Projects:** Create (Add project), Read (tabel + expand + untuk detail), Update (inline + baris detail: description, technologies, achievements, GitHub/Live URL, architecture), Delete (tombol Delete) → **Save all** untuk persist.
- **Experience:** Create (Add experience), Read/Update (inline + baris detail: location, endDate, description, achievements, technologies), Delete → **Save all**.
- **Skills:** Create (Add technical skill / Add soft skill), Update (inline), Delete (per baris) → **Save all**.
- **Testimonials / Stats / Academics / Certifications / Honors / Contact info:** Create (Add), Update (inline), Delete → **Save all** (kecuali Messages).
- **Contact info:** Satu kontak harus primary (radio). Simpan lewat **Save all**.
- **Messages:** Read (daftar pesan dari form kontak), Delete (per pesan). Create tidak dari sini (dari form kontak publik).

## API (backend)

- `POST /api/admin/login` — body: `{ "secret": "<password>" }` (password yang di-set lewat ADMIN_SEED_PASSWORD saat seed) → `{ "success": true, "token": "..." }`.
- Semua route di bawah membutuhkan header: `Authorization: Bearer <token>`.
- `GET /api/admin/stats` — statistik dashboard.
- `PUT /api/admin/profile` — update profile (body = object profile; hanya field yang dikirim yang di-update, array hanya jika dikirim sebagai array).
- `GET /api/admin/contacts?limit=50&skip=0` — daftar pesan kontak (dari form kontak).
- `DELETE /api/admin/contacts/:id` — hapus satu pesan kontak.

## Keamanan

- Password admin hanya di backend (disimpan hashed di DB via seed). Jangan simpan di frontend.
- Token disimpan di `localStorage`; logout menghapusnya.
- Di production, pakai HTTPS dan `ADMIN_SEED_PASSWORD` yang kuat.
