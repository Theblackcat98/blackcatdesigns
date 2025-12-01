import type { Metadata } from 'next'
import HoverButton from '@/components/HoverButton'

export const metadata: Metadata = {
  title: 'About | BlackCatDesigns',
  description: 'Learn more about BlackCatDesigns and my work',
}

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>About Me</h1>
        <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
          Cultivating Aesthetic Transformations
        </p>
      </header>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Who I Am</h2>
        <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
          Welcome to BlackCatDesigns. I'm a passionate designer and developer dedicated to creating
          beautiful, functional digital experiences. My approach combines aesthetic sensibility with
          technical excellence to transform ideas into stunning realities.
        </p>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          With a focus on clean design, user-centered development, and cutting-edge technologies,
          I help bring visions to life through thoughtful digital solutions.
        </p>
      </section>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>My Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent)' }}>Design</h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>• User Interface (UI) Design</li>
              <li>• User Experience (UX) Design</li>
              <li>• Visual Identity & Branding</li>
              <li>• Web Design & Prototyping</li>
            </ul>
          </div>
          <div className="border rounded-lg p-6" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--accent)' }}>Development</h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>• Frontend Development</li>
              <li>• React & Next.js</li>
              <li>• TypeScript & Modern JavaScript</li>
              <li>• Responsive Web Design</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>My Philosophy</h2>
        <div className="border rounded-lg p-8" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}>
          <p className="leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
            Design is not just about how it looks, but how it feels. Every project is an opportunity
            to elevate the user experience and create something meaningful. I believe in:
          </p>
          <ul className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: 'var(--accent)' }}>✦</span>
              <span><strong>Aesthetics with Purpose</strong> - Beautiful design that serves the user</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: 'var(--accent)' }}>✦</span>
              <span><strong>User-Centered Approach</strong> - Understanding needs before creating solutions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: 'var(--accent)' }}>✦</span>
              <span><strong>Continuous Learning</strong> - Staying current with design and tech trends</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold" style={{ color: 'var(--accent)' }}>✦</span>
              <span><strong>Collaboration</strong> - Working closely with clients to exceed expectations</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Let's Work Together</h2>
        <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          Whether you have a specific project in mind or just want to chat about design and technology,
          I'd love to hear from you. Let's create something beautiful together.
        </p>
        <div className="flex gap-4">
          <HoverButton
            href="https://github.com/theblackcat98"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-medium"
            style={{ color: 'var(--bg-primary)', borderRadius: 'var(--radius-lg)' }}
          >
            GitHub
          </HoverButton>
          <HoverButton
            href="https://instagram.com/theblackcat98"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-medium border"
            style={{ color: 'var(--accent)', borderColor: 'var(--bg-border)', borderRadius: 'var(--radius-lg)' }}
            bgColor="var(--bg-tertiary)"
            hoverBgColor="var(--bg-border)"
          >
            Instagram
          </HoverButton>
        </div>
      </section>
    </div>
  )
}
