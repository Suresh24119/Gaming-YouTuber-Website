// Custom animation utilities for GSAP and Framer Motion

export const animationConfig = {
  // Standard transition timing
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
  slower: { duration: 0.8 },
  
  // Easing functions
  easeIn: 'easeIn',
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  
  // Spring animations
  bounce: { type: 'spring', stiffness: 300, damping: 20 },
  smooth: { type: 'spring', stiffness: 100, damping: 30 },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 }
}

// Page transition variants
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
}

// Container stagger animation
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Fast stagger for images
export const fastStaggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

// Item animation
export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  }
}

// Image zoom in animation
export const imageZoom = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

// Image parallax effect on scroll
export const imageParallax = {
  initial: { y: 0 },
  whileInView: { y: -20 },
  transition: { duration: 0.8 }
}

// Image glow animation
export const imageGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(0, 217, 255, 0.4)',
      '0 0 50px rgba(0, 217, 255, 0.8)',
      '0 0 20px rgba(0, 217, 255, 0.4)'
    ]
  },
  transition: { duration: 3, repeat: Infinity }
}

// Image border glow (for images with borders)
export const imageBorderGlow = {
  animate: {
    borderColor: [
      'rgba(255, 0, 85, 0.5)',
      'rgba(157, 0, 255, 0.7)',
      'rgba(0, 217, 255, 0.7)',
      'rgba(255, 0, 85, 0.5)'
    ],
    boxShadow: [
      '0 0 10px rgba(255, 0, 85, 0.3)',
      '0 0 30px rgba(157, 0, 255, 0.5)',
      '0 0 30px rgba(0, 217, 255, 0.5)',
      '0 0 10px rgba(255, 0, 85, 0.3)'
    ]
  },
  transition: { duration: 4, repeat: Infinity }
}

// Image flip animation
export const imageFlip = {
  initial: { rotateX: -90, opacity: 0 },
  animate: { rotateX: 0, opacity: 1 },
  transition: { duration: 0.6, type: 'spring', stiffness: 100 }
}

// Text shimmer effect
export const shimmer = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 0%']
  },
  transition: { duration: 3, repeat: Infinity }
}

// Neon glow pulse
export const pulseGlow = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(255, 0, 85, 0.6)',
      '0 0 40px rgba(255, 0, 85, 0.9)',
      '0 0 20px rgba(255, 0, 85, 0.6)'
    ]
  },
  transition: { duration: 2, repeat: Infinity }
}

// Multi-color pulse
export const multiPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(255, 0, 85, 0.6)',
      '0 0 40px rgba(157, 0, 255, 0.8)',
      '0 0 40px rgba(0, 217, 255, 0.8)',
      '0 0 20px rgba(255, 0, 85, 0.6)'
    ]
  },
  transition: { duration: 3, repeat: Infinity }
}

// Hover lift animation
export const hoverLift = {
  whileHover: { y: -5, boxShadow: '0 10px 30px rgba(255, 0, 85, 0.4)' },
  transition: { duration: 0.3 }
}

// Hover scale animation
export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.3 }
}

// Hover glow animation
export const hoverGlow = {
  whileHover: { 
    boxShadow: '0 0 40px rgba(0, 217, 255, 0.8)',
    scale: 1.02
  },
  transition: { duration: 0.3 }
}

// Floating animation
export const floating = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
}

// Floating fast
export const floatingFast = {
  animate: { y: [0, -15, 0] },
  transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
}

// Rotate animation
export const rotating = {
  animate: { rotate: 360 },
  transition: { duration: 8, repeat: Infinity, ease: 'linear' }
}

// Rotate slow
export const rotatingSlow = {
  animate: { rotate: 360 },
  transition: { duration: 15, repeat: Infinity, ease: 'linear' }
}

// Slide in from left
export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Slide in from right
export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  whileInView: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Bounce in animation
export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { 
    duration: 0.6, 
    type: 'spring', 
    stiffness: 300, 
    damping: 15 
  }
}

// Pulse animation
export const pulse = {
  animate: { scale: [1, 1.1, 1] },
  transition: { duration: 1.5, repeat: Infinity }
}

// Wave animation for text/titles
export const wave = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 0.5,
    repeat: Infinity,
    repeatType: 'loop'
  }
}

// Wave container - staggers wave animation
export const waveContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0
    }
  }
}

// Wave item - individual letter
export const waveItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatType: 'loop'
    }
  }
}

// Shimmer text effect
export const shimmerText = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 0%']
  },
  transition: { duration: 2, repeat: Infinity, repeatType: 'loop' }
}

// Scroll parallax
export const parallaxContainer = {
  initial: { y: 0 },
  animate: { y: 0 },
  transition: { type: 'spring', stiffness: 100, damping: 20 }
}

// Parallax image - moves slower on scroll
export const parallaxImage = {
  initial: { y: 0 },
  animate: (y) => ({
    y: y * 0.5
  }),
  transition: { type: 'spring', stiffness: 100, damping: 20 }
}

// Carousel slide animation
export const carouselContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
}

// Carousel slide item
export const carouselSlide = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.5 }
}

// Carousel nav button
export const carouselButton = {
  whileHover: { scale: 1.1, boxShadow: '0 0 20px rgba(0, 217, 255, 0.6)' },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.2 }
}

// Enhanced button glow animation
export const buttonGlow = {
  whileHover: {
    boxShadow: [
      '0 0 10px rgba(255, 0, 85, 0.5)',
      '0 0 30px rgba(255, 0, 85, 0.8)',
      '0 0 50px rgba(0, 217, 255, 0.6)',
      '0 0 30px rgba(255, 0, 85, 0.8)'
    ]
  },
  transition: { duration: 0.6 }
}

// Button ripple effect
export const buttonRipple = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2 }
}

// Pulsing button
export const pulsingButton = {
  animate: {
    boxShadow: [
      '0 0 0 0 rgba(255, 0, 85, 0.7)',
      '0 0 0 10px rgba(255, 0, 85, 0)'
    ]
  },
  transition: { duration: 2, repeat: Infinity }
}

// Counter animation
export const counterContainer = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

// Number roll animation
export const numberRoll = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, type: 'spring', stiffness: 100 }
}

// Counter pulse on complete
export const counterPulse = {
  animate: { scale: [1, 1.1, 1] },
  transition: { duration: 0.6, ease: 'easeInOut' }
}

// Loading spinner rotate
export const loadingSpinner = {
  animate: { rotate: [0, 360] },
  transition: { duration: 1, repeat: Infinity, ease: 'linear' }
}

// Loading dots (pulse/scale)
export const loadingDots = {
  animate: i => ({
    scale: [1, 1.4, 1],
    opacity: [0.6, 1, 0.6]
  }),
  transition: { duration: 0.9, repeat: Infinity, repeatType: 'loop' }
}

// Loading shimmer for text labels
export const loadingTextShimmer = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 0%']
  },
  transition: { duration: 1.6, repeat: Infinity, repeatType: 'loop' }
}

export default {
  animationConfig,
  pageVariants,
  containerVariants,
  fastStaggerVariants,
  itemVariants,
  imageZoom,
  imageParallax,
  imageGlow,
  imageBorderGlow,
  imageFlip,
  shimmer,
  pulseGlow,
  multiPulse,
  hoverLift,
  hoverScale,
  hoverGlow,
  floating,
  floatingFast,
  rotating,
  rotatingSlow,
  slideInLeft,
  slideInRight,
  bounceIn,
  pulse,
  wave,
  waveContainer,
  waveItem,
  shimmerText,
  parallaxContainer,
  parallaxImage,
  carouselContainer,
  carouselSlide,
  carouselButton,
  buttonGlow,
  buttonRipple,
  pulsingButton,
  counterContainer,
  numberRoll,
  counterPulse
  ,loadingSpinner,
  loadingDots,
  loadingTextShimmer
}
