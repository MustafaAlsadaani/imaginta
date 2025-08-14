'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { fadeInUp, useInViewAnimation } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  id
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