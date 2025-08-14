'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Clock, Users, Target, Zap, DollarSign } from 'lucide-react'
import { gridStagger, gridItem, imageZoom, useInViewAnimation } from '@/lib/animations'

interface Metric {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
  color?: 'accent' | 'accent-warm' | 'highlight'
}

interface CaseStudy {
  id: string
  title: string
  client: string
  category: string
  challenge: string
  solution: string
  results: string
  metrics: Metric[]
  tags: string[]
  imageUrl?: string
  detailUrl: string
}

interface CaseStudiesProps {
  id?: string
  title?: string
  subtitle?: string
  caseStudies?: CaseStudy[]
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-redesign',
    title: 'E-Commerce Platform Redesign',
    client: 'Fashion Forward',
    category: 'E-Commerce',
    challenge: 'Low conversion rates and poor mobile experience were limiting sales growth for this fashion retailer.',
    solution: 'Complete UX overhaul with mobile-first design, streamlined checkout process, and personalized product recommendations.',
    results: 'Transformed user experience leading to significant improvements in conversion rates and customer satisfaction.',
    metrics: [
      { icon: TrendingUp, value: '+65%', label: 'Conversion Rate', color: 'accent' },
      { icon: DollarSign, value: '+120%', label: 'Mobile Sales', color: 'accent-warm' },
      { icon: Users, value: '+40%', label: 'User Engagement', color: 'highlight' }
    ],
    tags: ['React', 'E-Commerce', 'UX Design', 'Mobile Optimization'],
    detailUrl: '/case-studies/ecommerce-redesign'
  },
  {
    id: 'saas-dashboard',
    title: 'SaaS Analytics Dashboard',
    client: 'DataFlow Pro',
    category: 'SaaS Platform',
    challenge: 'Complex data visualization was overwhelming users and causing high churn rates in their analytics platform.',
    solution: 'Redesigned dashboard with intuitive data visualization, customizable widgets, and progressive disclosure principles.',
    results: 'Simplified complexity while maintaining powerful functionality, resulting in improved user retention and satisfaction.',
    metrics: [
      { icon: Users, value: '+85%', label: 'User Retention', color: 'accent' },
      { icon: Clock, value: '20h/week', label: 'Time Saved', color: 'accent-warm' },
      { icon: Target, value: '+50%', label: 'Feature Adoption', color: 'highlight' }
    ],
    tags: ['Next.js', 'Data Visualization', 'SaaS', 'Dashboard Design'],
    detailUrl: '/case-studies/saas-dashboard'
  },
  {
    id: 'restaurant-ordering',
    title: 'Restaurant Ordering System',
    client: 'Bella Vista',
    category: 'Restaurant Tech',
    challenge: 'Manual ordering process was creating bottlenecks during peak hours and limiting revenue potential.',
    solution: 'Custom online ordering system with real-time inventory, table management, and integrated payment processing.',
    results: 'Streamlined operations and improved customer experience, allowing the restaurant to serve more customers efficiently.',
    metrics: [
      { icon: TrendingUp, value: '+45%', label: 'Order Volume', color: 'accent' },
      { icon: Clock, value: '15min', label: 'Faster Service', color: 'accent-warm' },
      { icon: DollarSign, value: '+30%', label: 'Revenue Growth', color: 'highlight' }
    ],
    tags: ['Vue.js', 'Real-time', 'Payment Integration', 'Restaurant Tech'],
    detailUrl: '/case-studies/restaurant-ordering'
  },
  {
    id: 'healthcare-portal',
    title: 'Patient Portal System',
    client: 'MedCare Clinic',
    category: 'Healthcare',
    challenge: 'Paper-based patient management was inefficient and created communication barriers between staff and patients.',
    solution: 'Comprehensive digital portal with appointment scheduling, medical records access, and secure messaging.',
    results: 'Digitized healthcare operations improving both staff efficiency and patient satisfaction significantly.',
    metrics: [
      { icon: Clock, value: '25h/week', label: 'Admin Time Saved', color: 'accent' },
      { icon: Users, value: '+70%', label: 'Patient Satisfaction', color: 'accent-warm' },
      { icon: Zap, value: '+60%', label: 'Process Efficiency', color: 'highlight' }
    ],
    tags: ['React', 'Healthcare', 'HIPAA Compliance', 'Portal Development'],
    detailUrl: '/case-studies/healthcare-portal'
  },
  {
    id: 'fintech-app',
    title: 'FinTech Mobile Application',
    client: 'SmartInvest',
    category: 'Financial Technology',
    challenge: 'Complex investment tools were intimidating new users and limiting market reach for this investment platform.',
    solution: 'User-friendly mobile app with guided investment flows, educational content, and simplified portfolio management.',
    results: 'Made investing accessible to broader audience while maintaining sophisticated functionality for power users.',
    metrics: [
      { icon: Users, value: '+200%', label: 'New User Signups', color: 'accent' },
      { icon: TrendingUp, value: '+95%', label: 'Daily Active Users', color: 'accent-warm' },
      { icon: Target, value: '+80%', label: 'Goal Completion', color: 'highlight' }
    ],
    tags: ['React Native', 'FinTech', 'Mobile App', 'Investment Tools'],
    detailUrl: '/case-studies/fintech-app'
  },
  {
    id: 'education-platform',
    title: 'Online Learning Platform',
    client: 'EduTech Solutions',
    category: 'Education Technology',
    challenge: 'Low student engagement and high dropout rates were affecting the success of online courses.',
    solution: 'Interactive learning platform with gamification, progress tracking, and adaptive learning paths.',
    results: 'Increased student engagement and course completion rates through personalized and interactive learning experiences.',
    metrics: [
      { icon: Users, value: '+75%', label: 'Course Completion', color: 'accent' },
      { icon: TrendingUp, value: '+90%', label: 'Student Engagement', color: 'accent-warm' },
      { icon: Target, value: '+55%', label: 'Learning Outcomes', color: 'highlight' }
    ],
    tags: ['Next.js', 'EdTech', 'Gamification', 'Learning Management'],
    detailUrl: '/case-studies/education-platform'
  }
]

export default function CaseStudies({
  id = 'case-studies',
  title = 'Case Studies',
  subtitle = 'Real projects, real results, real impact on business growth',
  caseStudies = defaultCaseStudies
}: CaseStudiesProps) {

  const handleCaseStudyClick = () => {
    // For now, scroll to contact since detail pages aren't implemented yet
    const contactElement = document.querySelector('#contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const inViewProps = useInViewAnimation(0.1)

  const getMetricColor = (color?: string) => {
    switch (color) {
      case 'accent-warm':
        return 'text-accent-warm'
      case 'highlight':
        return 'text-highlight'
      default:
        return 'text-accent'
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

      {/* Case Studies Grid */}
      <motion.div
        variants={gridStagger}
        {...inViewProps}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {caseStudies.map((study) => (
          <motion.div
            key={study.id}
            variants={gridItem}
            className="group cursor-pointer"
            onClick={handleCaseStudyClick}
          >
            <div className="h-full bg-surface/40 backdrop-blur-sm border border-surface/60 hover:border-accent/40 rounded-xl overflow-hidden transition-all duration-300 hover:bg-surface/60 soft-card"
              style={{
                willChange: 'transform'
              }}
            >
              {/* Project Image Placeholder */}
              <motion.div 
                className="relative w-full bg-gradient-to-br from-accent/10 via-accent-warm/10 to-highlight/10 flex items-center justify-center overflow-hidden"
                style={{
                  // Prevent layout shift with defined dimensions
                  height: '200px',
                  minHeight: '200px'
                }}
                whileHover={imageZoom}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-8 h-8 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-muted">{study.category}</span>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-accent/20 backdrop-blur-sm rounded-full text-xs font-medium text-accent">
                  {study.category}
                </div>
              </motion.div>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-text mb-2 group-hover:text-accent transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-sm text-muted font-medium">{study.client}</p>
                </div>

                {/* Challenge, Solution, Results */}
                <div className="space-y-3 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-accent mb-1">Challenge</h4>
                    <p className="text-sm text-muted leading-relaxed">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-accent-warm mb-1">Solution</h4>
                    <p className="text-sm text-muted leading-relaxed">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-highlight mb-1">Results</h4>
                    <p className="text-sm text-muted leading-relaxed">{study.results}</p>
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, index) => {
                    const Icon = metric.icon
                    return (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          <Icon className={`w-4 h-4 ${getMetricColor(metric.color)}`} />
                        </div>
                        <div className={`text-lg font-bold ${getMetricColor(metric.color)} mb-1`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-surface rounded-md text-xs text-muted border border-surface"
                    >
                      {tag}
                    </span>
                  ))}
                  {study.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs text-muted">
                      +{study.tags.length - 3} more
                    </span>
                  )}
                </div>

                {/* View Details Link */}
                <div className="flex items-center justify-between">
                  <button className="inline-flex items-center gap-2 text-accent hover:text-accent-warm font-medium transition-all duration-300 group-hover:translate-x-1 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded-sm px-1 py-1">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
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
            Ready to Be Our Next Success Story?
          </h3>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            Let&apos;s discuss how we can deliver similar results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleCaseStudyClick()
              }}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent-warm focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
              style={{
                color: '#000000',
                backgroundColor: '#00F5D4'
              }}
            >
              Start Your Project
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault()
                const servicesElement = document.querySelector('#services')
                if (servicesElement) {
                  servicesElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-flex items-center justify-center rounded-xl border-2 border-accent px-8 py-4 text-lg font-semibold text-accent hover:bg-accent hover:text-bg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
            >
              View Our Services
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}