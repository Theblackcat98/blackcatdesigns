import Link from 'next/link'
import Image from 'next/image'
import { getAllProjects } from '@/lib/projects'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - BlackCatDesigns',
  description: 'Browse my portfolio of web development projects and case studies.',
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Projects
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          A collection of my work, featuring case studies and technical details.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group block border rounded-lg overflow-hidden transition-all hover:shadow-lg"
            style={{ 
              borderColor: 'var(--bg-border)', 
              backgroundColor: 'var(--bg-secondary)'
            }}
          >
            {/* Project Image */}
            {project.image && (
              <div className="relative aspect-video bg-gray-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 
                className="text-xl font-semibold mb-2 transition-colors group-hover:text-[var(--accent)]" 
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h2>
              <p className="mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                {project.description}
              </p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--accent-hover)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
