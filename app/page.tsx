import Link from 'next/link'
import Image from 'next/image'
import HoverButton from '@/components/HoverButton'
import { getFeaturedProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/posts'

export default function Home() {
  const projects = getFeaturedProjects()
  const latestPosts = getAllPosts().slice(0, 3)
  const totalPosts = getAllPosts().length

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="py-16 text-center relative">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="relative">
          <p 
            className="text-sm font-medium tracking-wider uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Full-Stack Developer
          </p>
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight" 
            style={{ color: 'var(--text-primary)' }}
          >
            Building Beautiful
            <br />
            <span style={{ color: 'var(--accent)' }}>Digital Experiences</span>
          </h1>
          <p 
            className="text-xl mb-8 max-w-2xl mx-auto" 
            style={{ color: 'var(--text-secondary)' }}
          >
            I craft fast, accessible, and visually compelling web applications 
            using modern technologies like Next.js, React, and TypeScript.
          </p>
          
          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap">
            <HoverButton
              href="/projects"
              className="px-8 py-3 font-medium"
              style={{ color: 'var(--bg-primary)' }}
            >
              View My Work
            </HoverButton>
            <Link
              href="/contact"
              className="px-8 py-3 font-medium border rounded-lg transition-colors"
              style={{ 
                borderColor: 'var(--bg-border)', 
                color: 'var(--text-primary)',
              }}
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 justify-center mt-12 flex-wrap">
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{projects.length}+</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Projects</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{totalPosts}+</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Blog Posts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>3+</p>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Featured Projects
          </h2>
          <Link 
            href="/projects" 
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {projects.map((project) => (
             <Link
               key={project.slug}
               href={`/projects/${project.slug}`}
               className="group block border rounded-lg overflow-hidden transition-all"
               style={{ 
                 borderColor: 'var(--bg-border)', 
                 backgroundColor: 'var(--bg-secondary)'
               }}
               onMouseEnter={(e) => {
                 e.currentTarget.style.borderColor = 'var(--accent)';
                 e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(255, 168, 156, 0.2)`;
               }}
               onMouseLeave={(e) => {
                 e.currentTarget.style.borderColor = 'var(--bg-border)';
                 e.currentTarget.style.boxShadow = 'none';
               }}
             >
              {/* Project Image */}
              {project.image && (
                <div className="relative aspect-video bg-gray-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-6">
                <h3 
                  className="text-xl font-semibold mb-2 transition-colors group-hover:text-[var(--accent)]" 
                  style={{ color: 'var(--text-primary)' }}
                >
                  {project.title}
                </h3>
                <p className="mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
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
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Latest Articles
          </h2>
          <Link 
            href="/blog" 
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            View all →
          </Link>
        </div>
        
        {latestPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {latestPosts.map((post) => (
               <Link
                 key={post.slug}
                 href={`/blog/${post.slug}`}
                 className="group block p-6 border rounded-lg transition-all"
                 style={{ 
                   borderColor: 'var(--bg-border)', 
                   backgroundColor: 'var(--bg-secondary)'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.borderColor = 'var(--accent)';
                   e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(255, 168, 156, 0.2)`;
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.borderColor = 'var(--bg-border)';
                   e.currentTarget.style.boxShadow = 'none';
                 }}
               >
                <time className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <h3 
                  className="text-lg font-semibold mt-2 mb-2 line-clamp-2 transition-colors group-hover:text-[var(--accent)]" 
                  style={{ color: 'var(--text-primary)' }}
                >
                  {post.title}
                </h3>
                {post.description && (
                  <p className="text-sm line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {post.description}
                  </p>
                )}
                {post.readingTime && (
                  <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
                    {post.readingTime} min read
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>
            Check out my blog for articles on web development, technology, and more.
          </p>
        )}
      </section>

      {/* CTA Section */}
      <section 
        className="text-center py-12 px-6 rounded-lg border"
        style={{ 
          backgroundColor: 'var(--bg-secondary)', 
          borderColor: 'var(--bg-border)' 
        }}
      >
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Let's Work Together
        </h2>
        <p className="mb-6 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
          Have a project in mind? I'm available for freelance work and collaboration opportunities.
        </p>
        <HoverButton
          href="/contact"
          className="px-8 py-3 font-medium"
          style={{ color: 'var(--bg-primary)' }}
        >
          Start a Conversation
        </HoverButton>
      </section>
    </div>
  )
}
