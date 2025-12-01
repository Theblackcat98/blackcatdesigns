'use client'

interface HoverLinkProps {
  href: string
  target?: string
  rel?: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  textColor?: string
  hoverColor?: string
}

export default function HoverLink({
  href,
  target,
  rel,
  className = '',
  style = {},
  children,
  textColor = 'var(--accent)',
  hoverColor = 'var(--accent-hover)',
}: HoverLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`transition-colors ${className}`}
      style={{ color: textColor, ...style }}
      onMouseEnter={(e) => (e.currentTarget.style.color = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.color = textColor)}
    >
      {children}
    </a>
  )
}
