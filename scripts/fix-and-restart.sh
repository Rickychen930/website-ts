#!/usr/bin/env bash
# Simple fix: Create .env and restart PM2 (no rebuild needed)
# Usage: ./scripts/fix-and-restart.sh root@72.60.208.150 portfolio

set -e

HOST="${1:-root@72.60.208.150}"
DB_NAME="${2:-portfolio}"

echo "🔧 Fix .env and restart PM2..."
echo "📡 Server: $HOST"
echo "📊 Target database: $DB_NAME"
echo ""

# Create temporary script
TEMP_SCRIPT=$(mktemp)
cat > "$TEMP_SCRIPT" << 'SCRIPT_CONTENT'
#!/bin/bash
set -e
DB_NAME="$1"

echo "=== Step 1: Finding source .env file ==="
ENV_WRITE="/root/.env"
ENV_READ="/root/backend/.env"

# Find source file
if [ -f "$ENV_READ" ]; then
  SRC="$ENV_READ"
  echo "✅ Found: $ENV_READ"
elif [ -f "$ENV_WRITE" ]; then
  SRC="$ENV_WRITE"
  echo "✅ Found: $ENV_WRITE"
else
  echo "❌ No .env file found!"
  exit 1
fi

echo ""
echo "=== Step 2: Extracting credentials ==="
CRED_MATCH=$(grep -oE 'mongodb[^:]*://[^@]+@[^/]+' "$SRC" | head -1)

if [ -z "$CRED_MATCH" ]; then
  echo "❌ Could not extract MongoDB credentials"
  exit 1
fi

echo "✅ Credentials extracted"

echo ""
echo "=== Step 3: Creating /root/.env ==="
# Backup if exists
if [ -f "$ENV_WRITE" ]; then
  BACKUP="$ENV_WRITE.backup.$(date +%Y%m%d_%H%M%S)"
  cp "$ENV_WRITE" "$BACKUP"
  echo "✅ Backed up to $(basename $BACKUP)"
fi

# Build clean URI
NEW_URI="${CRED_MATCH}/${DB_NAME}?retryWrites=true&w=majority&authSource=admin"

# Create clean .env
cat > "$ENV_WRITE" <<ENVEOF
# Server Configuration
PORT=4000
NODE_ENV=production

# Database
# MongoDB Atlas
MONGODB_URI=$NEW_URI

# CORS Configuration (comma-separated)
# Production:
ALLOWED_ORIGINS=https://rickychen930.cloud,https://www.rickychen930.cloud

# SSL Configuration (for production with Let's Encrypt)
# These paths are used by nginx, not the Node.js backend
# Let's Encrypt default paths:
SSL_CERT_PATH=/etc/letsencrypt/live/rickychen930.cloud/fullchain.pem
SSL_KEY_PATH=/etc/letsencrypt/live/rickychen930.cloud/privkey.pem
SSL_CHAIN_PATH=/etc/letsencrypt/live/rickychen930.cloud/chain.pem

# SSL Certificate Domain (for Let's Encrypt)
SSL_DOMAIN=rickychen930.cloud
SSL_ALT_DOMAINS=www.rickychen930.cloud

# Frontend API URL (for React app)
# Production:
REACT_APP_API_URL=https://rickychen930.cloud
ENVEOF

echo "✅ Created /root/.env"
echo "📋 URI (hidden): $(echo $NEW_URI | sed 's|//[^:]*:[^@]*@|//***:***@|')"
echo "📊 Database: $DB_NAME"

echo ""
echo "=== Step 4: Verifying .env ==="
if grep -q "MONGODB_URI.*$DB_NAME" "$ENV_WRITE"; then
  echo "✅ Database name verified: $DB_NAME"
else
  echo "⚠️  Warning: Database name might not match"
fi

echo ""
echo "=== Step 5: Restarting PM2 ==="
cd /root/backend

# Stop and delete
pm2 stop website-backend || true
pm2 delete website-backend || true
sleep 2

# Start fresh
echo "🚀 Starting PM2..."
pm2 start ecosystem.config.js --update-env

# Wait
sleep 5

echo ""
echo "=== Step 6: Status ==="
pm2 list

echo ""
echo "=== Step 7: Testing ==="
sleep 3
API_RESPONSE=$(curl -s http://localhost:4000/api/profile 2>/dev/null || echo "{}")
DB_CHECK=$(echo "$API_RESPONSE" | grep -o '"database":"[^"]*"' | cut -d'"' -f4 || echo "")

if [ "$DB_CHECK" = "$DB_NAME" ]; then
  echo "✅ SUCCESS! Database: $DB_CHECK"
else
  echo "⚠️  Database: $DB_CHECK (expected: $DB_NAME)"
  echo "💡 Full response:"
  echo "$API_RESPONSE" | head -c 200
  echo ""
fi

echo ""
echo "✅ Done!"
SCRIPT_CONTENT

# Execute
scp "$TEMP_SCRIPT" "$HOST:/tmp/fix-restart.sh"
ssh "$HOST" "chmod +x /tmp/fix-restart.sh && /tmp/fix-restart.sh '$DB_NAME' && rm /tmp/fix-restart.sh"
rm "$TEMP_SCRIPT"
