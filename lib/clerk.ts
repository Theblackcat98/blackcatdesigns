import { currentUser } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  return await currentUser()
}

export async function isAdmin(userId?: string): Promise<boolean> {
  try {
    // Secure admin check using only Clerk's metadata system
    // This prevents unauthorized access by removing email-based checks
    const user = await currentUser()

    // If no user provided, use current user
    const targetUserId = userId || user?.id

    // Get the user's public metadata - this is the secure way to check admin status
    const userRole = user?.publicMetadata?.role

    return userRole === 'admin'
  } catch (error) {
    console.error('Error checking admin status:', error)
    return false
  }
}

// Simple user data for display purposes
export async function getUserData() {
  try {
    const user = await currentUser()
    if (!user) return null

    return {
      id: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      username: user.username,
      createdAt: user.createdAt,
      lastSignInAt: user.lastSignInAt,
      isVerified: user.emailAddresses[0]?.verification?.status === 'verified',
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}
