# Deployment Context & Development Guide

## 🎯 **Project Overview**

**BlackCatDesigns Portfolio**
- **Framework**: Next.js 15 with App Router
- **Build Method**: Static export (`output: 'export'`)
- **Hosting**: Namecheap CPanel
- **Authentication**: Clerk (fully integrated)
- **Architecture**: Hybrid static + dynamic authenticated sections

## 🔧 **Development vs Production Context**

### Development Environment
```bash
npm run dev          # Runs on http://localhost:3000
```
- **Authentication**: Clerk test environment (`pk_test_`, `sk_test_`)
- **Build Output**: Builds to memory, hot reload enabled
- **Data Sources**: Local markdown files, hardcoded project data
- **Database**: Clerk manages user data (no local database needed)

### Production Environment
```bash
npm run build        # Creates static files in /out/
```
- **Authentication**: Clerk production environment (`pk_live_`, `sk_live_`)
- **Build Output**: Static files ready for Namecheap deployment
- **Deployment**: Upload `/out/` directory to Namecheap CPanel
- **Server Requirements**: None (static site with Clerk client-side auth)

## 🚀 **Development Workflow**

### 1. Starting Development
```bash
npm run dev
```
**Remember**: This is **development mode**, not production!
- Clerk uses test keys
- Authentication flows redirect to Clerk's development pages
- Changes are hot-reloaded
- All static content works immediately

### 2. Building for Production
```bash
npm run build
```
**Remember**: This creates **static files** only!
- Authentication is handled client-side by Clerk
- No server-side rendering for auth routes
- Middleware runs on Edge runtime (works with static export)

### 3. Testing Before Deployment
```bash
# Test authentication flows
npm run dev
# Visit: http://localhost:3000
# Click Login/Sign Up buttons
# Verify protected routes work
# Check admin access with admin email
```

## 🌐 **Production Deployment (Namecheap CPanel)**

### 1. Build Process
```bash
# Clean build
npm run build
# Verify no errors in output
ls -la out/
```

### 2. Environment Setup
```bash
# Set production environment variables
cp .env.local.example .env.local
# Edit .env.local with production Clerk keys
```

### 3. Upload to Namecheap
- Connect to Namecheap CPanel → File Manager
- Navigate to your domain directory
- Upload contents of `/out/` directory
- Ensure `.env.local` is uploaded (contains production keys)

### 4. Verify Deployment
- Visit your domain
- Test authentication flows
- Verify protected routes work
- Check admin dashboard access

## ⚠️ **Important Reminders for Claude & Development**

### When Working on This Project:
1. **Environment Context**:
   - `npm run dev` = Development (localhost, test keys)
   - `npm run build` = Production build (static files, production keys)
   - **This is NOT a Python server project!**

2. **Authentication System**:
   - Clerk handles all auth client-side
   - No database setup required
   - No server-side auth needed

3. **Static Export Architecture**:
   - Main site (/, /about, /projects, /blog) = Static
   - Auth sections (/dashboard, /admin) = Client-side protected
   - Middleware protects routes but doesn't require server

4. **Development Commands**:
   - `npm run dev` = Development server (NOT production)
   - `npm run build` = Create production static files
   - `npm run type-check` = TypeScript validation
   - `npm run lint` = Code quality checks

5. **Deployment Process**:
   - Build → Upload to Namecheap CPanel
   - No npm start needed for production
   - Authentication works via Clerk client-side

## 🔄 **Build Checklist**

### Before Building:
- [ ] Clerk environment variables configured in `.env.local`
- [ ] All TypeScript errors resolved
- [ ] Authentication flows tested locally
- [ ] Protected routes working correctly

### Build Process:
```bash
npm run type-check  # Verify types
npm run build        # Create static files
```

### Expected Build Output:
- ✅ No TypeScript errors
- ✅ Build completes successfully
- ✅ `/out/` directory contains all static files
- ✅ Authentication components included in build

## 📁 **Common Development Scenarios**

### Adding New Blog Posts:
1. Create `.md` file in `/public/posts/`
2. Add frontmatter with required fields
3. Rebuild: `npm run build`
4. Deploy: Upload `/out/` to Namecheap

### Modifying Projects:
1. Edit data in `/lib/projects.ts`
2. Rebuild: `npm run build`
3. Deploy: Upload `/out/` to Namecheap

### Updating Authentication:
1. Modify auth components in `/components/auth/`
2. Test with `npm run dev`
3. Build: `npm run build`
4. Deploy: Upload `/out/` to Namecheap

## 🎯 **Key Takeaways**

### For Development:
- Use `npm run dev` for local development
- Authentication flows work with Clerk test environment
- Hot reload enabled for quick iteration

### For Production:
- Use `npm run build` to create static files
- Upload `/out/` directory to Namecheap CPanel
- No server required - Clerk handles auth client-side
- Environment variables managed through Namecheap CPanel

### This is NOT:
- ❌ A Python server project
- ❌ A traditional Next.js server-rendered app
- ❌ A database-managed application
- ❌ Something that needs `npm run start` in production

**REMINDER**: When you see `npm run dev`, think **development environment** with hot reload and test keys. When you see `npm run build`, think **production static export** with Clerk client-side authentication.

---

*This file serves as a quick reference for both human and AI development context.*