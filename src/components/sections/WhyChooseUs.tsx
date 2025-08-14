'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, Shield, Users, Target, Zap } from 'lucide-react'

interface Benefit {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

interface WhyChooseUsProps {
  id?: string
  title?: string
  subtitle?: string
  benefits?: Benefit[]
}

const defaultBenefits: Benefit[] = [
  {
    id: 'increase-sales',
    title: 'Increase Sales',
    description: 'Turn more visitors into paying customers with conversion-optimized designs and strategic user journeys.',
    icon: TrendingUp
  },
  {
    id: 'save-time',
    title: 'Save Time',
    description: 'Focus on running your business while we handle the technical complexities and ongoing maintenance.',
    icon: Clock
  },
  {
    id: 'reduce-risk',
    title: 'Reduce Risk',
    description: 'Work with proven experts who deliver on time, on budget, with security and scalability built-in.',
    icon: Shield
  },
  {
    id: 'reach-customers',
    title: 'Reach More Customers',
    description: 'Expand your market reach with mobile-responsive designs and SEO-optimized content that gets found.',
    icon: Users
  },
  {
    id: 'competitive-advantage',
    title: 'Gain Competitive Edge',
    description: 'Stand out from competitors with premium design and cutting-edge technology that impresses clients.',
    icon: Target
  },
  {
    id: 'fast-results',
    title: 'Get Results Fast',
    description: 'See measurable improvements in performance, user engagement, and business metrics within weeks.',
    icon: Zap
  }
]

export default function WhyChooseUs({
  id = 'why-choose-us',
  title = 'Why Business Owners Choose Us',
  subtitle = 'Real results that make a difference to your bottom line',
  benefits = defaultBenefits
}: WhyChooseUsProps) {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
      }
    }
  }

  return (
    <section id={id} className="section-shell py-20 bg-gradient-to-br from-bg via-bg to-surface/20">
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

      {/* Benefits Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {benefits.map((benefit) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={benefit.id}
              variants={cardVariants}
              whileHover="hover"
              className="group h-full"
            >
              <motion.div
                variants={hoverVariants}
                className="h-full p-8 bg-surface/40 backdrop-blur-sm border border-surface/60 hover:border-accent/40 rounded-xl transition-all duration-300 hover:bg-surface/60"
                style={{
                  // Soft borders with premium feel
                  borderRadius: '16px',
                  backdropFilter: 'blur(12px)',
                  willChange: 'transform'
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent/20 to-accent-warm/20 rounded-xl flex items-center justify-center group-hover:from-accent/30 group-hover:to-accent-warm/30 transition-all duration-300">
                    <Icon className="w-7 h-7 text-accent group-hover:text-accent-warm transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-semibold text-text mb-3 leading-tight group-hover:text-accent transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p 
                    className="text-muted leading-relaxed"
                    style={{
                      // Premium typography with optimal line height
                      fontSize: '16px',
                      lineHeight: '1.6',
                      letterSpacing: '0.01em'
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>

                {/* Subtle accent line */}
                <div className="mt-6 h-0.5 bg-gradient-to-r from-accent/20 via-accent-warm/20 to-transparent rounded-full group-hover:from-accent/40 group-hover:via-accent-warm/40 transition-all duration-300" />
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.4 }}
        className="text-center mt-16"
      >
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-text mb-4">
            Ready to Transform Your Business?
          </h3>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            Join hundreds of business owners who&apos;ve accelerated their growth with our proven digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent-warm focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg group"
              style={{
                color: '#000000', // High contrast for accessibility
                backgroundColor: '#00F5D4'
              }}
            >
              Start Your Project Today
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center justify-center rounded-xl border-2 border-accent px-8 py-4 text-lg font-semibold text-accent hover:bg-accent hover:text-bg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
            >
              View Success Stories
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}