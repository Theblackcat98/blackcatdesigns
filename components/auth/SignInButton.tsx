'use client'

import { useAuth } from '@clerk/nextjs'
import { SignIn } from '@clerk/nextjs'

export default function SignInButton() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return null
  }

  return (
    <button
      onClick={() => {
        // Redirect to Clerk's hosted sign-in page
        window.location.href = '/sign-in'
      }}
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
    </button>
  )
}