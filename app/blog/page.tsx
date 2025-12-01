import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import BlogFilters from '@/components/BlogFilters'
import SearchModal from '@/components/SearchModal'

export default function BlogPage() {
  const posts = getAllPosts()

  // Get all unique categories from posts
  const allCategories = Array.from(
    new Set(
      posts.flatMap((post) => post.tags || [])
    )
  ).sort()

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Blog</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Thoughts on web development, technology, and more.
          </p>
        </div>
        <SearchModal posts={posts} />
      </div>

      <BlogFilters posts={posts} allCategories={allCategories} />
    </div>
  )
}
