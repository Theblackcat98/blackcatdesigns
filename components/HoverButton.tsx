'use client'

interface HoverButtonProps {
  href?: string
  target?: string
  rel?: string
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  children: React.ReactNode
  bgColor?: string
  hoverBgColor?: string
}

export default function HoverButton({
  href,
  target,
  rel,
  className = '',
  style = {},
  onClick,
  children,
  bgColor = 'var(--accent)',
  hoverBgColor = 'var(--accent-hover)',
}: HoverButtonProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    ;(e.currentTarget as HTMLElement).style.backgroundColor = hoverBgColor
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    ;(e.currentTarget as HTMLElement).style.backgroundColor = bgColor
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`inline-block transition-colors ${className}`}
        style={{ backgroundColor: bgColor, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      className={`inline-block transition-colors ${className}`}
      style={{ backgroundColor: bgColor, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  )
}
