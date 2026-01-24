#!/usr/bin/env bash
# Restart backend via PM2 (used by GitHub Actions deploy)
# Run from /root/backend on VPS

set -e
cd "$(dirname "$0")"
PM2_APP="website-backend"

echo "🔄 Stopping $PM2_APP..."
pm2 stop "$PM2_APP" 2>/dev/null || true
pm2 delete "$PM2_APP" 2>/dev/null || true

echo "▶️  Starting $PM2_APP..."
pm2 start ecosystem.config.js --env production
pm2 save

echo "✅ Backend restarted"
