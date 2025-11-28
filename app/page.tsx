import Link from 'next/link'

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
        <h1 className="text-5xl font-bold mb-4 text-gray-100">Welcome to my Portfolio</h1>
        <p className="text-xl text-gray-400 mb-8">
          Full-stack developer passionate about building beautiful and functional applications
        </p>
        <Link
          href="/blog"
          className="inline-block bg-[#FFA89C] text-gray-950 px-8 py-3 rounded-lg hover:bg-[#FFB8A3] font-medium transition-colors"
        >
          Read My Blog
        </Link>
      </section>

      {/* Featured Projects */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-800 rounded-lg p-6 hover:border-[#FFA89C] bg-gray-900/50 hover:shadow-lg hover:shadow-[#FFA89C]/20 transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-100">{project.title}</h3>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="flex gap-2 flex-wrap mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-800 text-[#FFB8A3] text-sm px-3 py-1 rounded border border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="text-[#FFA89C] hover:text-[#FFB8A3] font-medium transition-colors"
              >
                View Project →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Articles Preview */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-100">Latest Articles</h2>
        <p className="text-gray-400 mb-6">
          Check out my blog for articles on web development, technology, and more.
        </p>
        <Link
          href="/blog"
          className="text-[#FFA89C] hover:text-[#FFB8A3] font-medium transition-colors"
        >
          View all articles →
        </Link>
      </section>
    </div>
  )
}
