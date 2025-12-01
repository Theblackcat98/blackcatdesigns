'use client'

import { useState } from 'react'
import NavLink from './NavLink'

export default function FloatingNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

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
              <a
                href="#"
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--navbar-login-bg)',
                  borderColor: 'var(--navbar-login-border)',
                  color: 'var(--navbar-login-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--navbar-login-hover-color)'
                  e.currentTarget.style.borderColor = 'var(--navbar-login-hover-border)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--navbar-login-color)'
                  e.currentTarget.style.borderColor = 'var(--navbar-login-border)'
                }}
              >
                Login
              </a>
              <a
                href="#"
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--navbar-signup-bg)',
                  color: 'var(--navbar-signup-color)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--navbar-signup-hover-bg)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--navbar-signup-bg)'
                }}
              >
                Sign Up
              </a>
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
          <a
            href="#"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border text-center"
            style={{
              backgroundColor: 'var(--navbar-login-bg)',
              borderColor: 'var(--navbar-login-border)',
              color: 'var(--navbar-login-color)'
            }}
          >
            Login
          </a>
          <a
            href="#"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 text-center"
            style={{
              backgroundColor: 'var(--navbar-signup-bg)',
              color: 'var(--navbar-signup-color)'
            }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  )
}