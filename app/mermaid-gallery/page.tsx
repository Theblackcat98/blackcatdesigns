import type { Metadata } from 'next'
import MermaidGallery from './MermaidGallery'

export const metadata: Metadata = {
  title: 'Mermaid.js Gallery | BlackCatDesigns',
  description: 'Every Mermaid.js diagram type rendered live with copy-pasteable, syntax-checked source code.',
}

export default function MermaidGalleryPage() {
  return <MermaidGallery />
}
