'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, useInViewAnimation } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  variant?: 'fadeInUp' | 'stagger';
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  id,
  variant: _variant = 'fadeInUp'
}: AnimatedSectionProps) {
  const inViewProps = useInViewAnimation();

  return (
    <motion.section
      id={id}
      className={className}
      variants={fadeInUp}
      {...inViewProps}
    >
      {children}
    </motion.section>
  );
}