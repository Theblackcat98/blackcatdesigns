import Link from 'next/link'
import Image from 'next/image'
import { getProjectBySlug, getProjectSlugs } from '@/lib/projects'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return { title: 'Project not found' }
  }

  const ogImage = project.image 
    ? project.image 
    : `/api/og?title=${encodeURIComponent(project.title)}&description=${encodeURIComponent(project.description)}&type=project`

  return {
    title: `${project.title} - BlackCatDesigns`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
      images: [ogImage],
    },
  }
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Project not found
        </h1>
        <Link href="/" style={{ color: 'var(--accent)' }}>
          ← Back to home
        </Link>
      </div>
    )
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
        <span>›</span>
        <Link href="/#projects" style={{ color: 'var(--text-muted)' }}>Projects</Link>
        <span>›</span>
        <span style={{ color: 'var(--accent)' }}>{project.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {project.title}
        </h1>
        <p className="text-xl mb-6" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>
        
        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 border"
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

        {/* Links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg border transition-colors"
              style={{ borderColor: 'var(--bg-border)', color: 'var(--text-primary)' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View Code
            </a>
          )}
        </div>
      </header>

      {/* Project Image */}
      {project.image && (
        <div 
          className="mb-10 rounded-lg overflow-hidden border"
          style={{ borderColor: 'var(--bg-border)' }}
        >
          <div className="relative aspect-video bg-gray-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Case Study Content */}
      <div className="space-y-8">
        {/* Problem */}
        <section 
          className="p-6 rounded-lg border"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}
        >
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            The Problem
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{project.problem}</p>
        </section>

        {/* Solution */}
        <section 
          className="p-6 rounded-lg border"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}
        >
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            The Solution
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{project.solution}</p>
        </section>

        {/* Result */}
        <section 
          className="p-6 rounded-lg border"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}
        >
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--accent)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            The Result
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>{project.result}</p>
        </section>
      </div>

      {/* Back Link */}
      <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--bg-border)' }}>
        <Link href="/" style={{ color: 'var(--accent)' }}>
          ← Back to all projects
        </Link>
      </div>
    </article>
  )
}
