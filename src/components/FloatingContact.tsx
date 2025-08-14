'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowRight } from 'lucide-react';
import { buttonHover, buttonTap } from '@/lib/animations';

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 100px from top
      const shouldShow = window.scrollY > 100;
      setIsVisible(shouldShow);
      
      // Hide when near contact section (last 200px of page)
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isNearContact = rect.top < window.innerHeight + 200;
        setIsVisible(shouldShow && !isNearContact);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ duration: 0.3, ease: 'backOut' }}
        >
          <div className="relative">
            {/* Expanded Menu */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  className="absolute bottom-full right-0 mb-4 p-4 glass-card min-w-[280px]"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg font-semibold text-text mb-3">Get In Touch</h3>
                  <p className="text-muted text-sm mb-4">
                    Ready to start your project? Let&apos;s discuss your ideas.
                  </p>
                  
                  <div className="space-y-2">
                    <motion.button
                      onClick={handleContactClick}
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-accent/10 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <div className="text-text font-medium">Contact Form</div>
                        <div className="text-muted text-xs">Tell us about your project</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted ml-auto" />
                    </motion.button>
                    
                    <motion.a
                      href="mailto:hello@imaginta.com"
                      className="w-full flex items-center gap-3 p-3 rounded-xl text-left hover:bg-accent/10 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-warm/20 flex items-center justify-center">
                        <span className="text-sm">📧</span>
                      </div>
                      <div>
                        <div className="text-text font-medium">Email Direct</div>
                        <div className="text-muted text-xs">hello@imaginta.com</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted ml-auto" />
                    </motion.a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Button */}
            <motion.button
              onClick={toggleExpanded}
              className="relative group"
              whileHover={buttonHover}
              whileTap={buttonTap}
            >
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 btn-primary"
                style={{ 
                  background: 'linear-gradient(145deg, var(--accent), rgba(0, 245, 212, 0.9))',
                  boxShadow: '0 4px 20px rgba(0, 245, 212, 0.3), 0 0 0 0 rgba(0, 245, 212, 0.4)'
                }}
              >
                <AnimatePresence mode="wait">
                  {isExpanded ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-bg" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="message"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MessageCircle className="w-6 h-6 text-bg" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-accent" />
              <div 
                className="absolute inset-0 rounded-full animate-pulse opacity-30"
                style={{ 
                  background: 'radial-gradient(circle, rgba(0, 245, 212, 0.2) 0%, transparent 70%)',
                  transform: 'scale(1.5)'
                }}
              />
            </motion.button>

            {/* Tooltip when not expanded */}
            {!isExpanded && (
              <motion.div
                className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"
                style={{ transform: 'translateX(50%)' }}
              >
                Get in touch
                <div className="absolute top-full right-1/2 transform translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}