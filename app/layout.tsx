import type { Metadata } from 'next'
import './globals.css'

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
      <body className="bg-gray-950 text-gray-100 flex flex-col min-h-screen">
        <header className="border-b border-gray-800">
          <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex flex-col">
              <a href="/" className="text-2xl font-bold text-[#FFA89C] hover:text-[#FFB8A3] transition-colors">
                BlackCatDesigns
              </a>
              <p className="text-xs text-gray-500 mt-1">Cultivating Aesthetic Transformations</p>
            </div>
            <div className="space-x-6">
              <a href="/" className="text-gray-300 hover:text-[#FFA89C] transition-colors">
                Home
              </a>
              <a href="/blog" className="text-gray-300 hover:text-[#FFA89C] transition-colors">
                Blog
              </a>
              <a href="/about" className="text-gray-300 hover:text-[#FFA89C] transition-colors">
                About
              </a>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12 flex-grow w-full">
          {children}
        </main>

        <footer className="border-t border-gray-800 bg-gray-900/50 mt-12">
          <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Footer content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3 className="text-lg font-bold text-[#FFA89C] mb-2">BlackCatDesigns</h3>
                <p className="text-sm text-gray-400">Cultivating Aesthetic Transformations</p>
              </div>

              {/* Navigation Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-4">Navigation</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>
                    <a href="/" className="hover:text-[#FFA89C] transition-colors">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/blog" className="hover:text-[#FFA89C] transition-colors">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:text-[#FFA89C] transition-colors">
                      About
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://github.com/theblackcat98"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#FFA89C] transition-colors flex items-center gap-2"
                    >
                      <span>GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/theblackcat98"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#FFA89C] transition-colors flex items-center gap-2"
                    >
                      <span>Instagram</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer bottom */}
            <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
              <p>&copy; 2025 BlackCatDesigns. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
