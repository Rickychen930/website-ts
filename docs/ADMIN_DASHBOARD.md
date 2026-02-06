# Admin Dashboard

Dashboard untuk menganalisis dan mengedit semua konten website (profile, projects, experience, skills, testimonials, stats, messages, dll).

## Setup

1. **Backend:** Set variabel lingkungan `ADMIN_SECRET` (rahasia kuat, hanya untuk admin).
   - Di `.env` (root atau `backend/`):  
     `ADMIN_SECRET=<string-acak-panjang>`
   - Contoh generate: `openssl rand -hex 32`

2. **Frontend:** Tidak perlu env tambahan; memakai `REACT_APP_API_URL` yang sama untuk API.

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

- `POST /api/admin/login` — body: `{ "secret": "<ADMIN_SECRET>" }` → mengembalikan `{ "success": true, "token": "..." }`.
- Semua route di bawah membutuhkan header: `Authorization: Bearer <token>`.
- `GET /api/admin/stats` — statistik dashboard.
- `PUT /api/admin/profile` — update penuh profile (body = object profile).
- `GET /api/admin/contacts?limit=50&skip=0` — daftar pesan kontak.
- `DELETE /api/admin/contacts/:id` — hapus satu pesan kontak.

## Keamanan

- Simpan `ADMIN_SECRET` hanya di server (env), jangan di frontend.
- Token disimpan di `localStorage` di browser; logout menghapusnya.
- Di production, pastikan HTTPS dan `ADMIN_SECRET` cukup panjang dan acak.
