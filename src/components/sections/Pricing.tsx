'use client'

import { motion } from 'framer-motion'
import { Check, Star } from 'lucide-react'

interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  popular?: boolean
  description: string
  features: string[]
  ctaText: string
  ctaUrl: string
}

interface PricingProps {
  id?: string
  title?: string
  subtitle?: string
  plans?: PricingPlan[]
}

const defaultPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$2,499',
    period: 'project',
    description: 'Perfect for small businesses and startups looking to establish their online presence.',
    features: [
      'Custom website design (up to 5 pages)',
      'Mobile-responsive development',
      'Basic SEO optimization',
      'Contact form integration',
      '30 days of support',
      '1 round of revisions'
    ],
    ctaText: 'Get Started',
    ctaUrl: '#contact'
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$4,999',
    period: 'project',
    popular: true,
    description: 'Ideal for growing businesses that need advanced features and ongoing optimization.',
    features: [
      'Custom website design (up to 10 pages)',
      'Advanced animations & interactions',
      'E-commerce functionality',
      'CMS integration',
      'Advanced SEO & analytics',
      '90 days of support',
      '3 rounds of revisions',
      'Performance optimization'
    ],
    ctaText: 'Start Growing',
    ctaUrl: '#contact'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9,999',
    period: 'project',
    description: 'Comprehensive solution for enterprises requiring custom functionality and ongoing partnership.',
    features: [
      'Unlimited pages & custom features',
      'Advanced web application development',
      'Third-party integrations',
      'Custom admin dashboard',
      'Comprehensive SEO strategy',
      '6 months of support',
      'Unlimited revisions',
      'Dedicated project manager',
      'Priority support'
    ],
    ctaText: 'Go Pro',
    ctaUrl: '#contact'
  }
]

export default function Pricing({
  id = 'pricing',
  title = 'Flexible Plans for Every Stage',
  subtitle = 'Choose the perfect plan to match your business goals and budget',
  plans = defaultPlans
}: PricingProps) {

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault()
    const element = document.querySelector(url)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

  const hoverVariants = {
    hover: {
      y: -4,
      transition: {
        duration: 0.2,
        ease: "easeOut" as const
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
        <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {plans.map((plan) => (
          <motion.div
            key={plan.id}
            variants={cardVariants}
            whileHover="hover"
            className={`group relative ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-gradient-to-r from-accent to-accent-warm px-6 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <Star className="w-4 h-4 text-bg fill-bg" />
                  <span className="text-bg font-semibold text-sm">Most Popular</span>
                </div>
              </div>
            )}

            <motion.div
              variants={hoverVariants}
              className={`h-full rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-br from-surface/60 to-surface/40 border-2 border-accent/40 hover:border-accent/60'
                  : 'bg-surface/40 border border-surface/60 hover:border-accent/30'
              } backdrop-blur-sm hover:bg-surface/60`}
              style={{
                willChange: 'transform'
              }}
            >
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-accent' : 'text-text'
                } group-hover:text-accent transition-colors duration-300`}>
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-text">
                    {plan.price}
                  </span>
                  <span className="text-muted ml-2">/ {plan.period}</span>
                </div>
                <p className="text-muted leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features List */}
              <div className="mb-8">
                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                        plan.popular 
                          ? 'bg-accent/20 border border-accent/40' 
                          : 'bg-surface border border-accent/30'
                      } group-hover:bg-accent/30 group-hover:border-accent/60 transition-all duration-300`}>
                        <Check className={`w-3 h-3 ${
                          plan.popular ? 'text-accent' : 'text-muted'
                        } group-hover:text-accent transition-colors duration-300`} />
                      </div>
                      <span className="text-text leading-relaxed flex-1">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-auto">
                <a
                  href={plan.ctaUrl}
                  onClick={(e) => handleCtaClick(e, plan.ctaUrl)}
                  className={`w-full inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-surface group ${
                    plan.popular
                      ? 'bg-accent hover:bg-accent-warm text-bg focus:ring-accent/30'
                      : 'border-2 border-accent text-accent hover:bg-accent hover:text-bg focus:ring-accent/30'
                  }`}
                  style={{
                    // Ensure high contrast for accessibility
                    ...(plan.popular && {
                      color: '#000000',
                      backgroundColor: '#00F5D4'
                    })
                  }}
                >
                  <span>{plan.ctaText}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.4 }}
        className="text-center mt-16"
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-text mb-4">
            Need Something Custom?
          </h3>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            Every business is unique. Let&apos;s create a tailored solution that perfectly fits your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              onClick={(e) => handleCtaClick(e, '#contact')}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent-warm focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
              style={{
                color: '#000000',
                backgroundColor: '#00F5D4'
              }}
            >
              Get Custom Quote
            </a>
            <a
              href="#case-studies"
              onClick={(e) => handleCtaClick(e, '#case-studies')}
              className="inline-flex items-center justify-center rounded-xl border-2 border-accent px-8 py-4 text-lg font-semibold text-accent hover:bg-accent hover:text-bg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
            >
              View Our Work
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}