'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code, Palette, TrendingUp, Smartphone, Search, Zap } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  howItWorksLink?: string
}

interface ServicesProps {
  id?: string
  title?: string
  subtitle?: string
  services?: Service[]
}

const defaultServices: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies for optimal performance and user experience.',
    icon: Code,
    features: ['React & Next.js', 'E-commerce Solutions', 'API Integration', 'Performance Optimization'],
    howItWorksLink: '#web-development-process'
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Beautiful, intuitive designs that enhance user experience and drive conversions through thoughtful interaction design.',
    icon: Palette,
    features: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'Usability Testing'],
    howItWorksLink: '#design-process'
  },
  {
    id: 'digital-strategy',
    title: 'Digital Strategy',
    description: 'Comprehensive digital solutions and growth strategies tailored to your business goals and market opportunities.',
    icon: TrendingUp,
    features: ['Market Analysis', 'Growth Planning', 'Content Strategy', 'Performance Metrics'],
    howItWorksLink: '#strategy-process'
  },
  {
    id: 'mobile-development',
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that deliver seamless experiences across all devices.',
    icon: Smartphone,
    features: ['iOS & Android', 'Cross-platform Solutions', 'App Store Optimization', 'Push Notifications'],
    howItWorksLink: '#mobile-process'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Search engine optimization strategies that improve your visibility and drive organic traffic growth.',
    icon: Search,
    features: ['Technical SEO', 'Content Optimization', 'Link Building', 'Analytics & Reporting'],
    howItWorksLink: '#seo-process'
  },
  {
    id: 'performance-optimization',
    title: 'Performance Optimization',
    description: 'Speed and performance enhancements that improve user experience and search engine rankings.',
    icon: Zap,
    features: ['Core Web Vitals', 'Image Optimization', 'Code Splitting', 'CDN Setup'],
    howItWorksLink: '#performance-process'
  }
]

export default function Services({
  id = 'services',
  title = 'Our Services',
  subtitle = 'Comprehensive digital solutions to elevate your business',
  services = defaultServices
}: ServicesProps) {
  
  const handleHowItWorksClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault()
    const element = document.querySelector(link)
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
        ease: 'easeOut',
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
        ease: 'easeOut'
      }
    }
  }

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
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
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
          {title}
        </h2>
        <p className="text-xl text-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {services.map((service) => {
          const Icon = service.icon
          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <motion.div
                variants={hoverVariants}
                className="soft-card h-full bg-surface border border-surface hover:border-accent/30 transition-colors duration-300 cursor-pointer"
                style={{
                  // Prevent layout shift on hover
                  willChange: 'transform'
                }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-text mb-3 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted">
                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How it Works Link */}
                {service.howItWorksLink && (
                  <div className="mt-auto">
                    <a
                      href={service.howItWorksLink}
                      onClick={(e) => handleHowItWorksClick(e, service.howItWorksLink!)}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-warm font-medium transition-all duration-300 group-hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded-sm px-1 py-1"
                      aria-label={`Learn how our ${service.title.toLowerCase()} process works`}
                    >
                      <span>How it works</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        className="text-center mt-16"
      >
        <p className="text-lg text-muted mb-8">
          Need something custom? We&apos;d love to discuss your unique requirements.
        </p>
        <a
          href="#contact"
          onClick={(e) => handleHowItWorksClick(e, '#contact')}
          className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-bg hover:bg-accent-warm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg group"
        >
          <span>Discuss Your Project</span>
          <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </motion.div>
    </section>
  )
}