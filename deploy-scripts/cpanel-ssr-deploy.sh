#!/bin/bash

# cPanel SSR Deployment Script for Next.js
# BlackCatDesigns Portfolio - Optimized for cPanel Node.js App Manager

# Configuration
REPO_URL="https://github.com/Theblackcat98/blackcatdesigns.git"
BRANCH="builds"
DEPLOY_DIR="/home/thebjwjc/public_html/portfolio_app"
LOG_FILE="/home/thebjwjc/logs/cpanel-deploy.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting cPanel SSR deployment...${NC}"

# Ensure log directory exists
mkdir -p "$(dirname "$LOG_FILE")"

# Create backup of current application
if [ -d "$DEPLOY_DIR" ]; then
    echo -e "${YELLOW}Creating backup of current application...${NC}"
    BACKUP_DIR="/home/thebjwjc/backups/portfolio_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$(dirname "$BACKUP_DIR")"
    cp -r $DEPLOY_DIR $BACKUP_DIR
    echo -e "${GREEN}Backup created: $BACKUP_DIR${NC}"
fi

# Navigate to deploy directory
echo -e "${YELLOW}Deploying to: $DEPLOY_DIR${NC}"
cd $DEPLOY_DIR 2>/dev/null || {
    echo -e "${RED}Failed to access deployment directory${NC}"
    exit 1
}

# Clone or update repository
if [ -d ".git" ]; then
    echo -e "${YELLOW}Updating existing repository...${NC}"
    git fetch origin $BRANCH >>$LOG_FILE 2>&1
    git reset --hard origin/$BRANCH >>$LOG_FILE 2>&1
    git clean -fd >>$LOG_FILE 2>&1
else
    echo -e "${YELLOW}Cloning repository...${NC}"
    git clone -b $BRANCH $REPO_URL . >>$LOG_FILE 2>&1
fi

# Check if we have SSR build artifacts (optimized build or .next directory)
if [ ! -d ".next" ] && [ ! -d "build" ]; then
    echo -e "${RED}Error: No SSR build artifacts found in $BRANCH branch${NC}"
    echo -e "${RED}Ensure GitHub Actions is building and deploying SSR files${NC}"
    exit 1
fi

# Use optimized build if available, otherwise use .next
if [ -d "build" ]; then
    echo -e "${GREEN}Using optimized build (smaller size)${NC}"
    BUILD_DIR="build"
    # Create .next directory from optimized build for cPanel
    cp -r build/.next .
    cp -r build/static .next/
    cp -r build/server .next/
else
    echo -e "${YELLOW}Using standard .next build${NC}"
    BUILD_DIR="."
fi

# Install production dependencies
echo -e "${YELLOW}Installing production dependencies...${NC}"
npm ci --production >>$LOG_FILE 2>&1

# Set up production environment
echo -e "${YELLOW}Setting up production environment...${NC}"
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
EOF

# Set proper file permissions for cPanel
echo -e "${YELLOW}Setting file permissions...${NC}"
find . -type f -name "*.js" -o -name "*.json" -o -name "*.md" -exec chmod 644 {} \;
find . -type f -name "*.sh" -exec chmod 755 {} \;
find . -type d -exec chmod 755 {} \;

# Remove development files
echo -e "${YELLOW}Cleaning development files...${NC}"
rm -rf .git
rm -f package-lock.json
rm -f .env.local

# Create cPanel-specific startup configuration
echo -e "${YELLOW}Creating cPanel startup configuration...${NC}"
cat > cpanel_startup.sh << 'EOF'
#!/bin/bash
cd /home/thebjwjc/public_html/portfolio_app
export NODE_ENV=production
npm start
EOF
chmod +x cpanel_startup.sh

# Log deployment completion
echo -e "${GREEN}✅ cPanel SSR deployment completed successfully!${NC}"
echo -e "${GREEN}📁 Files deployed to: $DEPLOY_DIR${NC}"
echo -e "${GREEN}📋 Next steps:${NC}"
echo -e "${YELLOW}1. Configure cPanel Node.js App Manager:${NC}"
echo -e "   - Application Root: /public_html/portfolio_app"
echo -e "   - Application URL: theblackcatdesigns.com"
echo -e "   - Startup File: package.json"
echo -e "   - Node.js Version: 20.x"
echo -e ""
echo -e "${YELLOW}2. Add Environment Variables in cPanel:${NC}"
echo -e "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (from GitHub Secrets)"
echo -e "   - CLERK_SECRET_KEY (from GitHub Secrets)"
echo -e "   - NODE_ENV=production"
echo -e ""
echo -e "${YELLOW}3. Restart Application through cPanel interface${NC}"
echo -e "${GREEN}📊 Deployment log: $LOG_FILE${NC}"

# Verify deployment structure
echo -e "${YELLOW}Verifying deployment structure...${NC}"
if [ -f "package.json" ] && [ -d ".next" ] && [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ All required files present${NC}"
else
    echo -e "${RED}❌ Missing required files${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Ready for cPanel Node.js App Manager!${NC}"