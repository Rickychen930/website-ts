#!/bin/bash

# Script untuk upload file ke server
# Usage: bash upload-to-server.sh
# Edit variabel SERVER_USER, SERVER_HOST, dan SERVER_PATH sesuai kebutuhan

set -e

# ⚙️ CONFIGURATION - Edit sesuai server Anda
SERVER_USER="root"
SERVER_HOST="rickychen930.cloud"  # atau IP address
SERVER_PATH="/root/website-ts"

# Colors
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

# Check if files exist
check_files() {
    print_info "Checking required files..."
    
    local missing_files=()
    
    [ ! -d "build" ] && missing_files+=("build/")
    [ ! -d "backend/dist" ] && missing_files+=("backend/dist/")
    [ ! -f "backend/ecosystem.config.js" ] && missing_files+=("backend/ecosystem.config.js")
    [ ! -f "package.json" ] && missing_files+=("package.json")
    [ ! -f "package-lock.json" ] && print_warn "package-lock.json not found (will use npm install instead of npm ci)"
    [ ! -f ".env" ] && missing_files+=(".env")
    [ ! -f "config/nginx.conf" ] && missing_files+=("config/nginx.conf")
    [ ! -f "scripts/pm2-setup.sh" ] && missing_files+=("scripts/pm2-setup.sh")
    [ ! -f "scripts/nginx-setup.sh" ] && missing_files+=("scripts/nginx-setup.sh")
    [ ! -f "scripts/nginx-check-and-fix.sh" ] && missing_files+=("scripts/nginx-check-and-fix.sh")
    
    if [ ${#missing_files[@]} -gt 0 ]; then
        print_error "Missing files:"
        for file in "${missing_files[@]}"; do
            echo "  - $file"
        done
        echo ""
        print_warn "Please build the application first:"
        echo "  npm run build:all"
        exit 1
    fi
    
    print_info "All required files found!"
}

# Confirm before upload
confirm() {
    echo ""
    print_warn "Ready to upload to: ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}"
    echo ""
    echo "Files to upload:"
    echo "  - build/ (frontend)"
    echo "  - backend/dist/ (backend)"
    echo "  - backend/ecosystem.config.js"
    echo "  - package.json"
    if [ -f "package-lock.json" ]; then
        echo "  - package-lock.json"
    fi
    echo "  - .env"
    echo "  - config/nginx.conf"
    echo "  - scripts/pm2-setup.sh"
    echo "  - scripts/nginx-setup.sh"
    echo "  - scripts/nginx-check-and-fix.sh"
    echo ""
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_warn "Upload cancelled"
        exit 0
    fi
}

# Upload files
upload() {
    print_info "Starting upload..."
    echo ""
    
    # Create directory on server if it doesn't exist
    print_info "Creating directory on server..."
    ssh ${SERVER_USER}@${SERVER_HOST} "mkdir -p ${SERVER_PATH}/backend ${SERVER_PATH}/scripts ${SERVER_PATH}/config"
    
    # Upload files
    print_info "Uploading build/ (frontend)..."
    scp -r build ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
    
    print_info "Uploading backend/dist/..."
    scp -r backend/dist ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/backend/
    
    print_info "Uploading backend/ecosystem.config.js..."
    scp backend/ecosystem.config.js ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/backend/
    
    print_info "Uploading package.json..."
    scp package.json ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
    
    if [ -f "package-lock.json" ]; then
        print_info "Uploading package-lock.json..."
        scp package-lock.json ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
    else
        print_warn "package-lock.json not found, skipping..."
    fi
    
    print_info "Uploading .env..."
    scp .env ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/
    
    print_info "Uploading config/nginx.conf..."
    scp config/nginx.conf ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/config/
    
    print_info "Uploading scripts/pm2-setup.sh..."
    scp scripts/pm2-setup.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/scripts/
    ssh ${SERVER_USER}@${SERVER_HOST} "chmod +x ${SERVER_PATH}/scripts/pm2-setup.sh"
    
    print_info "Uploading scripts/nginx-setup.sh..."
    scp scripts/nginx-setup.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/scripts/
    ssh ${SERVER_USER}@${SERVER_HOST} "chmod +x ${SERVER_PATH}/scripts/nginx-setup.sh"
    
    print_info "Uploading scripts/nginx-check-and-fix.sh..."
    scp scripts/nginx-check-and-fix.sh ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/scripts/
    ssh ${SERVER_USER}@${SERVER_HOST} "chmod +x ${SERVER_PATH}/scripts/nginx-check-and-fix.sh"
    
    echo ""
    print_info "✅ Upload complete!"
    echo ""
    print_info "Next steps (SSH to server):"
    echo "  1. ssh ${SERVER_USER}@${SERVER_HOST}"
    echo "  2. cd ${SERVER_PATH}"
    if [ -f "package-lock.json" ]; then
        echo "  3. npm ci --omit=dev --legacy-peer-deps"
    else
        echo "  3. npm install --omit=dev --legacy-peer-deps"
    fi
    echo "  4. bash scripts/pm2-setup.sh start"
    echo "  5. sudo bash scripts/nginx-check-and-fix.sh  # Check & fix nginx config"
    echo "  6. sudo bash scripts/nginx-setup.sh  # Or setup nginx if needed"
}

# Main
main() {
    echo "🚀 Upload to Server Script"
    echo "=========================="
    echo ""
    
    check_files
    confirm
    upload
}

main

