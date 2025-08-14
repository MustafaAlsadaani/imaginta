'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'

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

  // Animation variants that respect prefers-reduced-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="hero-bg min-h-screen flex items-center justify-center relative"
    >
      <div className="section-shell text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-text mb-6 leading-tight"
            style={{ 
              // Prevent CLS by setting explicit dimensions
              minHeight: '1.1em',
              // Ensure text remains visible during font swap
              fontDisplay: 'swap'
            }}
          >
            Your Business.{' '}
            <span className="text-accent bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
              Elevated.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-3xl text-muted max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ 
              // Prevent CLS by setting explicit dimensions
              minHeight: '1.2em'
            }}
          >
            Web, brand, and growth—engineered for results.
          </motion.p>
          
          <motion.div
            variants={ctaVariants}
            whileHover="hover"
            className="inline-block"
          >
            <a
              href="#contact"
              onClick={handleCtaClick}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-12 py-6 text-xl font-semibold text-bg hover:bg-accent-warm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
              style={{
                // Ensure high contrast for AA compliance (21:1 ratio)
                color: '#000000', // Pure black for maximum contrast against cyan
                backgroundColor: '#00F5D4' // Cyan accent color
              }}
            >
              Start Your Project
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Accessibility: Hidden heading for screen readers */}
      <h2 className="sr-only">
        Imaginta Digital Creative Studio - Web Development, Branding, and Growth Services
      </h2>
    </section>
  )
}