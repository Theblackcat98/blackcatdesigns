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
          className="w-full px-4 py-3 transition rounded-lg"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--bg-border)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-border)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.boxShadow = '0 0 0 1px rgba(255, 168, 156, 0.5)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--bg-border)';
            e.currentTarget.style.boxShadow = 'none';
          }}
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
         <p className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>Filter by category:</p>
         <div className="flex flex-wrap gap-2">
           <button
             onClick={() => setSelectedCategory(null)}
             className="px-4 py-2 text-sm font-medium transition-colors"
             style={{
               backgroundColor: selectedCategory === null ? 'var(--accent)' : 'var(--bg-tertiary)',
               color: selectedCategory === null ? 'var(--bg-primary)' : 'var(--text-secondary)',
               borderRadius: 'var(--radius-full)',
               border: selectedCategory === null ? 'none' : '1px solid var(--bg-border)',
             }}
             onMouseEnter={(e) => {
               if (selectedCategory !== null) {
                 e.currentTarget.style.backgroundColor = 'var(--bg-border)';
               }
             }}
             onMouseLeave={(e) => {
               if (selectedCategory !== null) {
                 e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
               }
             }}
           >
             All Posts
           </button>
           {allCategories.map((category) => (
             <button
               key={category}
               onClick={() => setSelectedCategory(category)}
               className="px-4 py-2 text-sm font-medium transition-colors"
               style={{
                 backgroundColor: selectedCategory === category ? 'var(--accent)' : 'var(--bg-tertiary)',
                 color: selectedCategory === category ? 'var(--bg-primary)' : 'var(--text-secondary)',
                 borderRadius: 'var(--radius-full)',
                 border: selectedCategory === category ? 'none' : '1px solid var(--bg-border)',
               }}
               onMouseEnter={(e) => {
                 if (selectedCategory !== category) {
                   e.currentTarget.style.backgroundColor = 'var(--bg-border)';
                 }
               }}
               onMouseLeave={(e) => {
                 if (selectedCategory !== category) {
                   e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                 }
               }}
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
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="border rounded-lg p-6 transition"
              style={{
                borderColor: 'var(--bg-border)',
                backgroundColor: 'var(--bg-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(255, 168, 156, 0.2)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--bg-border)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group"
              >
                <h2 className="text-2xl font-semibold mb-2 transition" style={{ color: 'var(--text-primary)' }}>
                  {post.title}
                </h2>
              </Link>

              <div className="flex items-center justify-between mb-3">
                <time className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.author && (
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>by {post.author}</span>
                )}
              </div>

              {post.description && (
                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{post.description}</p>
              )}

              {post.tags && post.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 border"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--accent-hover)',
                        borderColor: 'var(--bg-border)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-block font-medium transition-colors"
                style={{ color: 'var(--accent)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--accent)'}
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
