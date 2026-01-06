# 🌐 Konfigurasi Nginx

## 📋 Perubahan Terbaru

Konfigurasi nginx telah diupdate untuk **serve static files langsung** dari folder build, bukan melalui proxy ke backend. Ini membuat website lebih cepat dan efisien.

### Perbedaan:

**Sebelumnya:**
- Semua request (termasuk static files) di-proxy ke backend (port 4000)
- Backend Express yang serve static files

**Sekarang:**
- Static files (CSS, JS, images) di-serve langsung oleh Nginx
- Hanya request API (`/api/*`) yang di-proxy ke backend
- Lebih cepat dan efisien

## 🚀 Quick Start

### Cara 1: Menggunakan Script (Recommended)

```bash
# Di server, jalankan:
cd /path/to/website-ts
sudo bash scripts/nginx-setup.sh

# Atau dengan path build folder:
sudo bash scripts/nginx-setup.sh /home/ubuntu/website-ts/build
```

Script akan:
- ✅ Auto-detect folder build
- ✅ Update path di konfigurasi nginx
- ✅ Validasi konfigurasi
- ✅ Test dan reload nginx

### Cara 2: Manual Setup

1. **Edit konfigurasi:**
   ```bash
   nano config/nginx.conf
   ```
   
2. **Path build folder default:**
   - Path default: `/var/www/website-ts/build`
   - Jika ingin menggunakan path lain, ganti semua path di konfigurasi
   - Contoh: `/home/ubuntu/website-ts/build` atau `/root/website-ts/build`

3. **Install konfigurasi:**
   ```bash
   sudo cp config/nginx.conf /etc/nginx/sites-available/rickychen930.cloud
   sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/
   ```

4. **Test dan reload:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## 📍 Path Build Folder

**PENTING:** Pastikan path build folder di konfigurasi nginx sesuai dengan lokasi sebenarnya di server.

Cara cek path build folder:
```bash
# Di server
find ~ -name "build" -type d 2>/dev/null
# atau
ls -la ~/website-ts/build
```

Path yang perlu di-update di `nginx.conf`:
- `root /path/to/build;`
- `alias /path/to/build/static/;`
- `alias /path/to/build/assets/;`

## 📚 Dokumentasi Lengkap

Untuk panduan step-by-step lengkap, lihat:
- **[SETUP_NGINX_DARI_AWAL.md](../docs/SETUP_NGINX_DARI_AWAL.md)** - 🆕 Panduan setup nginx dari awal (RECOMMENDED)
- **[NGINX_SETUP_STEP_BY_STEP.md](../docs/NGINX_SETUP_STEP_BY_STEP.md)** - Panduan lengkap setup nginx

## 🔍 Troubleshooting

### Error: "No such file or directory"
- Path build folder salah
- Update path di `nginx.conf` dengan path yang benar

### Error: "Permission denied"
- Nginx tidak bisa akses folder build
- Fix: `sudo chown -R www-data:www-data /path/to/build`

### Static files tidak load
- Cek path di konfigurasi nginx
- Pastikan folder `build/static/` dan `build/assets/` ada
- Cek permission folder

### Website masih menampilkan konten lama
- Hard refresh browser: `Ctrl+Shift+R` (Windows/Linux) atau `Cmd+Shift+R` (Mac)
- Pastikan file build terbaru sudah di-upload
- Reload nginx: `sudo systemctl reload nginx`

## 📝 Checklist

Setelah setup, pastikan:
- [ ] Path build folder sudah benar di `nginx.conf`
- [ ] `sudo nginx -t` berhasil tanpa error
- [ ] Nginx status: `active (running)`
- [ ] Website bisa diakses
- [ ] Static files (CSS, JS, images) bisa di-load
- [ ] API calls berfungsi
- [ ] React Router bekerja

## 🆘 Butuh Bantuan?

Lihat dokumentasi lengkap:
- [NGINX_SETUP_STEP_BY_STEP.md](../docs/NGINX_SETUP_STEP_BY_STEP.md)
- [PM2_NGINX_SETUP.md](../docs/PM2_NGINX_SETUP.md)
- [DEPLOYMENT.md](../docs/DEPLOYMENT.md)

