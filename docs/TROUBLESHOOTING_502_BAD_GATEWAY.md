# 🔧 Troubleshooting 502 Bad Gateway - Manual Check Steps

## 📋 Overview

502 Bad Gateway error terjadi ketika Nginx tidak bisa terhubung ke backend server. Dokumen ini berisi langkah-langkah manual untuk mendiagnosis dan memperbaiki masalah.

## 🎯 Quick Diagnosis

502 Bad Gateway biasanya disebabkan oleh:

1. ❌ Backend server tidak berjalan
2. ❌ Backend tidak listening di port 4000
3. ❌ PM2 process crash atau stopped
4. ❌ Database connection error (MongoDB)
5. ❌ Nginx configuration error
6. ❌ Firewall blocking port 4000

---

## 🔍 STEP-BY-STEP MANUAL CHECK

### **STEP 1: Cek Status PM2 Process**

```bash
# SSH ke server
ssh root@your-server-ip

# Cek status PM2
pm2 list

# Expected output:
# ┌─────┬─────────────────┬─────────┬─────────┬──────────┐
# │ id  │ name            │ status  │ restart │ uptime   │
# ├─────┼─────────────────┼─────────┼─────────┼──────────┤
# │ 0   │ website-backend │ online  │ 0       │ 5m       │
# └─────┴─────────────────┴─────────┴─────────┴──────────┘
```

**✅ Jika status = `online`**: Lanjut ke STEP 2  
**❌ Jika status = `errored` atau `stopped`**: Lihat STEP 1.1

#### **STEP 1.1: Cek PM2 Logs (Jika Process Error)**

```bash
# Cek error logs
pm2 logs website-backend --lines 50 --err

# Cek output logs
pm2 logs website-backend --lines 50 --out

# Cek detail process
pm2 info website-backend
```

**Common errors:**

- `MongoDB connection failed` → Lihat STEP 4
- `Port 4000 already in use` → Lihat STEP 2.1
- `Cannot find module` → Dependencies tidak terinstall

---

### **STEP 2: Cek Port 4000 Listening**

```bash
# Cek apakah port 4000 sedang listening
ss -tlnp | grep :4000

# Atau menggunakan netstat
netstat -tlnp | grep :4000

# Expected output:
# LISTEN  0  128  0.0.0.0:4000  0.0.0.0:*  users:(("node",pid=12345,fd=20))
```

**✅ Jika port 4000 listening**: Lanjut ke STEP 3  
**❌ Jika port 4000 tidak listening**: Lihat STEP 2.1

#### **STEP 2.1: Restart Backend (Jika Port Tidak Listening)**

```bash
# Stop dan hapus process lama
pm2 stop website-backend
pm2 delete website-backend

# Cek apakah port masih digunakan oleh process lain
lsof -i :4000

# Jika ada process lain, kill process tersebut
kill -9 <PID>

# Restart backend
cd /root/backend
pm2 start ecosystem.config.js --env production
pm2 save

# Tunggu 5 detik, lalu cek lagi
sleep 5
pm2 list
ss -tlnp | grep :4000
```

---

### **STEP 3: Test Backend Health Check (Local)**

```bash
# Test health check dari server sendiri
curl http://localhost:4000/health

# Expected output:
# {"status":"ok"}
```

**✅ Jika response = `{"status":"ok"}`**: Backend berjalan dengan baik, lanjut ke STEP 5  
**❌ Jika connection refused atau timeout**: Lihat STEP 3.1

#### **STEP 3.1: Debug Backend Connection**

```bash
# Cek apakah backend process benar-benar running
ps aux | grep -E "node|tsx" | grep -v grep

# Cek PM2 status detail
pm2 describe website-backend

# Cek apakah ada error di startup
pm2 logs website-backend --lines 100
```

---

### **STEP 4: Cek Database Connection (MongoDB)**

```bash
# Cek .env file
cd /root/backend
cat .env | grep MONGODB_URI

# Test MongoDB connection (jika ada script)
node -e "
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('✅ MongoDB connected'); process.exit(0); })
  .catch(err => { console.error('❌ MongoDB error:', err.message); process.exit(1); });
"
```

**✅ Jika MongoDB connected**: Lanjut ke STEP 5  
**❌ Jika MongoDB connection failed**:

1. Cek MONGODB_URI di `.env` file
2. Pastikan MongoDB Atlas IP whitelist sudah include server IP
3. Cek network connectivity: `ping mongodb.net`

---

### **STEP 5: Cek Nginx Configuration**

```bash
# Test nginx configuration
sudo nginx -t

# Expected output:
# nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
# nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**✅ Jika config valid**: Lanjut ke STEP 6  
**❌ Jika config error**: Fix error yang ditampilkan

#### **STEP 5.1: Cek Nginx Proxy Configuration**

```bash
# Cek nginx config untuk backend proxy
sudo cat /etc/nginx/sites-available/rickychen930.cloud | grep -A 20 "location /api"

# Pastikan proxy_pass mengarah ke:
# proxy_pass http://localhost:4000;
```

---

### **STEP 6: Cek Nginx Error Logs**

```bash
# Cek nginx error logs
sudo tail -50 /var/log/nginx/rickychen930.cloud.error.log

# Cek nginx access logs
sudo tail -50 /var/log/nginx/rickychen930.cloud.access.log
```

**Cari error seperti:**

- `connect() failed (111: Connection refused)` → Backend tidak running
- `upstream timed out` → Backend terlalu lama response
- `upstream prematurely closed connection` → Backend crash

---

### **STEP 7: Test Nginx Proxy ke Backend**

```bash
# Test dari server sendiri
curl -v http://localhost/api/profile

# Atau test health check melalui nginx
curl -v https://rickychen930.cloud/health
```

**✅ Jika response OK**: Masalah mungkin di browser/cache, coba hard refresh  
**❌ Jika 502 Bad Gateway**: Lanjut ke STEP 8

---

### **STEP 8: Restart Services**

```bash
# Restart backend
cd /root/backend
pm2 restart website-backend

# Tunggu 5 detik
sleep 5

# Restart nginx
sudo systemctl restart nginx

# Cek status
pm2 list
sudo systemctl status nginx
```

---

### **STEP 9: Cek Firewall**

```bash
# Cek firewall rules (jika menggunakan ufw)
sudo ufw status

# Cek iptables
sudo iptables -L -n | grep 4000

# Test dari localhost (harusnya bisa)
curl http://localhost:4000/health
```

---

## 🚨 COMMON FIXES

### **Fix 1: Backend Tidak Start**

```bash
cd /root/backend

# Cek .env file
cat .env

# Install dependencies jika perlu
npm install --omit=dev --legacy-peer-deps

# Start dengan PM2
pm2 start ecosystem.config.js --env production
pm2 save
```

### **Fix 2: Port 4000 Sudah Digunakan**

```bash
# Cek process yang menggunakan port 4000
lsof -i :4000

# Kill process tersebut
kill -9 <PID>

# Atau gunakan port lain (update .env dan nginx config)
```

### **Fix 3: MongoDB Connection Error**

```bash
cd /root/backend

# Cek MONGODB_URI
cat .env | grep MONGODB_URI

# Pastikan format benar:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Test connection
node -e "require('dotenv').config(); const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URI).then(() => console.log('OK')).catch(e => console.error(e));"
```

### **Fix 4: Nginx Proxy Timeout**

Edit nginx config:

```bash
sudo nano /etc/nginx/sites-available/rickychen930.cloud
```

Tambah timeout settings di `location /api`:

```nginx
proxy_connect_timeout 60s;
proxy_send_timeout 60s;
proxy_read_timeout 60s;
```

Kemudian:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📊 QUICK CHECKLIST

Gunakan checklist ini untuk quick diagnosis:

```bash
# 1. PM2 Status
pm2 list | grep website-backend

# 2. Port Listening
ss -tlnp | grep :4000

# 3. Health Check
curl http://localhost:4000/health

# 4. Nginx Config
sudo nginx -t

# 5. Nginx Status
sudo systemctl status nginx

# 6. Nginx Logs
sudo tail -20 /var/log/nginx/rickychen930.cloud.error.log
```

---

## 🔄 COMPLETE RESTART PROCEDURE

Jika semua else fails, lakukan complete restart:

```bash
# 1. Stop semua
pm2 stop all
sudo systemctl stop nginx

# 2. Cek dan cleanup
lsof -i :4000
# Kill jika ada process lain

# 3. Start backend
cd /root/backend
pm2 start ecosystem.config.js --env production
pm2 save

# 4. Wait
sleep 10

# 5. Verify backend
curl http://localhost:4000/health

# 6. Start nginx
sudo systemctl start nginx
sudo systemctl status nginx

# 7. Test
curl https://rickychen930.cloud/health
```

---

## 📞 NEXT STEPS

Jika masalah masih terjadi setelah semua langkah di atas:

1. **Cek PM2 logs lengkap**: `pm2 logs website-backend --lines 200`
2. **Cek system logs**: `journalctl -u nginx -n 50`
3. **Cek disk space**: `df -h`
4. **Cek memory**: `free -h`
5. **Cek CPU**: `top` atau `htop`

---

## 📝 NOTES

- Backend default port: **4000**
- PM2 process name: **website-backend**
- Nginx config: `/etc/nginx/sites-available/rickychen930.cloud`
- Backend directory: `/root/backend`
- Build directory: `/var/www/website-ts/build`
- Health check endpoint: `/health`

---

**Last Updated**: 2026-01-23
