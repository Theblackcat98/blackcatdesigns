import Link from 'next/link'
import { getPostBySlug, getSlugs } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post not found',
    }
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams() {
  const slugs = getSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4 text-gray-100">Post not found</h1>
        <Link href="/blog" className="text-[#FFA89C] hover:text-[#FFB8A3] transition-colors">
          Back to blog →
        </Link>
      </div>
    )
  }

  const htmlContent = await markdownToHtml(post.content)

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Link
          href="/blog"
          className="text-[#FFA89C] hover:text-[#FFB8A3] mb-4 inline-block transition-colors"
        >
          ← Back to blog
        </Link>

        <h1 className="text-4xl font-bold mb-4 text-gray-100">{post.title}</h1>

        <div className="flex items-center justify-between text-gray-500 mb-4">
          <time>
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          {post.author && <span>by {post.author}</span>}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-800 text-[#FFB8A3] text-sm px-3 py-1 rounded border border-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  )
}
