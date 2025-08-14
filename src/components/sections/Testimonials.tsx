'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: string
  quote: string
  name: string
  role: string
  company: string
  avatar?: string
}

interface TestimonialsProps {
  id?: string
  title?: string
  subtitle?: string
  testimonials?: Testimonial[]
  autoRotateInterval?: number
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 'sarah-chen',
    quote: 'Imaginta transformed our e-commerce platform beyond our expectations. The new design increased our conversion rates by 65% and our mobile sales doubled. Their attention to detail and understanding of user experience is exceptional.',
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'Fashion Forward'
  },
  {
    id: 'michael-rodriguez',
    quote: 'The analytics dashboard they built for us completely changed how we work with data. Our team saves over 20 hours per week, and user adoption of new features increased by 50%. Truly outstanding work.',
    name: 'Michael Rodriguez',
    role: 'CTO',
    company: 'DataFlow Pro'
  },
  {
    id: 'jennifer-kim',
    quote: 'Working with Imaginta was seamless from start to finish. They delivered our restaurant ordering system on time and under budget. Our order volume increased by 45% and customer satisfaction is at an all-time high.',
    name: 'Jennifer Kim',
    role: 'Owner',
    company: 'Bella Vista Restaurant'
  },
  {
    id: 'david-thompson',
    quote: 'The patient portal system has revolutionized our clinic operations. We save 25 hours of administrative work per week, and our patients love the convenience. The HIPAA compliance was handled flawlessly.',
    name: 'Dr. David Thompson',
    role: 'Medical Director',
    company: 'MedCare Clinic'
  },
  {
    id: 'amanda-foster',
    quote: 'Our mobile investment app went from complex to intuitive thanks to Imaginta. New user signups increased by 200% and daily active users by 95%. They made investing accessible to everyone.',
    name: 'Amanda Foster',
    role: 'Product Director',
    company: 'SmartInvest'
  }
]

export default function Testimonials({
  id = 'testimonials',
  title = 'What Our Clients Say',
  subtitle = 'Real feedback from real clients who achieved real results',
  testimonials = defaultTestimonials,
  autoRotateInterval = 6000
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [testimonials.length])

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }, [testimonials.length])

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto-rotation logic
  useEffect(() => {
    const shouldPause = isHovered || isFocused || isPaused
    if (shouldPause) return

    const interval = setInterval(nextTestimonial, autoRotateInterval)
    return () => clearInterval(interval)
  }, [isHovered, isFocused, isPaused, nextTestimonial, autoRotateInterval])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          prevTestimonial()
          break
        case 'ArrowRight':
          e.preventDefault()
          nextTestimonial()
          break
        case ' ':
        case 'Enter':
          e.preventDefault()
          setIsPaused(!isPaused)
          break
        case 'Home':
          e.preventDefault()
          goToTestimonial(0)
          break
        case 'End':
          e.preventDefault()
          goToTestimonial(testimonials.length - 1)
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFocused, isPaused, prevTestimonial, nextTestimonial, goToTestimonial, testimonials.length])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const [direction, setDirection] = useState(0)

  const handleNext = () => {
    setDirection(1)
    nextTestimonial()
  }

  const handlePrev = () => {
    setDirection(-1)
    prevTestimonial()
  }

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    goToTestimonial(index)
  }

  return (
    <section id={id} className="section-shell py-20 bg-gradient-to-br from-bg via-bg to-surface/10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="max-w-4xl mx-auto">
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          tabIndex={0}
          role="region"
          aria-label="Client testimonials carousel"
          aria-live="polite"
        >
          {/* Testimonial Content */}
          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="absolute inset-0 w-full"
              >
                <div className="soft-card bg-surface/60 backdrop-blur-sm p-8 md:p-12 text-center min-h-[400px] flex flex-col justify-center">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-12 h-12 text-accent mx-auto opacity-50" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-lg md:text-xl text-text leading-relaxed mb-8 font-medium">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className="space-y-2">
                    <div className="text-xl font-semibold text-accent">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-muted">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Placeholder to maintain height */}
            <div className="opacity-0 soft-card p-8 md:p-12 min-h-[400px]" aria-hidden="true">
              <div className="text-xl leading-relaxed mb-8">Placeholder content</div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-surface/80 backdrop-blur-sm hover:bg-surface border border-surface/60 hover:border-accent/40 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg group"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-surface/80 backdrop-blur-sm hover:bg-surface border border-surface/60 hover:border-accent/40 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg group"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-muted group-hover:text-accent transition-colors duration-300" />
          </button>

          {/* Pause/Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="absolute top-4 right-4 w-10 h-10 bg-surface/80 backdrop-blur-sm hover:bg-surface border border-surface/60 hover:border-accent/40 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
            aria-label={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
          >
            <div className={`transition-all duration-300 ${isPaused ? 'text-accent' : 'text-muted'}`}>
              {isPaused ? '▶' : '⏸'}
            </div>
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg ${
                index === currentIndex
                  ? 'bg-accent scale-125'
                  : 'bg-surface hover:bg-accent/50 border border-surface'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 max-w-xs mx-auto">
          <div className="h-1 bg-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-accent to-accent-warm"
              initial={{ width: '0%' }}
              animate={{ 
                width: isPaused || isHovered || isFocused ? '0%' : '100%' 
              }}
              transition={{ 
                duration: isPaused || isHovered || isFocused ? 0 : autoRotateInterval / 1000,
                ease: 'linear',
                repeat: isPaused || isHovered || isFocused ? 0 : Infinity
              }}
              key={currentIndex}
            />
          </div>
        </div>

        {/* Keyboard Instructions */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted">
            Use arrow keys to navigate • Space to pause • Auto-advances every 6 seconds
          </p>
        </div>
      </div>
    </section>
  )
}