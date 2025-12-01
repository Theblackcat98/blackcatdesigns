import Link from 'next/link'
import { Post } from '@/lib/posts'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null

  return (
    <section className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--bg-border)' }}>
      <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
        Related Posts
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-4 border rounded-lg transition-colors"
            style={{
              borderColor: 'var(--bg-border)',
              backgroundColor: 'var(--bg-secondary)',
            }}
          >
            <h3 
              className="font-semibold mb-2 line-clamp-2" 
              style={{ color: 'var(--text-primary)' }}
            >
              {post.title}
            </h3>
            {post.description && (
              <p 
                className="text-sm mb-3 line-clamp-2" 
                style={{ color: 'var(--text-secondary)' }}
              >
                {post.description}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              {post.readingTime && (
                <span>· {post.readingTime} min read</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
