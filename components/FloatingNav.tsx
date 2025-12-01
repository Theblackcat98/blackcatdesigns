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
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-full"
      style={{
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid #333',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <nav className="flex items-center justify-between gap-10 px-8 py-3" style={{ maxWidth: '600px' }}>
        <a
          href="/"
          className="text-xl font-bold transition-colors whitespace-nowrap"
          style={{ color: '#ffffff' }}
        >
          BlackCatDesigns
        </a>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex space-x-7">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects">Projects</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>

          <div className="flex gap-4 items-center">
            <a
              href="#"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-gray-500 text-gray-300 hover:text-white hover:border-gray-400"
              style={{ textDecoration: 'none' }}
            >
              Login
            </a>
            <a
              href="#"
              className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 whitespace-nowrap"
              style={{ textDecoration: 'none' }}
            >
              Sign Up
            </a>
          </div>
        </div>

        <button
          className="md:hidden text-white text-xl cursor-pointer"
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
        } absolute top-full left-0 right-0 mt-2 rounded-lg bg-gray-900 bg-opacity-95 p-5 flex-col gap-4 md:!hidden`}
      >
        <div className="flex flex-col gap-4">
          <NavLink href="/" onClick={closeMobileMenu}>Home</NavLink>
          <NavLink href="/projects" onClick={closeMobileMenu}>Projects</NavLink>
          <NavLink href="/blog" onClick={closeMobileMenu}>Blog</NavLink>
          <NavLink href="/about" onClick={closeMobileMenu}>About</NavLink>
          <NavLink href="/contact" onClick={closeMobileMenu}>Contact</NavLink>
        </div>

        <div className="flex flex-col gap-3 pt-4 border-t border-gray-600">
          <a
            href="#"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border border-gray-500 text-gray-300 hover:text-white hover:border-gray-400 text-center"
            style={{ textDecoration: 'none' }}
          >
            Login
          </a>
          <a
            href="#"
            className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 text-center"
            style={{ textDecoration: 'none' }}
          >
            Sign Up
          </a>
        </div>
      </div>
    </header>
  )
}