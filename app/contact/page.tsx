import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact - BlackCatDesigns',
  description: 'Get in touch for collaboration, freelance work, or just to say hello.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          Get in Touch
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Have a project in mind? Want to collaborate? Or just want to say hello?
          I'd love to hear from you.
        </p>
      </div>

      <ContactForm />

      <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--bg-border)' }}>
        <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Other ways to reach me
        </h2>
        <div className="space-y-3" style={{ color: 'var(--text-secondary)' }}>
          <p>
            <span style={{ color: 'var(--text-muted)' }}>Email:</span>{' '}
            <a 
              href="mailto:hello@blackcatdesigns.dev" 
              style={{ color: 'var(--accent)' }}
            >
              hello@blackcatdesigns.dev
            </a>
          </p>
          <p>
            <span style={{ color: 'var(--text-muted)' }}>GitHub:</span>{' '}
            <a 
              href="https://github.com/theblackcat98" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              @theblackcat98
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
