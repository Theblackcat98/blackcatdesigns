import Link from 'next/link'
import Image from 'next/image'
import { getPostBySlug, getSlugs, getRelatedPosts } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import { getAuthor } from '@/lib/author'
import { Metadata } from 'next'
import RelatedPosts from '@/components/RelatedPosts'
import TableOfContents from '@/components/TableOfContents'
import AuthorByline from '@/components/AuthorByline'
import { BlogPostingJsonLd } from '@/components/JsonLd'
import CodeBlockCopy from '@/components/CodeBlockCopy'
import ReadingProgress from '@/components/ReadingProgress'
import ShareButtons from '@/components/ShareButtons'
import ScrollReveal from '@/components/ScrollReveal'
import styles from './BlogLayout.module.css'

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

  const ogImage = post.coverImage
    ? post.coverImage
    : `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description || '')}&type=article`

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
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
  const relatedPosts = getRelatedPosts(slug, 3)
  const author = getAuthor(post.author)
  const postUrl = `https://blackcatdesigns.dev/blog/${slug}`

  return (
    <>
      <ReadingProgress />
      <BlogPostingJsonLd post={post} author={author} url={postUrl} />
      <CodeBlockCopy />

      <div className={styles.container}>
        {/* Masked Header Image */}
        <div className={styles.headerImage}>
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Main Content */}
        <main className={styles.mainContent}>
          <ScrollReveal>
            <header className="mb-12 text-center">
              <Link
                href="/blog"
                className="text-[#FFA89C] hover:text-[#FFB8A3] mb-6 inline-block transition-colors"
              >
                ← Back to blog
              </Link>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-100 leading-tight">{post.title}</h1>

              <div className="flex items-center justify-center gap-3 flex-wrap mb-6 text-gray-400">
                <time>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                {post.readingTime && (
                  <span>· {post.readingTime} min read</span>
                )}
                {post.author && <span>· by {post.author}</span>}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex justify-center gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${encodeURIComponent(tag)}`}
                      className="text-sm px-3 py-1 border transition-colors hover:border-[#FFA89C] hover:text-[#FFA89C]"
                      style={{
                        backgroundColor: 'var(--bg-tertiary)',
                        color: 'var(--text-secondary)',
                        borderColor: 'var(--bg-border)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>
          </ScrollReveal>

          <TableOfContents html={htmlContent} />

          <ScrollReveal>
            <div
              className="prose max-w-none prose-invert prose-lg"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-16 pt-8 border-t border-gray-800">
              <ShareButtons url={postUrl} title={post.title} description={post.description} />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12">
              <AuthorByline author={author} />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="mt-12">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </ScrollReveal>
        </main>
      </div>
    </>
  )
}
