# 🚀 Setup Nginx dari Awal - Panduan Lengkap

Panduan step-by-step untuk setup nginx dari awal setelah konfigurasi dihapus.

## 📋 Daftar Isi

1. [Prerequisites](#1-prerequisites)
2. [Step 1: Cek Instalasi Nginx](#step-1-cek-instalasi-nginx)
3. [Step 2: Cari Lokasi Folder Build](#step-2-cari-lokasi-folder-build)
4. [Step 3: Update Konfigurasi Nginx](#step-3-update-konfigurasi-nginx)
5. [Step 4: Install Konfigurasi ke Nginx](#step-4-install-konfigurasi-ke-nginx)
6. [Step 5: Buat Symlink](#step-5-buat-symlink)
7. [Step 6: Test Konfigurasi](#step-6-test-konfigurasi)
8. [Step 7: Setup SSL Certificate (Opsional)](#step-7-setup-ssl-certificate-opsional)
8. [Step 8: Reload Nginx](#step-8-reload-nginx)
9. [Step 9: Verifikasi](#step-9-verifikasi)
10. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

Pastikan Anda sudah memiliki:

- [ ] Akses SSH ke server
- [ ] Hak sudo/root di server
- [ ] Folder `build` sudah dibuat (sudah run `npm run build`)
- [ ] Backend sudah running di port 4000 (jika menggunakan API)
- [ ] Domain name sudah mengarah ke server (untuk SSL)

---

## Step 1: Cek Instalasi Nginx

**Login ke server dan cek apakah nginx sudah terinstall:**

```bash
# Login ke server
ssh user@your-server

# Cek apakah nginx terinstall
nginx -v

# Jika belum terinstall, install nginx:
sudo apt-get update
sudo apt-get install nginx -y

# Cek status nginx
sudo systemctl status nginx

# Jika tidak running, start nginx:
sudo systemctl start nginx
sudo systemctl enable nginx  # Enable auto-start on boot
```

**✅ Checklist:**
- [ ] Nginx sudah terinstall
- [ ] Nginx status: active (running)

---

## Step 2: Cari Lokasi Folder Build

**Path default yang sudah dikonfigurasi: `/var/www/website-ts/build`**

**Cek apakah folder build sudah ada:**

```bash
# Cek path default
ls -la /var/www/website-ts/build

# Verifikasi folder build memiliki index.html
ls -la /var/www/website-ts/build/index.html

# Jika belum ada, buat folder dan set permission:
sudo mkdir -p /var/www/website-ts/build
sudo chown -R www-data:www-data /var/www/website-ts
sudo chmod -R 755 /var/www/website-ts
```

**📝 Path default:** `/var/www/website-ts/build`

**Jika ingin menggunakan path lain**, contoh:
- `/home/ubuntu/website-ts/build`
- `/root/website-ts/build`

**✅ Checklist:**
- [ ] Path folder build sudah diketahui
- [ ] Folder build berisi `index.html`
- [ ] Folder `build/static/` ada
- [ ] Folder `build/assets/` ada

---

## Step 3: Update Konfigurasi Nginx

**Sekarang kita perlu update file `config/nginx.conf` dengan path build folder yang benar.**

### Opsi A: Menggunakan Script Otomatis (Recommended) ✅

**Ini adalah cara TERMUDAH:**

```bash
# Pastikan Anda berada di folder project
cd /path/to/website-ts

# Jalankan script setup dengan path build folder
sudo bash scripts/nginx-setup.sh /var/www/website-ts/build

# Script akan:
# - Auto-update path di konfigurasi
# - Copy ke /etc/nginx/sites-available/
# - Buat symlink
# - Test konfigurasi
# - Offer untuk reload nginx
```

**Jika script tidak menemukan path build, akan auto-detect atau minta input.**

### Opsi B: Manual Edit

**Jika ingin edit manual:**

1. **Edit file konfigurasi:**
   ```bash
   nano config/nginx.conf
   ```

2. **Cari dan ganti semua path build folder:**
   
   Cari baris-baris ini (ada di beberapa tempat):
   ```nginx
   root /var/www/website-ts/build;
   alias /var/www/website-ts/build/static/;
   alias /var/www/website-ts/build/assets/;
   ```
   
   Path default sudah di-set ke `/var/www/website-ts/build`. Jika ingin menggunakan path lain, ganti dengan path build folder Anda yang sebenarnya.
   
   **Contoh jika build folder di `/home/ubuntu/website-ts/build`:**
   ```nginx
   root /home/ubuntu/website-ts/build;
   alias /home/ubuntu/website-ts/build/static/;
   alias /home/ubuntu/website-ts/build/assets/;
   ```

3. **Pastikan semua path sudah benar:**
   ```bash
   # Cek semua path build di file
   grep -n "build" config/nginx.conf
   ```

4. **Simpan file:**
   - Tekan `Ctrl+X`
   - Tekan `Y` untuk confirm
   - Tekan `Enter`

**✅ Checklist:**
- [ ] File `config/nginx.conf` sudah di-update dengan path build yang benar
- [ ] Semua path build sudah diganti (biasanya 5-6 tempat)

---

## Step 4: Install Konfigurasi ke Nginx

**Copy konfigurasi ke folder nginx:**

```bash
# Backup konfigurasi lama jika ada (untuk safety)
sudo cp /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-available/rickychen930.cloud.backup.$(date +%Y%m%d_%H%M%S) 2>/dev/null || echo "No old config to backup"

# Copy konfigurasi baru ke nginx
sudo cp config/nginx.conf /etc/nginx/sites-available/rickychen930.cloud

# Verifikasi file sudah tercopy
ls -la /etc/nginx/sites-available/rickychen930.cloud
```

**✅ Checklist:**
- [ ] File sudah tercopy ke `/etc/nginx/sites-available/rickychen930.cloud`
- [ ] Backup konfigurasi lama sudah dibuat (jika ada)

---

## Step 5: Buat Symlink

**Aktifkan konfigurasi dengan membuat symlink:**

```bash
# Hapus symlink lama jika ada (broken atau salah)
sudo rm -f /etc/nginx/sites-enabled/rickychen930.cloud

# Buat symlink baru
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# Verifikasi symlink
ls -la /etc/nginx/sites-enabled/ | grep rickychen930

# Pastikan symlink tidak broken
readlink -f /etc/nginx/sites-enabled/rickychen930.cloud
```

**✅ Checklist:**
- [ ] Symlink sudah dibuat
- [ ] Symlink tidak broken (mengarah ke file yang benar)

---

## Step 6: Test Konfigurasi

**PENTING: Selalu test sebelum reload!**

```bash
# Test konfigurasi nginx
sudo nginx -t
```

**Jika berhasil**, Anda akan melihat:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**Jika ada error**, contoh:
```
nginx: [emerg] open() "/path/to/build/index.html" failed (2: No such file or directory)
```

**Solusi error umum:**

1. **Path build folder salah:**
   ```bash
   # Cek path yang benar
   ls -la /path/to/build/index.html
   
   # Edit konfigurasi lagi
   sudo nano /etc/nginx/sites-available/rickychen930.cloud
   # Ganti path dengan yang benar
   
   # Test lagi
   sudo nginx -t
   ```

2. **Permission issue:**
   ```bash
   # Berikan permission ke nginx
   sudo chown -R www-data:www-data /path/to/build
   sudo chmod -R 755 /path/to/build
   
   # Test lagi
   sudo nginx -t
   ```

**✅ Checklist:**
- [ ] `sudo nginx -t` berhasil tanpa error
- [ ] Tidak ada syntax error
- [ ] Tidak ada path yang tidak ditemukan

---

## Step 7: Setup SSL Certificate (Opsional)

**Jika Anda ingin menggunakan HTTPS:**

```bash
# Install certbot (jika belum terinstall)
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud

# Certbot akan:
# - Generate certificate
# - Auto-update nginx config untuk HTTPS
# - Setup auto-renewal

# Test auto-renewal
sudo certbot renew --dry-run
```

**Catatan:** 
- Pastikan domain sudah mengarah ke server sebelum generate certificate
- Pastikan port 80 dan 443 terbuka di firewall

**✅ Checklist:**
- [ ] SSL certificate sudah terinstall
- [ ] Auto-renewal sudah di-setup

---

## Step 8: Reload Nginx

**Setelah test berhasil, reload nginx:**

```bash
# Reload nginx (graceful - tidak akan drop koneksi aktif)
sudo systemctl reload nginx

# Atau restart jika perlu (akan drop koneksi)
# sudo systemctl restart nginx

# Cek status
sudo systemctl status nginx
```

**✅ Checklist:**
- [ ] Nginx sudah di-reload
- [ ] Status nginx: active (running)

---

## Step 9: Verifikasi

**Pastikan semuanya bekerja dengan baik:**

### 9.1 Setup Permission Folder (PENTING!)

**Pastikan nginx bisa akses folder build:**

```bash
# Set ownership ke www-data (user nginx)
sudo chown -R www-data:www-data /var/www/website-ts

# Set permission yang benar
sudo chmod -R 755 /var/www/website-ts

# Verifikasi
ls -la /var/www/website-ts
```

### 9.2 Cek Status Nginx

```bash
sudo systemctl status nginx
```

### 9.3 Test Website dari Server

```bash
# Test HTTP (jika belum setup SSL)
curl -I http://localhost

# Test HTTPS (jika sudah setup SSL)
curl -I https://localhost

# Test dengan domain
curl -I https://rickychen930.cloud
```

### 9.4 Cek Log Nginx

```bash
# Error log - cek apakah ada error
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log

# Access log - cek apakah ada request
sudo tail -f /var/log/nginx/rickychen930.cloud.access.log
```

### 9.5 Test di Browser

1. Buka browser
2. Kunjungi: `https://rickychen930.cloud` (atau `http://` jika belum SSL)
3. **Hard refresh** untuk clear cache: `Ctrl+Shift+R` (Windows/Linux) atau `Cmd+Shift+R` (Mac)

### 9.6 Test Fitur

- [ ] Website bisa diakses
- [ ] Static files (CSS, JS, images) bisa di-load
- [ ] API calls berfungsi (`/api/*` routes)
- [ ] React Router bekerja (navigasi antar halaman)
- [ ] Tidak ada error di console browser
- [ ] SSL certificate valid (tidak ada warning, jika menggunakan HTTPS)

**✅ Checklist Final:**
- [ ] Website bisa diakses
- [ ] Static files bisa di-load
- [ ] API calls berfungsi
- [ ] Tidak ada error di log nginx
- [ ] React Router bekerja

---

## Troubleshooting

### ❌ Error: "No such file or directory"

**Masalah:** Path ke folder build salah.

**Solusi:**
```bash
# Cek path yang benar
ls -la /path/to/build/index.html

# Update konfigurasi
sudo nano /etc/nginx/sites-available/rickychen930.cloud
# Ganti semua path build dengan path yang benar

# Test dan reload
sudo nginx -t
sudo systemctl reload nginx
```

### ❌ Error: "Permission denied"

**Masalah:** Nginx tidak bisa akses folder build.

**Solusi:**
```bash
# Berikan permission ke nginx
sudo chown -R www-data:www-data /path/to/build
sudo chmod -R 755 /path/to/build

# Test lagi
sudo nginx -t
sudo systemctl reload nginx
```

### ❌ Error: "502 Bad Gateway"

**Masalah:** Backend tidak running atau port salah.

**Solusi:**
```bash
# Cek apakah backend running
pm2 status

# Atau test backend langsung
curl http://localhost:4000/health

# Jika tidak running, start backend
pm2 start backend/ecosystem.config.js --env production

# Cek log backend
pm2 logs website-backend
```

### ❌ Static files tidak load

**Masalah:** Path static files salah atau permission issue.

**Solusi:**
```bash
# Cek struktur folder build
ls -la /path/to/build/static/
ls -la /path/to/build/assets/

# Pastikan file ada dan bisa diakses
sudo -u www-data ls /path/to/build/static/

# Update permission jika perlu
sudo chown -R www-data:www-data /path/to/build
```

### ❌ Website masih menampilkan konten lama

**Masalah:** Browser cache atau nginx cache.

**Solusi:**
```bash
# Hard refresh di browser: Ctrl+Shift+R atau Cmd+Shift+R

# Cek apakah file build terbaru
ls -la /path/to/build/index.html

# Pastikan nginx reload
sudo systemctl reload nginx
```

### ❌ SSL Certificate error

**Masalah:** Certificate tidak ditemukan atau expired.

**Solusi:**
```bash
# Cek certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Check certificate files
sudo ls -la /etc/letsencrypt/live/rickychen930.cloud/

# Jika perlu, generate ulang
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud --force-renewal
```

---

## 🎯 Quick Reference Commands

```bash
# Edit konfigurasi
sudo nano /etc/nginx/sites-available/rickychen930.cloud

# Test konfigurasi
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# Status nginx
sudo systemctl status nginx

# View error log
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log

# View access log
sudo tail -f /var/log/nginx/rickychen930.cloud.access.log

# Cek symlink
ls -la /etc/nginx/sites-enabled/ | grep rickychen930

# Cek folder build
ls -la /path/to/build

# Check & Fix otomatis
sudo bash scripts/nginx-check-and-fix.sh
```

---

## 📝 Checklist Final Setup

Setelah semua step selesai, pastikan:

- [ ] Nginx terinstall dan running
- [ ] Folder build ditemukan dan valid
- [ ] Konfigurasi nginx sudah di-update dengan path yang benar
- [ ] Konfigurasi sudah di-copy ke `/etc/nginx/sites-available/`
- [ ] Symlink sudah dibuat di `/etc/nginx/sites-enabled/`
- [ ] `sudo nginx -t` berhasil tanpa error
- [ ] Nginx sudah di-reload
- [ ] Website bisa diakses
- [ ] Static files bisa di-load
- [ ] API calls berfungsi
- [ ] React Router bekerja
- [ ] SSL certificate valid (jika menggunakan HTTPS)
- [ ] Tidak ada error di log nginx

---

## 🆘 Butuh Bantuan?

1. **Cek dokumentasi lain:**
   - [NGINX_SETUP_STEP_BY_STEP.md](./NGINX_SETUP_STEP_BY_STEP.md) - Panduan detail
   - [PM2_NGINX_SETUP.md](./PM2_NGINX_SETUP.md) - Setup PM2 dan Nginx
   - [DEPLOYMENT.md](./DEPLOYMENT.md) - Panduan deployment lengkap

2. **Gunakan script helper:**
   ```bash
   # Check & Fix otomatis
   sudo bash scripts/nginx-check-and-fix.sh
   
   # Setup otomatis
   sudo bash scripts/nginx-setup.sh /path/to/build
   ```

3. **Cek log:**
   ```bash
   # Error log
   sudo tail -50 /var/log/nginx/rickychen930.cloud.error.log
   
   # Nginx error log umum
   sudo tail -50 /var/log/nginx/error.log
   ```

---

**Selamat! Setup nginx Anda sudah selesai! 🎉**

