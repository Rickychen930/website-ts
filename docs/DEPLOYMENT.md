# 🚀 Deployment Guide

Panduan lengkap untuk deployment aplikasi website-ts secara profesional.

## 📋 Daftar Isi

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [PM2 Management](#pm2-management)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js 20.x atau lebih tinggi
- npm atau yarn
- MongoDB (local atau cloud seperti MongoDB Atlas)
- PM2 (untuk production)
- Nginx (untuk reverse proxy, opsional)
- SSL Certificate (untuk production HTTPS)

## Environment Variables

Copy file `config/env.example` ke `.env` dan sesuaikan nilai-nilainya:

```bash
cp config/env.example .env
```

### Variabel yang Diperlukan

```env
# Server Configuration
PORT=4000
NODE_ENV=production

# Database
MONGODB_URI=mongodb://localhost:27017/website-db
# atau untuk MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# CORS Configuration (comma-separated)
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:4000,https://rickychen930.cloud,http://rickychen930.cloud

# SSL Configuration (optional, untuk production)
SSL_CERT_PATH=/etc/letsencrypt/live/rickychen930.cloud/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/rickychen930.cloud/privkey.pem

# Frontend API URL (untuk React app)
REACT_APP_API_URL=https://rickychen930.cloud:4000
```

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment

Buat file `.env` dengan konfigurasi development.

### 3. Run Development Server

```bash
# Menjalankan frontend dan backend secara bersamaan
npm run dev

# Atau secara terpisah:
npm start                    # Frontend (port 3000)
npm run server:watch         # Backend (port 4000)
```

### 4. Seed Database (Opsional)

```bash
npm run seed
```

## Production Deployment

### Manual Deployment ke VPS

#### 1. Build Aplikasi

```bash
# Build frontend dan backend
npm run build:all

# Atau secara terpisah:
npm run build              # Frontend
npm run backend:build      # Backend
```

#### 2. Deploy ke Server

```bash
# Upload build folder dan backend/dist ke server
scp -r build user@server:/root/backend/
scp -r backend/dist user@server:/root/backend/dist/
scp backend/ecosystem.config.js user@server:/root/backend/
scp package.json user@server:/root/backend/
scp .env user@server:/root/backend/
```

#### 3. Setup di Server

```bash
# SSH ke server
ssh user@server

# Masuk ke direktori backend
cd /root/backend

# Install production dependencies
npm ci --only=production

# Buat direktori logs
mkdir -p logs

# Start dengan PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup  # Setup PM2 untuk auto-start pada boot
```

### Automated Deployment dengan GitHub Actions

Deployment otomatis akan berjalan setiap push ke branch `main`.

#### Setup GitHub Secrets

Tambahkan secrets berikut di GitHub Repository Settings → Secrets:

- `HOSTINGER_HOST`: IP atau domain server
- `HOSTINGER_USER`: Username SSH
- `HOSTINGER_SSH_KEY`: Private SSH key
- `REACT_APP_API_URL`: URL API untuk frontend (opsional)

#### Manual Trigger

Anda juga bisa trigger deployment manual dari GitHub Actions tab.

## Docker Deployment

### Build Docker Image

```bash
npm run docker:build
```

### Run dengan Docker Compose

```bash
# Start services
npm run docker:run

# Stop services
npm run docker:stop

# View logs
npm run docker:logs
```

### Manual Docker Commands

```bash
# Build
docker build -t website-backend .

# Run
docker run -d \
  -p 4000:4000 \
  -v $(pwd)/.env:/app/.env \
  -v $(pwd)/build:/app/build \
  --name website-backend \
  website-backend

# View logs
docker logs -f website-backend

# Stop
docker stop website-backend
docker rm website-backend
```

## PM2 Management

### Commands

```bash
# Start
pm2 start ecosystem.config.js --env production

# Stop
pm2 stop website-backend

# Restart
pm2 restart website-backend

# Delete
pm2 delete website-backend

# View logs
pm2 logs website-backend

# Monitor
pm2 monit

# Status
pm2 status

# Save current process list
pm2 save

# Setup startup script
pm2 startup
pm2 save
```

### PM2 Ecosystem Config

File `backend/ecosystem.config.js` sudah dikonfigurasi dengan:
- Auto-restart
- Memory limit (500MB)
- Log rotation
- Error handling

## Nginx Configuration (Opsional)

Jika menggunakan Nginx sebagai reverse proxy:

```nginx
server {
    listen 80;
    server_name rickychen930.cloud;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name rickychen930.cloud;

    ssl_certificate /etc/letsencrypt/live/rickychen930.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rickychen930.cloud/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to backend
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location /static/ {
        proxy_pass http://localhost:4000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Troubleshooting

### Backend tidak bisa connect ke MongoDB

1. Pastikan `MONGODB_URI` benar di `.env`
2. Pastikan MongoDB service berjalan
3. Check firewall rules untuk MongoDB port (27017)

### CORS Error

1. Pastikan domain frontend ada di `ALLOWED_ORIGINS`
2. Check format: `https://domain.com,http://domain.com` (comma-separated)

### PM2 Process Tidak Start

```bash
# Check logs
pm2 logs website-backend --lines 100

# Check ecosystem config
pm2 ecosystem backend/ecosystem.config.js

# Restart dengan fresh start
pm2 delete website-backend
pm2 start ecosystem.config.js --env production
```

### Build Gagal

```bash
# Clear cache dan rebuild
rm -rf node_modules build backend/dist
npm install
npm run build:all
```

### Health Check Failed

```bash
# Test health endpoint
curl http://localhost:4000/health

# Check backend logs
pm2 logs website-backend

# Check port availability
netstat -tulpn | grep 4000
```

## Best Practices

1. **Environment Variables**: Jangan commit `.env` ke repository
2. **SSL**: Selalu gunakan HTTPS di production
3. **Monitoring**: Setup monitoring untuk PM2 (PM2 Plus atau custom)
4. **Backup**: Backup database secara berkala
5. **Logs**: Rotate logs secara berkala untuk menghindari disk penuh
6. **Updates**: Update dependencies secara berkala
7. **Security**: Review dan update security headers

## Support

Untuk masalah deployment, check:
- PM2 logs: `pm2 logs website-backend`
- Nginx logs: `/var/log/nginx/error.log`
- System logs: `journalctl -u nginx`

