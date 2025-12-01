'use client'

import { useEffect } from 'react'

export default function CodeBlockCopy() {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('.prose pre')
    
    codeBlocks.forEach((pre) => {
      if (pre.querySelector('.copy-button')) return
      
      const button = document.createElement('button')
      button.className = 'copy-button'
      button.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
        <svg class="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display: none;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `
      button.setAttribute('aria-label', 'Copy code')
      button.style.cssText = `
        position: absolute;
        top: 0.5rem;
        left: 1rem;
        padding: 0.5rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--bg-border);
        border-radius: var(--radius-md);
        color: var(--text-muted);
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s, color 0.2s, background 0.2s;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
      `
      
      const preElement = pre as HTMLElement
      preElement.style.position = 'relative'
      
      pre.addEventListener('mouseenter', () => {
        button.style.opacity = '1'
      })
      pre.addEventListener('mouseleave', () => {
        button.style.opacity = '0'
      })
      
      button.addEventListener('click', async () => {
        const code = pre.querySelector('code')
        if (!code) return
        
        try {
          await navigator.clipboard.writeText(code.textContent || '')
          
          const copyIcon = button.querySelector('.copy-icon') as HTMLElement
          const checkIcon = button.querySelector('.check-icon') as HTMLElement
          
          copyIcon.style.display = 'none'
          checkIcon.style.display = 'block'
          button.style.color = 'var(--accent)'
          
          setTimeout(() => {
            copyIcon.style.display = 'block'
            checkIcon.style.display = 'none'
            button.style.color = 'var(--text-muted)'
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      })
      
      button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--bg-border)'
        button.style.color = 'var(--text-primary)'
      })
      button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--bg-tertiary)'
        button.style.color = 'var(--text-muted)'
      })
      
      pre.appendChild(button)
    })
  }, [])

  return null
}
