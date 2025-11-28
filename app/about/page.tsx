import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | BlackCatDesigns',
  description: 'Learn more about BlackCatDesigns and my work',
}

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-5xl font-bold mb-4 text-gray-100">About Me</h1>
        <p className="text-xl text-gray-400">
          Cultivating Aesthetic Transformations
        </p>
      </header>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Who I Am</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          Welcome to BlackCatDesigns. I'm a passionate designer and developer dedicated to creating
          beautiful, functional digital experiences. My approach combines aesthetic sensibility with
          technical excellence to transform ideas into stunning realities.
        </p>
        <p className="text-gray-300 leading-relaxed">
          With a focus on clean design, user-centered development, and cutting-edge technologies,
          I help bring visions to life through thoughtful digital solutions.
        </p>
      </section>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">My Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#FFA89C] mb-3">Design</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• User Interface (UI) Design</li>
              <li>• User Experience (UX) Design</li>
              <li>• Visual Identity & Branding</li>
              <li>• Web Design & Prototyping</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-[#FFA89C] mb-3">Development</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li>• Frontend Development</li>
              <li>• React & Next.js</li>
              <li>• TypeScript & Modern JavaScript</li>
              <li>• Responsive Web Design</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">My Philosophy</h2>
        <div className="bg-gradient-to-r from-gray-900/50 to-transparent border border-gray-800 rounded-lg p-8">
          <p className="text-gray-300 leading-relaxed mb-4">
            Design is not just about how it looks, but how it feels. Every project is an opportunity
            to elevate the user experience and create something meaningful. I believe in:
          </p>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-[#FFA89C] font-bold">✦</span>
              <span><strong>Aesthetics with Purpose</strong> - Beautiful design that serves the user</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FFA89C] font-bold">✦</span>
              <span><strong>User-Centered Approach</strong> - Understanding needs before creating solutions</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FFA89C] font-bold">✦</span>
              <span><strong>Continuous Learning</strong> - Staying current with design and tech trends</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#FFA89C] font-bold">✦</span>
              <span><strong>Collaboration</strong> - Working closely with clients to exceed expectations</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="prose-section">
        <h2 className="text-3xl font-bold mb-6 text-gray-100">Let's Work Together</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          Whether you have a specific project in mind or just want to chat about design and technology,
          I'd love to hear from you. Let's create something beautiful together.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/theblackcat98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#FFA89C] text-gray-950 px-6 py-3 rounded-lg hover:bg-[#FFB8A3] font-medium transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://instagram.com/theblackcat98"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-800 text-[#FFA89C] px-6 py-3 rounded-lg hover:bg-gray-700 border border-gray-700 font-medium transition-colors"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  )
}
