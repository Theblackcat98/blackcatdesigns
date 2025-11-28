import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import type { VFile } from 'vfile'

// Simple markdown transformations for features not in GFM (before remark processing)
function processMarkdownExtensions(text: string): string {
  // Subscript: H~2~O -> H<sub>2</sub>O
  text = text.replace(/~([^~]+)~/g, '<sub>$1</sub>')

  // Superscript: X^2^ -> X<sup>2</sup>
  text = text.replace(/\^([^^]+)\^/g, '<sup>$1</sup>')

  // Simple emoji replacement (common ones)
  const emojiMap: Record<string, string> = {
    ':joy:': '😄',
    ':rocket:': '🚀',
    ':star:': '⭐',
    ':heart:': '❤️',
    ':thumbsup:': '👍',
    ':fire:': '🔥',
    ':tada:': '🎉',
    ':bug:': '🐛',
    ':bulb:': '💡',
    ':computer:': '💻',
    ':books:': '📚',
    ':check_mark:': '✅',
    ':x:': '❌',
  }

  Object.entries(emojiMap).forEach(([shortcode, emoji]) => {
    text = text.replace(new RegExp(shortcode.replace(/:/g, ':'), 'g'), emoji)
  })

  return text
}

// Apply post-processing transformations after remark (after HTML generation)
function processHtmlExtensions(html: string): string {
  // Highlight: ==text== -> <mark>text</mark>
  // This needs to happen after remark processing to preserve HTML
  html = html.replace(/==(.*?)==/g, '<mark>$1</mark>')
  
  return html
}

export async function markdownToHtml(markdown: string) {
  // Pre-process markdown extensions before remark
  let processedMarkdown = processMarkdownExtensions(markdown)

  const result = (await remark()
    .use(remarkGfm) // GitHub Flavored Markdown (tables, strikethrough, task lists)
    .use(remarkBreaks) // Line breaks
    .use(html)
    .process(processedMarkdown)) as VFile

  let htmlContent = result.toString()

  // Add data-language attribute to code blocks
  // Remark adds language as class on <code> tag, extract and add to <pre> tag
  htmlContent = htmlContent.replace(/<pre><code class="language-([^"]+)">/g, (match, language) => {
    return `<pre data-language="${language}"><code class="language-${language}">`
  })

  // Handle code blocks without language specified
  htmlContent = htmlContent.replace(/<pre><code>/g, '<pre data-language="code"><code>')

  // Apply post-processing HTML transformations (like highlight)
  htmlContent = processHtmlExtensions(htmlContent)

  return htmlContent
}
