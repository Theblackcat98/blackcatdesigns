# Markdown Support Guide

This guide documents all markdown features supported in blog posts.

## Basic Syntax

### Headings
```markdown
# H1 Heading
## H2 Heading
### H3 Heading
```

### Bold & Italic
```markdown
**bold text**
*italic text*
***bold and italic***
```

### Blockquotes
```markdown
> This is a blockquote
> with multiple lines
```
**Rendered as:** Left border (peachy orange), indented background, gray text

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](https://example.com/image.jpg)
```
**Note:** Images are rounded with margins

### Code
```markdown
Inline `code snippet` in text
```

### Unordered Lists
```markdown
- First item
- Second item
- Third item
```
**Rendered as:** Bullet points (peachy orange dots) on the left

### Ordered Lists
```markdown
1. First item
2. Second item
3. Third item
```
**Rendered as:** Numbered list with proper numbering

### Horizontal Rule
```markdown
---
```

---

## Extended Syntax (GFM - GitHub Flavored Markdown)

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

**Styled with:**
- Dark header background
- Alternating row colors
- Borders and padding
- Proper text alignment

### Strikethrough
```markdown
~~This text is strikethrough~~
```
**Rendered as:** Gray text with line-through

### Task Lists
```markdown
- [x] Completed task
- [ ] Incomplete task
```

**Features:**
- Checkboxes with peachy orange accent color
- Checked items show strikethrough
- Fully functional (clickable in browser)

### Line Breaks
Soft line breaks are preserved in the markdown output.

---

## CSS Styling Classes

All markdown elements use the `.prose` class for styling. Key style definitions:

### Color Scheme
- **Text:** Gray-100 (headings), Gray-300 (body text), Gray-400 (meta)
- **Accent:** #FFA89C (peachy orange) for bullets, blockquote borders, links
- **Backgrounds:** Gray-900/50 (code blocks), rgba(255, 168, 156, 0.08) (blockquotes)
- **Borders:** Gray-800

### Code Blocks
```
- Dark background (gray-900)
- Peachy orange inline code color
- Border and shadow for depth
- Proper overflow handling
```

### Images
- Rounded corners (`rounded-lg`)
- Responsive sizing
- Vertical margins for spacing

---

## Not Currently Supported

The following extended markdown features are not yet implemented:

- Footnotes `[^1]`
- Subscript `H~2~O`
- Superscript `X^2^`
- Emoji shortcodes `:joy:`
- Highlight/Mark `==highlighted==`
- Definition lists
- HTML-specific syntax

These could be added by installing additional remark plugins or custom processing.

---

## Adding New Markdown Features

To add support for new markdown features:

1. **Install the remark plugin:**
   ```bash
   npm install remark-plugin-name
   ```

2. **Update `/lib/markdown.ts`:**
   ```typescript
   import remarkPlugin from 'remark-plugin-name'
   
   export async function markdownToHtml(markdown: string) {
     const result = await remark()
       .use(remarkGfm)
       .use(remarkPlugin) // Add here
       .use(html)
       .process(markdown)
     return result.toString()
   }
   ```

3. **Add CSS styles to `/app/globals.css` in the `.prose` section**

4. **Test with the markdown cheatsheet post**

---

## Example Blog Post with Markdown

See `/public/posts/markdown-cheatsheet.md` for a complete demonstration of all supported markdown features.

```bash
# To view all markdown posts
npm run dev
# Navigate to http://localhost:3000/blog
```
