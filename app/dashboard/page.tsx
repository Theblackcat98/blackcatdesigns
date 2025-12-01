import { getCurrentUser } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function DashboardPage() {
  const user = await getCurrentUser();

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
              User Dashboard
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Welcome back, {user.firstName || user.username || 'User'}!
            </p>
          </div>
          <div className="glass rounded-lg p-4">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-12 h-12",
                },
              }}
            />
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent)' }}>
              Profile Information
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Email</p>
                <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {user.emailAddresses[0]?.emailAddress}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>User ID</p>
                <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {user.id}
                </p>
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Member Since</p>
                <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent)' }}>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href="/resources"
                className="block w-full text-center px-4 py-2 rounded-lg btn-accent font-medium"
                style={{ color: '#0f172a' }}
              >
                📁 Resources & Downloads
              </a>
              <a
                href="/protected"
                className="block w-full text-center px-4 py-2 rounded-lg glass hover:backdrop-blur-md transition-all"
                style={{ color: 'var(--text-primary)' }}
              >
                View Protected Content
              </a>
              <a
                href="/"
                className="block w-full text-center px-4 py-2 rounded-lg glass hover:backdrop-blur-md transition-all"
                style={{ color: 'var(--text-primary)' }}
              >
                Back to Portfolio
              </a>
            </div>
          </div>

          {/* Access Status */}
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--accent)' }}>
              Access Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span style={{ color: 'var(--text-secondary)' }}>Dashboard Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span style={{ color: 'var(--text-secondary)' }}>Protected Content</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span style={{ color: 'var(--text-secondary)' }}>Admin Access: Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protected Areas Section */}
        <div className="glass rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            Available Protected Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/protected"
              className="p-4 rounded-lg border hover:border-opacity-50 transition-all glass hover:backdrop-blur-md"
              style={{ borderColor: 'var(--bg-border)' }}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>
                Protected Content
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Access exclusive content and resources available only to authenticated users.
              </p>
            </a>
            <div
              className="p-4 rounded-lg border opacity-50 cursor-not-allowed"
              style={{ borderColor: 'var(--bg-border)' }}
            >
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>
                Admin Dashboard
              </h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Admin access required. Contact site administrator for permissions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}