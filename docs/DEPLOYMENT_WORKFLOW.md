# 🚀 Deployment Workflow - Local vs Server

Panduan lengkap tentang apa yang dilakukan di **local** dan apa yang dilakukan di **server (via SSH)**.

## 📍 Ringkasan

| Tugas | Lokasi | Keterangan |
|-------|--------|------------|
| Build aplikasi | **Local** | Build frontend & backend |
| Upload files | **Local → Server** | Menggunakan SCP/SFTP |
| PM2 Setup | **Server (SSH)** | Setup dan start PM2 |
| Nginx Setup | **Server (SSH)** | Setup Nginx config |
| SSL Certificate | **Server (SSH)** | Install Let's Encrypt |

---

## 🖥️ STEP 1: Di Local Machine (Komputer Anda)

### 1.1 Build Aplikasi

```bash
# Di local machine
cd /Users/giftforyou.idn/Documents/website-ts

# Install dependencies (jika belum)
npm install

# Build frontend dan backend
npm run build:all
# atau
npm run build              # Frontend
npm run backend:build      # Backend
```

### 1.2 Siapkan File untuk Upload

Pastikan file-file ini siap:
- ✅ `build/` (folder hasil build frontend)
- ✅ `backend/dist/` (folder hasil build backend)
- ✅ `backend/ecosystem.config.js`
- ✅ `package.json`
- ✅ `.env` (file environment variables)
- ✅ `nginx.conf` (untuk setup nginx di server)
- ✅ `pm2-setup.sh` (helper script)
- ✅ `nginx-setup.sh` (helper script)

### 1.3 Upload ke Server

```bash
# Ganti dengan detail server Anda
SERVER_USER="root"  # atau username Anda
SERVER_HOST="rickychen930.cloud"  # atau IP server
SERVER_PATH="/root/website-ts"  # path di server

# Upload semua file yang diperlukan
scp -r build ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp -r backend/dist ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/backend/
scp backend/ecosystem.config.js ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/backend/
scp package.json ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp package-lock.json ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp .env ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp nginx.conf ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp pm2-setup.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp nginx-setup.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
```

**Atau gunakan script otomatis:**

```bash
# Buat file upload.sh di local
cat > upload.sh << 'EOF'
#!/bin/bash
SERVER_USER="root"
SERVER_HOST="rickychen930.cloud"
SERVER_PATH="/root/website-ts"

echo "📤 Uploading files to server..."

scp -r build ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp -r backend/dist ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/backend/
scp backend/ecosystem.config.js ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/backend/
scp package.json ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp .env ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp nginx.conf ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp pm2-setup.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
scp nginx-setup.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

echo "✅ Upload complete!"
EOF

chmod +x upload.sh
./upload.sh
```

---

## 🖥️ STEP 2: Di Server (Via SSH)

### 2.1 SSH ke Server

```bash
# Dari local machine
ssh root@rickychen930.cloud
# atau
ssh root@<IP_SERVER>
```

### 2.2 Setup Environment di Server

```bash
# Masuk ke direktori project
cd /root/website-ts

# Install production dependencies
# Jika ada package-lock.json:
npm ci --omit=dev --legacy-peer-deps
# Jika tidak ada package-lock.json:
# npm install --omit=dev --legacy-peer-deps

# Pastikan direktori logs ada
mkdir -p backend/logs
```

### 2.3 Setup PM2 (Di Server)

```bash
# Install PM2 global (jika belum)
npm install -g pm2

# Setup dan start dengan script
bash pm2-setup.sh setup
bash pm2-setup.sh start

# Atau manual:
pm2 start backend/ecosystem.config.js --env production
pm2 save
pm2 startup  # Setup auto-start on boot
```

**Verifikasi PM2:**
```bash
# Check status
pm2 status

# Check logs
pm2 logs website-backend

# Test health endpoint
curl http://localhost:4000/health
```

### 2.4 Setup Nginx (Di Server - Perlu Root)

```bash
# Install Nginx (jika belum)
sudo apt update
sudo apt install nginx -y

# Setup dengan script
sudo bash nginx-setup.sh

# Atau manual:
sudo cp nginx.conf /etc/nginx/sites-available/rickychen930.cloud
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### 2.5 Setup SSL Certificate (Di Server - Perlu Root)

```bash
# Install Certbot (jika belum)
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud

# Test auto-renewal
sudo certbot renew --dry-run
```

### 2.6 Verifikasi Semua Berjalan

```bash
# Check PM2
pm2 status

# Check Nginx
sudo systemctl status nginx

# Test dari server
curl http://localhost:4000/health
curl https://rickychen930.cloud/health

# Check logs
pm2 logs website-backend
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log
```

---

## 🔄 Workflow Lengkap (Quick Reference)

### Di Local:
```bash
# 1. Build
npm run build:all

# 2. Upload (ganti dengan detail server Anda)
scp -r build root@rickychen930.cloud:/root/website-ts/
scp -r backend/dist root@rickychen930.cloud:/root/website-ts/backend/
scp backend/ecosystem.config.js root@rickychen930.cloud:/root/website-ts/backend/
scp package.json package-lock.json .env nginx.conf pm2-setup.sh nginx-setup.sh root@rickychen930.cloud:/root/website-ts/
```

### Di Server (SSH):
```bash
# 1. SSH ke server
ssh root@rickychen930.cloud

# 2. Setup environment
cd /root/website-ts
# Install dependencies
if [ -f "package-lock.json" ]; then
    npm ci --omit=dev --legacy-peer-deps
else
    npm install --omit=dev --legacy-peer-deps
fi
mkdir -p backend/logs

# 3. Setup PM2
bash pm2-setup.sh start
pm2 startup
pm2 save

# 4. Setup Nginx
sudo bash nginx-setup.sh

# 5. Setup SSL (jika belum)
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud
```

---

## 📝 Checklist Deployment

### ✅ Di Local:
- [ ] Code sudah di-commit dan push ke repository
- [ ] Build frontend: `npm run build`
- [ ] Build backend: `npm run backend:build`
- [ ] File `.env` sudah disiapkan dengan konfigurasi production
- [ ] Upload semua file ke server

### ✅ Di Server (via SSH):
- [ ] File sudah ter-upload dengan benar
- [ ] Install dependencies: `npm ci --omit=dev --legacy-peer-deps` (atau `npm install --omit=dev --legacy-peer-deps` jika tidak ada package-lock.json)
- [ ] PM2 installed: `npm install -g pm2`
- [ ] PM2 started: `bash pm2-setup.sh start`
- [ ] PM2 auto-start setup: `pm2 startup && pm2 save`
- [ ] Nginx installed dan configured
- [ ] SSL certificate installed
- [ ] Firewall configured (ports 80, 443)
- [ ] Health check passing: `curl https://rickychen930.cloud/health`

---

## 🔧 Update Deployment (Setelah Perubahan Code)

### Di Local:
```bash
# 1. Build ulang
npm run build:all

# 2. Upload file yang berubah
scp -r build root@rickychen930.cloud:/root/website-ts/
scp -r backend/dist root@rickychen930.cloud:/root/website-ts/backend/
```

### Di Server (SSH):
```bash
# 1. SSH ke server
ssh root@rickychen930.cloud

# 2. Restart PM2
cd /root/website-ts
bash pm2-setup.sh restart

# Atau manual:
pm2 restart website-backend
```

---

## ⚠️ Catatan Penting

1. **PM2 Setup**: Bisa di-test di local, tapi untuk production harus di server
2. **Nginx Setup**: **HARUS** di server karena butuh akses root dan file system server
3. **SSL Certificate**: **HARUS** di server karena Let's Encrypt perlu verifikasi domain
4. **Environment Variables**: Pastikan `.env` di server sudah benar (jangan commit ke git!)
5. **Firewall**: Pastikan port 80, 443, dan 22 (SSH) terbuka di server

---

## 🆘 Troubleshooting

### Tidak bisa SSH ke server?
```bash
# Check koneksi
ping rickychen930.cloud

# Check SSH key
ssh -v root@rickychen930.cloud
```

### File tidak ter-upload?
```bash
# Check permission
ls -la /root/website-ts/

# Check disk space
df -h
```

### PM2 tidak start di server?
```bash
# Check logs
pm2 logs website-backend

# Check if backend is built
ls -la /root/website-ts/backend/dist/main.js

# Rebuild if needed
cd /root/website-ts
npm run backend:build
```

---

## 📚 File yang Perlu Di-Upload ke Server

```
website-ts/
├── build/                    # ✅ Frontend build
├── backend/
│   ├── dist/                 # ✅ Backend build
│   └── ecosystem.config.js   # ✅ PM2 config
├── package.json              # ✅ Dependencies
├── package-lock.json          # ✅ Lock file (untuk npm ci)
├── .env                      # ✅ Environment variables (JANGAN commit!)
├── nginx.conf                # ✅ Nginx config
├── pm2-setup.sh             # ✅ PM2 helper script
└── nginx-setup.sh           # ✅ Nginx helper script
```

**File yang TIDAK perlu di-upload:**
- `node_modules/` (install di server dengan `npm ci`)
- `src/` (sudah di-build jadi `dist/` dan `build/`)
- `.git/`
- File development lainnya

