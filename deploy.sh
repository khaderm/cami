#!/bin/bash

# Deployment script for camilavaldivia.com
# Usage: ./deploy.sh user@your-vps-ip

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "============================================"
echo "  Deployment Script for camilavaldivia.com"
echo "============================================"
echo ""

# Check for VPS argument
if [ -z "$1" ]; then
    echo -e "${RED}Error: No VPS address provided${NC}"
    echo ""
    echo "Usage: ./deploy.sh user@your-vps-ip"
    echo "Example: ./deploy.sh root@192.168.1.100"
    exit 1
fi

VPS="$1"
REMOTE_PATH="/var/www/camilavaldivia.com"
CONF_PATH="/etc/apache2/sites-available"

# ============================================
# LOCAL PREREQUISITES CHECK
# ============================================
echo "Checking local prerequisites..."

# Check for npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}✗ npm is not installed${NC}"
    echo "  Install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓${NC} npm found"

# Check for rsync
if ! command -v rsync &> /dev/null; then
    echo -e "${RED}✗ rsync is not installed${NC}"
    echo "  Install with: brew install rsync"
    exit 1
fi
echo -e "${GREEN}✓${NC} rsync found"

# Check for required local files
if [ ! -f "package.json" ]; then
    echo -e "${RED}✗ package.json not found${NC}"
    echo "  Run this script from the project root directory"
    exit 1
fi
echo -e "${GREEN}✓${NC} package.json found"

if [ ! -f "camilavaldivia.com.conf" ]; then
    echo -e "${RED}✗ camilavaldivia.com.conf not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Apache config found"

if [ ! -d "public/images" ] || [ ! -d "public/videos" ]; then
    echo -e "${YELLOW}⚠ public/images or public/videos missing${NC}"
    echo "  Static assets may not be included in deployment"
fi

echo ""

# ============================================
# VPS CONNECTION CHECK
# ============================================
echo "Checking VPS connection..."

if ! ssh -o ConnectTimeout=10 -o BatchMode=yes "$VPS" "echo 'connected'" &> /dev/null; then
    echo -e "${YELLOW}⚠ Could not auto-connect to VPS${NC}"
    echo "  You may be prompted for a password during deployment"
else
    echo -e "${GREEN}✓${NC} VPS connection OK"
fi

echo ""

# ============================================
# VPS PREREQUISITES CHECK
# ============================================
echo "Checking VPS prerequisites..."

# Check Apache (use systemctl which works regardless of PATH)
if ! ssh "$VPS" "systemctl list-unit-files apache2.service 2>/dev/null | grep -q apache2 || systemctl list-unit-files httpd.service 2>/dev/null | grep -q httpd" &> /dev/null; then
    echo -e "${RED}✗ Apache not found on VPS${NC}"
    echo "  Install with: apt install apache2"
    exit 1
fi
echo -e "${GREEN}✓${NC} Apache installed"

# Check rsync on VPS
if ! ssh "$VPS" "command -v rsync" &> /dev/null; then
    echo -e "${RED}✗ rsync not found on VPS${NC}"
    echo "  Install with: apt install rsync"
    exit 1
fi
echo -e "${GREEN}✓${NC} rsync installed on VPS"

# Check Apache modules
MISSING_MODS=""
for mod in rewrite headers expires deflate; do
    if ! ssh "$VPS" "apache2ctl -M 2>/dev/null | grep -q ${mod}_module || ls /etc/apache2/mods-available/${mod}.load 2>/dev/null" &> /dev/null; then
        MISSING_MODS="$MISSING_MODS $mod"
    fi
done

if [ -n "$MISSING_MODS" ]; then
    echo -e "${YELLOW}⚠ Some Apache modules may need enabling:${MISSING_MODS}${NC}"
    echo "  Will attempt to enable during deployment"
else
    echo -e "${GREEN}✓${NC} Apache modules available"
fi

# Check certbot (optional)
if ! ssh "$VPS" "command -v certbot" &> /dev/null; then
    echo -e "${YELLOW}⚠ certbot not found on VPS (optional - needed for SSL)${NC}"
    echo "  Install with: apt install certbot python3-certbot-apache"
else
    echo -e "${GREEN}✓${NC} certbot installed"
fi

echo ""

# ============================================
# CREATE REMOTE DIRECTORY
# ============================================
echo "Ensuring remote directory exists..."

ssh "$VPS" "sudo mkdir -p $REMOTE_PATH && sudo chown \$(whoami):\$(whoami) $REMOTE_PATH"
echo -e "${GREEN}✓${NC} $REMOTE_PATH ready"

echo ""

# ============================================
# BUILD
# ============================================
echo "Building production bundle..."
npm run build
echo -e "${GREEN}✓${NC} Build complete"

echo ""

# ============================================
# COPY STATIC ASSETS
# ============================================
echo "Copying static assets to dist/..."

if [ -d "public/images" ]; then
    cp -r public/images dist/
    echo -e "${GREEN}✓${NC} Images copied"
fi

if [ -d "public/videos" ]; then
    cp -r public/videos dist/
    echo -e "${GREEN}✓${NC} Videos copied"
fi

# Copy .htaccess if it exists in public
if [ -f "public/.htaccess" ]; then
    cp public/.htaccess dist/
    echo -e "${GREEN}✓${NC} .htaccess copied"
fi

echo ""

# ============================================
# UPLOAD FILES
# ============================================
echo "Uploading files to VPS (this may take a while for videos)..."
rsync -avz --progress --delete dist/ "$VPS:$REMOTE_PATH/"
echo -e "${GREEN}✓${NC} Files uploaded"

echo ""

# ============================================
# UPLOAD APACHE CONFIG
# ============================================
echo "Uploading Apache config..."
scp camilavaldivia.com.conf "$VPS:$CONF_PATH/"
echo -e "${GREEN}✓${NC} Apache config uploaded"

echo ""

# ============================================
# CONFIGURE APACHE ON VPS
# ============================================
echo "Configuring Apache on VPS..."

ssh "$VPS" << 'ENDSSH'
    set -e

    # Enable required modules
    sudo a2enmod rewrite headers expires deflate 2>/dev/null || true

    # Enable the site
    sudo a2ensite camilavaldivia.com.conf 2>/dev/null || true

    # Test config
    echo "Testing Apache configuration..."
    sudo apache2ctl configtest

    # Reload Apache
    sudo systemctl reload apache2

    echo ""
    echo "Apache configured successfully!"
ENDSSH

echo -e "${GREEN}✓${NC} Apache configured and reloaded"

echo ""
echo "============================================"
echo -e "${GREEN}  DEPLOYMENT COMPLETE!${NC}"
echo "============================================"
echo ""
echo "Your site should now be live at: http://camilavaldivia.com"
echo ""
echo -e "${YELLOW}IMPORTANT: Set up SSL by running this on your VPS:${NC}"
echo "  sudo certbot --apache -d camilavaldivia.com -d www.camilavaldivia.com"
echo ""
