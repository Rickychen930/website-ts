#!/bin/bash

# Script untuk setup dan manage PM2
# Usage: bash pm2-setup.sh [start|stop|restart|status|logs|setup]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
ECOSYSTEM_CONFIG="$BACKEND_DIR/ecosystem.config.js"
LOG_DIR="$BACKEND_DIR/logs"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if PM2 is installed
check_pm2() {
    if ! command -v pm2 &> /dev/null; then
        print_error "PM2 is not installed"
        echo "Install PM2 with: npm install -g pm2"
        exit 1
    fi
    print_info "PM2 is installed"
}

# Setup: Create log directory and check config
setup() {
    print_info "Setting up PM2 environment..."
    
    # Create log directory if it doesn't exist
    if [ ! -d "$LOG_DIR" ]; then
        mkdir -p "$LOG_DIR"
        print_info "Created log directory: $LOG_DIR"
    else
        print_info "Log directory exists: $LOG_DIR"
    fi
    
    # Check if ecosystem config exists
    if [ ! -f "$ECOSYSTEM_CONFIG" ]; then
        print_error "ecosystem.config.js not found at $ECOSYSTEM_CONFIG"
        exit 1
    fi
    
    # Check if backend is built
    if [ ! -f "$BACKEND_DIR/dist/main.js" ]; then
        print_warn "Backend not built yet. Building..."
        cd "$SCRIPT_DIR"
        npm run backend:build
        print_info "Backend built successfully"
    fi
    
    print_info "Setup complete!"
}

# Start PM2
start() {
    check_pm2
    setup
    
    print_info "Starting PM2 application..."
    cd "$SCRIPT_DIR"
    
    # Check if already running
    if pm2 list | grep -q "website-backend"; then
        print_warn "Application is already running"
        print_info "Use 'restart' to restart or 'stop' to stop it first"
        return
    fi
    
    # Start with production environment
    pm2 start "$ECOSYSTEM_CONFIG" --env production
    pm2 save
    print_info "Application started successfully"
    pm2 status
}

# Stop PM2
stop() {
    check_pm2
    print_info "Stopping PM2 application..."
    pm2 stop website-backend || print_warn "Application not running"
    pm2 save
    print_info "Application stopped"
}

# Restart PM2
restart() {
    check_pm2
    setup
    print_info "Restarting PM2 application..."
    pm2 restart website-backend || {
        print_warn "Application not running, starting it..."
        cd "$SCRIPT_DIR"
        pm2 start "$ECOSYSTEM_CONFIG" --env production
    }
    pm2 save
    print_info "Application restarted"
    pm2 status
}

# Show status
status() {
    check_pm2
    print_info "PM2 Status:"
    pm2 status
    echo ""
    print_info "Application Info:"
    pm2 describe website-backend || print_warn "Application not running"
}

# Show logs
logs() {
    check_pm2
    print_info "Showing PM2 logs (Ctrl+C to exit)..."
    pm2 logs website-backend
}

# Delete and cleanup
delete() {
    check_pm2
    print_warn "This will delete the PM2 application"
    read -p "Are you sure? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        pm2 delete website-backend || print_warn "Application not found"
        pm2 save
        print_info "Application deleted"
    fi
}

# Setup PM2 to start on boot
startup() {
    check_pm2
    print_info "Setting up PM2 startup script..."
    pm2 startup
    pm2 save
    print_info "PM2 will now start on system boot"
}

# Main command handler
case "${1:-help}" in
    setup)
        setup
        ;;
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        restart
        ;;
    status)
        status
        ;;
    logs)
        logs
        ;;
    delete)
        delete
        ;;
    startup)
        startup
        ;;
    help|*)
        echo "PM2 Management Script"
        echo ""
        echo "Usage: bash pm2-setup.sh [command]"
        echo ""
        echo "Commands:"
        echo "  setup    - Setup PM2 environment (create log dir, check config)"
        echo "  start    - Start the application with PM2"
        echo "  stop     - Stop the application"
        echo "  restart  - Restart the application"
        echo "  status   - Show PM2 status"
        echo "  logs     - Show application logs"
        echo "  delete   - Delete the application from PM2"
        echo "  startup  - Setup PM2 to start on system boot"
        echo "  help     - Show this help message"
        ;;
esac

