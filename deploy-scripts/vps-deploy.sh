#!/bin/bash

# Next.js VPS Deployment Script
# Adapated for blackcatdesigns portfolio

# Set variables
REPO_URL="git@github.com:Theblackcat98/blackcatdesigns.git"
BRANCH="builds"
DEPLOY_DIR="/var/www/blackcatdesigns/"  # Change this to your actual web root
LOG_FILE="/var/log/blackcatdesigns-deploy.log"
BACKUP_DIR="/var/backups/blackcatdesigns/"
TEMP_DIR="/tmp/blackcatdesigns-build-$(date +%s)"

# Create log file if it doesn't exist
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$BACKUP_DIR"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to handle errors
error_exit() {
    log "ERROR: $1"
    exit 1
}

log "=== Next.js Deployment started ==="

# Start SSH agent if not running
if [ -z "$SSH_AUTH_SOCK" ] ; then
    log "Starting SSH agent..."
    eval "$(ssh-agent -s)" || error_exit "Failed to start SSH agent"
    ssh-add ~/.ssh/github || error_exit "Failed to add SSH key"
fi

# Check if required directories exist
if [ ! -d "$(dirname "$DEPLOY_DIR")" ]; then
    error_exit "Parent directory of DEPLOY_DIR does not exist: $(dirname "$DEPLOY_DIR")"
fi

# Create backup of current deployment if it exists
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A "$DEPLOY_DIR")" ]; then
    log "Creating backup of current deployment..."
    tar -czf "$BACKUP_DIR/backup-$(date +%Y%m%d-%H%M%S).tar.gz" -C "$(dirname "$DEPLOY_DIR")" "$(basename "$DEPLOY_DIR")" || error_exit "Failed to create backup"
fi

# Navigate to temp directory for the build
log "Working in temporary directory: $TEMP_DIR"
mkdir -p "$TEMP_DIR" || error_exit "Failed to create temp directory"
cd "$TEMP_DIR" || error_exit "Failed to cd to temp directory"

# Clone or fetch the repository
if [ -d ".git" ]; then
    log "Repository exists, fetching latest changes..."
    git fetch origin $BRANCH >> "$LOG_FILE" 2>&1 || error_exit "Failed to fetch from repository"
    git reset --hard origin/$BRANCH >> "$LOG_FILE" 2>&1 || error_exit "Failed to reset to origin/$BRANCH"
else
    log "First deployment, cloning repository..."
    git clone -b $BRANCH $REPO_URL . >> "$LOG_FILE" 2>&1 || error_exit "Failed to clone repository"
fi

# Check if we have the necessary build files
if [ ! -f "_next/static/chunks/main-app.js" ] && [ ! -f "index.html" ] && [ ! -d ".next" ]; then
    error_exit "No Next.js build files found. The build may have failed."
fi

# Set proper permissions
log "Setting file permissions..."
find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

# If this is a static export, we might need to handle _next prefix differently
if [ -f "index.html" ]; then
    log "Detected static export deployment"
    # Handle static export specific tasks here if needed
    # For example, updating base URLs in HTML files if necessary
fi

# Stop any existing Next.js server (if running as server-side)
if pgrep -f "next-server" > /dev/null; then
    log "Stopping existing Next.js server..."
    pkill -f "next-server" || log "Warning: Could not stop Next.js server"
fi

# Sync files to deployment directory
log "Syncing files to deployment directory..."
rsync -av --delete ./ "$DEPLOY_DIR" >> "$LOG_FILE" 2>&1 || error_exit "Failed to sync files to deployment directory"

# Set ownership for web server (adjust as needed for your setup)
if command -v chown > /dev/null; then
    log "Setting web server ownership..."
    chown -R www-data:www-data "$DEPLOY_DIR" 2>/dev/null || log "Warning: Could not set www-data ownership (may not be needed)"
fi

# Start Next.js server if this is a server-side deployment
if [ -d "$DEPLOY_DIR/.next" ] && [ -f "$DEPLOY_DIR/package.json" ]; then
    log "Detected server-side deployment, starting Next.js server..."
    cd "$DEPLOY_DIR" || error_exit "Failed to cd to deployment directory"

    # Install production dependencies if needed
    if [ ! -d "node_modules" ]; then
        log "Installing production dependencies..."
        npm ci --production >> "$LOG_FILE" 2>&1 || error_exit "Failed to install production dependencies"
    fi

    # Start the server using PM2 if available, otherwise use nohup
    if command -v pm2 > /dev/null; then
        log "Starting Next.js server with PM2..."
        pm2 restart blackcatdesigns || pm2 start npm --name "blackcatdesigns" -- start >> "$LOG_FILE" 2>&1 || log "Warning: PM2 command failed"
    else
        log "Starting Next.js server with nohup..."
        nohup npm start > /dev/null 2>&1 &
        echo $! > "$DEPLOY_DIR/next-server.pid"
    fi
else
    log "Static deployment detected, no server to start"
fi

# Cleanup
log "Cleaning up temporary files..."
cd /
rm -rf "$TEMP_DIR" || log "Warning: Could not remove temp directory"

# Clean up old backups (keep last 5)
find "$BACKUP_DIR" -name "backup-*.tar.gz" -type f | sort -r | tail -n +6 | xargs -r rm -f

log "=== Deployment completed successfully ==="
log "Files deployed to: $DEPLOY_DIR"
log "Backup location: $BACKUP_DIR"

# Test deployment (optional)
if command -v curl > /dev/null; then
    log "Testing deployment..."
    sleep 2
    if curl -f -s -o /dev/null "http://localhost" || curl -f -s -o /dev/null "http://127.0.0.1:3000"; then
        log "✅ Deployment test passed"
    else
        log "⚠️  Deployment test failed - site may not be accessible"
    fi
fi

log "=== Deployment finished at $(date) ==="
echo "" >> "$LOG_FILE"