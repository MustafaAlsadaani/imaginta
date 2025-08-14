'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  description: string
  items: FAQItem[]
}

interface FAQProps {
  id?: string
  title?: string
  subtitle?: string
  categories?: FAQCategory[]
}

const defaultCategories: FAQCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Everything you need to know about starting your project with us',
    items: [
      {
        id: 'how-it-works',
        question: 'How does the process work?',
        answer: 'We follow a proven 4-step process: Plan, Build, Launch, and Grow. First, we understand your goals and requirements through a discovery session. Then we create designs and develop your solution. After thorough testing, we launch your project and provide ongoing support to ensure continued success.'
      },
      {
        id: 'timeline',
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on complexity. A basic website typically takes 4-6 weeks, while more complex applications can take 8-12 weeks or longer. We provide detailed timelines during our planning phase and keep you updated throughout the project.'
      },
      {
        id: 'first-meeting',
        question: 'What happens in our first meeting?',
        answer: 'Our initial consultation is focused on understanding your business goals, target audience, and project requirements. We discuss your vision, review examples of work you like, and outline potential solutions. This meeting is free and typically lasts 60-90 minutes.'
      },
      {
        id: 'requirements',
        question: 'What do you need from me to get started?',
        answer: 'We need a clear understanding of your goals, any existing brand materials (logos, colors, fonts), content or copy you want included, and examples of websites or features you like. We\'ll guide you through gathering everything needed during our discovery process.'
      }
    ]
  },
  {
    id: 'services-process',
    title: 'Services & Process',
    description: 'Details about our services, methodologies, and what to expect',
    items: [
      {
        id: 'services-included',
        question: 'What services are included in web development projects?',
        answer: 'Our web development projects include custom design, responsive development, basic SEO optimization, contact forms, content management system setup, cross-browser testing, and mobile optimization. Additional services like e-commerce, advanced integrations, or custom functionality can be added based on your needs.'
      },
      {
        id: 'revisions',
        question: 'How many revisions are included?',
        answer: 'The number of revisions depends on your chosen plan. Starter includes 1 round, Growth includes 3 rounds, and Pro includes unlimited revisions. We focus on getting things right from the start through thorough planning and regular check-ins.'
      },
      {
        id: 'ongoing-support',
        question: 'Do you provide ongoing maintenance and support?',
        answer: 'Yes, all projects include a support period (30-180 days depending on your plan). After that, we offer ongoing maintenance packages including updates, security monitoring, backups, and technical support. We can also provide training so you can manage basic content updates yourself.'
      },
      {
        id: 'content-creation',
        question: 'Do you help with content and copywriting?',
        answer: 'We can provide guidance on content structure and best practices. For professional copywriting, we work with trusted partners who can create compelling content that aligns with your brand voice and SEO goals. This is typically an additional service that can be quoted separately.'
      },
      {
        id: 'technologies',
        question: 'What technologies do you use?',
        answer: 'We use modern, reliable technologies including React, Next.js, TypeScript, Node.js, and various content management systems. We select the best technology stack based on your specific requirements, scalability needs, and long-term goals.'
      }
    ]
  },
  {
    id: 'pricing-payment',
    title: 'Pricing & Payment',
    description: 'Information about our pricing structure and payment terms',
    items: [
      {
        id: 'pricing-structure',
        question: 'How is pricing determined?',
        answer: 'Pricing is based on project scope, complexity, timeline, and specific requirements. We offer three main packages (Starter, Growth, Pro) but can also create custom quotes. All pricing is transparent with no hidden fees, and we provide detailed proposals outlining exactly what\'s included.'
      },
      {
        id: 'payment-terms',
        question: 'What are your payment terms?',
        answer: 'We typically work with a 50% deposit to start, 25% at the midpoint milestone, and 25% upon project completion. For larger projects, we can arrange monthly payment plans. We accept bank transfers, credit cards, and PayPal for your convenience.'
      },
      {
        id: 'additional-costs',
        question: 'Are there any additional costs I should know about?',
        answer: 'Our quotes include all development costs. Additional expenses might include domain registration, hosting (we can recommend providers), third-party services, stock photos, or premium plugins. We\'ll discuss any potential additional costs upfront so there are no surprises.'
      },
      {
        id: 'refund-policy',
        question: 'What is your refund policy?',
        answer: 'We stand behind our work and aim for 100% client satisfaction. If you\'re not happy with our work during the first milestone, we\'ll work to make it right. Our detailed contracts outline specific refund scenarios, and we always aim to find solutions that work for both parties.'
      },
      {
        id: 'project-changes',
        question: 'What if I want to make changes during the project?',
        answer: 'Minor adjustments and refinements are part of our process. Significant changes to scope, functionality, or design direction may require a change order to ensure we can deliver the best possible result within the agreed timeline and budget. We\'ll always discuss any impacts before proceeding.'
      }
    ]
  }
]

export default function FAQ({
  id = 'faq',
  title = 'Frequently Asked Questions',
  subtitle = 'Find quick answers to common questions about our services and process',
  categories = defaultCategories
}: FAQProps) {
  const [openItems, setOpenItems] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on component mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleItem = (itemId: string) => {
    setOpenItems(prev => {
      const isOpen = prev.includes(itemId)
      
      if (isMobile) {
        // On mobile, only allow one item open at a time
        return isOpen ? [] : [itemId]
      } else {
        // On desktop, allow multiple items open
        return isOpen
          ? prev.filter(id => id !== itemId)
          : [...prev, itemId]
      }
    })
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

  const categoryVariants = {
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

  const answerVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: {
      opacity: 1,
      height: 'auto',
      marginTop: '1rem',
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
        opacity: {
          duration: 0.2,
          delay: 0.1
        }
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
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

      {/* FAQ Categories */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="max-w-4xl mx-auto space-y-12"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            variants={categoryVariants}
            className="space-y-6"
          >
            {/* Category Header */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-accent mb-2">
                {category.title}
              </h3>
              <p className="text-muted leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {category.items.map((item) => {
                const isOpen = openItems.includes(item.id)
                
                return (
                  <div
                    key={item.id}
                    className="soft-card bg-surface/30 border border-surface/60 hover:border-accent/30 transition-colors duration-300"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface rounded-xl group"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${item.id}`}
                    >
                      <h4 className="text-lg font-semibold text-text group-hover:text-accent transition-colors duration-300 leading-relaxed">
                        {item.question}
                      </h4>
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: "easeOut" as const }}
                          className="w-6 h-6 text-muted group-hover:text-accent transition-colors duration-300"
                        >
                          <ChevronDown className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </button>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${item.id}`}
                          variants={answerVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6">
                            <p className="text-muted leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
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
            Still Have Questions?
          </h3>
          <p className="text-lg text-muted mb-8 leading-relaxed">
            We&apos;re here to help! Get in touch with our team for personalized answers to your specific questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const contactElement = document.querySelector('#contact')
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="inline-flex items-center justify-center rounded-xl bg-accent px-8 py-4 text-lg font-semibold transition-all duration-300 hover:bg-accent-warm focus:outline-none focus:ring-4 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg"
              style={{
                color: '#000000',
                backgroundColor: '#10B981'
              }}
            >
              Contact Us
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
              Learn About Our Services
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}