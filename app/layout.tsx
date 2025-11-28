import type { Metadata } from 'next'
import './globals.css'
import NavLink from '@/components/NavLink'
import FooterLink from '@/components/FooterLink'

export const metadata: Metadata = {
  title: 'Portfolio & Blog',
  description: 'Personal portfolio and blog featuring my work and thoughts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <header className="border-b" style={{ borderColor: 'var(--bg-border)' }}>
          <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col">
              <a href="/" className="text-2xl font-bold transition-colors" style={{ color: 'var(--accent)' }}>
                BlackCatDesigns
              </a>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Cultivating Aesthetic Transformations</p>
            </div>
            <div className="space-x-6">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
          {children}
        </main>

        <footer className="border-t mt-12" style={{ borderColor: 'var(--bg-border)', backgroundColor: 'var(--bg-secondary)' }}>
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Footer content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--accent)' }}>BlackCatDesigns</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Cultivating Aesthetic Transformations</p>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>Navigation</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <FooterLink href="/">Home</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/projects">Projects</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/blog">Blog</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/about">About</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/contact">Contact</FooterLink>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--text-secondary)' }}>Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <FooterLink href="https://github.com/theblackcat98" external>GitHub</FooterLink>
                  </li>
                  <li>
                    <FooterLink href="https://instagram.com/theblackcat98" external>Instagram</FooterLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="border-t pt-6 text-center text-sm" style={{ borderColor: 'var(--bg-border)', color: 'var(--text-muted)' }}>
              <p>&copy; 2025 BlackCatDesigns. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
