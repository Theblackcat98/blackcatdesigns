import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center">
      <h1 className="text-6xl font-bold" style={{ color: 'var(--text-primary)' }}>
        404
      </h1>
      <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-secondary)' }}>
        Page Not Found
      </h2>
      <p style={{ color: 'var(--text-muted)' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-4 px-6 py-3 font-medium transition-colors"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
      >
        Back to Home
      </Link>
    </div>
  )
}
