'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { examples, type MermaidExample } from './examples'

const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js'

type MermaidApi = {
  initialize: (config: Record<string, unknown>) => void
  render: (id: string, code: string) => Promise<{ svg: string }>
}

function getMermaid(): MermaidApi | null {
  const w = window as unknown as { mermaid?: MermaidApi }
  return w.mermaid ?? null
}

function Diagram({ example }: { example: MermaidExample }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const render = async () => {
      const mermaid = getMermaid()
      if (!mermaid) return
      try {
        const { svg } = await mermaid.render(`mmd-${example.id}`, example.code)
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Render failed')
      }
    }
    // Mermaid may still be loading; poll briefly.
    let attempts = 0
    const timer = setInterval(() => {
      if (getMermaid() || attempts > 100) {
        clearInterval(timer)
        void render()
      }
      attempts++
    }, 100)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [example.id, example.code])

  return (
    <div
      className="rounded-xl p-6 overflow-x-auto"
      style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--bg-border)' }}
    >
      {error ? (
        <p className="text-sm text-red-400">Could not render: {error}</p>
      ) : (
        <div ref={containerRef} className="flex justify-center [&>svg]:max-w-full [&>svg]:h-auto" />
      )}
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = code
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--bg-border)' }}
    >
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: '1px solid var(--bg-border)' }}>
        <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>mermaid</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-md transition-colors"
          style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)' }}
          aria-label="Copy mermaid source"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono leading-relaxed" style={{ color: 'var(--text-primary)' }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default function MermaidGallery() {
  useEffect(() => {
    if (getMermaid()) return
    const script = document.createElement('script')
    script.src = MERMAID_CDN
    script.async = true
    script.onload = () => {
      getMermaid()?.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' })
    }
    document.head.appendChild(script)
  }, [])

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Mermaid.js Gallery
        </h1>
        <p className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Every Mermaid diagram type, rendered live with copy-pasteable source.
          All 23 examples are syntax-checked — no broken snippets.
        </p>
      </header>

      <nav aria-label="Diagram types">
        <div className="flex flex-wrap gap-2">
          {examples.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="text-sm px-3 py-1.5 rounded-full transition-colors"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--bg-border)',
              }}
            >
              {e.title}
            </a>
          ))}
        </div>
      </nav>

      {examples.map((example) => (
        <section key={example.id} id={example.id} className="scroll-mt-28 space-y-4">
          <div>
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              {example.title}
            </h2>
            <p className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
              {example.blurb}
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              <span className="font-semibold" style={{ color: 'var(--accent)' }}>Good for: </span>
              {example.useCases.join(' · ')}
            </p>
          </div>
          <Diagram example={example} />
          <CodeBlock code={example.code} />
        </section>
      ))}

      <footer className="pt-4" style={{ color: 'var(--text-secondary)' }}>
        <p className="text-sm leading-relaxed">
          Rendered with Mermaid v11 in the browser — view source or copy any snippet to use it
          in Markdown docs, wikis, or the{' '}
          <a
            href="https://mermaid.live"
            target="_blank"
            rel="noreferrer"
            className="underline"
            style={{ color: 'var(--accent)' }}
          >
            live editor
          </a>
          .
        </p>
      </footer>
    </div>
  )
}
