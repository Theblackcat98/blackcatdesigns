'use client'

import { useAuth } from '@clerk/nextjs'

export default function SignUpButton() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return null
  }

  return (
    <button
      onClick={() => {
        // Redirect to Clerk's hosted sign-up page
        window.location.href = '/sign-up'
      }}
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
    </button>
  )
}