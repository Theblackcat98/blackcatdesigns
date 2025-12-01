# Personal Portfolio & Blog

A modern, fully functional portfolio and blog built with Next.js, React, and TailwindCSS. Blog posts are automatically rendered from Markdown files.

## Features

- 🚀 **Next.js 15** - Modern React framework with file-based routing
- 🎨 **TailwindCSS** - Beautiful, responsive design
- 📝 **Markdown-Powered Blog** - Write posts in Markdown, auto-rendered to HTML
- 📋 **Auto Post Discovery** - Place `.md` files in `/public/posts/` and they appear automatically
- 🏷️ **Tags & Metadata** - YAML frontmatter support for post metadata
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Static Generation** - Lightning-fast performance with SSG

## Quick Start

### Prerequisites
- Node.js 18+ and npm (or yarn/pnpm)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your portfolio.

### Production Build

```bash
npm run build
npm start
```

## Writing Blog Posts

Create a new Markdown file in `/public/posts/`:

```markdown
---
title: "My First Post"
description: "A brief description"
date: "2025-11-28"
author: "Your Name"
tags: ["javascript", "react"]
published: true
---

# Your Post Content

Write your content in Markdown here...

## Features Support

- **Bold** and *italic* text
- [Links](https://example.com)
- Code blocks with syntax highlighting
- Lists, blockquotes, and more
```

The post will automatically appear on your blog at `/blog/your-post-slug`.

## Project Structure

```
/portfolio
├── /app
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   └── /blog
│       ├── page.tsx            # Blog listing
│       └── /[slug]/page.tsx    # Post pages
├── /lib
│   ├── markdown.ts             # Markdown processing
│   └── posts.ts                # Post utilities
├── /public/posts               # Blog posts folder
└── package.json
```

## Customization

### Change Site Title & Metadata
Edit `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Your Name',
  description: 'Your description',
}
```

### Modify Home Page
Edit `app/page.tsx` to customize the hero section and featured projects.

### Update Navigation
Edit the nav links in `app/layout.tsx`.

### Styling
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Add custom CSS to `globals.css` as needed

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Vercel will automatically detect your Next.js app and deploy it.

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Netlify
- GitHub Pages
- AWS Amplify
- Docker containers
- Any Node.js hosting

## Performance Optimizations

- Static Generation (SSG) for all pages
- Image optimization with `next/image`
- CSS-in-JS with TailwindCSS
- Automatic code splitting
- Zero JS in markdown content rendering

## Future Enhancements

- [ ] Dark mode toggle
- [ ] SEO optimization with next-seo
- [ ] Reading time estimation
- [ ] Search functionality
- [ ] Related posts recommendations
- [ ] Comments system (Giscus)
- [ ] RSS feed generation

## Troubleshooting

### Posts not showing up
- Check file is in `/public/posts/` with `.md` extension
- Verify frontmatter is valid YAML
- Ensure `published: true` in frontmatter

### Styling issues
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`

### Build errors
- Delete `node_modules` and `.next`
- Run `npm install` again
- Try `npm run build`

## License

MIT - Feel free to use this for your own portfolio!

## Support

For issues or questions:
1. Check the [PLAN.md](PLAN.md) for architecture details
2. Review Next.js documentation: https://nextjs.org/docs
3. Check TailwindCSS docs: https://tailwindcss.com/docs

---

**Built with Next.js + React + TailwindCSS**
