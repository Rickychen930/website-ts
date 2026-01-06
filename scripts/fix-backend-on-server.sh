#!/bin/bash

# Fix and restart backend script for SERVER
# This script is deployed to /root/backend and used by GitHub Actions workflow
# Usage: ./fix-backend-on-server.sh

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

echo "🔧 Fix and Restart Backend"
echo "=========================="
echo ""

# Check if we're in the right directory
if [ ! -f "ecosystem.config.js" ]; then
    print_error "ecosystem.config.js not found. Please run this script in /root/backend directory."
    exit 1
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    print_error "PM2 is not installed"
    exit 1
fi

# Check if backend is built
if [ ! -f "dist/main.js" ]; then
    print_error "Backend not built. dist/main.js not found."
    exit 1
fi

# Stop existing process
print_info "Stopping existing PM2 process..."
pm2 stop website-backend || print_warn "No running process to stop"

# Delete existing process
print_info "Deleting existing PM2 process..."
pm2 delete website-backend || print_warn "No process to delete"

# Start the backend
print_info "Starting backend with PM2..."
pm2 start ecosystem.config.js --env production
pm2 save

print_info "Backend restarted successfully!"
echo ""
pm2 status
echo ""
print_info "Fix and restart completed!"

