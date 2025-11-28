# Personal Portfolio & Blog - Project Plan

## Overview
Build a stunning personal portfolio and blog that automatically renders blog posts from markdown files. This will serve as a showcase for content and topics to discuss.

## Tech Stack

### Core Framework
- **Next.js 15+** - React framework with file-based routing, SSG, and API routes for future expansion
- **React 18+** - Component library (native to Next.js)

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework for rapid, modern design
- **next/image** - Optimized image component

### Markdown Processing
- **remark** - Markdown processor with plugin ecosystem
- **rehype** - HTML transformer for enhanced markdown rendering
- **gray-matter** - YAML frontmatter parser for blog metadata
- **prism-react-renderer** or **shiki** - Syntax highlighting for code blocks

### SEO & Meta
- **next-seo** or **next/head** - Metadata management

### Optional (Future)
- **TypeScript** - Type safety (can add later)
- **Vercel** - Deployment (built for Next.js)

## Project Structure

```
/portfolio
├── /app                        # Next.js app directory
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home/portfolio page
│   ├── globals.css             # Global styles
│   └── /blog                   # Blog section
│       ├── page.tsx            # Blog index listing
│       └── /[slug]
│           └── page.tsx        # Individual blog post
│
├── /lib
│   ├── markdown.ts             # Markdown parsing logic
│   └── posts.ts                # Blog post utilities
│
├── /public
│   ├── /images
│   │   └── /projects           # Project screenshots
│   └── /posts                  # Markdown blog files
│       ├── welcome.md
│       └── ...
│
├── .gitignore
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── package.json
├── postcss.config.js
└── README.md
```

## Completed Features

✅ **Phase 1: Foundation (MVP)**
1. ✅ Next.js 15 project setup with TailwindCSS
2. ✅ Home/Portfolio page with hero section and featured projects
3. ✅ Blog infrastructure - markdown parsing utilities
4. ✅ Blog post pages - dynamic routes with slug generation
5. ✅ Navigation & layout - header, footer, responsive design
6. ✅ Markdown rendering with gray-matter frontmatter support
7. ✅ Blog listing page with post previews
8. ✅ Sample welcome post to demonstrate functionality

✅ **Phase 2: Styling & Branding**
1. ✅ Dark mode theme throughout the site
2. ✅ Peachy orange accent color (#FFA89C) for primary interactions
3. ✅ Enhanced component styling (blockquotes with left border and background, list bullets)
4. ✅ Improved codeblock styling with dark background and accent colors
5. ✅ Overhauled footer with multiple sections and social links (GitHub, Instagram)
6. ✅ Brand naming - "BlackCatDesigns" in header
7. ✅ Slogan added - "Cultivating Aesthetic Transformations"
8. ✅ About page with bio, expertise, philosophy, and social links
9. ✅ Blog search functionality with real-time filtering
10. ✅ Category filter pills for blog posts
11. ✅ BlogFilters client component for interactivity

## Next Steps

### Phase 3: Enhancement
1. **SEO optimization** - metadata, structured data, open graph tags
2. **Reading time estimation** - for blog posts
3. **Analytics** - Vercel Analytics or Plausible
4. **Image optimization** - Add next/image for blog post images
5. **Related posts** - tag-based recommendations

### Phase 4: Advanced (Future)
1. **Comments system** - Giscus or similar
2. **Sitemap & RSS feed**
3. **Newsletter signup** - Integration with email service
4. **CMS Integration** - Contentful, Strapi, or similar
5. **Theme toggle** - Dark/light mode switcher
6. **Advanced analytics** - Custom event tracking

## Blog Post Format (Frontmatter)

```yaml
---
title: "Post Title"
description: "Brief description for SEO"
date: "2025-11-28"
author: "Your Name"
tags: ["tag1", "tag2"]
published: true
---

# Your markdown content here...
```

## Environment Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm build

# Start production server
npm start
```

The site will be available at `http://localhost:3000`

## Key Features Working

- ✅ Blog posts auto-discover from `/public/posts/*.md`
- ✅ YAML frontmatter parsing for metadata
- ✅ Markdown to HTML conversion
- ✅ Dynamic routing for individual posts
- ✅ Blog listing with sorting by date
- ✅ Responsive design with TailwindCSS
- ✅ Static generation for optimal performance

---

**Project Status:** MVP Complete - Ready for Testing & Customization
**Last Updated:** 2025-11-28
