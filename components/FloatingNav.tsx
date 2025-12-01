'use client'

import { useState, useEffect } from 'react'
import NavLink from './NavLink'
import SignInButton from './auth/SignInButton'
import SignUpButton from './auth/SignUpButton'
import AuthUserButton from './auth/UserButton'
import { Lock, Download, Shield } from 'lucide-react'

export default function FloatingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('[data-user-menu]')) {
        // This will be handled by the AuthUserButton component
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <header
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full glass"
      style={{
        backgroundColor: 'var(--navbar-bg)',
        border: '1px solid var(--navbar-border)',
        boxShadow: 'var(--navbar-shadow)'
      }}
    >
      <nav className="flex items-center justify-between gap-6 px-6 py-3 w-full max-w-4xl mx-auto">
        <a
          href="/"
          className="text-xl font-bold transition-colors whitespace-nowrap flex-shrink-0"
          style={{ color: 'var(--navbar-brand-color)' }}
        >
          BlackCatDesigns
        </a>

        <div className="hidden md:flex items-center gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-6 flex-1 min-w-0">
            <div className="flex items-center gap-5">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            <div className="flex items-center gap-3 ml-auto flex-shrink-0">
              <div className="flex items-center gap-3">
                <SignInButton />
                <SignUpButton />
                <AuthUserButton />
              </div>
            </div>
          </div>
        </div>

        <button
          className="md:hidden text-xl cursor-pointer transition-colors"
          style={{ color: 'var(--navbar-brand-color)' }}
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        id="navLinks"
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } absolute top-full left-0 right-0 mt-2 rounded-lg glass p-5 flex-col gap-4 md:!hidden`}
        style={{ backgroundColor: 'var(--navbar-bg)' }}
      >
        <div className="flex flex-col gap-4">
          <NavLink href="/" onClick={closeMobileMenu}>Home</NavLink>
          <NavLink href="/projects" onClick={closeMobileMenu}>Projects</NavLink>
          <NavLink href="/blog" onClick={closeMobileMenu}>Blog</NavLink>
          <NavLink href="/about" onClick={closeMobileMenu}>About</NavLink>
          <NavLink href="/contact" onClick={closeMobileMenu}>Contact</NavLink>
        </div>

        <div className="flex flex-col gap-3 pt-4" style={{ borderTop: '1px solid var(--bg-border)' }}>
          <div className="flex flex-col gap-3">
            <SignInButton />
            <SignUpButton />
            <AuthUserButton />
          </div>
        </div>
      </div>
    </header>
  )
}