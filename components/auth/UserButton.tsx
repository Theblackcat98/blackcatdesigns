'use client'

import { useAuth, useUser, SignOutButton } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { useState } from 'react'
import { ChevronDown, User, Settings, LogOut, Layout, Shield } from 'lucide-react'

export default function AuthUserButton() {
  const { isSignedIn, isLoaded: authLoaded } = useAuth()
  const { user, isLoaded: userLoaded } = useUser()
  const [isOpen, setIsOpen] = useState(false)

  // Show loading state while Clerk is initializing
  if (!authLoaded || !userLoaded) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
        <div className="w-8 h-8 rounded-full bg-gray-600 animate-pulse"></div>
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-pulse"></div>
      </div>
    )
  }

  if (!isSignedIn) {
    return null
  }

  return (
    <div className="relative">
      {/* User Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full glass hover:backdrop-blur-md transition-all"
        style={{ color: 'var(--navbar-brand-color)' }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
          {user?.firstName?.[0] || user?.username?.[0] || user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase() || 'U'}
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg glass shadow-lg z-50">
          <div className="p-4 border-b" style={{ borderColor: 'var(--bg-border)' }}>
            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
              {user?.firstName || user?.username || 'User'}
            </p>
            <p className="text-sm truncate" style={{ color: 'var(--text-muted)' }}>
              {user?.emailAddresses[0]?.emailAddress}
            </p>
          </div>

          <div className="py-2">
            <a
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:backdrop-blur-md transition-all"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setIsOpen(false)}
            >
              <Layout className="w-4 h-4" />
              Dashboard
            </a>

            <a
              href="/admin"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:backdrop-blur-md transition-all"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setIsOpen(false)}
            >
              <Shield className="w-4 h-4" />
              Admin
            </a>

            <div className="px-4 py-2 border-t" style={{ borderColor: 'var(--bg-border)' }}>
              <SignOutButton>
                <button
                  className="flex items-center gap-3 px-4 py-2 text-sm w-full hover:backdrop-blur-md transition-all text-red-400 hover:text-red-300 rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </SignOutButton>

              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "glass",
                    userButtonPopoverActionButton: "hover:backdrop-blur-md transition-all",
                    userButtonPopoverActionButtonText: "text-sm",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}