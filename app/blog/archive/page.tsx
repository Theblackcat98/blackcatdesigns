import Link from 'next/link'
import { getPostsByYear } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Archive - BlackCatDesigns',
  description: 'Browse all blog posts organized by year',
}

export default function ArchivePage() {
  const postsByYear = getPostsByYear()
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a))
  const totalPosts = Object.values(postsByYear).flat().length

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
        <span>›</span>
        <Link href="/blog" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span>›</span>
        <span style={{ color: 'var(--accent)' }}>Archive</span>
      </nav>

      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Blog Archive
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {totalPosts} post{totalPosts !== 1 ? 's' : ''} across {years.length} year{years.length !== 1 ? 's' : ''}
        </p>
      </div>

      {years.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-10">
          {years.map((year) => (
            <section key={year}>
              <h2 
                className="text-2xl font-bold mb-4 pb-2 border-b"
                style={{ color: 'var(--accent)', borderColor: 'var(--bg-border)' }}
              >
                {year}
                <span 
                  className="text-base font-normal ml-3"
                  style={{ color: 'var(--text-muted)' }}
                >
                  ({postsByYear[year].length} post{postsByYear[year].length !== 1 ? 's' : ''})
                </span>
              </h2>
              
              <ul className="space-y-4">
                {postsByYear[year].map((post) => (
                  <li key={post.slug} className="flex items-start gap-4">
                    <time 
                      className="text-sm font-mono shrink-0 pt-1"
                      style={{ color: 'var(--text-muted)', width: '5rem' }}
                    >
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <div className="flex-1">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="font-medium transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {post.title}
                      </Link>
                      {post.readingTime && (
                        <span 
                          className="text-sm ml-2"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          · {post.readingTime} min read
                        </span>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Link
                              key={tag}
                              href={`/blog/tag/${encodeURIComponent(tag)}`}
                              className="text-xs px-2 py-0.5"
                              style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                color: 'var(--accent-hover)',
                                borderRadius: 'var(--radius-sm)',
                              }}
                            >
                              {tag}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="pt-8 border-t" style={{ borderColor: 'var(--bg-border)' }}>
        <Link
          href="/blog"
          className="inline-block transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          ← Back to all posts
        </Link>
      </div>
    </div>
  )
}
