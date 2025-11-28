import { remark } from 'remark'
import html from 'remark-html'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown (tables, strikethrough, task lists)
    .use(remarkBreaks) // Line breaks
    .use(html)
    .process(markdown)
  return result.toString()
}
