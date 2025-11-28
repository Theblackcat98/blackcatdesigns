import Link from 'next/link'
import HoverButton from '@/components/HoverButton'

export default function Home() {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'An amazing project that demonstrates my skills',
      tags: ['Next.js', 'React', 'TailwindCSS'],
      link: '#',
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Another impressive project built with modern tech',
      tags: ['TypeScript', 'Node.js'],
      link: '#',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Welcome to my Portfolio</h1>
        <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
          Full-stack developer passionate about building beautiful and functional applications
        </p>
        <HoverButton
          href="/blog"
          className="px-8 py-3 font-medium"
          style={{ color: 'var(--bg-primary)' }}
        >
          Read My Blog
        </HoverButton>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border rounded-lg p-6 transition group hover:shadow-lg hover:shadow-accent/20"
              style={{ 
                borderColor: 'var(--bg-border)', 
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 border"
                    style={{ 
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--accent-hover)',
                      borderColor: 'var(--bg-border)',
                      borderRadius: 'var(--radius-md)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="font-medium transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles Preview */}
      <section>
        <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Latest Articles</h2>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
          Check out my blog for articles on web development, technology, and more.
        </p>
        <Link
          href="/blog"
          className="font-medium transition-colors inline-block hover:opacity-80"
          style={{ color: 'var(--accent)' }}
        >
          View all articles →
        </Link>
      </section>
    </div>
  )
}
