'use client'

import Magnetic from './Magnetic'

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
    ; (e.currentTarget as HTMLElement).style.backgroundColor = hoverBgColor
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    ; (e.currentTarget as HTMLElement).style.backgroundColor = bgColor
  }

  if (href) {
    return (
      <Magnetic>
        <a
          href={href}
          target={target}
          rel={rel}
          className={`inline-block transition-colors ${className}`}
          style={{ backgroundColor: bgColor, borderRadius: 'var(--radius-md)', ...style }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children}
        </a>
      </Magnetic>
    )
  }

  return (
    <Magnetic>
      <button
        onClick={onClick}
        className={`inline-block transition-colors ${className}`}
        style={{ backgroundColor: bgColor, borderRadius: 'var(--radius-md)', ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </button>
    </Magnetic>
  )
}
