# 🚀 Langkah Selanjutnya Setelah Fix npm ci Error

Setelah memperbaiki error npm, ikuti langkah-langkah berikut untuk menyelesaikan deployment:

## 📋 Checklist Lengkap

### ✅ Step 1: Install Dependencies (SUDAH DILAKUKAN)
```bash
cd /root/website-ts
npm ci --omit=dev --legacy-peer-deps
# atau
npm install --omit=dev --legacy-peer-deps
```

### ✅ Step 2: Setup PM2

#### 2.1 Install PM2 (jika belum)
```bash
npm install -g pm2
```

#### 2.2 Pastikan direktori logs ada
```bash
mkdir -p backend/logs
```

#### 2.3 Start aplikasi dengan PM2
```bash
# Menggunakan script helper
bash pm2-setup.sh start

# Atau manual:
pm2 start backend/ecosystem.config.js --env production
pm2 save
```

#### 2.4 Setup PM2 untuk auto-start saat boot
```bash
pm2 startup
# Copy command yang muncul, lalu jalankan (biasanya seperti):
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u root --hp /root

pm2 save
```

#### 2.5 Verifikasi PM2
```bash
# Check status
pm2 status

# Check logs
pm2 logs website-backend

# Test health endpoint
curl http://localhost:4000/health
```

**Expected output dari health check:**
```json
{
  "status": "ok",
  "env": "production",
  "timestamp": "2026-01-06T...",
  "uptime": 123.456
}
```

---

### ✅ Step 3: Setup Nginx

#### 3.1 Install Nginx (jika belum)
```bash
sudo apt update
sudo apt install nginx -y
```

#### 3.2 Setup Nginx configuration
```bash
# Menggunakan script helper
sudo bash nginx-setup.sh

# Atau manual:
sudo cp nginx.conf /etc/nginx/sites-available/rickychen930.cloud
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t
```

#### 3.3 Reload Nginx
```bash
sudo systemctl reload nginx
# atau
sudo systemctl restart nginx
```

#### 3.4 Check Nginx status
```bash
sudo systemctl status nginx
```

#### 3.5 Verifikasi Nginx
```bash
# Test dari server
curl http://localhost/health
curl -I http://localhost
```

---

### ✅ Step 4: Setup SSL Certificate (Let's Encrypt)

#### 4.1 Install Certbot
```bash
sudo apt install certbot python3-certbot-nginx -y
```

#### 4.2 Get SSL Certificate
```bash
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud
```

**Catatan:** 
- Certbot akan menanyakan email untuk notifikasi
- Pilih "Y" untuk redirect HTTP ke HTTPS
- Certificate akan otomatis di-renew setiap 90 hari

#### 4.3 Test auto-renewal
```bash
sudo certbot renew --dry-run
```

#### 4.4 Verifikasi SSL
```bash
# Test dari server
curl https://localhost/health

# Test dari browser
# Buka: https://rickychen930.cloud
```

---

### ✅ Step 5: Setup Firewall (jika belum)

```bash
# Check firewall status
sudo ufw status

# Allow ports (jika firewall aktif)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS

# Enable firewall (jika belum)
sudo ufw enable
```

---

### ✅ Step 6: Final Verification

#### 6.1 Test dari Server
```bash
# Test backend langsung
curl http://localhost:4000/health

# Test melalui Nginx (HTTP)
curl http://localhost/health

# Test melalui Nginx (HTTPS)
curl https://localhost/health
```

#### 6.2 Test dari Browser
- Buka: `https://rickychen930.cloud`
- Buka: `https://rickychen930.cloud/health`
- Buka: `https://rickychen930.cloud/api` (jika ada endpoint)

#### 6.3 Check Logs
```bash
# PM2 logs
pm2 logs website-backend

# Nginx error logs
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log

# Nginx access logs
sudo tail -f /var/log/nginx/rickychen930.cloud.access.log
```

---

## 🔄 Quick Commands Summary

```bash
# Di Server (SSH):

# 1. Install dependencies
cd /root/website-ts
npm ci --omit=dev --legacy-peer-deps

# 2. Setup PM2
npm install -g pm2
mkdir -p backend/logs
bash pm2-setup.sh start
pm2 startup
pm2 save

# 3. Setup Nginx
sudo apt install nginx -y
sudo bash nginx-setup.sh
sudo nginx -t
sudo systemctl reload nginx

# 4. Setup SSL
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud

# 5. Verify
pm2 status
curl https://rickychen930.cloud/health
```

---

## 🆘 Troubleshooting

### PM2 tidak start?
```bash
# Check logs
pm2 logs website-backend --lines 50

# Check jika backend sudah di-build
ls -la backend/dist/main.js

# Rebuild jika perlu
npm run backend:build
```

### Nginx 502 Bad Gateway?
```bash
# Check jika backend running
pm2 status

# Check backend logs
pm2 logs website-backend

# Test backend langsung
curl http://localhost:4000/health

# Check Nginx error log
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log
```

### SSL Certificate error?
```bash
# Check certificate
sudo certbot certificates

# Renew certificate
sudo certbot renew

# Check certificate files
sudo ls -la /etc/letsencrypt/live/rickychen930.cloud/
```

### Port sudah digunakan?
```bash
# Check port 4000
sudo lsof -i :4000
# atau
sudo netstat -tulpn | grep 4000

# Kill process jika perlu
sudo kill -9 <PID>
```

---

## 📝 Checklist Final

- [ ] Dependencies terinstall (`npm ci` atau `npm install` berhasil)
- [ ] PM2 installed dan running (`pm2 status` menunjukkan website-backend)
- [ ] PM2 auto-start configured (`pm2 startup` dan `pm2 save`)
- [ ] Backend health check berhasil (`curl http://localhost:4000/health`)
- [ ] Nginx installed dan configured
- [ ] Nginx test berhasil (`sudo nginx -t`)
- [ ] Nginx running (`sudo systemctl status nginx`)
- [ ] SSL certificate installed (`sudo certbot certificates`)
- [ ] HTTPS working (`curl https://rickychen930.cloud/health`)
- [ ] Website accessible dari browser
- [ ] Firewall configured (ports 80, 443, 22)

---

## 🎉 Selesai!

Jika semua checklist sudah ✅, website Anda seharusnya sudah:
- ✅ Running di PM2
- ✅ Accessible via HTTPS
- ✅ Auto-restart saat server reboot
- ✅ SSL certificate auto-renew

Selamat! 🚀

