export interface Project {
  slug: string
  title: string
  description: string
  problem: string
  solution: string
  result: string
  tags: string[]
  image?: string
  liveUrl?: string
  githubUrl?: string
  featured: boolean
}

const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Portfolio & Blog',
    description: 'A modern portfolio and blog built with Next.js 15, featuring static site generation and a custom markdown pipeline.',
    problem: 'Needed a professional online presence that showcases my work and thoughts while being fast, accessible, and easy to maintain.',
    solution: 'Built a statically generated site using Next.js 15 App Router with TypeScript. Implemented a custom markdown pipeline with remark/rehype for blog posts, tag-based filtering, and a clean dark theme with CSS variables for easy customization.',
    result: 'A blazing-fast portfolio scoring 100 on Lighthouse, with a flexible blog system that supports rich markdown content including code blocks, tables, and task lists.',
    tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Markdown'],
    image: '/projects/portfolio.png',
    githubUrl: 'https://github.com/theblackcat98/portfolio',
    featured: true,
  },
  {
    slug: 'example-saas',
    title: 'SaaS Dashboard',
    description: 'A full-featured SaaS dashboard with authentication, real-time data, and responsive design.',
    problem: 'Clients needed a centralized dashboard to monitor their metrics and manage their accounts without technical expertise.',
    solution: 'Developed a responsive React dashboard with real-time WebSocket updates, role-based authentication, and an intuitive drag-and-drop interface for customizing widget layouts.',
    result: 'Reduced client support tickets by 40% and increased user engagement by 60% through self-service analytics.',
    tags: ['React', 'Node.js', 'WebSockets', 'PostgreSQL'],
    image: '/projects/saas-dashboard.png',
    liveUrl: 'https://example.com/demo',
    githubUrl: 'https://github.com/theblackcat98/saas-dashboard',
    featured: true,
  },
]

export function getAllProjects(): Project[] {
  return projects
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getProjectSlugs(): string[] {
  return projects.map((p) => p.slug)
}
