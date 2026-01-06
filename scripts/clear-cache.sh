#!/bin/bash

# Script untuk clear cache setelah deployment
# Usage: ./scripts/clear-cache.sh [server_user] [server_host]

set -e

SERVER_USER="${1:-root}"
SERVER_HOST="${2:-rickychen930.cloud}"

echo "🔄 Clearing cache on server..."
echo "Server: ${SERVER_USER}@${SERVER_HOST}"

# SSH ke server dan clear cache
ssh ${SERVER_USER}@${SERVER_HOST} << 'EOF'
    echo "📦 Restarting PM2..."
    cd /root/backend
    pm2 restart website-backend || true
    
    echo "🔄 Reloading Nginx..."
    sudo nginx -t && sudo systemctl reload nginx || sudo systemctl restart nginx || true
    
    echo "🧹 Clearing Nginx cache (if exists)..."
    sudo rm -rf /var/cache/nginx/* 2>/dev/null || true
    
    echo "✅ Cache cleared!"
    echo ""
    echo "📊 PM2 Status:"
    pm2 status
    
    echo ""
    echo "🌐 Testing backend..."
    curl -s http://localhost:4000/health && echo " ✅ Backend is running" || echo " ❌ Backend is not responding"
EOF

echo ""
echo "✅ Done! Please hard refresh your browser (Ctrl+Shift+R / Cmd+Shift+R)"
echo "   Or test in incognito/private mode"

