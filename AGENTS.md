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
- `/lib` - Utilities: `posts.ts` (blog discovery), `markdown.ts` (remark conversion)
- `/public/posts/*.md` - Blog content (YAML frontmatter + markdown)
- Fully typed TypeScript, strict mode enabled

**Key Internal APIs:**
- `getAllPosts()` / `getPostBySlug(slug)` / `getSlugs()` - Post discovery from filesystem
- `markdownToHtml(markdown)` - remark/rehype conversion
- Frontmatter fields: `title`, `date`, `description`, `author`, `tags`, `published`

## Code Style & Conventions

**Imports:** Path alias `@/*` for absolute imports (e.g., `@/lib/posts`)

**Naming:** 
- PascalCase for components/types
- camelCase for functions/variables
- kebab-case for file/route names

**TypeScript:** Strict mode. Use `async` for markdown/file operations. Type React props with `React.ReactNode`, interfaces for metadata.

**Markdown Posts:** Create `.md` files in `/public/posts/` with frontmatter. Frontmatter is parsed as JavaScript object, markdown rendered to HTML with `remark-html`.

**Styling:** TailwindCSS only (no CSS modules). Global styles in `app/globals.css`. Responsive with `md:` breakpoint.

**No specific error handling rules yet** - add try/catch for file I/O as blog grows.
