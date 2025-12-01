'use client'

import Magnetic from './Magnetic'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(pathname === href || (href === '/' && pathname === '/'))
  }, [pathname, href])

  return (
    <Magnetic>
      <a
        href={href}
        className={`relative font-medium text-sm transition-all duration-300 ${
          isActive ? '' : 'hover:text-white'
        }`}
        style={{
          color: isActive ? 'var(--navlink-active-color)' : 'var(--navlink-inactive-color)',
          textDecoration: 'none',
          position: 'relative'
        }}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault()
            onClick()
          }
        }}
      >
        {children}
        <span
          className={`absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 h-[2px] transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 hover:w-full'
          }`}
          style={{ backgroundColor: 'var(--accent)' }}
        />
      </a>
    </Magnetic>
  )
}
