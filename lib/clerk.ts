import { currentUser } from '@clerk/nextjs/server'

export async function getCurrentUser() {
  return await currentUser()
}

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    // Admin check: either email contains 'admin' OR user has admin metadata
    // In production, you'd use Clerk's metadata or a database
    const user = await currentUser()
    const userEmail = user?.emailAddresses[0]?.emailAddress

    return userEmail?.includes('admin@theblackcatdesigns.com') || // Anyone with @gmail.com gets admin access
      user?.publicMetadata?.role === 'admin'
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
