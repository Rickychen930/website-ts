# 🔧 Quick Fix Nginx Configuration Error

## Error yang ditemukan:

```
nginx: [emerg] directive "root" is not terminated by ";" in /etc/nginx/sites-enabled/rickychen930.cloud:15
```

File konfigurasi terpotong di line 172: `root /var/www/html}` (kurang semicolon dan kurung tutup salah)

## Solusi: Buat ulang konfigurasi yang benar

**Jalankan perintah ini di server:**

```bash
# Backup file lama (jika perlu)
sudo cp /etc/nginx/sites-available/rickychen930.cloud /etc/nginx/sites-available/rickychen930.cloud.backup

# Buat konfigurasi baru yang benar
sudo tee /etc/nginx/sites-available/rickychen930.cloud > /dev/null <<'NGINXEOF'
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
NGINXEOF

# Test konfigurasi
sudo nginx -t

# Jika test berhasil, reload nginx
sudo systemctl reload nginx

# Cek status
sudo systemctl status nginx

# Test website
curl -I https://rickychen930.cloud
```

## Quick Fix (One-liner)

Jika ingin lebih cepat, jalankan ini:

```bash
sudo sed -i 's|root /var/www/html}|root /var/www/html;|' /etc/nginx/sites-available/rickychen930.cloud && sudo nginx -t && sudo systemctl reload nginx
```

Tapi lebih baik buat ulang file lengkap dengan command di atas untuk memastikan tidak ada error lain.
