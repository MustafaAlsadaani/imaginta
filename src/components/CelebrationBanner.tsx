'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'

export default function CelebrationBanner() {
  const [isVisible, setIsVisible] = useState(true)

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
  }

  const confettiVariants = {
    initial: { opacity: 0, y: -20, rotate: 0 },
    animate: { 
      opacity: [0, 1, 0.8, 0], 
      y: [0, -30, -50, 100], 
      rotate: [0, 180, 360, 540],
      transition: { 
        duration: 3, 
        repeat: Infinity,
        ease: "easeOut" as const
      }
    }
  }

  const bannerVariants = {
    initial: { opacity: 0, y: -100, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring" as const, 
        damping: 20, 
        stiffness: 300,
        delay: 0.2
      }
    },
    exit: { 
      opacity: 0, 
      y: -100, 
      scale: 0.8,
      transition: { duration: 0.5, ease: "easeInOut" as const }
    }
  }

  const textGlowVariants = {
    initial: { textShadow: "0 0 0px rgba(0, 245, 212, 0)" },
    animate: { 
      textShadow: [
        "0 0 10px rgba(0, 245, 212, 0.5)",
        "0 0 20px rgba(0, 245, 212, 0.8)", 
        "0 0 30px rgba(0, 245, 212, 0.6)",
        "0 0 10px rgba(0, 245, 212, 0.5)"
      ],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bannerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-accent/95 via-accent-warm/95 to-accent/95 backdrop-blur-md border-b border-white/20"
        >
          {/* Confetti Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
              className="absolute top-2 text-white/80"
              style={{
                left: `${10 + i * 7}%`,
                animationDelay: `${i * 0.2}s`
              }}
            >
              <Sparkles size={12} />
            </motion.div>
          ))}

          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <motion.span 
                className="text-2xl"
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🎉
              </motion.span>
              
              <motion.div
                variants={textGlowVariants}
                initial="initial"
                animate="animate"
                className="flex flex-col sm:flex-row sm:items-center sm:space-x-2"
              >
                <span className="text-lg sm:text-xl font-bold text-bg">
                  Imaginta First Live
                </span>
                <span className="text-sm sm:text-lg font-semibold text-bg/80">
                  — 14.08.2025
                </span>
              </motion.div>
            </div>

            <motion.button
              onClick={handleDismiss}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-bg/20 hover:bg-bg/30 transition-colors"
              aria-label="Dismiss celebration banner"
            >
              <X size={16} className="text-bg" />
            </motion.button>
          </div>

          {/* Animated gradient underline */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleX: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}