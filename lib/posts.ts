import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'public/posts')

// Calculate reading time in minutes (average 200 words per minute)
function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export interface Post {
  slug: string
  title: string
  date: string
  description?: string
  author?: string
  tags?: string[]
  published?: boolean
  content: string
  readingTime?: number
  coverImage?: string
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const filePath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        title: data.title || 'Untitled',
        date: data.date || '',
        description: data.description || '',
        author: data.author || '',
        tags: data.tags || [],
        published: data.published !== false,
        readingTime: calculateReadingTime(content),
        coverImage: data.coverImage || '',
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return allPostsData
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(postsDirectory, `${slug}.md`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    author: data.author || '',
    tags: data.tags || [],
    published: data.published !== false,
    readingTime: calculateReadingTime(content),
    coverImage: data.coverImage || '',
  }
}

export function getSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getRelatedPosts(slug: string, limit: number = 3): Post[] {
  const currentPost = getPostBySlug(slug)
  if (!currentPost || !currentPost.tags?.length) return []

  const allPosts = getAllPosts().filter((p) => p.slug !== slug)
  const scored = allPosts.map((post) => {
    const sharedTags = post.tags?.filter((tag) =>
      currentPost.tags?.includes(tag)
    ).length || 0
    return { post, score: sharedTags }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.post)
}

export function getPostsByYear(): Record<string, Post[]> {
  const posts = getAllPosts()
  const grouped: Record<string, Post[]> = {}
  
  posts.forEach((post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!grouped[year]) grouped[year] = []
    grouped[year].push(post)
  })
  
  return grouped
}
