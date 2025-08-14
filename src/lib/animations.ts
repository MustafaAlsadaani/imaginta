import { Variants } from 'framer-motion';

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Base animation settings that respect reduced motion
export const getAnimationSettings = () => {
  const reducedMotion = prefersReducedMotion();
  return {
    duration: reducedMotion ? 0 : 0.6,
    ease: 'easeOut', // Custom easing curve for premium feel
  };
};

// Fade in from bottom
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Fade in from top
export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Fade in from left
export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -24,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Fade in from right
export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 24,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Simple fade in
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Enhanced container for stagger animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.15,
      delayChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
};

// Enhanced stagger children animation
export const staggerItem: Variants = {
  initial: {
    opacity: 0,
    y: 24,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.5,
      ease: 'easeOut',
    },
  },
};

// Grid stagger for services/features
export const gridStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
};

// Grid item animation
export const gridItem: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.4,
      ease: 'easeOut',
    },
  },
};

// Enhanced button hover animation with glow
export const buttonHover = {
  scale: prefersReducedMotion() ? 1 : 1.03,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.3,
    ease: 'easeOut',
  },
};

// Enhanced button tap animation
export const buttonTap = {
  scale: prefersReducedMotion() ? 1 : 0.92,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.08,
    ease: 'easeInOut',
  },
};

// Gentle button hover for secondary elements
export const buttonHoverGentle = {
  scale: prefersReducedMotion() ? 1 : 1.02,
  y: prefersReducedMotion() ? 0 : -2,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.25,
    ease: 'easeOut',
  },
};

// Quick press animation
export const buttonPress = {
  scale: prefersReducedMotion() ? 1 : 0.95,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.06,
  },
};

// Enhanced card hover animation
export const cardHover = {
  y: prefersReducedMotion() ? 0 : -8,
  scale: prefersReducedMotion() ? 1 : 1.02,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.4,
    ease: 'easeOut',
  },
};

// Card tap animation
export const cardTap = {
  scale: prefersReducedMotion() ? 1 : 0.98,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.1,
    ease: 'easeInOut',
  },
};

// Service card hover with icon animation
export const serviceCardHover = {
  y: prefersReducedMotion() ? 0 : -6,
  scale: prefersReducedMotion() ? 1 : 1.01,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.35,
    ease: 'easeOut',
  },
};

// Image zoom effect for portfolio cards
export const imageZoom = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.4,
    ease: 'easeOut',
  },
};

// Float animation for hero elements
export const float: Variants = {
  initial: {
    y: 0,
  },
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: prefersReducedMotion() ? 0 : 4,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      ease: 'easeInOut',
    },
  },
};

// Subtle glow animation
export const glow: Variants = {
  initial: {
    opacity: 0.6,
  },
  animate: {
    opacity: [0.6, 0.8, 0.6],
    transition: {
      duration: prefersReducedMotion() ? 0 : 3,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      ease: 'easeInOut',
    },
  },
};

// Navigation item animations
export const navItem: Variants = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      ...getAnimationSettings(),
    },
  },
};

// Modal/overlay animations
export const modalOverlay: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.2,
    },
  },
};

export const modalContent: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      ...getAnimationSettings(),
      delay: prefersReducedMotion() ? 0 : 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.2,
    },
  },
};

// Hero text reveal animation
export const heroTextReveal: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.8,
      ease: 'easeOut',
    },
  },
};

// Hero CTA delayed entrance
export const heroCTAReveal: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.6,
      delay: prefersReducedMotion() ? 0 : 0.4,
      ease: 'easeOut',
    },
  },
};

// Decorative element animations
export const decorativeFloat: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: [0, 0.6, 0.4, 0.6],
    scale: [0.8, 1.2, 0.9, 1.1],
    y: prefersReducedMotion() ? 0 : [-10, 10, -5, 8],
    x: prefersReducedMotion() ? 0 : [-5, 8, -3, 6],
    transition: {
      duration: prefersReducedMotion() ? 0 : 8,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
};

// Section heading underline reveal
export const underlineReveal: Variants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.8,
      delay: prefersReducedMotion() ? 0 : 0.2,
      ease: 'easeOut',
    },
  },
};

// Enhanced viewport animations
export const useInViewAnimation = (delay = 0) => {
  return {
    initial: 'initial',
    whileInView: 'animate',
    viewport: { 
      once: true, 
      amount: 0.1,
      margin: '0px 0px -50px 0px'
    },
    transition: {
      delay: prefersReducedMotion() ? 0 : delay,
    },
  };
};

// Scroll-triggered fade up
export const scrollFadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: 'easeOut',
    },
  },
};