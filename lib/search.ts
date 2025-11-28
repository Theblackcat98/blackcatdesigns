import { Post } from './posts'

export interface SearchResult {
  slug: string
  title: string
  description?: string
  date: string
  score: number
}

export function searchPosts(posts: Post[], query: string): SearchResult[] {
  if (!query.trim()) return []

  const searchTerms = query.toLowerCase().split(/\s+/).filter(Boolean)

  const results = posts
    .map((post) => {
      let score = 0
      const titleLower = post.title.toLowerCase()
      const descLower = (post.description || '').toLowerCase()
      const contentLower = post.content.toLowerCase()
      const tagsLower = (post.tags || []).map((t) => t.toLowerCase())

      for (const term of searchTerms) {
        // Title matches (highest weight)
        if (titleLower.includes(term)) {
          score += 10
          if (titleLower.startsWith(term)) score += 5
        }

        // Tag matches (high weight)
        if (tagsLower.some((t) => t.includes(term))) {
          score += 8
        }

        // Description matches (medium weight)
        if (descLower.includes(term)) {
          score += 5
        }

        // Content matches (low weight)
        const contentMatches = (contentLower.match(new RegExp(term, 'g')) || []).length
        score += Math.min(contentMatches, 5) // Cap at 5 to avoid content-heavy bias
      }

      return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        date: post.date,
        score,
      }
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)

  return results
}
