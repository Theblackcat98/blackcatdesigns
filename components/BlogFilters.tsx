'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/posts'

interface BlogFiltersProps {
  posts: Post[]
  allCategories: string[]
}

export default function BlogFilters({ posts, allCategories }: BlogFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        !selectedCategory || post.tags?.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [posts, searchQuery, selectedCategory])

  return (
    <>
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-[#FFA89C] focus:ring-1 focus:ring-[#FFA89C]/50 transition"
        />
        <svg
          className="absolute right-3 top-3.5 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Category Filter */}
      {allCategories.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-gray-300">Filter by category:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-[#FFA89C] text-gray-950'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
              }`}
            >
              All Posts
            </button>
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#FFA89C] text-gray-950'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-gray-400 py-12 text-center">
          {searchQuery || selectedCategory
            ? 'No posts found matching your filters.'
            : 'No blog posts yet. Check back soon!'}
        </p>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-gray-500">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="border border-gray-800 rounded-lg p-6 bg-gray-900/50 hover:border-[#FFA89C] hover:shadow-lg hover:shadow-[#FFA89C]/20 transition"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group"
              >
                <h2 className="text-2xl font-semibold mb-2 text-gray-100 group-hover:text-[#FFB8A3] transition">
                  {post.title}
                </h2>
              </Link>

              <div className="flex items-center justify-between mb-3">
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.author && (
                  <span className="text-sm text-gray-500">by {post.author}</span>
                )}
              </div>

              {post.description && (
                <p className="text-gray-400 mb-4">{post.description}</p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-800 text-[#FFB8A3] text-xs px-3 py-1 rounded border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block text-[#FFA89C] hover:text-[#FFB8A3] font-medium transition-colors"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </>
  )
}
