import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function ProtectedPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Protected Content
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Exclusive content for authenticated users only
            </p>
          </div>
          <UserButton />
        </div>

        {/* Content */}
        <div className="glass rounded-lg p-8 mb-6">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--accent)' }}>
            🎉 Welcome to Your Protected Area!
          </h2>
          <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
            This is exclusive content that only authenticated users can access. You've successfully logged in and gained access to this protected section of the portfolio.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-lg border" style={{ borderColor: 'var(--bg-border)', backgroundColor: 'var(--bg-tertiary)' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                🔒 Secure Access
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Your session is secure and protected with industry-standard authentication.
              </p>
            </div>
            <div className="p-6 rounded-lg border" style={{ borderColor: 'var(--bg-border)', backgroundColor: 'var(--bg-tertiary)' }}>
              <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                👤 User Recognition
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                We recognize you as {user.firstName || user.username || 'User'} and have personalized your experience.
              </p>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="glass rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Your Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>User ID</p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                {user.id}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Email</p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Member Since</p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>Last Sign In</p>
              <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                {new Date(user.lastSignInAt || user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 rounded-lg glass hover:backdrop-blur-md transition-all"
            style={{ color: 'var(--text-primary)' }}
          >
            ← Back to Dashboard
          </a>
          <a
            href="/"
            className="px-6 py-3 rounded-lg glass hover:backdrop-blur-md transition-all"
            style={{ color: 'var(--text-primary)' }}
          >
            Portfolio Home
          </a>
        </div>
      </div>
    </div>
  );
}