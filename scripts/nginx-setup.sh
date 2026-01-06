#!/bin/bash

# Script untuk setup Nginx configuration
# Usage: sudo bash nginx-setup.sh

set -e

echo "🔧 Setting up Nginx configuration..."

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

# Check if nginx.conf exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ nginx.conf not found at $CONFIG_FILE"
    exit 1
fi

# Copy config to nginx sites-available
echo "📋 Copying nginx configuration..."
cp "$CONFIG_FILE" "$NGINX_AVAILABLE"

# Create symlink if it doesn't exist
if [ ! -L "$NGINX_ENABLED" ]; then
    echo "🔗 Creating symlink..."
    ln -s "$NGINX_AVAILABLE" "$NGINX_ENABLED"
else
    echo "✅ Symlink already exists"
fi

# Test nginx configuration
echo "🧪 Testing nginx configuration..."
if nginx -t; then
    echo "✅ Nginx configuration is valid"
    
    # Ask for reload
    read -p "🔄 Reload nginx? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        systemctl reload nginx
        echo "✅ Nginx reloaded successfully"
    fi
else
    echo "❌ Nginx configuration test failed"
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure SSL certificates are installed:"
echo "   sudo certbot certonly --nginx -d rickychen930.cloud -d www.rickychen930.cloud"
echo ""
echo "2. Check nginx status:"
echo "   sudo systemctl status nginx"
echo ""
echo "3. View nginx logs:"
echo "   sudo tail -f /var/log/nginx/rickychen930.cloud.error.log"

