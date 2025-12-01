# Blackcatdesigns Deployment Configuration

## Repository Details
- **Repository**: https://github.com/Theblackcat98/blackcatdesigns.git
- **Branch**: `builds` (contains production build files)
- **Type**: Public repository (HTTPS access, no SSH required)

## Deployment Setup

### Target Server
- **Deploy Directory**: `/home/thebjwjc/public_html/`
- **Log File**: `/home/thebjwjc/logs/site-deploy.log`
- **Server**: User's VPS

### Deployment Method
- **Script**: `deploy-scripts/simple-deploy.sh`
- **Protocol**: HTTPS (not SSH) - important because other projects use SSH deploy keys
- **Repository Access**: Public, so no authentication needed

### Why HTTPS instead of SSH
- Other websites on the same server use SSH deploy keys
- Avoids SSH key conflicts between different GitHub repositories
- Simpler setup for public repositories

### Deployment Process
1. Navigate to `/home/thebjwjc/public_html/`
2. Clone/fetch from `builds` branch using HTTPS
3. Set proper file permissions (644 for files, 755 for directories)
4. Deploy static build (no server-side rendering)

### Key Configuration Variables
```bash
REPO_URL="https://github.com/Theblackcat98/blackcatdesigns.git"
BRANCH="builds"
DEPLOY_DIR="/home/thebjwjc/public_html/"
LOG_FILE="/home/thebjwjc/logs/site-deploy.log"
```

### Important Notes
- This is a **static deployment** - no Node.js server needed
- The `builds` branch contains pre-built files ready to serve
- No SSH agent setup required
- File permissions are set automatically by the script

### Troubleshooting
- Check logs: `tail -f /home/thebjwjc/logs/site-deploy.log`
- Ensure `/home/thebjwjc/public_html/` is accessible
- Verify branch contains built files, not source code

## Deployment History
- Initial setup: November 2025
- Switched from SSH to HTTPS to avoid key conflicts
- Using simple-deploy.sh for streamlined static deployment