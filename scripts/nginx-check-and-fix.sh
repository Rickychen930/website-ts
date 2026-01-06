#!/bin/bash

# Script untuk check dan fix konfigurasi Nginx
# Usage: sudo bash nginx-check-and-fix.sh

set -e

echo "🔍 Checking Nginx Configuration..."
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Please run as root (use sudo)"
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Step 1: Check if nginx is installed
echo "📋 Step 1: Checking Nginx installation..."
if ! command -v nginx &> /dev/null; then
    print_error "Nginx is not installed!"
    echo "Install with: sudo apt-get update && sudo apt-get install nginx"
    exit 1
fi
print_info "Nginx is installed: $(nginx -v 2>&1)"

# Step 2: Check nginx status
echo ""
echo "📋 Step 2: Checking Nginx status..."
if systemctl is-active --quiet nginx; then
    print_info "Nginx is running"
else
    print_warn "Nginx is not running"
    echo "Start with: sudo systemctl start nginx"
fi

# Step 3: Check active nginx configuration
echo ""
echo "📋 Step 3: Checking active Nginx configuration..."
NGINX_CONFIG="/etc/nginx/sites-available/rickychen930.cloud"
NGINX_ENABLED="/etc/nginx/sites-enabled/rickychen930.cloud"

if [ -f "$NGINX_CONFIG" ]; then
    print_info "Config file found: $NGINX_CONFIG"
    
    # Check if symlink exists
    if [ -L "$NGINX_ENABLED" ]; then
        print_info "Symlink exists: $NGINX_ENABLED"
        SYMLINK_TARGET=$(readlink -f "$NGINX_ENABLED")
        echo "   → Points to: $SYMLINK_TARGET"
    else
        print_warn "Symlink not found: $NGINX_ENABLED"
    fi
    
    # Show current root path in config
    echo ""
    echo "📁 Current build path in config:"
    ROOT_PATH=$(grep -E "^\s*root\s+" "$NGINX_CONFIG" | head -1 | awk '{print $2}' | sed 's/;//')
    if [ -n "$ROOT_PATH" ]; then
        echo "   Root: $ROOT_PATH"
        
        # Check if path exists
        if [ -d "$ROOT_PATH" ]; then
            print_info "Build folder exists: $ROOT_PATH"
            
            # Check if index.html exists
            if [ -f "$ROOT_PATH/index.html" ]; then
                print_info "index.html found"
                echo "   File size: $(du -h "$ROOT_PATH/index.html" | cut -f1)"
                echo "   Modified: $(stat -c %y "$ROOT_PATH/index.html" 2>/dev/null || stat -f "%Sm" "$ROOT_PATH/index.html" 2>/dev/null)"
            else
                print_error "index.html not found in $ROOT_PATH"
            fi
            
            # Check static folder
            if [ -d "$ROOT_PATH/static" ]; then
                STATIC_COUNT=$(find "$ROOT_PATH/static" -type f | wc -l)
                print_info "Static folder exists with $STATIC_COUNT files"
            else
                print_warn "Static folder not found: $ROOT_PATH/static"
            fi
            
            # Check assets folder
            if [ -d "$ROOT_PATH/assets" ]; then
                ASSETS_COUNT=$(find "$ROOT_PATH/assets" -type f | wc -l)
                print_info "Assets folder exists with $ASSETS_COUNT files"
            else
                print_warn "Assets folder not found: $ROOT_PATH/assets"
            fi
        else
            print_error "Build folder does NOT exist: $ROOT_PATH"
            echo ""
            echo "🔍 Searching for build folders..."
            echo ""
            
            # Search for build folders
            FOUND_BUILDS=()
            for SEARCH_PATH in ~ /home /root /var/www; do
                if [ -d "$SEARCH_PATH" ]; then
                    while IFS= read -r BUILD_DIR; do
                        if [ -f "$BUILD_DIR/index.html" ]; then
                            FOUND_BUILDS+=("$BUILD_DIR")
                            echo "   Found: $BUILD_DIR"
                        fi
                    done < <(find "$SEARCH_PATH" -name "build" -type d 2>/dev/null | head -10)
                fi
            done
            
            if [ ${#FOUND_BUILDS[@]} -eq 0 ]; then
                print_error "No build folders found!"
                echo "   Make sure you have run: npm run build"
            else
                echo ""
                echo "💡 Found ${#FOUND_BUILDS[@]} build folder(s). Choose one to use:"
                for i in "${!FOUND_BUILDS[@]}"; do
                    echo "   $((i+1)). ${FOUND_BUILDS[$i]}"
                done
                echo ""
                read -p "Enter number to use (or press Enter to skip): " CHOICE
                
                if [ -n "$CHOICE" ] && [ "$CHOICE" -ge 1 ] && [ "$CHOICE" -le ${#FOUND_BUILDS[@]} ]; then
                    SELECTED_BUILD="${FOUND_BUILDS[$((CHOICE-1))]}"
                    echo ""
                    read -p "Update nginx config to use: $SELECTED_BUILD? (y/n) " -n 1 -r
                    echo
                    if [[ $REPLY =~ ^[Yy]$ ]]; then
                        # Update config
                        PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
                        UPDATE_SCRIPT="$PROJECT_DIR/scripts/nginx-setup.sh"
                        
                        if [ -f "$UPDATE_SCRIPT" ]; then
                            bash "$UPDATE_SCRIPT" "$SELECTED_BUILD"
                        else
                            print_warn "Update script not found. Please update manually:"
                            echo "   sudo nano $NGINX_CONFIG"
                            echo "   Replace: root $ROOT_PATH;"
                            echo "   With: root $SELECTED_BUILD;"
                        fi
                    fi
                fi
            fi
        fi
    else
        print_error "No root path found in config!"
    fi
else
    print_error "Config file not found: $NGINX_CONFIG"
    echo ""
    echo "💡 Run setup script first:"
    echo "   sudo bash scripts/nginx-setup.sh"
fi

# Step 4: Check backend
echo ""
echo "📋 Step 4: Checking backend (port 4000)..."
if curl -s http://localhost:4000/health > /dev/null 2>&1; then
    print_info "Backend is running on port 4000"
    HEALTH_RESPONSE=$(curl -s http://localhost:4000/health)
    echo "   Response: $HEALTH_RESPONSE"
else
    print_warn "Backend is not responding on port 4000"
    echo "   Check with: pm2 status"
    echo "   Or start with: pm2 start backend/ecosystem.config.js --env production"
fi

# Step 5: Check SSL certificates
echo ""
echo "📋 Step 5: Checking SSL certificates..."
SSL_CERT="/etc/letsencrypt/live/rickychen930.cloud/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/rickychen930.cloud/privkey.pem"

if [ -f "$SSL_CERT" ] && [ -f "$SSL_KEY" ]; then
    print_info "SSL certificates found"
    CERT_EXPIRY=$(openssl x509 -enddate -noout -in "$SSL_CERT" 2>/dev/null | cut -d= -f2)
    if [ -n "$CERT_EXPIRY" ]; then
        echo "   Expires: $CERT_EXPIRY"
    fi
else
    print_warn "SSL certificates not found"
    echo "   Install with: sudo certbot certonly --nginx -d rickychen930.cloud -d www.rickychen930.cloud"
fi

# Step 6: Test nginx configuration
echo ""
echo "📋 Step 6: Testing Nginx configuration..."
if nginx -t 2>&1 | grep -q "successful"; then
    print_info "Nginx configuration is valid"
    nginx -t
else
    print_error "Nginx configuration has errors!"
    nginx -t
    echo ""
    echo "💡 Fix errors in: $NGINX_CONFIG"
fi

# Step 7: Show nginx error log (last 10 lines)
echo ""
echo "📋 Step 7: Recent Nginx errors (last 10 lines)..."
ERROR_LOG="/var/log/nginx/rickychen930.cloud.error.log"
if [ -f "$ERROR_LOG" ]; then
    ERROR_COUNT=$(tail -n 100 "$ERROR_LOG" | grep -i error | wc -l)
    if [ "$ERROR_COUNT" -gt 0 ]; then
        print_warn "Found $ERROR_COUNT recent errors"
        echo "   Last errors:"
        tail -n 10 "$ERROR_LOG" | grep -i error | tail -n 5 | sed 's/^/   /'
    else
        print_info "No recent errors in log"
    fi
else
    print_warn "Error log not found: $ERROR_LOG"
fi

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check all components
ALL_OK=true

if [ -f "$NGINX_CONFIG" ]; then
    print_info "Nginx config: OK"
else
    print_error "Nginx config: MISSING"
    ALL_OK=false
fi

if [ -d "$ROOT_PATH" ] && [ -f "$ROOT_PATH/index.html" ]; then
    print_info "Build folder: OK"
else
    print_error "Build folder: MISSING or INVALID"
    ALL_OK=false
fi

if curl -s http://localhost:4000/health > /dev/null 2>&1; then
    print_info "Backend: OK"
else
    print_warn "Backend: NOT RUNNING"
fi

if [ -f "$SSL_CERT" ] && [ -f "$SSL_KEY" ]; then
    print_info "SSL certificates: OK"
else
    print_warn "SSL certificates: MISSING"
fi

if nginx -t 2>&1 | grep -q "successful"; then
    print_info "Nginx config test: OK"
else
    print_error "Nginx config test: FAILED"
    ALL_OK=false
fi

echo ""
if [ "$ALL_OK" = true ]; then
    print_info "Everything looks good! ✅"
    echo ""
    echo "💡 If you made changes, reload nginx:"
    echo "   sudo systemctl reload nginx"
else
    print_error "Some issues found. Please fix them above."
    echo ""
    echo "💡 Quick fixes:"
    echo "   1. Fix build path: sudo bash scripts/nginx-setup.sh [build-path]"
    echo "   2. Fix config errors: sudo nano $NGINX_CONFIG"
    echo "   3. Start backend: pm2 start backend/ecosystem.config.js --env production"
fi

echo ""
echo "📚 For detailed guide, see: docs/NGINX_SETUP_STEP_BY_STEP.md"



