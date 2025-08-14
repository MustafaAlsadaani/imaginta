import { Variants } from 'framer-motion';

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Unified cinematic easing curves for consistent motion
export const cinematicEasing = {
  gentle: [0.25, 0.1, 0.25, 1] as const,      // Ultra-smooth for ambient motion
  standard: [0.23, 1, 0.32, 1] as const,      // Main site-wide easing
  swift: [0.4, 0, 0.2, 1] as const,           // Quick interactions  
  dramatic: [0.16, 1, 0.3, 1] as const,       // Hero/important elements
} as const;

// Standardized timing for cinematic flow
export const cinematicTiming = {
  instant: 0.1,     // Button presses, micro-feedback
  quick: 0.3,       // Standard interactions
  standard: 0.4,    // Main animations
  slow: 0.6,        // Hero, important reveals
  ambient: 1.2,     // Background/decorative motion
} as const;

// Base animation settings that respect reduced motion
export const getAnimationSettings = (timing: keyof typeof cinematicTiming = 'standard') => {
  const reducedMotion = prefersReducedMotion();
  return {
    duration: reducedMotion ? 0 : cinematicTiming[timing],
    ease: cinematicEasing.standard,
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
      staggerChildren: prefersReducedMotion() ? 0 : 0.12,
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
      duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
      ease: cinematicEasing.standard,
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
      duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
      ease: cinematicEasing.standard,
    },
  },
};

// Enhanced button hover animation with warm glow
export const buttonHover = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  y: prefersReducedMotion() ? 0 : -2,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.quick,
    ease: cinematicEasing.dramatic,
  },
};

// Enhanced button tap animation
export const buttonTap = {
  scale: prefersReducedMotion() ? 1 : 0.97,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.instant,
    ease: cinematicEasing.swift,
  },
};

// Gentle button hover for secondary elements
export const buttonHoverGentle = {
  scale: prefersReducedMotion() ? 1 : 1.02,
  y: prefersReducedMotion() ? 0 : -2,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.quick,
    ease: cinematicEasing.standard,
  },
};

// Quick press animation
export const buttonPress = {
  scale: prefersReducedMotion() ? 1 : 0.95,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.06,
  },
};

// Enhanced card hover animation with warm glow
export const cardHover = {
  y: prefersReducedMotion() ? 0 : -12,
  scale: prefersReducedMotion() ? 1 : 1.03,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
    ease: cinematicEasing.dramatic,
  },
};

// Warm micro-interaction animations
export const fadeScaleReveal: Variants = {
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.slow,
      ease: cinematicEasing.dramatic,
    },
  },
};

// Icon glow pulse animation
export const iconGlowPulse: Variants = {
  initial: {
    filter: 'drop-shadow(0 0 0 transparent)',
  },
  animate: {
    filter: [
      'drop-shadow(0 0 8px rgba(28, 169, 201, 0.4))',
      'drop-shadow(0 0 15px rgba(255, 111, 97, 0.6))',
      'drop-shadow(0 0 8px rgba(28, 169, 201, 0.4))',
    ],
    transition: {
      duration: prefersReducedMotion() ? 0 : 3,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      ease: cinematicEasing.gentle,
    },
  },
};

// Heading underline sweep
export const headingUnderline: Variants = {
  initial: {
    scaleX: 0,
    originX: 0,
  },
  animate: {
    scaleX: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.slow,
      ease: cinematicEasing.standard,
      delay: prefersReducedMotion() ? 0 : 0.3,
    },
  },
};

// Warm button hover with enhanced glow
export const warmButtonHover = {
  y: prefersReducedMotion() ? 0 : -4,
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
    ease: cinematicEasing.dramatic,
  },
};

// Parallax scroll effect
export const parallaxScroll = (speed: number = 0.5): Variants => ({
  initial: {
    y: 0,
  },
  animate: {
    y: prefersReducedMotion() ? 0 : -50 * speed,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.ambient,
      ease: cinematicEasing.gentle,
    },
  },
});

// Card tap animation
export const cardTap = {
  scale: prefersReducedMotion() ? 1 : 0.98,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.1,
    ease: "easeInOut" as const,
  },
};

// Service card hover with icon animation
export const serviceCardHover = {
  y: prefersReducedMotion() ? 0 : -6,
  scale: prefersReducedMotion() ? 1 : 1.01,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
    ease: cinematicEasing.standard,
  },
};

// Image zoom effect for portfolio cards
export const imageZoom = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: prefersReducedMotion() ? 0 : 0.4,
    ease: "easeOut" as const,
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
      ease: "easeInOut" as const,
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
      ease: "easeInOut" as const,
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
      duration: prefersReducedMotion() ? 0 : cinematicTiming.slow,
      ease: cinematicEasing.dramatic,
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
      duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
      delay: prefersReducedMotion() ? 0 : 0.4,
      ease: cinematicEasing.dramatic,
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
    scale: [0.8, 1.1, 0.9, 1.05],
    y: prefersReducedMotion() ? 0 : [-8, 8, -4, 6],
    x: prefersReducedMotion() ? 0 : [-4, 6, -2, 4],
    transition: {
      duration: prefersReducedMotion() ? 0 : 6,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      repeatType: 'reverse',
      ease: cinematicEasing.gentle,
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
      ease: "easeOut" as const,
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
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.slow,
      ease: cinematicEasing.standard,
    },
  },
};

// Split text reveal for headlines
export const splitTextReveal: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.05,
      delayChildren: prefersReducedMotion() ? 0 : 0.1,
    },
  },
};

export const splitTextItem: Variants = {
  initial: {
    opacity: 0,
    y: 40,
    rotateX: -90,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
      ease: cinematicEasing.dramatic,
    },
  },
};

// Enhanced section divider animation
export const sectionDivider: Variants = {
  initial: {
    scaleX: 0,
    opacity: 0,
  },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.ambient,
      ease: cinematicEasing.gentle,
      delay: prefersReducedMotion() ? 0 : 0.2,
    },
  },
};

// Mobile menu slide animation
export const mobileMenuSlide: Variants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
      ease: cinematicEasing.standard,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.quick,
      ease: cinematicEasing.swift,
    },
  },
};

// Mobile menu item stagger
export const mobileMenuStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: prefersReducedMotion() ? 0 : 0.08,
      delayChildren: prefersReducedMotion() ? 0 : 0.15,
    },
  },
};

export const mobileMenuItem: Variants = {
  initial: {
    opacity: 0,
    x: 20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.quick,
      ease: cinematicEasing.standard,
    },
  },
};

// Enhanced image zoom with overlay
export const imageZoomOverlay = {
  scale: prefersReducedMotion() ? 1 : 1.05,
  transition: {
    duration: prefersReducedMotion() ? 0 : cinematicTiming.standard,
    ease: cinematicEasing.standard,
  },
};

// Content overlay fade
export const contentOverlay: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.quick,
      ease: cinematicEasing.standard,
    },
  },
};

// Sticky navigation background fade
export const stickyNavBg: Variants = {
  initial: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    backdropFilter: 'blur(16px)',
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.quick,
      ease: cinematicEasing.standard,
    },
  },
};

// Section connector animation
export const sectionConnector: Variants = {
  initial: {
    scaleX: 0,
    opacity: 0,
  },
  animate: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: prefersReducedMotion() ? 0 : cinematicTiming.ambient,
      ease: cinematicEasing.gentle,
    },
  },
};

// Floating particles background
export const floatingParticle = (delay: number = 0): Variants => ({
  initial: {
    opacity: 0,
    scale: 0.8,
    y: 0,
    x: 0,
  },
  animate: {
    opacity: [0, 0.05, 0.08, 0.03, 0.06],
    scale: [0.8, 1.2, 0.9, 1.1, 1],
    y: prefersReducedMotion() ? 0 : [-20, 15, -10, 20, -5],
    x: prefersReducedMotion() ? 0 : [-10, 8, -5, 12, -3],
    transition: {
      duration: prefersReducedMotion() ? 0 : 15,
      delay: prefersReducedMotion() ? 0 : delay,
      repeat: prefersReducedMotion() ? 0 : Infinity,
      repeatType: 'reverse',
      ease: cinematicEasing.gentle,
    },
  },
});