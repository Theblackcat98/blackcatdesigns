#!/bin/bash

# Static Next.js VPS Deployment Script for cPanel
# For blackcatdesigns portfolio - Static site deployment

# Configuration
REPO_URL="https://github.com/Theblackcat98/blackcatdesigns.git"
BRANCH="builds"
DEPLOY_DIR="/home/thebjwjc/public_html"
LOG_FILE="/home/thebjwjc/logs/site-deploy.log"

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Start deployment
echo "=== Static Next.js Deployment started at $(date) ===" >>$LOG_FILE

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
  echo "Git repository exists, fetching latest changes from builds branch..." >>$LOG_FILE

  # Fetch latest changes and reset to origin/branch
  git fetch origin $BRANCH >>$LOG_FILE 2>&1
  git reset --hard origin/$BRANCH >>$LOG_FILE 2>&1
else
  echo "First deployment, cloning repository from builds branch..." >>$LOG_FILE

  # Clone repository
  git clone -b $BRANCH $REPO_URL . >>$LOG_FILE 2>&1
fi

# Set proper permissions
find . -type f -exec chmod 644 {} \; >>$LOG_FILE 2>&1
find . -type d -exec chmod 755 {} \; >>$LOG_FILE 2>&1

# Set web server ownership (uncomment and adjust as needed)
# chown -R www-data:www-data $DEPLOY_DIR >>$LOG_FILE 2>&1

echo "✅ Static files deployed successfully" >>$LOG_FILE
echo "Files deployed to: $DEPLOY_DIR" >>$LOG_FILE
echo "=== Deployment completed at $(date) ===" >>$LOG_FILE
echo "" >>$LOG_FILE

echo "Deployment completed. Check logs at: $LOG_FILE"