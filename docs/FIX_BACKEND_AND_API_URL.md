# 🔧 Fix Backend Error dan API URL Configuration

## Masalah yang Ditemukan

1. **Backend Error**: Route pattern `/api/*` tidak valid di Express 5
2. **Frontend API URL**: Hardcoded ke `https://rickychen930.cloud:4000` (port langsung)
   - Seharusnya: `https://rickychen930.cloud/api` (via nginx proxy)

## Solusi

### 1. Backend Route Pattern (SUDAH DIPERBAIKI)

**File:** `backend/src/main.ts`

**Masalah:** 
```typescript
app.use("/api/*", (req, res) => { ... })  // ❌ Invalid di Express 5
```

**Perbaikan:**
```typescript
app.use("/api/:path(*)", (req, res) => { ... })  // ✅ Valid
```

**Action di server:**
```bash
# Rebuild backend
cd /root/backend
npm run backend:build  # atau jika ada script
# Atau manual:
cd /path/to/project
npm run backend:build

# Restart PM2
pm2 restart website-backend
```

### 2. Frontend API URL Configuration (SUDAH DIPERBAIKI)

**File:** `.github/workflows/deploy.yml`

**Perubahan:**
- Sebelum: `REACT_APP_API_URL: 'https://rickychen930.cloud:4000'`
- Sesudah: `REACT_APP_API_URL: 'https://rickychen930.cloud/api'`

**Action:**
- Push perubahan ke GitHub untuk trigger rebuild otomatis
- Atau rebuild manual di server (lihat di bawah)

## Quick Fix di Server

### Step 1: Fix Backend

```bash
# Rebuild backend TypeScript
cd /root/backend
# Jika ada source code:
cd /path/to/project
npm run backend:build

# Copy dist files ke /root/backend (jika perlu)
# Atau jika sudah di /root/backend, restart saja:
pm2 restart website-backend

# Cek log
pm2 logs website-backend --lines 20
```

### Step 2: Rebuild Frontend dengan API URL yang Benar

**Opsi A: Via GitHub Actions (Recommended)**
- Push perubahan ini ke GitHub
- GitHub Actions akan rebuild dengan API URL yang benar

**Opsi B: Manual Rebuild di Server**

```bash
# Jika ada source code di server:
cd /path/to/project

# Build dengan environment variable yang benar
REACT_APP_API_URL=https://rickychen930.cloud/api npm run build

# Copy build files ke nginx folder
sudo cp -r build/* /var/www/website-ts/build/
sudo chown -R www-data:www-data /var/www/website-ts
sudo chmod -R 755 /var/www/website-ts
```

**Opsi C: Quick Fix - Update Built JS File (Temporary)**

Jika tidak bisa rebuild, bisa edit built JS file langsung:

```bash
# Cari file JS yang berisi API URL
cd /var/www/website-ts/build/static/js

# Cari file yang berisi "rickychen930.cloud:4000"
grep -l "rickychen930.cloud:4000" *.js

# Replace (contoh jika file main.xxx.js)
sed -i 's|rickychen930.cloud:4000|rickychen930.cloud/api|g' main.*.js

# Reload nginx
sudo systemctl reload nginx
```

## Verifikasi

### 1. Cek Backend Tidak Error

```bash
pm2 logs website-backend --lines 20
# Should NOT see: "Missing parameter name at index 6: /api/*"
```

### 2. Test API Endpoint

```bash
# Via nginx proxy (seharusnya ini)
curl https://rickychen930.cloud/api/Ricky%20Chen

# Langsung ke backend (backup)
curl http://localhost:4000/api/Ricky%20Chen
```

### 3. Test Frontend

- Buka browser: `https://rickychen930.cloud`
- Buka Developer Console (F12)
- Network tab: cek request API
- Seharusnya request ke: `https://rickychen930.cloud/api/Ricky%20Chen`
- Bukan ke: `https://rickychen930.cloud:4000/...`

## Catatan Penting

1. **API URL via Nginx Proxy:**
   - ✅ `https://rickychen930.cloud/api` (via nginx, recommended)
   - ❌ `https://rickychen930.cloud:4000` (expose port langsung, kurang secure)

2. **Backend Route Pattern:**
   - Express 5 menggunakan path-to-regexp yang lebih strict
   - Gunakan: `/api/:path(*)` bukan `/api/*`

3. **Environment Variables:**
   - `REACT_APP_API_URL` harus di-set saat **build time**
   - Tidak bisa diubah di runtime (React build is static)

## Checklist

- [ ] Backend route pattern sudah diperbaiki
- [ ] Backend di-rebuild
- [ ] PM2 restart dan tidak ada error
- [ ] Frontend di-rebuild dengan `REACT_APP_API_URL=https://rickychen930.cloud/api`
- [ ] Website bisa load profile tanpa error
- [ ] Network request menunjukkan API call ke `/api` bukan `:4000`

