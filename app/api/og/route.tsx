import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Configure for static export
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  
  const title = searchParams.get('title') || 'BlackCatDesigns'
  const description = searchParams.get('description') || 'Portfolio & Blog'
  const type = searchParams.get('type') || 'website'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#282828',
          padding: '60px',
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at top right, rgba(255, 168, 156, 0.3) 0%, transparent 60%)',
          }}
        />
        
        {/* Type badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '20px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              fontWeight: 600,
              color: '#FFA89C',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {type === 'article' ? 'Blog Post' : type === 'project' ? 'Project' : 'BlackCatDesigns'}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 50 ? '48px' : '64px',
            fontWeight: 'bold',
            color: '#f1f5f9',
            lineHeight: 1.2,
            marginBottom: '20px',
            maxWidth: '900px',
          }}
        >
          {title}
        </div>

        {/* Description */}
        {description && (
          <div
            style={{
              display: 'flex',
              fontSize: '28px',
              color: '#9ca3af',
              lineHeight: 1.4,
              maxWidth: '800px',
            }}
          >
            {description.length > 120 ? description.slice(0, 117) + '...' : description}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span
            style={{
              fontSize: '24px',
              color: '#FFA89C',
              fontWeight: 600,
            }}
          >
            blackcatdesigns.dev
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
