# 🚀 Setup Nginx Langsung di Server

Panduan untuk setup nginx ketika source code tidak ada di server (hanya build folder).

## Situasi

Anda berada di `/var/www/website-ts` yang hanya berisi folder build, tanpa file konfigurasi.

## Solusi: Buat Konfigurasi Nginx Langsung di Server

### Step 1: Buat File Konfigurasi Nginx

**Jalankan di server:**

```bash
sudo nano /etc/nginx/sites-available/rickychen930.cloud
```

**Copy-paste konfigurasi berikut (sesuaikan domain jika berbeda):**

```nginx
# Nginx Configuration for website-ts
# Build folder: /var/www/website-ts/build

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name rickychen930.cloud www.rickychen930.cloud;

    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Redirect all other traffic to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name rickychen930.cloud www.rickychen930.cloud;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/rickychen930.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rickychen930.cloud/privkey.pem;

    # SSL Security Settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384';
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_session_tickets off;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Client body size limit
    client_max_body_size 10M;

    # Root directory untuk static files
    root /var/www/website-ts/build;
    index index.html;

    # Proxy settings untuk backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_cache_bypass $http_upgrade;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Health check endpoint - proxy ke backend
    location /health {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        access_log off;
    }

    # Static files dengan caching (CSS, JS, images, fonts)
    location /static/ {
        alias /var/www/website-ts/build/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Assets dengan caching (images, fonts, dll)
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|map)$ {
        root /var/www/website-ts/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Assets folder (untuk images, documents, dll)
    location /assets/ {
        alias /var/www/website-ts/build/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # HTML files - no cache untuk memastikan konten fresh
    location ~* \.html$ {
        root /var/www/website-ts/build;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    # Main application - serve static files dan handle SPA routing
    location / {
        root /var/www/website-ts/build;
        try_files $uri $uri/ /index.html;

        # No cache untuk index.html
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
        add_header Pragma "no-cache" always;
        add_header Expires "0" always;
    }

    # Logging
    access_log /var/log/nginx/rickychen930.cloud.access.log;
    error_log /var/log/nginx/rickychen930.cloud.error.log;
}
```

**Simpan file:**

- Tekan `Ctrl+X`
- Tekan `Y` untuk confirm
- Tekan `Enter`

### Step 2: Buat Symlink

```bash
# Hapus symlink lama jika ada
sudo rm -f /etc/nginx/sites-enabled/rickychen930.cloud

# Buat symlink baru
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/

# Verifikasi
ls -la /etc/nginx/sites-enabled/ | grep rickychen930
```

### Step 3: Set Permission Folder Build

```bash
# Set ownership ke www-data (user nginx)
sudo chown -R www-data:www-data /var/www/website-ts

# Set permission yang benar
sudo chmod -R 755 /var/www/website-ts

# Verifikasi
ls -la /var/www/website-ts
```

### Step 4: Test Konfigurasi

```bash
# Test konfigurasi nginx
sudo nginx -t
```

**Jika berhasil**, akan muncul:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

**Jika ada error**, perbaiki sesuai error yang muncul.

### Step 5: Reload Nginx

```bash
# Reload nginx
sudo systemctl reload nginx

# Cek status
sudo systemctl status nginx
```

### Step 6: Verifikasi

```bash
# Test website
curl -I https://rickychen930.cloud

# Atau test dari browser
# https://rickychen930.cloud
```

## Troubleshooting

### Error: "No such file or directory" untuk build folder

```bash
# Cek apakah folder build ada
ls -la /var/www/website-ts/build

# Jika belum ada, buat folder
sudo mkdir -p /var/www/website-ts/build
sudo chown -R www-data:www-data /var/www/website-ts
sudo chmod -R 755 /var/www/website-ts
```

### Error: "Permission denied"

```bash
# Fix permission
sudo chown -R www-data:www-data /var/www/website-ts
sudo chmod -R 755 /var/www/website-ts
```

### Error: SSL certificate tidak ditemukan

Jika belum setup SSL, Anda bisa setup dulu:

```bash
# Install certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx -y

# Generate SSL certificate
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud
```

**ATAU** jika belum ada SSL, Anda bisa temporary menggunakan HTTP saja dengan mengedit konfigurasi:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name rickychen930.cloud www.rickychen930.cloud;

    root /var/www/website-ts/build;
    index index.html;

    # ... (copy semua location blocks dari HTTPS server, tanpa SSL config)
}
```

## Quick Command Reference

```bash
# Edit konfigurasi
sudo nano /etc/nginx/sites-available/rickychen930.cloud

# Test konfigurasi
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Status nginx
sudo systemctl status nginx

# View error log
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log

# View access log
sudo tail -f /var/log/nginx/rickychen930.cloud.access.log
```

---

**Selamat! Setup nginx selesai! 🎉**
