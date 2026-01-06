#!/bin/bash

# Script untuk setup Nginx configuration
# Usage: sudo bash nginx-setup.sh [build-path]
#
# Contoh:
#   sudo bash nginx-setup.sh
#   sudo bash nginx-setup.sh /home/ubuntu/website-ts/build
#   sudo bash nginx-setup.sh /root/website-ts/build

set -e

echo "🔧 Setting up Nginx configuration..."
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Paths
NGINX_AVAILABLE="/etc/nginx/sites-available/rickychen930.cloud"
NGINX_ENABLED="/etc/nginx/sites-enabled/rickychen930.cloud"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_FILE="$PROJECT_DIR/config/nginx.conf"
TEMP_CONFIG="/tmp/nginx-rickychen930.conf"

# Check if nginx.conf exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ nginx.conf not found at $CONFIG_FILE"
    exit 1
fi

# Detect build folder path
if [ -n "$1" ]; then
    BUILD_PATH="$1"
else
    # Try to auto-detect build folder
    if [ -d "$PROJECT_DIR/build" ]; then
        BUILD_PATH="$PROJECT_DIR/build"
        echo "✅ Auto-detected build folder: $BUILD_PATH"
    else
        echo "📁 Build folder not found. Please provide the path to your build folder."
        echo ""
        echo "Contoh path:"
        echo "  /home/ubuntu/website-ts/build"
        echo "  /root/website-ts/build"
        echo "  /var/www/website-ts/build"
        echo ""
        read -p "Masukkan path ke folder build: " BUILD_PATH
    fi
fi

# Normalize path (remove trailing slash, convert to absolute)
BUILD_PATH=$(realpath -m "$BUILD_PATH" 2>/dev/null || echo "$BUILD_PATH")
BUILD_PATH="${BUILD_PATH%/}"

# Validate build folder exists
if [ ! -d "$BUILD_PATH" ]; then
    echo "❌ Build folder tidak ditemukan: $BUILD_PATH"
    echo ""
    echo "💡 Tips: Cari folder build dengan:"
    echo "   find ~ -name 'build' -type d 2>/dev/null"
    exit 1
fi

# Check if build folder has index.html
if [ ! -f "$BUILD_PATH/index.html" ]; then
    echo "⚠️  Warning: index.html tidak ditemukan di $BUILD_PATH"
    echo "   Pastikan folder build sudah benar dan sudah di-build."
    read -p "Lanjutkan anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Build folder valid: $BUILD_PATH"
fi

# Update nginx config with correct build path
echo "📝 Updating nginx configuration with build path..."
cp "$CONFIG_FILE" "$TEMP_CONFIG"

# Replace all occurrences of build path in config
# Escape slashes for sed
ESCAPED_BUILD_PATH=$(echo "$BUILD_PATH" | sed 's/\//\\\//g')

# Replace common build paths
sed -i "s|/home/ubuntu/website-ts/build|$BUILD_PATH|g" "$TEMP_CONFIG"
sed -i "s|/root/website-ts/build|$BUILD_PATH|g" "$TEMP_CONFIG"
sed -i "s|/var/www/website-ts/build|$BUILD_PATH|g" "$TEMP_CONFIG"

# Backup existing config if it exists
if [ -f "$NGINX_AVAILABLE" ]; then
    echo "💾 Backing up existing configuration..."
    cp "$NGINX_AVAILABLE" "${NGINX_AVAILABLE}.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Copy updated config to nginx sites-available
echo "📋 Copying nginx configuration to $NGINX_AVAILABLE..."
cp "$TEMP_CONFIG" "$NGINX_AVAILABLE"

# Create symlink if it doesn't exist
if [ ! -L "$NGINX_ENABLED" ]; then
    echo "🔗 Creating symlink..."
    ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"
else
    echo "✅ Symlink already exists"
fi

# Clean up temp file
rm -f "$TEMP_CONFIG"

# Test nginx configuration
echo ""
echo "🧪 Testing nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
    echo ""
    
    # Show summary
    echo "📊 Configuration Summary:"
    echo "   Build folder: $BUILD_PATH"
    echo "   Config file: $NGINX_AVAILABLE"
    echo "   Symlink: $NGINX_ENABLED"
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
    echo "   Edit file: $NGINX_AVAILABLE"
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
echo ""
echo "4. View nginx logs jika ada masalah:"
echo "   sudo tail -f /var/log/nginx/rickychen930.cloud.error.log"
echo ""
echo "📚 Untuk panduan lengkap, lihat: docs/NGINX_SETUP_STEP_BY_STEP.md"

