# BlackCatDesigns - Customization Guide

This guide explains how to customize colors, spacing, border radius, and other design aspects of your portfolio site.

## Design System Overview

The design system is **fully centralized in `/app/globals.css`** using **CSS custom properties (variables)**. All colors, spacing, and border radius are defined in one place and used throughout the site via inline styles and Tailwind classes with CSS variables.

### Current Design Tokens (One Place to Edit)

**Edit ONLY `/app/globals.css` lines 12-40 to customize the entire theme:**

```css
:root {
  /* Accent Colors - used for links, buttons, highlights */
  --accent: #FFA89C;
  --accent-light: #FFE5DC;
  --accent-hover: #FFB8A3;

  /* Background Colors */
  --bg-primary: #0f172a;              /* Main page background (gray-950) */
  --bg-secondary: rgba(15, 23, 42, 0.5); /* Cards, secondary elements */
  --bg-tertiary: #1e293b;             /* Tertiary backgrounds (gray-800) */
  --bg-border: #1e293b;               /* Border color (gray-800) */

  /* Text Colors */
  --text-primary: #f1f5f9;            /* Headings, primary text */
  --text-secondary: #d1d5db;          /* Body text */
  --text-muted: #9ca3af;              /* Meta text, timestamps */

  /* Border Radius */
  --radius-default: 0.25rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.5rem;
  --radius-full: 9999px;
}
```

**That's it!** Every color, background, text color, and border radius across the entire site is defined here. Change a value and it updates everywhere automatically.

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

### Everything in One Place

All customization happens in `/app/globals.css` lines 12-40. No other files need editing for theme changes.

### 1. Change the Accent Color

**Current:** Peachy orange (`#FFA89C`)

**To change:**

Edit `/app/globals.css` lines 13-16:
```css
/* Accent Colors - used for links, buttons, highlights */
--accent: #YOUR_COLOR;           /* Primary color for buttons, links, borders */
--accent-light: #YOUR_LIGHTER_COLOR;  /* (currently unused) */
--accent-hover: #YOUR_LIGHTER_VARIANT; /* Hover state for buttons and links */
```

**Impact:** Updates everywhere in one change:
- All links
- All buttons
- List bullets
- Blockquote borders
- Category filter pills (hover state)
- Checkbox accent
- Focus rings on inputs

No component files need editing. CSS variables are used throughout.

### 2. Change Background Colors

**To customize:**

Edit `/app/globals.css` lines 19-23:
```css
/* Background Colors */
--bg-primary: #0f172a;              /* Main page background */
--bg-secondary: rgba(15, 23, 42, 0.5); /* Cards, footer */
--bg-tertiary: #1e293b;             /* Input fields, tags */
--bg-border: #1e293b;               /* All borders */
```

**Examples:**

Lighter dark theme:
```css
--bg-primary: #1a1f35;      /* Slightly lighter background */
--bg-secondary: rgba(26, 31, 53, 0.5);
--bg-tertiary: #2d3748;
--bg-border: #2d3748;
```

High contrast (pure black):
```css
--bg-primary: #000000;
--bg-secondary: rgba(0, 0, 0, 0.5);
--bg-tertiary: #1a1a1a;
--bg-border: #333333;
```

Light theme:
```css
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-tertiary: #e8eaed;
--bg-border: #d1d5db;
```

**Impact:** Updates all backgrounds in the site in one change.

### 3. Change Text Colors

Edit `/app/globals.css` lines 25-27:
```css
/* Text Colors */
--text-primary: #f1f5f9;    /* Headings, main text */
--text-secondary: #d1d5db;  /* Body text */
--text-muted: #9ca3af;      /* Meta text, timestamps, disabled */
```

**Examples:**

Bright/High contrast:
```css
--text-primary: #ffffff;     /* Pure white */
--text-secondary: #e5e7eb;   /* Very light gray */
--text-muted: #a1a5aa;       /* Slightly darker muted */
```

Warm theme:
```css
--text-primary: #fef3c7;     /* Warm white */
--text-secondary: #fde68a;   /* Warm light */
--text-muted: #fcd34d;       /* Warm muted */
```

Light theme:
```css
--text-primary: #000000;
--text-secondary: #374151;
--text-muted: #6b7280;
```

**Impact:** Updates all text colors throughout the site.

### 4. Change Border Radius

Edit `/app/globals.css` lines 33-39:
```css
/* Border Radius */
--radius-default: 0.25rem;  /* Inline code elements */
--radius-sm: 0.375rem;      /* Small elements */
--radius-md: 0.5rem;        /* Buttons, inputs, tags */
--radius-lg: 0.5rem;        /* Cards, code blocks, images */
--radius-full: 9999px;      /* Pills (category buttons) */
```

**Examples:**

Super rounded (more modern):
```css
--radius-md: 0.75rem;   /* Buttons, inputs */
--radius-lg: 1rem;      /* Cards, code blocks */
--radius-full: 9999px;
```

Minimal rounding (sharp corners):
```css
--radius-default: 0rem;
--radius-sm: 0rem;
--radius-md: 0.125rem;
--radius-lg: 0.25rem;
--radius-full: 9999px;  /* Pills still fully rounded */
```

**Impact:** Updates border radius for buttons, cards, images, code blocks, tags, and all inputs.

### 5. Border Color

Borders use `--bg-border` (same as `--bg-tertiary`). To change, edit:

```css
--bg-border: #1e293b;  /* Line 23 in globals.css */
```

To make borders more visible, use a lighter color:
```css
--bg-border: #334155;  /* Lighter gray */
```

To match the accent color for emphasis:
```css
--bg-border: var(--accent);  /* Use accent color for all borders */
```

**Impact:** Updates borders on cards, tables, inputs, and all structural elements.

### 6. Markdown/Prose Styling

All markdown elements automatically use your theme CSS variables. Changes to colors update markdown automatically:

- **Headings** - Use `--text-primary`
- **Body text** - Use `--text-secondary`
- **Code blocks** - Use `--bg-secondary` and `--text-primary`
- **Inline code** - Use `--bg-tertiary` and `--accent-hover`
- **Blockquotes** - Use `--accent` for left border, `--text-secondary` for text
- **Tables** - Use `--bg-tertiary` for headers, `--bg-secondary` for striped rows
- **Links** - Use `--accent` and `--accent-hover`

To customize markdown more extensively, edit the `.prose` selectors in `/app/globals.css` (lines ~81-300).

**Change bullet character:**

Edit `/app/globals.css` line ~145:
```css
.prose ul li:before {
  content: '→';  /* Change • to →, ✦, ◆, etc. */
}
```

### 7. Button Styles

Button styles automatically use your theme colors. Buttons use:
- `--accent` for background
- `--accent-hover` for hover state
- `--bg-primary` for text color

All buttons update when you change accent colors.

---

## Quick Reference: CSS Variables

| Element | Variable | Edit In |
|---------|----------|---------|
| Primary accent color | `--accent` | Line 14 |
| Accent hover state | `--accent-hover` | Line 16 |
| Main page background | `--bg-primary` | Line 19 |
| Card/footer background | `--bg-secondary` | Line 20 |
| Input/tag background | `--bg-tertiary` | Line 21 |
| All borders | `--bg-border` | Line 22 |
| Headings | `--text-primary` | Line 25 |
| Body text | `--text-secondary` | Line 26 |
| Meta text/timestamps | `--text-muted` | Line 27 |
| Code border radius | `--radius-md` | Line 36 |
| Card border radius | `--radius-lg` | Line 37 |
| Category pill radius | `--radius-full` | Line 38 |

---

## Testing Your Changes

After editing `/app/globals.css`:

```bash
npm run dev
# Visit http://localhost:3000 and check all pages automatically update:
# - Homepage colors, buttons, cards
# - Blog page filters and post cards
# - About page sections and buttons
# - Markdown content in blog posts
```

Changes take effect immediately (no file recompilation needed).

---

## Best Practices

1. **Only edit `/app/globals.css` (lines 12-40)** for theme changes
2. **Use hex colors** for consistency (e.g., `#FFA89C`)
3. **Use rgba() for opacity** in backgrounds (e.g., `rgba(15, 23, 42, 0.5)`)
4. **Test contrast** - ensure text is readable on background colors
5. **Keep accent color saturated** - muted accents reduce visual hierarchy
6. **Update tailwind.config.ts** only if extending Tailwind utilities

---

## Common Customization Examples

### Vibrant Accent (More Bold)
```css
--accent: #FF1744;        /* Vibrant red */
--accent-hover: #FF5252;  /* Lighter red for hover */
```

### Monochrome Theme (Grays Only)
```css
--accent: #94a3b8;        /* Gray accent */
--accent-hover: #cbd5e1;  /* Lighter gray */
```

### High Contrast Dark
```css
--bg-primary: #000000;
--text-primary: #ffffff;
--bg-border: #444444;
--accent: #FFD700;        /* Bold yellow accent */
```

### Cooler Tones
```css
--bg-primary: #0f1419;    /* Slightly cooler black */
--text-primary: #e0e6f0;  /* Cooler white */
--accent: #00D9FF;        /* Cyan accent */
```

---

## File Structure Reference

```
/app
  /globals.css          ← ⭐ ONLY FILE TO EDIT FOR THEME
  /layout.tsx           ← Uses CSS variables
  /page.tsx             ← Uses CSS variables
  /blog/page.tsx        ← Blog page
  /about/page.tsx       ← Uses CSS variables
/components
  /BlogFilters.tsx      ← Uses CSS variables
/tailwind.config.ts     ← Extended with CSS variable colors
```
