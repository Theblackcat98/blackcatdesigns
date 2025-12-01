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
          isActive ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        style={{
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
          className={`absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 h-[2px] bg-white transition-all duration-300 ${
            isActive ? 'w-full' : 'w-0 hover:w-full'
          }`}
        />
      </a>
    </Magnetic>
  )
}
