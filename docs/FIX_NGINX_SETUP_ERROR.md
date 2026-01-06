# 🔧 Fix Nginx Setup Error - Solusi Cepat

## Status Saat Ini

Dari log terminal:
- ✅ Folder `/var/www/website-ts/build` sudah dibuat
- ✅ Permission sudah di-set
- ✅ Konfigurasi nginx sudah dibuat (line 128)
- ✅ Symlink sudah dibuat (line 134)
- ❌ Error: `unexpected EOF while looking for matching '"'` di line 215

**Masalah:** Script `/tmp/setup-nginx.sh` mungkin terpotong saat copy-paste atau ada karakter yang rusak.

## Solusi: Manual Setup (Paling Reliable)

Jalankan command berikut **langsung di server**:

### Step 1: Hapus file script yang error (jika ada)

```bash
sudo rm -f /tmp/setup-nginx.sh
```

### Step 2: Buat konfigurasi nginx langsung

```bash
sudo tee /etc/nginx/sites-available/rickychen930.cloud > /dev/null <<'NGINXCONF'
# Nginx Configuration for website-ts
# Build folder: /var/www/website-ts/build

# HTTP to HTTPS redirect
server {
    listen 80;
    listen [::]:80;
    server_name rickychen930.cloud www.rickychen930.cloud;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name rickychen930.cloud www.rickychen930.cloud;

    ssl_certificate /etc/letsencrypt/live/rickychen930.cloud/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/rickychen930.cloud/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    ssl_session_tickets off;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    client_max_body_size 10M;

    root /var/www/website-ts/build;
    index index.html;

    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /health {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        access_log off;
    }

    location /static/ {
        alias /var/www/website-ts/build/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot|map)$ {
        root /var/www/website-ts/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /assets/ {
        alias /var/www/website-ts/build/assets/;
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~* \.html$ {
        root /var/www/website-ts/build;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }

    location / {
        root /var/www/website-ts/build;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate" always;
        add_header Pragma "no-cache" always;
        add_header Expires "0" always;
    }

    access_log /var/log/nginx/rickychen930.cloud.access.log;
    error_log /var/log/nginx/rickychen930.cloud.error.log;
}
NGINXCONF
```

### Step 3: Pastikan permission folder sudah benar

```bash
sudo chown -R www-data:www-data /var/www/website-ts
sudo chmod -R 755 /var/www/website-ts
```

### Step 4: Buat symlink

```bash
sudo rm -f /etc/nginx/sites-enabled/rickychen930.cloud
sudo ln -s /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-enabled/
```

### Step 5: Test konfigurasi

```bash
sudo nginx -t
```

**Jika berhasil**, akan muncul:
```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

### Step 6: Start/Reload nginx

```bash
# Start nginx jika belum running
sudo systemctl start nginx

# Atau reload jika sudah running
sudo systemctl reload nginx

# Cek status
sudo systemctl status nginx
```

### Step 7: Verifikasi

```bash
# Test dari server
curl -I http://localhost
curl -I https://localhost

# Test dengan domain
curl -I https://rickychen930.cloud

# Cek log jika ada error
sudo tail -f /var/log/nginx/rickychen930.cloud.error.log
```

## Checklist Final

Setelah semua step selesai, pastikan:

- [ ] Konfigurasi dibuat: `ls -la /etc/nginx/sites-available/rickychen930.cloud`
- [ ] Symlink dibuat: `ls -la /etc/nginx/sites-enabled/rickychen930.cloud`
- [ ] Permission benar: `ls -ld /var/www/website-ts`
- [ ] `sudo nginx -t` berhasil
- [ ] Nginx running: `sudo systemctl status nginx`
- [ ] Website bisa diakses: `curl -I https://rickychen930.cloud`

## Troubleshooting

### Jika masih ada error di `nginx -t`

```bash
# Cek error detail
sudo nginx -t 2>&1

# Edit file jika perlu
sudo nano /etc/nginx/sites-available/rickychen930.cloud
```

### Jika SSL certificate error

Jika belum punya SSL certificate, temporary gunakan HTTP saja:

```bash
# Edit config
sudo nano /etc/nginx/sites-available/rickychen930.cloud

# Hapus atau comment out bagian HTTPS server (yang listen 443)
# Simpan, lalu test dan reload
sudo nginx -t
sudo systemctl reload nginx
```

Atau setup SSL certificate dulu:
```bash
sudo certbot --nginx -d rickychen930.cloud -d www.rickychen930.cloud
```

### Jika 502 Bad Gateway

```bash
# Cek apakah backend running
pm2 status

# Atau test backend langsung
curl http://localhost:4000/health

# Start backend jika belum running
pm2 start /root/backend/ecosystem.config.js --env production
```

---

**Setup selesai! Website seharusnya sudah bisa diakses! 🎉**

