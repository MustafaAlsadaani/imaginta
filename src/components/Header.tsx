'use client'

import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape)
      // Focus trap
      const firstFocusable = mobileMenuRef.current?.querySelector('button, [href]') as HTMLElement
      firstFocusable?.focus()
    }

    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface bg-bg/80 backdrop-blur-md">
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Global navigation">
        <div className="flex lg:flex-1">
          <a href="#home" className="-m-1.5 p-1.5" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="sr-only">Imaginta</span>
            <div className="text-2xl font-bold text-accent">Imaginta</div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-semibold leading-6 text-text hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm px-2 py-1"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            ref={menuButtonRef}
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-text hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">
              {mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            </span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          ref={mobileMenuRef}
          id="mobile-menu" 
          className="lg:hidden"
          role="dialog" 
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-bg px-6 py-6 sm:max-w-sm soft-card">
            <div className="flex items-center justify-between">
              <a href="#home" className="-m-1.5 p-1.5" onClick={(e) => handleNavClick(e, '#home')}>
                <span className="sr-only">Imaginta</span>
                <div className="text-xl font-bold text-accent">Imaginta</div>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-text hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-muted">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-surface hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}