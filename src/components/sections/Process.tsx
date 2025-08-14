'use client'

import { motion } from 'framer-motion'
import { Lightbulb, Hammer, Rocket, TrendingUp } from 'lucide-react'

interface ProcessStep {
  id: string
  number: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details: string[]
}

interface ProcessProps {
  id?: string
  title?: string
  subtitle?: string
  steps?: ProcessStep[]
}

const defaultSteps: ProcessStep[] = [
  {
    id: 'plan',
    number: 1,
    title: 'Plan',
    description: 'We start by understanding your goals, audience, and requirements to create a strategic roadmap.',
    icon: Lightbulb,
    details: [
      'Discovery workshop',
      'Goal alignment',
      'Technical planning',
      'Timeline creation'
    ]
  },
  {
    id: 'build',
    number: 2,
    title: 'Build',
    description: 'Our expert team brings your vision to life with clean code, stunning design, and seamless functionality.',
    icon: Hammer,
    details: [
      'UI/UX design',
      'Development',
      'Quality testing',
      'Client feedback'
    ]
  },
  {
    id: 'launch',
    number: 3,
    title: 'Launch',
    description: 'We deploy your project with careful attention to performance, security, and user experience.',
    icon: Rocket,
    details: [
      'Final testing',
      'Deployment',
      'Performance optimization',
      'Go-live support'
    ]
  },
  {
    id: 'grow',
    number: 4,
    title: 'Grow',
    description: 'Ongoing optimization and support to ensure your digital presence continues to drive results.',
    icon: TrendingUp,
    details: [
      'Analytics setup',
      'Performance monitoring',
      'Ongoing optimization',
      'Growth strategies'
    ]
  }
]

export default function Process({
  id = 'process',
  title = 'Your Simple 4-Step Plan',
  subtitle = 'A proven process that delivers results every time',
  steps = defaultSteps
}: ProcessProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.2
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        delay: 0.3
      }
    }
  }

  return (
    <section id={id} className="section-shell py-20">
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

      {/* Desktop Horizontal Stepper */}
      <div className="hidden lg:block">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative"
        >
          {/* Connecting Lines */}
          <div className="absolute top-20 left-0 w-full flex items-center justify-between px-16">
            {steps.slice(0, -1).map((_, lineIndex) => (
              <motion.div
                key={lineIndex}
                variants={lineVariants}
                className="flex-1 h-0.5 bg-gradient-to-r from-surface via-accent/30 to-surface mx-8 origin-left"
                style={{
                  transformOrigin: 'left center'
                }}
              />
            ))}
          </div>

          {/* Steps */}
          <div className="grid grid-cols-4 gap-8">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  className="relative z-10 text-center group"
                >
                  {/* Step Circle */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-warm/20 border-2 border-accent/40 rounded-full flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent-warm/30 group-hover:border-accent/60 transition-all duration-300">
                      <Icon className="w-7 h-7 text-accent group-hover:text-accent-warm transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-accent text-bg rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="max-w-xs mx-auto">
                    <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted leading-relaxed mb-4 text-sm">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-xs text-muted">
                          <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Mobile Vertical Timeline */}
      <div className="lg:hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-surface via-accent/30 to-surface" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  variants={stepVariants}
                  className="relative flex items-start gap-6 group"
                >
                  {/* Step Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-accent-warm/20 border-2 border-accent/40 rounded-full flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent-warm/30 group-hover:border-accent/60 transition-all duration-300">
                      <Icon className="w-7 h-7 text-accent group-hover:text-accent-warm transition-colors duration-300" />
                    </div>
                    
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent text-bg rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="grid grid-cols-2 gap-1">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted">
                          <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.6 }}
        className="text-center mt-16"
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-text mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            Let&apos;s discuss your project and map out your path to success.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent-warm focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
            style={{
              color: '#000000',
              backgroundColor: '#10B981'
            }}
          >
            Start Your Project
          </a>
        </div>
      </motion.div>
    </section>
  )
}