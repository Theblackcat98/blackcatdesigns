import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

// Simple markdown transformations for features not in GFM
function processMarkdownExtensions(text: string): string {
  // Subscript: H~2~O -> H<sub>2</sub>O
  text = text.replace(/~([^~]+)~/g, '<sub>$1</sub>')

  // Superscript: X^2^ -> X<sup>2</sup>
  text = text.replace(/\^([^^]+)\^/g, '<sup>$1</sup>')

  // Highlight: ==text== -> <mark>text</mark>
  text = text.replace(/==(.*?)==/g, '<mark>$1</mark>')

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

export async function markdownToHtml(markdown: string) {
  // Pre-process markdown extensions before remark
  let processedMarkdown = processMarkdownExtensions(markdown)

  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown (tables, strikethrough, task lists)
    .use(remarkBreaks) // Line breaks
    .use(html)
    .process(processedMarkdown)

  return result.toString()
}
