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

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About 
        id="about"
        title="About Imaginta"
        content={[
          'We are a digital creative studio that transforms businesses through innovative web solutions, compelling brand identities, and data-driven growth strategies.',
          'Our team combines technical expertise with creative vision to deliver experiences that not only look stunning but drive measurable results for your business.'
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
        title="Our Mission"
        content={[
          'To empower businesses with digital solutions that drive growth, enhance user experiences, and create lasting competitive advantages in the modern marketplace.',
          'We bridge the gap between creative vision and technical execution, ensuring every project delivers both aesthetic excellence and functional performance.'
        ]}
        expandedContent={[
          'Our mission extends beyond delivering projects—we aim to be strategic partners in your digital transformation journey. We take time to understand your business goals, target audience, and competitive landscape to create solutions that truly make a difference.',
          'Through continuous learning and adaptation, we ensure our clients stay ahead of digital trends and emerging technologies. Our commitment to excellence means we never stop refining our processes and expanding our capabilities.'
        ]}
        maxWidth="lg"
      />

      {/* Services Section */}
      <Services />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Process Section */}
      <Process />

      {/* Case Studies Section */}
      <CaseStudies />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Tech Partners Section */}
      <TechPartners />

      {/* Pricing Section */}
      <Pricing />

      {/* FAQ Section */}
      <FAQ />

      <section id="resources" className="section-shell py-20">
        <div className="soft-card text-center">
          <h2 className="text-3xl font-bold text-text mb-4">Resources</h2>
          <p className="text-muted">Helpful guides, tips, and insights for your digital journey.</p>
        </div>
      </section>

      <section id="contact" className="section-shell py-20">
        <div className="edge-glow max-w-2xl mx-auto text-center p-8">
          <h2 className="text-3xl font-bold text-text mb-4">Ready to Get Started?</h2>
          <p className="text-muted mb-8">
            Let&apos;s discuss your project and see how we can help bring your vision to life.
          </p>
          <a 
            href="mailto:hello@imaginta.com" 
            className="inline-flex items-center justify-center rounded-lg bg-accent px-8 py-4 text-lg font-semibold text-bg hover:bg-accent-warm transition-colors"
          >
            Get In Touch
          </a>
        </div>
      </section>
    </>
  );
}
