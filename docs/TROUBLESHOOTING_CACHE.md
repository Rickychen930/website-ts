# 🔄 Troubleshooting: Tampilan Masih Lama Setelah Deploy

Jika setelah deployment berhasil, tapi tampilan website masih menggunakan versi lama, ikuti langkah-langkah berikut:

## 🎯 Solusi Cepat

### 1. Hard Refresh Browser (Paling Umum)

Browser biasanya cache file HTML dan CSS. Lakukan hard refresh:

**Windows/Linux:**
- `Ctrl + Shift + R` atau `Ctrl + F5`

**Mac:**
- `Cmd + Shift + R` atau `Cmd + Option + R`

**Chrome DevTools:**
- Buka DevTools (F12)
- Klik kanan pada tombol refresh
- Pilih "Empty Cache and Hard Reload"

### 2. Clear Browser Cache

**Chrome:**
1. Buka Settings → Privacy and Security → Clear browsing data
2. Pilih "Cached images and files"
3. Klik "Clear data"

**Firefox:**
1. Buka Settings → Privacy & Security
2. Klik "Clear Data" di bagian Cookies and Site Data
3. Centang "Cached Web Content"
4. Klik "Clear"

**Safari:**
1. Safari → Preferences → Advanced
2. Enable "Show Develop menu"
3. Develop → Empty Caches

### 3. Test di Incognito/Private Mode

Buka website di mode incognito/private untuk memastikan tidak ada cache:
- Chrome: `Ctrl + Shift + N` (Windows) atau `Cmd + Shift + N` (Mac)
- Firefox: `Ctrl + Shift + P` (Windows) atau `Cmd + Shift + P` (Mac)
- Safari: `Cmd + Shift + N`

## 🔧 Solusi di Server

### 1. Verifikasi Build Terbaru

SSH ke server dan cek apakah file build sudah ter-update:

```bash
ssh root@rickychen930.cloud

# Cek timestamp file build
ls -lah /root/backend/build/index.html
ls -lah /root/backend/build/static/js/
ls -lah /root/backend/build/static/css/

# Cek apakah file baru (harusnya timestamp baru)
stat /root/backend/build/index.html
```

### 2. Restart PM2

Pastikan backend sudah restart dengan build terbaru:

```bash
cd /root/backend
pm2 restart website-backend
pm2 logs website-backend --lines 50
```

### 3. Restart Nginx

Restart Nginx untuk memastikan konfigurasi terbaru diterapkan:

```bash
sudo systemctl restart nginx
sudo nginx -t  # Test config sebelum restart
```

### 4. Clear Nginx Cache (jika ada)

Jika menggunakan Nginx cache:

```bash
# Hapus cache directory (jika ada)
sudo rm -rf /var/cache/nginx/*

# Restart Nginx
sudo systemctl restart nginx
```

### 5. Verifikasi File di Server

Pastikan file build sudah ter-deploy dengan benar:

```bash
# Cek apakah build folder ada
ls -la /root/backend/build/

# Cek apakah index.html ada
cat /root/backend/build/index.html | head -20

# Cek apakah asset files ada
ls -la /root/backend/build/static/js/
ls -la /root/backend/build/static/css/
```

## 🔍 Debugging

### 1. Cek Response Headers

Gunakan browser DevTools untuk cek response headers:

1. Buka DevTools (F12)
2. Tab Network
3. Reload page
4. Klik pada request ke `index.html`
5. Cek Response Headers:
   - `Cache-Control` harus `no-cache, no-store, must-revalidate`
   - `Pragma` harus `no-cache`
   - `Expires` harus `0`

### 2. Cek File Version

React build menggunakan hash untuk cache busting. Cek apakah hash file sudah berubah:

```bash
# Di local, setelah build
ls -la build/static/js/
# Catat nama file, misalnya: main.abc123.js

# Di server
ls -la /root/backend/build/static/js/
# Pastikan nama file sama dengan yang di local
```

### 3. Cek Network Tab

1. Buka DevTools → Network tab
2. Reload page
3. Cek apakah file CSS/JS yang di-load sudah terbaru
4. Lihat status code (harus 200, bukan 304 Not Modified)

### 4. Test dengan curl

Test langsung dari server untuk memastikan backend serve file terbaru:

```bash
ssh root@rickychen930.cloud
curl -I http://localhost:4000/
curl http://localhost:4000/ | head -20
```

## 🚀 Update Nginx Config

Pastikan Nginx config sudah di-update dengan no-cache headers untuk HTML files.

File: `/etc/nginx/sites-available/rickychen930.cloud`

Setelah update, reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 📝 Checklist

Gunakan checklist ini untuk troubleshooting:

- [ ] Sudah hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- [ ] Sudah test di incognito/private mode
- [ ] File build di server sudah ter-update (cek timestamp)
- [ ] PM2 sudah restart
- [ ] Nginx sudah restart
- [ ] Response headers menunjukkan no-cache
- [ ] File CSS/JS di Network tab sudah terbaru
- [ ] Test dengan curl dari server berhasil

## 🆘 Masih Tidak Berhasil?

Jika semua langkah di atas sudah dilakukan tapi masih tidak berhasil:

1. **Cek GitHub Actions logs**
   - Pastikan deployment workflow berhasil
   - Cek apakah build step berhasil
   - Cek apakah file ter-upload dengan benar

2. **Force rebuild dan redeploy**
   ```bash
   # Di local
   rm -rf build backend/dist node_modules
   npm install
   npm run build:all
   
   # Push ke GitHub untuk trigger deployment
   git add .
   git commit -m "Force rebuild"
   git push origin main
   ```

3. **Manual deploy**
   - Ikuti langkah di [DEPLOYMENT_WORKFLOW.md](./DEPLOYMENT_WORKFLOW.md)
   - Pastikan semua file ter-upload dengan benar

4. **Cek backend logs**
   ```bash
   ssh root@rickychen930.cloud
   pm2 logs website-backend --lines 100
   ```

## 💡 Tips Pencegahan

1. **Selalu hard refresh setelah deploy** untuk memastikan melihat versi terbaru
2. **Gunakan versioning** untuk assets (React sudah otomatis dengan hash)
3. **Set no-cache headers** untuk HTML files di Nginx
4. **Monitor deployment logs** di GitHub Actions

## 📚 Referensi

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Panduan deployment lengkap
- [DEPLOYMENT_WORKFLOW.md](./DEPLOYMENT_WORKFLOW.md) - Workflow deployment
- [PM2_NGINX_SETUP.md](./PM2_NGINX_SETUP.md) - Setup PM2 dan Nginx

