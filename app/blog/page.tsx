import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-100">Blog</h1>
        <p className="text-gray-400">
          Thoughts on web development, technology, and more.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-400 py-12 text-center">
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
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
    </div>
  )
}
