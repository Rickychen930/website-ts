# Sinkronisasi Data & Tipe

Dokumen ini menjelaskan bagaimana data dan tipe disinkronkan antara frontend, backend, dan admin.

## Alur data (satu sumber kebenaran)

1. **Backend (MongoDB)**  
   Satu dokumen profile di collection `profiles`. API:
   - `GET /api/profile` → baca (publik)
   - `PUT /api/admin/profile` → tulis (admin only)

2. **Frontend – satu cache**
   - **ProfileService** (singleton): satu instance untuk seluruh app. Cache 5 menit.
   - **ProfileContext**: pakai `profileService` yang sama + state React. Expose `loadProfile()` dan `refetch()`.
   - **Halaman publik** (Home, About, Projects, dll.): pakai `useProfile()` → data dari context (sumber: ProfileService/API).
   - **Halaman Contact**: edit kontak lewat `profileService.updateContacts()` lalu `loadProfile()` agar context ikut update.

3. **Admin dashboard**
   - Baca: `adminService.getProfile()` → `GET /api/profile` (sama dengan publik).
   - Tulis: `adminService.updateProfile(profile)` → `PUT /api/admin/profile`.
   - **Setelah simpan sukses**: setiap halaman admin yang save memanggil `refetch()` dari `useProfile()`.
   - `refetch()` = `profileService.clearCache()` + `loadProfile()` → cache dibersihkan dan data di-fetch lagi dari API, lalu context di-update.
   - Dampak: **situs publik (Home, About, dll.) langsung pakai data terbaru** tanpa reload, karena context pakai singleton yang sama.

## Domain types (harus sama)

- **Frontend**: `src/types/domain.ts`  
  (Profile, Project, Experience, Contact, dll.)

- **Backend**: `backend/src/types/domain.ts`  
  (struktur sama, dipakai oleh transformProfile dan validasi)

Saat menambah/mengubah field (misalnya di Profile atau Project), update **kedua file** agar API request/response dan UI tetap konsisten.

## Ringkasan sinkron

| Sumber         | Dipakai oleh                           | Setelah admin save            |
| -------------- | -------------------------------------- | ----------------------------- |
| MongoDB        | Backend API                            | Data sudah ter-update         |
| ProfileService | ProfileContext, Contact page           | refetch() → clearCache + load |
| ProfileContext | Semua halaman publik + admin (refetch) | Di-update lewat loadProfile() |

Dengan ini, **admin save** dan **tampilan publik** tetap sync: satu cache, satu refetch setelah tulis.
