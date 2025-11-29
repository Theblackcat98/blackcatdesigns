'use client'

import Magnetic from './Magnetic'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Magnetic>
      <a
        href={href}
        className="transition-colors block px-2 py-1"
        style={{ color: 'var(--text-secondary)' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
      >
        {children}
      </a>
    </Magnetic>
  )
}
