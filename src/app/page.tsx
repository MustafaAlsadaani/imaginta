'use client'

import { motion } from 'framer-motion'
import Hero from '@/components/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Process from '@/components/sections/Process'
import CaseStudies from '@/components/sections/CaseStudies'
import Testimonials from '@/components/sections/Testimonials'
import TechPartners from '@/components/sections/TechPartners'
import Pricing from '@/components/sections/Pricing'
import FAQ from '@/components/sections/FAQ'
import ContactForm from '@/components/ContactForm'
import FloatingContact from '@/components/FloatingContact'
import SectionNavLink from '@/components/SectionNavLink'
import CelebrationBanner from '@/components/CelebrationBanner'
import { decorativeFloat, floatingParticle, sectionConnector } from '@/lib/animations'

export default function Home() {
  return (
    <>
      {/* Celebration Banner */}
      <CelebrationBanner />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Decorative Background Elements */}
      <motion.div
        className="fixed top-1/4 left-8 w-3 h-3 bg-accent/10 rounded-full blur-sm pointer-events-none z-0"
        variants={decorativeFloat}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '0s' }}
      />
      <motion.div
        className="fixed top-1/2 right-12 w-2 h-2 bg-accent-warm/10 rounded-full blur-sm pointer-events-none z-0"
        variants={decorativeFloat}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '3s' }}
      />
      <motion.div
        className="fixed bottom-1/3 left-16 w-4 h-4 bg-highlight/10 rounded-full blur-sm pointer-events-none z-0"
        variants={decorativeFloat}
        initial="initial"
        animate="animate"
        style={{ animationDelay: '6s' }}
      />

      {/* About Section */}
      <About 
        id="about"
        title="How We Help You Grow"
        content={[
          'We\'re a digital creative studio passionate about transforming businesses through innovative web solutions, compelling brand identities, and data-driven growth strategies.',
          'Our team combines technical expertise with creative vision to deliver experiences that not only look stunning but drive real, measurable results for your business.'
        ]}
        expandedContent={[
          'Founded in 2020, we have partnered with over 150 businesses across diverse industries, from startups to Fortune 500 companies. Our collaborative approach ensures that every project reflects your unique vision while meeting the highest standards of modern web development.',
          'We believe in the power of thoughtful design and clean code. Every line of code we write and every pixel we place serves a purpose—to create digital experiences that engage users, convert visitors, and grow businesses.',
          'Our expertise spans modern frameworks like React, Next.js, and Vue.js, combined with robust backend solutions and cloud infrastructure. We stay at the forefront of technology to ensure your digital presence remains competitive and scalable.'
        ]}
        maxWidth="xl"
      />

      {/* Mission Section */}
      <About 
        id="mission"
        title="What Drives Us Every Day"
        content={[
          'We\'re here to empower businesses with digital solutions that drive real growth, enhance user experiences, and create lasting competitive advantages in today\'s marketplace.',
          'We bridge the gap between creative vision and technical execution, ensuring every project delivers both stunning aesthetics and rock-solid performance.'
        ]}
        expandedContent={[
          'Our mission extends beyond delivering projects—we aim to be strategic partners in your digital transformation journey. We take time to understand your business goals, target audience, and competitive landscape to create solutions that truly make a difference.',
          'Through continuous learning and adaptation, we ensure our clients stay ahead of digital trends and emerging technologies. Our commitment to excellence means we never stop refining our processes and expanding our capabilities.'
        ]}
        maxWidth="lg"
      />

      {/* Navigation to Services */}
      <section className="section-shell-sm">
        <div className="text-center">
          <SectionNavLink
            href="#services"
            title="Discover What We Can Build Together"
            description="Let's explore the possibilities"
            variant="primary"
            direction="down"
            className="mx-auto"
          />
        </div>
      </section>

      {/* Services Section */}
      <div className="section-subtle">
        <Services />
      </div>

      {/* Enhanced Section Divider */}
      <motion.div 
        className="section-divider gradient-flow"
        variants={sectionConnector}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
      />
      
      {/* Floating Background Particles */}
      <div className="aurora-particles">
        <motion.div 
          className="aurora-particle medium"
          variants={floatingParticle(0)}
          initial="initial"
          animate="animate"
          style={{ top: '10%', left: '15%' }}
        />
        <motion.div 
          className="aurora-particle small"
          variants={floatingParticle(2)}
          initial="initial"
          animate="animate"
          style={{ top: '60%', right: '10%' }}
        />
        <motion.div 
          className="aurora-particle large"
          variants={floatingParticle(4)}
          initial="initial"
          animate="animate"
          style={{ bottom: '30%', left: '8%' }}
        />
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Navigation to Process */}
      <section className="section-shell-sm section-gradient">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text mb-2">Ready to see how we work together?</h3>
            <p className="text-muted">Our proven process ensures your project&apos;s success from initial idea to successful launch.</p>
          </div>
          <SectionNavLink
            href="#process"
            title="See How We Work"
            description="Our step-by-step collaboration"
            variant="secondary"
            direction="down"
            className="mx-auto"
          />
        </div>
      </section>

      {/* Process Section */}
      <div className="section-gradient">
        <Process />
      </div>

      {/* Our Service Commitment Section */}
      <section id="service-commitment" className="section-shell section-subtle">
        <div className="max-w-4xl mx-auto">
          <div className="section-header">
            <h2 className="section-title">Our Promise to You</h2>
            <p className="section-subtitle">
              Building trust through transparency and always delivering on our promises to every client.
            </p>
          </div>
          
          <div className="grid gap-8 md:gap-6">
            <div className="soft-card p-6 text-left">
              <h3 className="text-xl font-semibold text-text mb-3">🚀 Project Timeline Guarantee</h3>
              <p className="text-muted">
                We deliver your project on schedule. If we&apos;re running late, we&apos;ll notify you immediately with a revised timeline and provide weekly progress updates until completion.
              </p>
            </div>
            
            <div className="soft-card p-6 text-left">
              <h3 className="text-xl font-semibold text-text mb-3">🔄 Unlimited Revisions</h3>
              <p className="text-muted">
                Your satisfaction is our priority. We include unlimited revisions during the development phase to ensure the final product perfectly matches your vision.
              </p>
            </div>
            
            <div className="soft-card p-6 text-left">
              <h3 className="text-xl font-semibold text-text mb-3">💰 Transparent Pricing</h3>
              <p className="text-muted">
                No surprise fees or hidden costs. You receive a detailed quote upfront, and we stick to it. Payment is split into manageable milestones: 50% to start, 50% upon completion.
              </p>
            </div>
            
            <div className="soft-card p-6 text-left">
              <h3 className="text-xl font-semibold text-text mb-3">🔒 Complete Confidentiality</h3>
              <p className="text-muted">
                Your ideas and data are safe with us. We sign NDAs as standard practice and never share project details, code, or business information with third parties.
              </p>
            </div>
            
            <div className="soft-card p-6 text-left">
              <h3 className="text-xl font-semibold text-text mb-3">🛠️ Ongoing Support Promise</h3>
              <p className="text-muted">
                We provide 30 days of free support after launch, including bug fixes and minor adjustments. After that, we offer affordable maintenance plans to keep your site running smoothly.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <a 
              href="/terms-of-service.pdf" 
              className="inline-flex items-center text-accent hover:text-accent-warm transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              📄 Download Full Terms & Conditions (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Navigation to Work Examples */}
      <section className="section-shell-sm">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-text mb-3">See Our Work Come to Life</h3>
            <p className="text-muted">
              Real projects, real results. Discover how we&apos;ve helped businesses just like yours achieve their digital dreams.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SectionNavLink
              href="#case-studies"
              title="View Our Success Stories"
              description="Real projects, real results"
              variant="primary"
              className="flex-1 max-w-xs"
            />
            <SectionNavLink
              href="#testimonials"
              title="Hear From Our Clients"
              description="What they say about working with us"
              variant="secondary"
              className="flex-1 max-w-xs"
            />
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <div className="section-cinematic">
        <CaseStudies />
      </div>

      {/* Wave Divider */}
      <div className="wave-divider" />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Tech Partners Section */}
      <div className="section-gradient">
        <TechPartners />
      </div>

      {/* Navigation to Pricing */}
      <section className="section-shell-sm section-subtle">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text mb-2">Ready to bring your vision to life?</h3>
            <p className="text-muted">
              See our transparent pricing and find the perfect package that fits your needs and budget.
            </p>
          </div>
          <SectionNavLink
            href="#pricing"
            title="Explore Our Packages"
            description="Transparent pricing for every budget"
            variant="primary"
            className="mx-auto"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <div className="section-subtle">
        <Pricing />
      </div>

      {/* FAQ Section */}
      <div className="section-cinematic">
        <FAQ />
      </div>

      <section id="resources" className="section-shell section-subtle">
        <div className="elevated-surface text-center p-12">
          <h2 className="text-3xl font-bold text-text mb-4">Resources & Insights</h2>
          <p className="text-muted">Helpful guides, tips, and insights to power your digital journey.</p>
          <div className="divider-glow"></div>
          <p className="text-sm text-muted/70">Amazing resources coming your way soon...</p>
        </div>
      </section>

      {/* Final CTA to Contact */}
      <section className="section-shell">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-semibold text-text mb-4">Let&apos;s Build Something Amazing Together</h3>
          <p className="text-muted mb-8">
            Have questions? Need a custom solution? Let&apos;s chat about your project and discover how we can help bring your vision to life.
          </p>
          <SectionNavLink
            href="#contact"
            title="Start Our Conversation"
            description="Tell us about your dreams"
            variant="primary"
            direction="down"
            className="mx-auto"
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />
      
      {/* Floating Contact Button */}
      <FloatingContact />
    </>
  );
}
