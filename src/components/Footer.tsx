'use client'

import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Resources', href: '#resources' },
]

const socialLinks = [
  { name: 'GitHub', href: '#', icon: Github },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Twitter', href: '#', icon: Twitter },
]

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <footer className="border-t border-surface bg-bg">
      <div className="section-shell py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* About Column */}
          <div>
            <div className="text-2xl font-bold text-accent mb-4">Imaginta</div>
            <p className="text-muted leading-relaxed mb-6">
              We transform your vision into stunning digital experiences. 
              Our expert team delivers cutting-edge web development, 
              design, and digital solutions that drive results and 
              captivate audiences.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm text-muted">
                <Mail className="h-4 w-4 text-accent" />
                <a 
                  href="mailto:hello@imaginta.com" 
                  className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm"
                >
                  hello@imaginta.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <Phone className="h-4 w-4 text-accent" />
                <a 
                  href="tel:+1234567890" 
                  className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm"
                >
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted">
                <MapPin className="h-4 w-4 text-accent" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-muted hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Column */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-6">Connect With Us</h3>
            <p className="text-muted mb-6">
              Ready to start your project? Get in touch with our team for a 
              free consultation and discover how we can bring your ideas to life.
            </p>
            <div className="flex gap-4 mb-8">
              {socialLinks.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="p-2 rounded-lg bg-surface hover:bg-accent hover:text-bg transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-bg hover:bg-accent-warm transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg"
            >
              Start Your Project
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider"></div>
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Imaginta. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-bg rounded-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}