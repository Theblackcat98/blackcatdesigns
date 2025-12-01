import { Post } from '@/lib/posts'
import { Project } from '@/lib/projects'
import { Author } from '@/lib/author'

interface BlogPostingProps {
  post: Post
  author: Author
  url: string
}

export function BlogPostingJsonLd({ post, author, url }: BlogPostingProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: author.name,
      url: author.website || author.github,
    },
    publisher: {
      '@type': 'Organization',
      name: 'BlackCatDesigns',
      logo: {
        '@type': 'ImageObject',
        url: 'https://blackcatdesigns.dev/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    image: post.coverImage || undefined,
    keywords: post.tags?.join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface ProjectProps {
  project: Project
  url: string
}

export function ProjectJsonLd({ project, url }: ProjectProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Web',
    url: project.liveUrl || url,
    author: {
      '@type': 'Person',
      name: 'BlackCatDesigns',
    },
    image: project.image,
    keywords: project.tags.join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface WebsiteProps {
  url: string
  name: string
  description: string
}

export function WebsiteJsonLd({ url, name, description }: WebsiteProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    author: {
      '@type': 'Person',
      name: 'BlackCatDesigns',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

interface PersonProps {
  author: Author
  url: string
}

export function PersonJsonLd({ author, url }: PersonProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio,
    url,
    image: author.avatar,
    sameAs: [
      author.github,
      author.twitter,
      author.linkedin,
      author.website,
    ].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
