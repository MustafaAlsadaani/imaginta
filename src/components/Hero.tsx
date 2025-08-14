'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { heroTextReveal, heroCTAReveal, buttonHover, buttonTap, decorativeFloat } from '@/lib/animations'

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  // Handle smooth scrolling to contact
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const contactElement = document.querySelector('#contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Enhanced animation variants using our animation system

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="hero-bg min-h-screen flex items-center justify-center relative section-cinematic"
    >
      <div className="section-shell text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            variants={heroTextReveal}
            initial="initial"
            animate="animate"
            className="hero-title mb-8 max-w-4xl"
            style={{ 
              // Prevent CLS by setting explicit dimensions
              minHeight: '1.1em',
              // Ensure text remains visible during font swap
              fontDisplay: 'swap'
            }}
          >
            Your Business.{' '}
            <span className="text-accent bg-gradient-to-r from-accent via-accent-warm to-highlight bg-clip-text text-transparent">
              Elevated.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={heroTextReveal}
            initial="initial"
            animate="animate"
            className="body-large max-w-2xl mx-auto mb-12"
            style={{ 
              // Prevent CLS by setting explicit dimensions
              minHeight: '1.2em'
            }}
          >
            Transforming businesses through innovative web solutions, 
            compelling brand identities, and data-driven growth strategies.
          </motion.p>
          
          <motion.div
            variants={heroCTAReveal}
            initial="initial"
            animate="animate"
            whileHover={buttonHover}
            whileTap={buttonTap}
            className="inline-block"
          >
            <a
              href="#contact"
              onClick={handleCtaClick}
              className="btn-primary btn-large inline-flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg shadow-2xl shadow-accent/20"
            >
              Start Your Project
            </a>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <motion.div
          variants={decorativeFloat}
          initial="initial"
          animate="animate"
          className="absolute top-20 left-10 w-6 h-6 bg-accent/20 rounded-full blur-sm"
        />
        <motion.div
          variants={decorativeFloat}
          initial="initial"
          animate="animate"
          className="absolute bottom-32 right-16 w-4 h-4 bg-accent-warm/20 rounded-full blur-sm"
          style={{ animationDelay: '2s' }}
        />
      </div>
      
      {/* Accessibility: Hidden heading for screen readers */}
      <h2 className="sr-only">
        Imaginta Digital Creative Studio - Web Development, Branding, and Growth Services
      </h2>
    </section>
  )
}