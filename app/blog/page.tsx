import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import BlogFilters from '@/components/BlogFilters'

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
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-100">Blog</h1>
        <p className="text-gray-400">
          Thoughts on web development, technology, and more.
        </p>
      </div>

      <BlogFilters posts={posts} allCategories={allCategories} />
    </div>
  )
}
