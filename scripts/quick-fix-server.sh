#!/bin/bash

# Quick fix script untuk dijalankan di SERVER
# Usage: bash quick-fix-server.sh
# Script ini akan:
# 1. Check apakah package-lock.json ada
# 2. Install dependencies dengan command yang sesuai

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

echo "🔧 Quick Fix: npm ci Error"
echo "=========================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script in the project directory."
    exit 1
fi

# Check for package-lock.json
if [ -f "package-lock.json" ]; then
    print_info "package-lock.json found. Using npm ci..."
    npm ci --omit=dev --legacy-peer-deps
    print_info "Dependencies installed successfully!"
else
    print_warn "package-lock.json not found. Using npm install..."
    print_warn "Consider uploading package-lock.json from local for better reproducibility."
    npm install --omit=dev --legacy-peer-deps
    print_info "Dependencies installed successfully!"
fi

echo ""
print_info "Next steps:"
echo "  1. bash pm2-setup.sh start"
echo "  2. sudo bash nginx-setup.sh"

