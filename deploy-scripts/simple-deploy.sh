#!/bin/bash

# Simplified Next.js VPS Deployment Script
# For blackcatdesigns portfolio

# Configuration - UPDATE THESE VALUES
REPO_URL="https://github.com/Theblackcat98/blackcatdesigns.git"
BRANCH="builds"
DEPLOY_DIR="/home/thebjwjc/public_html/"       # CHANGE THIS to your actual web root
LOG_FILE="/home/thebjwjc/logs/site-deploy.log" # Keep your original log location

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Start deployment
echo "=== Next.js Deployment started at $(date) ===" >>$LOG_FILE

# SSH agent not needed for HTTPS repository

# Navigate to deploy directory
cd $DEPLOY_DIR 2>/dev/null || {
  echo "Creating deployment directory: $DEPLOY_DIR" >>$LOG_FILE
  mkdir -p $DEPLOY_DIR
  cd $DEPLOY_DIR || {
    echo "Failed to create/access $DEPLOY_DIR" >>$LOG_FILE
    exit 1
  }
}

# Check if .git directory exists (first deployment vs update)
if [ -d ".git" ]; then
  echo "Git repository exists, fetching latest changes..." >>$LOG_FILE

  # Fetch latest changes and reset to origin/branch
  git fetch origin $BRANCH >>$LOG_FILE 2>&1
  git reset --hard origin/$BRANCH >>$LOG_FILE 2>&1
else
  echo "First deployment, cloning repository..." >>$LOG_FILE

  # Clone the repository
  git clone -b $BRANCH $REPO_URL . >>$LOG_FILE 2>&1
fi

# Set proper permissions
find . -type f -exec chmod 644 {} \; 2>/dev/null
find . -type d -exec chmod 755 {} \; 2>/dev/null

# Set web server ownership (uncomment and adjust as needed)
# chown -R www-data:www-data $DEPLOY_DIR 2>/dev/null

# Cleanup old server process if running as SSR (optional)
# pkill -f "next-server" 2>/dev/null

# If this is a server-side deployment with .next folder, start the server
if [ -d ".next" ] && [ -f "package.json" ]; then
  echo "Detected Next.js build, starting production server..." >>$LOG_FILE

  # Install dependencies if needed
  if [ ! -d "node_modules" ]; then
    echo "Installing production dependencies..." >>$LOG_FILE
    npm ci --production >>$LOG_FILE 2>&1
  fi

  # Start with PM2 if available, otherwise use nohup
  if command -v pm2 >/dev/null; then
    pm2 restart blackcatdesigns 2>/dev/null || pm2 start npm --name "blackcatdesigns" -- start >>$LOG_FILE 2>&1
  else
    pkill -f "next start" 2>/dev/null
    nohup npm start >server.log 2>&1 &
    echo $! >next-server.pid
  fi
else
  echo "Static deployment detected" >>$LOG_FILE
fi

# Test the deployment
sleep 2
if curl -f -s -o /dev/null "http://localhost" 2>/dev/null || curl -f -s -o /dev/null "http://127.0.0.1:3000" 2>/dev/null; then
  echo "✅ Deployment test passed" >>$LOG_FILE
else
  echo "⚠️  Site may need web server configuration" >>$LOG_FILE
fi

# Log completion
echo "=== Deployment completed at $(date) ===" >>$LOG_FILE
echo "Files deployed to: $DEPLOY_DIR" >>$LOG_FILE
echo "" >>$LOG_FILE

echo "Deployment completed. Check logs at: $LOG_FILE"

