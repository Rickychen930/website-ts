#!/bin/bash

# Script untuk setup nginx langsung di server
# Usage: curl -s https://raw.githubusercontent.com/your-repo/website-ts/main/scripts/setup-nginx-on-server.sh | sudo bash
# ATAU copy-paste script ini ke server dan jalankan: sudo bash setup-nginx-on-server.sh

set -e

echo "🔧 Setting up Nginx configuration for /var/www/website-ts/build"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

NGINX_CONFIG="/etc/nginx/sites-available/rickychen930.cloud"
NGINX_ENABLED="/etc/nginx/sites-enabled/rickychen930.cloud"

# Create nginx config file
echo "📝 Creating nginx configuration..."

cat > "$NGINX_CONFIG" << 'EOF'
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
EOF

echo "✅ Nginx configuration created at $NGINX_CONFIG"

# Set permission for build folder
echo ""
echo "📁 Setting permissions for build folder..."
mkdir -p /var/www/website-ts/build
chown -R www-data:www-data /var/www/website-ts
chmod -R 755 /var/www/website-ts
echo "✅ Permissions set"

# Create symlink
echo ""
echo "🔗 Creating symlink..."
rm -f "$NGINX_ENABLED"
ln -s "$NGINX_CONFIG" "$NGINX_ENABLED"
echo "✅ Symlink created: $NGINX_ENABLED"

# Test nginx configuration
echo ""
echo "🧪 Testing nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
    echo ""
    
    # Ask for reload
    read -p "🔄 Reload nginx sekarang? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        systemctl reload nginx
        echo "✅ Nginx reloaded successfully"
        echo ""
        echo "🌐 Website seharusnya sudah bisa diakses!"
    else
        echo "⚠️  Nginx belum di-reload. Jalankan manual:"
        echo "   sudo systemctl reload nginx"
    fi
else
    echo "❌ Nginx configuration test failed"
    echo ""
    echo "💡 Periksa error di atas dan perbaiki konfigurasi."
    echo "   Edit file: $NGINX_CONFIG"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Pastikan SSL certificates sudah terinstall:"
echo "   sudo certbot certonly --nginx -d rickychen930.cloud -d www.rickychen930.cloud"
echo ""
echo "2. Cek status nginx:"
echo "   sudo systemctl status nginx"
echo ""
echo "3. Test website:"
echo "   curl -I https://rickychen930.cloud"

