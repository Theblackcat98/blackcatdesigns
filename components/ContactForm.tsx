'use client'

import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const mailtoLink = `mailto:hello@blackcatdesigns.dev?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`
    
    window.location.href = mailtoLink
    setStatus('sent')
    
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' })
      setStatus('idle')
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label 
          htmlFor="name" 
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--bg-border)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-border)',
          }}
          placeholder="Your name"
        />
      </div>

      <div>
        <label 
          htmlFor="email" 
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--bg-border)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-border)',
          }}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label 
          htmlFor="message" 
          className="block text-sm font-medium mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg transition-colors resize-none"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--bg-border)',
            color: 'var(--text-primary)',
            border: '1px solid var(--bg-border)',
          }}
          placeholder="Tell me about your project or just say hello..."
        />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3 px-6 font-medium rounded-lg transition-colors"
        style={{
          backgroundColor: status === 'sent' ? '#22c55e' : 'var(--accent)',
          color: 'var(--bg-primary)',
        }}
      >
        {status === 'idle' && 'Send Message'}
        {status === 'sending' && 'Opening email client...'}
        {status === 'sent' && 'Email client opened!'}
        {status === 'error' && 'Try again'}
      </button>

      <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        This will open your default email client with a pre-filled message.
      </p>
    </form>
  )
}
