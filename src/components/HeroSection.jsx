import { motion, useScroll, useTransform } from 'framer-motion'
import { NeonButton } from './NeonButton'
import { useRef, useMemo } from 'react'
import { LINKS } from '../config/links'

export function HeroSection({ title = 'Welcome to Gaming', subtitle = 'High-Energy Streaming & Content' }) {
  const ref = useRef(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  // Memoize title split to prevent unnecessary re-renders
  const titleChars = useMemo(() => {
    return title.split('').map((char, idx) => (
      <motion.span
        key={idx}
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          delay: idx * 0.05,
          repeatType: 'loop'
        }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))
  }, [title])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen bg-gradient-gaming flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-dark to-neon-darker" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
          className="w-full h-full bg-gradient-neon opacity-10"
        />
      </motion.div>

      {/* Floating particles for parallax effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full border border-neon-cyan/10"
            initial={{ x: Math.random() * 100, y: Math.random() * 100 }}
            animate={{ 
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              rotate: 360
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{ y: useTransform(scrollY, [0, 500], [0, 50 + i * 20]) }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-black mb-6 gradient-text uppercase leading-tight"
        >
          {titleChars}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-neon-cyan mb-12 font-audiowide"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons with enhanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(255, 0, 85, 0.7)',
                '0 0 0 15px rgba(255, 0, 85, 0)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <NeonButton 
              className="text-lg px-8 py-4"
              onClick={() => window.open(LINKS.youtube.live, '_blank')}
            >
              Watch Now
            </NeonButton>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <NeonButton 
              variant="outline" 
              className="text-lg px-8 py-4"
              onClick={() => window.open(LINKS.discord, '_blank')}
            >
              Join Discord
            </NeonButton>
          </motion.div>
        </motion.div>

        {/* Stats with animated counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          {[
            { label: 'Subscribers', value: '250K+', icon: '👥' },
            { label: 'Views', value: '5M+', icon: '📊' },
            { label: 'Community', value: '50K+', icon: '💬' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="hud-panel rounded-lg"
            >
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity
        }}
        className="absolute bottom-20 left-10 text-6xl"
      >
        🎮
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 7,
          repeat: Infinity
        }}
        className="absolute top-40 right-10 text-6xl"
      >
        🎯
      </motion.div>
    </motion.div>
  )
}
