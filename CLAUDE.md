# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Development server (localhost:3000)
npm run build        # Static production build to /out/
npm run export       # Alternative static export command
npm run lint         # ESLint validation
npm run type-check   # TypeScript type checking
```

## Architecture Overview

**BlackCatDesigns** is a static site portfolio built with Next.js 15, React 19, and TailwindCSS. The site uses static site generation with no server-side rendering.

### Key Architecture Patterns

1. **File-Based Routing**: `/app/` directory with App Router. Each `page.tsx` becomes a static route.

2. **Centralized Theming System**: All styling uses CSS custom properties defined in `/app/globals.css`. **Never edit component styles directly** - always modify the CSS variables:
   ```css
   :root {
     --accent: #FFA89C;
     --bg-primary: #0B1120;
     --text-primary: #F8FAFC;
     --glass-blur: 12px;
   }
   ```

3. **Markdown-Driven Content**: Blog posts are `.md` files in `/public/posts/` with YAML frontmatter. The `/lib/posts.ts` system automatically discovers and processes them.

4. **Static Export Architecture**: Uses `output: 'export'` in next.config.js. All pages are pre-rendered to static HTML with no JavaScript runtime required.

### Content Management

- **Blog Posts**: Add `.md` files to `/public/posts/` with YAML frontmatter including `title`, `date`, `excerpt`, `published: true`, and `tags` array
- **Projects**: Data managed in `/lib/projects.ts` - edit this file for portfolio projects
- **Author Info**: Update `/lib/author.ts` for personal information

### Component Architecture

- **Server Components**: Default, used for static content and data fetching
- **Client Components**: Mark with `'use client'` for interactive elements (filters, search, animations)
- **Path Aliases**: Use `@/` prefix for absolute imports (e.g., `@/lib/posts`, `@/components/NavLink`)

### Styling Conventions

- **CSS Variables Only**: All theming via `/app/globals.css` variables
- **Tailwind Classes**: For layout and utility styling
- **Inline Styles**: For dynamic theming using CSS variables: `style={{ color: 'var(--text-primary)' }}`

### Animation & 3D System

- **GSAP**: For advanced animations and transitions
- **React Three Fiber**: For 3D hero section (Three.js integration)
- **Framer Motion**: For component-level animations
- **Lenis**: For smooth scrolling behavior

### Build & Deployment

- **Static Export**: `npm run build` creates static files in `/out/`
- **GitHub Actions**: Automated build pipeline that generates static site and pushes to `builds` branch
- **VPS Deployment**: Uses `deploy-scripts/simple-deploy.sh` which clones from `builds` branch and deploys to VPS
- **Repository**: https://github.com/Theblackcat98/blackcatdesigns.git (HTTPS, not SSH to avoid key conflicts)

#### Deployment Workflow

1. **Push to main branch** → Triggers GitHub Actions workflow
2. **GitHub Actions builds** static site using `npm run build` → generates `/out/` directory
3. **Workflow pushes** static files to `builds` branch (no GitHub Pages deployment)
4. **VPS script** (`deploy-scripts/simple-deploy.sh`) clones from `builds` branch and deploys to VPS
5. **VPS serves** static files via cPanel Node.js application

### Important Development Notes

- **No Environment Variables**: Everything is client-side and stored in Git
- **TypeScript Strict Mode**: All code must pass strict type checking
- **File Naming**: PascalCase for components, camelCase for functions, kebab-case for routes
- **Content Discovery**: Blog posts are auto-discovered - no manual registration needed
- **Glass Morphism**: Uses backdrop blur with `--glass-blur` CSS variable for consistent effects

### Key Directories

- `/app/` - Next.js App Router pages and layouts
- `/components/` - Reusable React components
- `/lib/` - Utility functions and data management
- `/public/posts/` - Blog post markdown files
- `/deploy-scripts/` - Deployment configuration
- Always use @app/globals.css for any all styling.
- For any reusable css style, use variables.
- Always use context7 when I need code generation, setup or configuration steps, or
library/API documentation. This means you should automatically use the Context7 MCP
tools to resolve library id and get library docs without me having to explicitly ask.