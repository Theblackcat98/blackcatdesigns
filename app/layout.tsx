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
      <body className="bg-gray-950 text-gray-100">
        <header className="border-b border-gray-800">
          <nav className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" className="text-2xl font-bold text-[#FFA89C] hover:text-[#FFB8A3]">
              Portfolio
            </a>
            <div className="space-x-6">
              <a href="/" className="text-gray-300 hover:text-[#FFA89C] transition-colors">
                Home
              </a>
              <a href="/blog" className="text-gray-300 hover:text-[#FFA89C] transition-colors">
                Blog
              </a>
              <a href="#about" className="text-gray-300 hover:text-[#FFA89C] transition-colors">
                About
              </a>
            </div>
          </nav>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </main>

        <footer className="border-t border-gray-800 bg-gray-900/50 mt-12">
          <div className="max-w-4xl mx-auto px-6 py-6 text-center text-gray-500">
            <p>&copy; 2025. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
