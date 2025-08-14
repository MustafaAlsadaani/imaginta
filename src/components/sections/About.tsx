'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { scrollFadeUp, buttonHover, buttonTap, useInViewAnimation } from '@/lib/animations'

interface AboutSectionProps {
  id?: string
  title: string
  content: string[]
  expandedContent?: string[]
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

export default function About({
  id = 'about',
  title = 'About Us',
  content = [
    'We are a digital creative studio that transforms businesses through innovative web solutions, compelling brand identities, and data-driven growth strategies.',
    'Our team combines technical expertise with creative vision to deliver experiences that not only look stunning but drive measurable results for your business.'
  ],
  expandedContent = [
    'Founded in 2020, we have partnered with over 150 businesses across diverse industries, from startups to Fortune 500 companies. Our collaborative approach ensures that every project reflects your unique vision while meeting the highest standards of modern web development.',
    'We believe in the power of thoughtful design and clean code. Every line of code we write and every pixel we place serves a purpose—to create digital experiences that engage users, convert visitors, and grow businesses.',
    'Our expertise spans modern frameworks like React, Next.js, and Vue.js, combined with robust backend solutions and cloud infrastructure. We stay at the forefront of technology to ensure your digital presence remains competitive and scalable.'
  ],
  maxWidth = 'xl'
}: AboutSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md', 
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const inViewProps = useInViewAnimation()

  const expandedVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: '1.5rem',
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
        height: {
          duration: 0.4
        },
        opacity: {
          duration: 0.3,
          delay: 0.1
        }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        duration: 0.4,
        ease: "easeIn" as const,
        opacity: {
          duration: 0.2
        },
        height: {
          duration: 0.3,
          delay: 0.1
        }
      }
    }
  }

  return (
    <motion.section 
      id={id} 
      className="section-shell py-20"
      variants={scrollFadeUp}
      {...inViewProps}
    >
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        {/* Left Column - Title */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
            {title}
          </h2>
        </div>

        {/* Right Column - Content with controlled line length */}
        <div className={`${maxWidthClasses[maxWidth]} mx-auto lg:mx-0`}>
          {/* Main Content */}
          <div className="space-y-6">
            {content.map((paragraph, index) => (
              <p
                key={index}
                className="text-lg leading-relaxed text-muted"
                style={{
                  // Optimal reading line length: 45-75 characters
                  lineHeight: '1.7'
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isExpanded && expandedContent && (
              <motion.div
                variants={expandedVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6 overflow-hidden"
              >
                {expandedContent.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    className="text-lg leading-relaxed text-muted"
                    style={{ lineHeight: '1.7' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.1 + 0.2,
                        duration: 0.4 
                      }
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Read More Button */}
          {expandedContent && expandedContent.length > 0 && (
            <div className="mt-8">
              <motion.button
                onClick={toggleExpanded}
                className="inline-flex items-center gap-2 text-accent hover:text-accent-warm transition-colors duration-300 font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm px-2 py-1"
                aria-expanded={isExpanded}
                aria-controls={`${id}-expanded-content`}
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" as const }}
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  )}
                </motion.div>
              </motion.button>
            </div>
          )}

          {/* Screen reader content for context */}
          <div 
            id={`${id}-expanded-content`}
            className="sr-only"
          >
            {isExpanded ? 'Additional content is now visible' : 'Additional content is hidden'}
          </div>
        </div>
      </div>
    </motion.section>
  )
}