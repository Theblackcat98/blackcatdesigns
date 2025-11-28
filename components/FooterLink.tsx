'use client'

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  external?: boolean
}

export default function FooterLink({ href, children, external }: FooterLinkProps) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="transition-colors"
      style={{ color: 'var(--text-muted)' }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
    >
      {children}
    </a>
  )
}
