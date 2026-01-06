# 📋 Panduan Setup Nginx - Step by Step

Panduan lengkap untuk mengkonfigurasi Nginx dengan benar untuk website Anda.

## 🚀 Quick Start - Check & Fix Otomatis

**Cara TERMUDAH:** Gunakan script check & fix otomatis:

```bash
# Di server, jalankan:
sudo bash scripts/nginx-check-and-fix.sh
```

Script ini akan:
- ✅ Cek konfigurasi nginx yang sedang aktif
- ✅ Cek lokasi build folder yang sebenarnya
- ✅ Deteksi masalah dan suggest fix
- ✅ Auto-update konfigurasi jika diperlukan

**Jika script menemukan masalah**, ikuti saran yang diberikan untuk memperbaikinya.

## 🎯 Tujuan

Konfigurasi ini akan:
- ✅ Serve static files langsung dari folder `build` (lebih cepat)
- ✅ Proxy request API ke backend (port 4000)
- ✅ Handle SSL/HTTPS dengan benar
- ✅ Optimasi caching untuk static assets
- ✅ Support React Router (SPA routing)

## 📍 Prasyarat

Sebelum mulai, pastikan:
- [ ] Nginx sudah terinstall di server
- [ ] Folder `build` sudah ada dan berisi file React build
- [ ] Backend sudah running di port 4000
- [ ] SSL certificate sudah terinstall (jika menggunakan HTTPS)
- [ ] Anda memiliki akses sudo/root

## 🔍 Step 1: Cek Lokasi Folder Build

Pertama, kita perlu tahu di mana folder `build` berada di server Anda.

```bash
# Login ke server
ssh user@your-server

# Cari folder build
find ~ -name "build" -type d 2>/dev/null
# atau
ls -la ~/website-ts/build
# atau jika di root
ls -la /root/website-ts/build
```

**Catat path lengkapnya**, contoh:
- `/home/ubuntu/website-ts/build`
- `/root/website-ts/build`
- `/var/www/website-ts/build`

## 🔧 Step 2: Update Konfigurasi Nginx

1. **Buka file konfigurasi nginx di project Anda:**
   ```bash
   # Di local machine atau di server
   nano config/nginx.conf
   ```

2. **Cari semua baris yang berisi path build dan ganti dengan path yang benar:**
   
   Cari baris-baris ini:
   ```nginx
   root /home/ubuntu/website-ts/build;
   alias /home/ubuntu/website-ts/build/static/;
   alias /home/ubuntu/website-ts/build/assets/;
   ```
   
   Ganti `/home/ubuntu/website-ts/build` dengan path build folder Anda yang sebenarnya.
   
   **Contoh jika build folder di `/root/website-ts/build`:**
   ```nginx
   root /root/website-ts/build;
   alias /root/website-ts/build/static/;
   alias /root/website-ts/build/assets/;
   ```

3. **Simpan file** (Ctrl+X, lalu Y, lalu Enter jika menggunakan nano)

## 📤 Step 3: Upload Konfigurasi ke Server

Jika Anda edit di local machine, upload ke server:

```bash
# Dari local machine
scp config/nginx.conf user@your-server:/tmp/nginx.conf
```

## 🚀 Step 4: Install Konfigurasi di Server

Login ke server dan jalankan:

```bash
# Login ke server
ssh user@your-server

# Backup konfigurasi lama (jika ada)
sudo cp /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-available/rickychen930.cloud.backup 2>/dev/null || true

# Copy konfigurasi baru
# Jika upload dari local:
sudo cp /tmp/nginx.conf /etc/nginx/sites-available/rickychen930.cloud

# Atau jika edit langsung di server:
sudo cp ~/website-ts/config/nginx.conf /etc/nginx/sites-available/rickychen930.cloud
```

## 🔗 Step 5: Buat Symlink (Jika Belum Ada)

```bash
# Cek apakah symlink sudah ada
ls -la /etc/nginx/sites-enabled/ | grep rickychen930

# Jika belum ada, buat symlink
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# Jika sudah ada tapi broken, hapus dulu lalu buat lagi
sudo rm /etc/nginx/sites-enabled/rickychen930.cloud
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/
```

## ✅ Step 6: Test Konfigurasi

**PENTING:** Selalu test sebelum reload!

```bash
# Test konfigurasi nginx
sudo nginx -t
```

Jika berhasil, Anda akan melihat:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**Jika ada error**, perbaiki dulu sebelum lanjut ke step berikutnya.

## 🔄 Step 7: Reload Nginx

Setelah test berhasil:

```bash
# Reload nginx (graceful, tidak akan drop connection)
sudo systemctl reload nginx

# Atau restart jika perlu
sudo systemctl restart nginx
```

## 🧪 Step 8: Verifikasi

1. **Cek status nginx:**
   ```bash
   sudo systemctl status nginx
   ```

2. **Test website:**
   ```bash
   # Test dari server
   curl -I https://rickychen930.cloud
   
   # Atau buka di browser
   # https://rickychen930.cloud
   ```

3. **Cek log jika ada masalah:**
   ```bash
   # Error log
   sudo tail -f /var/log/nginx/rickychen930.cloud.error.log
   
   # Access log
   sudo tail -f /var/log/nginx/rickychen930.cloud.access.log
   ```

## 🐛 Troubleshooting

### Error: "No such file or directory"

**Masalah:** Path ke folder build salah.

**Solusi:**
```bash
# Cek apakah folder build ada
ls -la /path/to/build

# Update path di nginx.conf dengan path yang benar
sudo nano /etc/nginx/sites-available/rickychen930.cloud
# Ganti semua path build dengan path yang benar
sudo nginx -t
sudo systemctl reload nginx
```

### Error: "Permission denied"

**Masalah:** Nginx tidak bisa akses folder build.

**Solusi:**
```bash
# Berikan permission ke nginx
sudo chown -R www-data:www-data /path/to/build
# atau
sudo chmod -R 755 /path/to/build
```

### Error: "502 Bad Gateway"

**Masalah:** Backend tidak running atau port salah.

**Solusi:**
```bash
# Cek apakah backend running
pm2 status
# atau
curl http://localhost:4000/health

# Jika tidak running, start backend
pm2 start backend/ecosystem.config.js --env production
```

### Static files tidak load

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

### Website masih menampilkan konten lama

**Masalah:** Browser cache atau nginx cache.

**Solusi:**
```bash
# Hard refresh di browser: Ctrl+Shift+R atau Cmd+Shift+R
# Atau clear browser cache

# Cek apakah file build terbaru
ls -la /path/to/build/index.html

# Pastikan nginx reload
sudo systemctl reload nginx
```

## 📝 Checklist Final

Setelah setup, pastikan:

- [ ] `sudo nginx -t` berhasil tanpa error
- [ ] Nginx status: `sudo systemctl status nginx` menunjukkan "active (running)"
- [ ] Website bisa diakses di browser: `https://rickychen930.cloud`
- [ ] Static files (CSS, JS, images) bisa di-load
- [ ] API calls berfungsi: `/api/*` routes bekerja
- [ ] React Router bekerja (navigasi antar halaman)
- [ ] SSL certificate valid (tidak ada warning di browser)
- [ ] Log nginx tidak ada error: `sudo tail /var/log/nginx/rickychen930.cloud.error.log`

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
```

## 📚 Referensi Tambahan

- [Nginx Documentation](https://nginx.org/en/docs/)
- [PM2 & Nginx Setup](./PM2_NGINX_SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**Penting:** Setelah mengubah konfigurasi, selalu jalankan `sudo nginx -t` sebelum reload untuk memastikan tidak ada syntax error!

