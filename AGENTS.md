# AGENTS.md - Portfolio & Blog Development Guide

## Build & Development Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint (configured by Next.js)
```

No test suite currently configured. Add with `npm install -D jest @testing-library/react` when needed.

## Architecture

**Next.js 15 App Router** with static site generation:
- `/app` - Server components, layouts, pages (file-based routing)
- `/lib` - Utilities: `posts.ts`, `projects.ts`, `author.ts`, `markdown.ts`, `search.ts`
- `/public/posts/*.md` - Blog content (YAML frontmatter + markdown)
- `/public/projects/` - Project images
- Fully typed TypeScript, strict mode enabled

**SEO & Feeds:**
- `/sitemap.xml` - Auto-generated sitemap with all pages
- `/feed.xml` - RSS feed for blog posts
- `/api/og` - Dynamic Open Graph image generation
- JSON-LD structured data on blog posts (BlogPosting schema)

**Key Internal APIs (Posts):**
- `getAllPosts()` / `getPostBySlug(slug)` / `getSlugs()` - Post discovery from filesystem
- `getAllTags()` - Get all unique tags across posts
- `getPostsByTag(tag)` - Filter posts by tag
- `getRelatedPosts(slug, limit)` - Find related posts by shared tags
- `getPostsByYear()` - Group posts by year for archive
- `markdownToHtml(markdown)` - remark/rehype conversion with heading IDs for TOC
- Frontmatter fields: `title`, `date`, `description`, `author`, `tags`, `published`, `coverImage`
- Post objects include `readingTime` (calculated automatically)

**Key Internal APIs (Projects):**
- `getAllProjects()` / `getFeaturedProjects()` / `getProjectBySlug(slug)` / `getProjectSlugs()`
- Project fields: `slug`, `title`, `description`, `problem`, `solution`, `result`, `tags`, `image`, `liveUrl`, `githubUrl`, `featured`

**Key Internal APIs (Author):**
- `getAuthor(name?)` - Get author info for bylines
- Author fields: `name`, `bio`, `avatar`, `github`, `twitter`, `linkedin`, `website`

## Code Style & Conventions

**Imports:** Path alias `@/*` for absolute imports (e.g., `@/lib/posts`)

**Naming:** 
- PascalCase for components/types
- camelCase for functions/variables
- kebab-case for file/route names

**TypeScript:** Strict mode. Use `async` for markdown/file operations. Type React props with `React.ReactNode`, interfaces for metadata.

**Markdown Posts:** Create `.md` files in `/public/posts/` with frontmatter. Full markdown support via remark with GFM (tables, strikethrough, task lists), line breaks, and HTML rendering. Supports: headings, bold/italic, code blocks, lists (ordered/unordered), blockquotes, links, images, tables, strikethrough, task lists, line breaks.

**Styling:** TailwindCSS only (no CSS modules). Global styles in `app/globals.css`. Responsive with `md:` breakpoint.

## Theme Customization (Single Source of Truth)

**ALL theme customization happens in `/app/globals.css` lines 12-40:**

```css
:root {
  /* Accent Colors - used for links, buttons, highlights */
  --accent: #FFA89C;
  --accent-hover: #FFB8A3;
  
  /* Background Colors */
  --bg-primary: #0f172a;        /* Main page background */
  --bg-secondary: rgba(...);    /* Cards, footer */
  --bg-tertiary: #1e293b;       /* Inputs, tags */
  --bg-border: #1e293b;         /* All borders */
  
  /* Text Colors */
  --text-primary: #f1f5f9;      /* Headings */
  --text-secondary: #d1d5db;    /* Body text */
  --text-muted: #9ca3af;        /* Meta/timestamps */
  
  /* Border Radius */
  --radius-md: 0.5rem;          /* Buttons, inputs */
  --radius-lg: 0.5rem;          /* Cards, code blocks */
  --radius-full: 9999px;        /* Pills */
}
```

**Do NOT edit colors in component files.** All colors automatically use CSS variables. Edit vars once, updates everywhere.

**Interactive Components:**
- `NavLink` - Navigation links with hover effect
- `FooterLink` - Footer links with optional external target
- `HoverButton` - Buttons with customizable hover background
- `HoverLink` - Generic link with hover color

These are client components (`'use client'`) that handle color transitions without breaking SSG.

**Inline Styles:** Use `style={{ color: 'var(--text-primary)' }}` to reference variables. Only interactive elements need client components.

**No specific error handling rules yet** - add try/catch for file I/O as blog grows.
