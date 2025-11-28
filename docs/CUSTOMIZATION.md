# BlackCatDesigns - Customization Guide

This guide explains how to customize colors, spacing, border radius, and other design aspects of your portfolio site.

## Design System Overview

The design system is **centralized in `/app/globals.css`**. All styling uses **TailwindCSS** with `@apply` directives—no CSS modules or separate config objects.

### Current Design Tokens

#### Colors (CSS Variables)
```css
/* In @layer base section of globals.css */
:root {
  --accent: #FFA89C;           /* Primary peachy orange */
  --accent-light: #FFE5DC;     /* Lighter variant (unused currently) */
}
```

#### Color Palette (Tailwind classes)
- **Background:** `gray-950` (body), `gray-900/50` (cards/footer)
- **Text:** `gray-100` (headings), `gray-300` (body), `gray-400` (meta)
- **Borders:** `gray-800`
- **Accent:** `#FFA89C` (primary), `#FFB8A3` (hover)
- **Code/UI:** `gray-800` (backgrounds), `gray-700` (borders)

#### Spacing
Uses Tailwind defaults. Examples:
- `mt-6`, `mb-4` (vertical rhythm)
- `px-4`, `py-2` (padding)
- `gap-2`, `gap-6` (flex spacing)

#### Border Radius
- `rounded` (0.25rem) - small elements
- `rounded-lg` (0.5rem) - cards, buttons
- `rounded-full` (9999px) - pills (category buttons)

---

## How to Customize

### 1. Change the Accent Color

**Current:** Peachy orange (`#FFA89C`)

The accent color appears in:
- Links (all `<a>` tags)
- Buttons (`.btn-accent` class)
- List bullets
- Blockquote borders
- Category filter pills
- Hover states
- Checkbox accent

**To change:**

Edit `/app/globals.css` line 7:
```css
:root {
  --accent: #YOUR_COLOR;        /* Change this */
  --accent-light: #YOUR_LIGHTER_COLOR;
}
```

Then replace all hardcoded color references:
- `#FFA89C` → your new color
- `#FFB8A3` → your lighter variant (for hover states)

**Files to update:**
1. `/app/globals.css` - CSS variables + all hardcoded references
2. `/app/layout.tsx` - Line 20 (header logo), lines 48, 84
3. `/app/page.tsx` - Lines 31, 52, 60, 77
4. `/components/BlogFilters.tsx` - Lines 39, 65, 77
5. `/app/about/page.tsx` - Lines 35, 44, 49, 64, 68, 72, 76, 94, 102

**Better approach (recommended):** Create a Tailwind theme config:

Edit `/tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#YOUR_COLOR',
          light: '#YOUR_LIGHTER_COLOR',
        },
      },
    },
  },
  plugins: [],
}
export default config
```

Then use `bg-accent`, `text-accent`, etc. in components.

### 2. Change Background Colors

**Current:** `gray-950` (body) and `gray-900/50` (cards)

**To change background darkness:**

Edit `/app/globals.css` line 28:
```css
body {
  @apply bg-gray-950 text-gray-100 ...  /* Change bg-gray-950 */
}
```

Common alternatives:
- `bg-gray-900` - slightly lighter
- `bg-slate-950` - more blue-ish
- `bg-neutral-950` - more neutral

For cards/secondary backgrounds (line 37, 43, etc.):
```css
/* Change from: */
@apply bg-gray-900/50;  /* 50% opacity gray-900 */

/* To: */
@apply bg-gray-800/30;  /* Adjust opacity or base color */
```

Files using background colors:
- `/app/globals.css` - Lines 28, 37, 43, 77, 109, 138, 150, 161
- `/app/layout.tsx` - Lines 16, 43
- `/app/page.tsx` - Line 44
- `/components/BlogFilters.tsx` - Lines 39, 102
- `/app/about/page.tsx` - Lines 34, 43, 57

### 3. Change Text Colors

**Current:** `gray-100` (headings), `gray-300` (body), `gray-400` (meta)

Edit `/app/globals.css` line 28:
```css
body {
  @apply ... text-gray-100 ...  /* Change text-gray-100 */
}
```

Files defining text colors:
- `/app/globals.css` - Lines 28, 51, 55, 59, 63, 72, 103, 142, 156, 220

### 4. Change Border Radius

**Current:**
- `rounded` (0.25rem) - inline code
- `rounded-lg` (0.5rem) - buttons, cards, code blocks, images
- `rounded-full` (9999px) - category pills

**To change all rounded elements:**

Option A: Edit individual selectors in `/app/globals.css`
```css
.prose code {
  @apply bg-gray-800 text-[#FFB8A3] px-2 py-1 rounded-xl ...  /* Change rounded */
}
```

Option B: Extend Tailwind config:
```typescript
theme: {
  extend: {
    borderRadius: {
      DEFAULT: '0.5rem',  /* Default radius */
    },
  },
}
```

Files with rounded elements:
- Code blocks: `/app/globals.css` line 77
- Buttons: `/app/page.tsx` lines 31, 94
- Cards: `/app/page.tsx` line 44
- Images: `/app/globals.css` line 202
- Category pills: `/components/BlogFilters.tsx` line 63

### 5. Change Border Color

**Current:** `border-gray-800`

Edit `/app/globals.css`:
```css
/* Line 33 (header) */
header {
  @apply border-gray-800;  /* Change this */
}

/* Line 37 (footer) */
footer {
  @apply border-gray-800 ...;  /* And other instances */
}
```

Alternatives:
- `border-gray-700` - lighter (more visible)
- `border-gray-900` - darker (more subtle)
- `border-[#FFA89C]` - accent color borders

**Search for `border-gray-` in `/app/globals.css` to find all border definitions.**

### 6. Change Markdown/Prose Styling

All markdown content uses the `.prose` class. Common customizations:

#### Heading Sizes
Edit `/app/globals.css` lines 50-60:
```css
.prose h1 {
  @apply text-5xl ...;  /* Change text-4xl to text-5xl, etc. */
}
```

#### Code Block Styling
Edit `/app/globals.css` lines 71-82:
```css
.prose code {
  @apply bg-gray-800 text-[#FFB8A3] px-2 py-1 rounded ...;
  /* Customize colors, padding, border radius */
}

.prose pre {
  @apply bg-gray-900 border border-gray-800 text-gray-100 p-4 rounded-lg ...;
  /* Customize background, border, padding */
}
```

#### Blockquote Styling
Edit `/app/globals.css` lines 107-111:
```css
.prose blockquote {
  @apply border-l-4 border-[#FFA89C] pl-4 my-4 text-gray-300;
  background-color: rgba(255, 168, 156, 0.08);  /* Change this color/opacity */
  @apply py-3 pr-4 rounded-r;
}
```

#### Table Styling
Edit `/app/globals.css` lines 133-151:
```css
.prose table {
  @apply w-full border-collapse my-6;
}

.prose table thead {
  @apply bg-gray-800;  /* Header background */
}

.prose table th {
  @apply border border-gray-700 px-4 py-2 text-left text-gray-200 font-semibold;
}

.prose table td {
  @apply border border-gray-700 px-4 py-2 text-gray-300;
}

.prose table tbody tr:nth-child(even) {
  @apply bg-gray-900/50;  /* Striped rows */
}
```

#### List Styling
Edit `/app/globals.css` lines 85-104:
```css
.prose ul li:before {
  content: '•';
  @apply absolute left-0 text-[#FFA89C] font-bold;  /* Bullet style and color */
}
```

To change bullet character: `content: '→';` or `content: '✦';`

### 7. Change Button Styles

**Button class:** `.btn-accent` in `/app/globals.css` line 123-125

```css
.btn-accent {
  @apply bg-[#FFA89C] text-gray-950 hover:bg-[#FFB8A3] transition-colors font-medium;
}
```

Customization:
```css
.btn-accent {
  @apply 
    bg-accent              /* Background color */
    text-gray-950         /* Text color */
    hover:bg-accent-light /* Hover background */
    px-6 py-3            /* Padding */
    rounded-lg           /* Border radius */
    font-medium          /* Font weight */
    transition-colors;   /* Animation */
}
```

---

## Component-Specific Customization

### Blog Post Cards

Location: `/components/BlogFilters.tsx` line 102

```typescript
className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-[#FFA89C] hover:shadow-lg hover:shadow-[#FFA89C]/20 transition"
```

Customize:
- `border-gray-800` - border color
- `rounded-lg` - corner radius
- `p-6` - padding
- `bg-gray-900/50` - background
- `hover:border-[#FFA89C]` - hover border
- `hover:shadow-[#FFA89C]/20` - hover shadow color/opacity

### Category Filter Pills

Location: `/components/BlogFilters.tsx` lines 63-79

```typescript
className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
  selectedCategory === null
    ? 'bg-[#FFA89C] text-gray-950'  /* Active state */
    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'  /* Inactive */
}`}
```

Customize active/inactive colors separately.

### Search Input

Location: `/components/BlogFilters.tsx` lines 34-53

```typescript
className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#FFA89C] focus:ring-1 focus:ring-[#FFA89C]/50 transition"
```

Customize focus states and colors.

---

## Quick Reference: Color Replacements

| Element | Current | How to Change |
|---------|---------|---|
| Accent color | `#FFA89C` | Update CSS var + all references |
| Accent hover | `#FFB8A3` | Update all `hover:` variants |
| Main background | `gray-950` | Change in `body` rule |
| Card background | `gray-900/50` | Change all `.../50` backgrounds |
| Primary text | `gray-100` | Change in `body` rule |
| Body text | `gray-300` | Change in `.prose p`, `body` text rules |
| Meta text | `gray-400` | Change in time/author elements |
| Borders | `gray-800` | Change all `border-gray-800` |
| Code bg | `gray-800` | Change in `.prose code` |
| Table header | `gray-800` | Change in `.prose table thead` |

---

## Testing Your Changes

After making changes:

```bash
npm run dev
# Visit http://localhost:3000 and check:
# 1. Homepage - hero section, project cards, buttons
# 2. Blog page - search input, filter pills, post cards
# 3. About page - sections and buttons
# 4. Blog post - prose content (headings, code, quotes, lists, tables)
```

---

## Best Practices

1. **Use CSS variables** for colors you repeat frequently
2. **Extend Tailwind config** for colors that should be reusable via classes
3. **Test on all pages** before committing changes
4. **Consider contrast** for accessibility (text on background)
5. **Check both light and dark states** (hover, active, focus)
6. **Update MARKDOWN_SUPPORT.md** if you change prose styling significantly

---

## Common Customization Examples

### Dark Mode (Current)
Already implemented. Background: `gray-950`, Text: `gray-100`

### Light Mode
1. Change `body` bg to `bg-white` or `bg-gray-50`
2. Change text to `text-gray-950`
3. Change borders to lighter shades
4. Invert markdown prose colors
5. Update accent color to something darker

### High Contrast
1. Use `gray-950` and `white` for maximum contrast
2. Change accent to a bold, saturated color
3. Remove opacity effects (e.g., `bg-gray-900/50` → `bg-gray-900`)
4. Strengthen borders

### Warm Color Scheme
1. Replace accent `#FFA89C` with warm color (`#FF6B6B`, `#FFA500`)
2. Change gray tones to warm grays (`slate-950`, `amber-50`)
3. Update secondary colors (code blocks, etc.)

---

## File Structure Reference

```
/app
  /globals.css          ← Main design system (edit here!)
  /layout.tsx           ← Header/footer hardcoded colors
  /page.tsx             ← Homepage hardcoded colors
  /blog/page.tsx        ← Blog page
  /about/page.tsx       ← About page hardcoded colors
/components
  /BlogFilters.tsx      ← Filter pills, search, post cards
/tailwind.config.ts     ← Tailwind theme (extend colors here)
```
