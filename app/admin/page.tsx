import { getCurrentUser, isAdmin } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Check if user has admin role
  const isAdminUser = await isAdmin(user.id);

  if (!isAdminUser) {
    return (
      <div className="min-h-screen px-6 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="glass rounded-lg p-8">
            <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Access Denied
            </h1>
            <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
              You don't have administrative privileges to access this area.
            </p>
            <a
              href="/dashboard"
              className="inline-block px-6 py-3 rounded-lg glass hover:backdrop-blur-md transition-all"
              style={{ color: 'var(--text-primary)' }}
            >
              Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Admin Dashboard
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Manage users and system settings
            </p>
          </div>
          <UserButton />
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-lg p-6">
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
              Total Users
            </h3>
            <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              --
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              User management coming soon
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
              Active Sessions
            </h3>
            <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              1
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Currently active
            </p>
          </div>
          <div className="glass rounded-lg p-6">
            <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
              Protected Areas
            </h3>
            <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>
              2
            </p>
            <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
              Dashboard & Protected Content
            </p>
          </div>
        </div>

        {/* User Management */}
        <div className="glass rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            User Management
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b" style={{ borderColor: 'var(--bg-border)' }}>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    User
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    Role
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    Status
                  </th>
                  <th className="text-left py-3 px-4" style={{ color: 'var(--text-secondary)' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* {user: any && ( */}
                <tr className="border-b" style={{ borderColor: 'var(--bg-border)' }}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                      <span style={{ color: 'var(--text-primary)' }}>
                        {user?.firstName || user?.username || 'Admin'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {user?.emailAddresses?.[0]?.emailAddress}
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 rounded text-xs font-medium" style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--bg-primary)'
                    }}>
                      Admin
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span style={{ color: 'var(--text-secondary)' }}>Active</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="px-3 py-1 rounded text-xs glass hover:backdrop-blur-md transition-all"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Manage
                    </button>
                  </td>
                </tr>
                {/* )} */}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Settings */}
        <div className="glass rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-6" style={{ color: 'var(--text-primary)' }}>
            System Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--bg-border)' }}>
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Authentication Settings
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Configure authentication methods and security policies.
              </p>
              <button
                className="px-4 py-2 rounded-lg glass hover:backdrop-blur-md transition-all text-sm"
                style={{ color: 'var(--text-primary)' }}
              >
                Configure Auth
              </button>
            </div>
            <div className="p-4 rounded-lg border" style={{ borderColor: 'var(--bg-border)' }}>
              <h3 className="text-lg font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                Access Control
              </h3>
              <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                Manage user permissions and role assignments.
              </p>
              <button
                className="px-4 py-2 rounded-lg glass hover:backdrop-blur-md transition-all text-sm"
                style={{ color: 'var(--text-primary)' }}
              >
                Manage Access
              </button>
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