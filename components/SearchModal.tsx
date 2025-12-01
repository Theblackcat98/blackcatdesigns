'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Post } from '@/lib/posts'
import { searchPosts, SearchResult } from '@/lib/search'

interface SearchModalProps {
  posts: Post[]
}

export default function SearchModal({ posts }: SearchModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      if (searchQuery.trim()) {
        setResults(searchPosts(posts, searchQuery))
      } else {
        setResults([])
      }
    },
    [posts]
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg transition-colors"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderColor: 'var(--bg-border)',
          color: 'var(--text-muted)',
        }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden sm:inline text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-border)' }}>
          ⌘K
        </kbd>
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-xl mx-4 rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--bg-border)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: 'var(--bg-border)' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent outline-none text-lg"
            style={{ color: 'var(--text-primary)' }}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-sm px-2 py-1 rounded"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="p-8 text-center" style={{ color: 'var(--text-muted)' }}>
              No results found for "{query}"
            </div>
          )}
          
          {results.length > 0 && (
            <ul className="p-2">
              {results.map((result) => (
                <li key={result.slug}>
                  <Link
                    href={`/blog/${result.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block p-3 rounded-lg transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <div className="font-medium">{result.title}</div>
                    {result.description && (
                      <div className="text-sm line-clamp-1 mt-1" style={{ color: 'var(--text-muted)' }}>
                        {result.description}
                      </div>
                    )}
                    <div className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                      {new Date(result.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>
              <p>Start typing to search posts</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
