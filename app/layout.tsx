import type { Metadata } from 'next'
import './globals.css'
import NavLink from '@/components/NavLink'
import FooterLink from '@/components/FooterLink'
import { Github, Instagram } from 'lucide-react'
import SmoothScroll from '@/components/SmoothScroll'

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
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@300,400,500,700,900&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <SmoothScroll />
        {/* Global Noise Overlay */}
        <div
          className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          }}
        />
        <header className="sticky top-0 z-50 border-b" style={{ borderColor: 'var(--bg-border)', backgroundColor: 'var(--bg-secondary)', backdropFilter: 'blur(var(--glass-blur))', WebkitBackdropFilter: 'blur(var(--glass-blur))' }}>
          <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-4 md:gap-0 md:flex-nowrap">
            <div className="flex flex-col">
              <a href="/" className="text-2xl font-bold transition-colors" style={{ color: 'var(--accent)' }}>
                BlackCatDesigns
              </a>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Cultivating Aesthetic Transformations</p>
            </div>
            <div className="flex space-x-4 md:space-x-6 text-sm md:text-base">
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
                    <FooterLink href="https://github.com/theblackcat98" external>
                      <span className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        GitHub
                      </span>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="https://instagram.com/theblackcat98" external>
                      <span className="flex items-center gap-2">
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </span>
                    </FooterLink>
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
