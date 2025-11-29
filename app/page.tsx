import Link from 'next/link'
import Image from 'next/image'
import HoverButton from '@/components/HoverButton'
import { getFeaturedProjects } from '@/lib/projects'
import { getAllPosts } from '@/lib/posts'
import FadeIn, { StaggerContainer, StaggerItem } from '@/components/animations/FadeIn'
import TextReveal from '@/components/animations/TextReveal'
import { ArrowRight, Briefcase, Mail, FolderGit, FileText, Clock, MessageSquare } from 'lucide-react'

export default function Home() {
  const projects = getFeaturedProjects()
  const latestPosts = getAllPosts().slice(0, 3)
  const totalPosts = getAllPosts().length

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="py-24 text-center relative min-h-[80vh] flex flex-col justify-center items-center">
        {/* Background Effects */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, var(--accent) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

        <FadeIn className="relative z-10 max-w-5xl mx-auto" delay={0.2}>
          <p
            className="text-sm md:text-base font-medium tracking-[0.2em] uppercase mb-8"
            style={{ color: 'var(--accent)' }}
          >
            Full-Stack Developer
          </p>

          <div className="mb-8">
            <h1
              className="text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tighter"
              style={{ color: 'var(--text-primary)' }}
            >
              <TextReveal text="Building" className="block" delay={0.1} />
              <TextReveal text="Beautiful" className="block" delay={0.3} />
              <span className="block mt-2" style={{ color: 'var(--accent)' }}>
                <TextReveal text="Digital" delay={0.5} />{' '}
                <TextReveal text="Experiences" delay={0.7} />
              </span>
            </h1>
          </div>

          <p
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            I craft fast, accessible, and visually compelling web applications
            using modern technologies like Next.js, React, and TypeScript.
          </p>

          {/* CTAs */}
          <div className="flex gap-6 justify-center flex-wrap">
            <HoverButton
              href="/projects"
              className="px-10 py-4 font-medium flex items-center gap-3 text-lg"
              style={{ color: 'var(--bg-primary)' }}
            >
              <Briefcase className="w-5 h-5" />
              View My Work
            </HoverButton>
            <Link
              href="/contact"
              className="px-10 py-4 font-medium border rounded-lg transition-colors flex items-center gap-3 text-lg hover:bg-[var(--bg-tertiary)]"
              style={{
                borderColor: 'var(--bg-border)',
                color: 'var(--text-primary)',
              }}
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-12 justify-center mt-20 flex-wrap">
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-2 transition-transform group-hover:scale-110 duration-300">
                <FolderGit className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <p className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>{projects.length}+</p>
              </div>
              <p className="text-sm tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Projects</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-2 transition-transform group-hover:scale-110 duration-300">
                <FileText className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <p className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>{totalPosts}+</p>
              </div>
              <p className="text-sm tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Blog Posts</p>
            </div>
            <div className="text-center group">
              <div className="flex items-center justify-center gap-2 mb-2 transition-transform group-hover:scale-110 duration-300">
                <Clock className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                <p className="text-4xl font-bold" style={{ color: 'var(--accent)' }}>3+</p>
              </div>
              <p className="text-sm tracking-wider uppercase" style={{ color: 'var(--text-muted)' }}>Years Experience</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-12">
        <FadeIn className="flex items-center justify-between mb-12" direction="left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Featured Projects
          </h2>
          <Link
            href="/projects"
            className="text-base font-medium transition-colors flex items-center group"
            style={{ color: 'var(--accent)' }}
          >
            View all <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border rounded-xl overflow-hidden transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(255,168,156,0.15)] h-full relative"
                style={{
                  borderColor: 'var(--bg-border)',
                  backgroundColor: 'var(--bg-secondary)'
                }}
              >
                {/* Project Image */}
                {project.image && (
                  <div className="relative aspect-video bg-gray-800 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                )}

                <div className="p-8">
                  <h3
                    className="text-2xl font-bold mb-3 transition-colors group-hover:text-accent"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-lg" style={{ color: 'var(--text-secondary)' }}>
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-3 py-1 border font-medium"
                        style={{
                          backgroundColor: 'var(--bg-tertiary)',
                          color: 'var(--accent-hover)',
                          borderColor: 'var(--bg-border)',
                          borderRadius: 'var(--radius-full)'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Latest Articles */}
      <section className="py-12">
        <FadeIn className="flex items-center justify-between mb-12" direction="left">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Latest Articles
          </h2>
          <Link
            href="/blog"
            className="text-base font-medium transition-colors flex items-center group"
            style={{ color: 'var(--accent)' }}
          >
            View all <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </FadeIn>

        {latestPosts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block p-8 border rounded-xl transition-all hover:border-accent hover:shadow-[0_0_30px_rgba(255,168,156,0.15)] h-full flex flex-col"
                  style={{
                    borderColor: 'var(--bg-border)',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <time className="text-sm font-medium mb-4 block" style={{ color: 'var(--text-muted)' }}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </time>
                  <h3
                    className="text-xl font-bold mb-3 line-clamp-2 transition-colors group-hover:text-accent"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-base line-clamp-3 mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>
                      {post.description}
                    </p>
                  )}
                  {post.readingTime && (
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider mt-auto" style={{ color: 'var(--text-muted)' }}>
                      <Clock className="w-3 h-3" />
                      {post.readingTime} min read
                    </div>
                  )}
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>
            Check out my blog for articles on web development, technology, and more.
          </p>
        )}
      </section>

      {/* CTA Section */}
      <FadeIn delay={0.2}>
        <section
          className="text-center py-20 px-6 rounded-2xl border relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--bg-border)'
          }}
        >
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at center, var(--accent) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
              Let's Work Together
            </h2>
            <p className="mb-10 text-lg" style={{ color: 'var(--text-secondary)' }}>
              Have a project in mind? I'm available for freelance work and collaboration opportunities.
            </p>
            <HoverButton
              href="/contact"
              className="px-10 py-4 font-medium flex items-center gap-3 mx-auto text-lg"
              style={{ color: 'var(--bg-primary)' }}
            >
              <MessageSquare className="w-5 h-5" />
              Start a Conversation
            </HoverButton>
          </div>
        </section>
      </FadeIn>
    </div>
  )
}
