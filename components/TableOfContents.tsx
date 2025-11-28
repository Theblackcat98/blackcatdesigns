'use client'

import { useState, useEffect } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  html: string
}

export default function TableOfContents({ html }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const elements = doc.querySelectorAll('h2, h3')
    
    const items: TocItem[] = Array.from(elements).map((el, index) => {
      const id = el.id || `heading-${index}`
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName[1]),
      }
    })
    
    setHeadings(items)
  }, [html])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 3) return null

  const handleClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 w-full border rounded-lg"
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--bg-border)',
            color: 'var(--text-primary)'
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Table of Contents
          <svg 
            className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <nav 
            className="mt-2 p-4 border rounded-lg"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}
          >
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li 
                  key={heading.id}
                  style={{ paddingLeft: heading.level === 3 ? '1rem' : '0' }}
                >
                  <button
                    onClick={() => handleClick(heading.id)}
                    className="text-left text-sm transition-colors w-full"
                    style={{ 
                      color: activeId === heading.id ? 'var(--accent)' : 'var(--text-secondary)'
                    }}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed right-8 top-32 w-64 max-h-[calc(100vh-12rem)] overflow-y-auto">
        <nav 
          className="p-4 border rounded-lg"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--bg-border)' }}
        >
          <h2 
            className="text-sm font-semibold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            On This Page
          </h2>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li 
                key={heading.id}
                style={{ paddingLeft: heading.level === 3 ? '0.75rem' : '0' }}
              >
                <button
                  onClick={() => handleClick(heading.id)}
                  className="text-left text-sm transition-colors w-full hover:text-[var(--accent)]"
                  style={{ 
                    color: activeId === heading.id ? 'var(--accent)' : 'var(--text-muted)',
                    borderLeft: activeId === heading.id ? '2px solid var(--accent)' : '2px solid transparent',
                    paddingLeft: '0.5rem',
                  }}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
