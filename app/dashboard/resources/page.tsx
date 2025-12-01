import { getCurrentUser } from "@/lib/clerk";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Download, Lock, FileText, Code, Image, Settings, ExternalLink } from "lucide-react";

export default async function ResourcesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Mock downloadable resources data - in a real app, this would come from a database
  const resources = [
    {
      id: 1,
      title: "Design System Components",
      description: "Complete set of React components with TailwindCSS styling",
      category: "Development",
      type: "code",
      size: "2.4 MB",
      downloads: 142,
      featured: true,
    },
    {
      id: 2,
      title: "Project Templates Collection",
      description: "Professional project templates for Next.js and React development",
      category: "Templates",
      type: "archive",
      size: "15.7 MB",
      downloads: 89,
      featured: true,
    },
    {
      id: 3,
      title: "Color Palette & Typography Guide",
      description: "Comprehensive guide to the color schemes and typography used in this portfolio",
      category: "Design",
      type: "document",
      size: "8.2 MB",
      downloads: 67,
      featured: false,
    },
    {
      id: 4,
      title: "3D Assets Collection",
      description: "Three.js models and 3D assets used in the portfolio hero section",
      category: "Assets",
      type: "archive",
      size: "42.1 MB",
      downloads: 23,
      featured: false,
    },
  ];

  // Mock client websites data (non-public links)
  const clientProjects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with payment integration",
      client: "TechStart Inc.",
      status: "development",
      accessLink: "#", // In a real app, this would be a protected link
      requiresPassword: true,
    },
    {
      id: 2,
      title: "Corporate Dashboard",
      description: "Data analytics dashboard for business intelligence",
      client: "DataCorp Solutions",
      status: "production",
      accessLink: "#", // In a real app, this would be a protected link
      requiresPassword: true,
    },
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="w-5 h-5" />;
      case "archive":
        return <Settings className="w-5 h-5" />;
      case "document":
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      development: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      production: "bg-green-500/20 text-green-400 border border-green-500/30",
      staging: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles] || styles.development}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Resources & Downloads
            </h1>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Exclusive resources and client project access for authenticated users
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

        {/* Navigation */}
        <div className="flex gap-4 mb-8">
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg glass hover:backdrop-blur-md transition-all"
            style={{ color: 'var(--text-primary)' }}
          >
            ← Dashboard
          </Link>
          <Link
            href="/protected"
            className="px-4 py-2 rounded-lg glass hover:backdrop-blur-md transition-all"
            style={{ color: 'var(--text-primary)' }}
          >
            Protected Content
          </Link>
        </div>

        {/* Downloadable Resources Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Download className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Downloadable Resources
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
              {resources.length} Files Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="glass rounded-lg p-6 border hover:border-opacity-50 transition-all"
                style={{ borderColor: 'var(--bg-border)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      {getResourceIcon(resource.type)}
                    </div>
                    <div>
                      {resource.featured && (
                        <span className="inline-block px-2 py-1 rounded text-xs font-medium mb-1"
                          style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent)' }}
                        >
                          Featured
                        </span>
                      )}
                      <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                        {resource.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {resource.size}
                    </p>
                  </div>
                </div>

                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {resource.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-sm px-2 py-1 rounded" style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-secondary)'
                    }}>
                      {resource.category}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {resource.downloads} downloads
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg btn-accent text-sm font-medium">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p style={{ color: 'var(--text-muted)' }}>
              More resources will be added regularly. Check back soon for updates!
            </p>
          </div>
        </div>

        {/* Client Projects Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6" style={{ color: 'var(--accent)' }} />
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Client Project Access
            </h2>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Password Protected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientProjects.map((project) => (
              <div
                key={project.id}
                className="glass rounded-lg p-6 border hover:border-opacity-50 transition-all"
                style={{ borderColor: 'var(--bg-border)' }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: 'var(--text-muted)' }}>
                      Client: {project.client}
                    </p>
                    {getStatusBadge(project.status)}
                  </div>
                  <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
                    <Lock className="w-4 h-4" />
                    <span className="text-xs">Protected</span>
                  </div>
                </div>

                <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Password required for access
                  </p>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-opacity-10 transition-all"
                    style={{
                      borderColor: 'var(--accent)',
                      color: 'var(--accent)'
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Request Access
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-lg border" style={{
            borderColor: 'var(--bg-border)',
            backgroundColor: 'var(--bg-tertiary)'
          }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Access Request Process
            </h3>
            <ol className="space-y-2" style={{ color: 'var(--text-secondary)' }}>
              <li>Contact the portfolio administrator using the contact form</li>
              <li>Specify which client project you need access to</li>
              <li>Provide your business email and reason for access</li>
              <li>Receive password and access link via email</li>
              <li>Access is granted on a case-by-case basis</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}