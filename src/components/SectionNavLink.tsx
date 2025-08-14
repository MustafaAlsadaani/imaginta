'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { buttonHover, buttonTap } from '@/lib/animations';

interface SectionNavLinkProps {
  href: string;
  title: string;
  description: string;
  variant?: 'primary' | 'secondary';
  direction?: 'right' | 'down';
  className?: string;
}

export default function SectionNavLink({
  href,
  title,
  description,
  variant = 'secondary',
  direction = 'right',
  className = ''
}: SectionNavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const Icon = direction === 'down' ? ArrowDown : ArrowRight;

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`group inline-flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
        variant === 'primary' 
          ? 'btn-primary text-bg shadow-lg hover:shadow-xl' 
          : 'btn-secondary text-text hover:text-accent border border-white/10 hover:border-accent/30'
      } ${className}`}
      whileHover={buttonHover}
      whileTap={buttonTap}
    >
      <div className="flex-1 text-left">
        <div className={`font-semibold mb-1 ${
          variant === 'primary' ? 'text-bg' : 'text-text group-hover:text-accent'
        }`}>
          {title}
        </div>
        <div className={`text-sm ${
          variant === 'primary' ? 'text-bg/80' : 'text-muted'
        }`}>
          {description}
        </div>
      </div>
      
      <motion.div
        className="flex-shrink-0"
        animate={{ 
          x: direction === 'right' ? [0, 4, 0] : 0,
          y: direction === 'down' ? [0, 4, 0] : 0
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" as const 
        }}
      >
        <Icon className={`w-5 h-5 ${
          variant === 'primary' ? 'text-bg' : 'text-accent'
        }`} />
      </motion.div>
    </motion.a>
  );
}