'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { buttonHover, buttonTap, navItem, mobileMenuSlide, mobileMenuStagger, mobileMenuItem } from '@/lib/animations'

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#case-studies' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <motion.header 
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? 'bg-bg/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'bg-transparent border-b border-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      <nav className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-500 ${
        isScrolled ? 'h-12 py-2' : 'h-14 py-2.5'
      }`} aria-label="Global navigation">
        <div className="flex lg:flex-1">
          <a href="#home" className="-m-1.5 p-1.5" onClick={(e) => handleNavClick(e, '#home')}>
            <span className="sr-only">Imaginta</span>
            <div className={`font-bold text-accent transition-all duration-500 ${
              isScrolled ? 'text-lg' : 'text-xl'
            }`}>Imaginta</div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-3">
          {navigation.slice(0, -1).map((item, index) => (
            <motion.a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm font-medium leading-6 text-text hover:text-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-lg px-2 py-1"
              variants={navItem}
              initial="initial"
              animate="animate"
              transition={{ delay: index * 0.1 + 0.2 }}
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              {item.name}
            </motion.a>
          ))}
          
          {/* Contact CTA Button */}
          <motion.a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className={`btn-primary font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${
              isScrolled ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm'
            }`}
            variants={navItem}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.8 }}
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            Get Started
          </motion.a>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            ref={mobileMenuRef}
            id="mobile-menu" 
            className="lg:hidden"
            role="dialog" 
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
          <div className="fixed inset-0 z-50" />
          <motion.div 
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-bg px-6 py-6 sm:max-w-sm soft-card"
            variants={mobileMenuSlide}
            initial="initial"
            animate="animate"
            exit="exit"
          >
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
                <motion.div 
                  className="space-y-2 py-6"
                  variants={mobileMenuStagger}
                  initial="initial"
                  animate="animate"
                >
                  {navigation.map((item) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-text hover:bg-surface hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
                      variants={mobileMenuItem}
                    >
                      {item.name}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}