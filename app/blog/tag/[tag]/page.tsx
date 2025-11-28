import Link from 'next/link'
import { getAllTags, getPostsByTag } from '@/lib/posts'
import BlogFilters from '@/components/BlogFilters'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  
  return {
    title: `Posts tagged "${decodedTag}"`,
    description: `All blog posts tagged with ${decodedTag}`,
  }
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)
  
  const allCategories = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  ).sort()

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link 
          href="/" 
          className="transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Home
        </Link>
        <span>›</span>
        <Link 
          href="/blog" 
          className="transition-colors"
          style={{ color: 'var(--text-muted)' }}
        >
          Blog
        </Link>
        <span>›</span>
        <span style={{ color: 'var(--accent)' }}>Tag: {decodedTag}</span>
      </nav>

      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Posts tagged "{decodedTag}"
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {posts.length} post{posts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <BlogFilters posts={posts} allCategories={allCategories} />
    </div>
  )
}
