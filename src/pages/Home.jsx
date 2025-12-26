import { HeroSection } from '../components/HeroSection'
import { VideoGrid } from '../components/VideoGrid'
import { Newsletter } from '../components/Newsletter'
import { Giveaway } from '../components/Giveaway'
import { Leaderboard } from '../components/Leaderboard'
import { MerchStore } from '../components/MerchStore'
import { AnimatedCounter } from '../components/AnimatedCounter'
import { Loading } from '../components/Loading'
import { motion } from 'framer-motion'
import { useMemo } from 'react'
import { 
  slideInLeft, 
  slideInRight, 
  bounceIn, 
  imageGlow, 
  multiPulse,
  fastStaggerVariants,
  itemVariants,
  imageZoom,
  hoverGlow,
  waveItem,
  waveContainer,
  shimmerText,
  buttonGlow,
  buttonRipple
} from '../animations/variants'

export function Home() {
  // Image animation container variants
  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // Image item variants with zoom
  const imageItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  }

  // Wave animation component for titles - memoized to prevent re-renders
  const WaveText = useMemo(() => {
    return ({ text }) => {
      const chars = useMemo(() => {
        return text.split('').map((char, idx) => (
          <motion.span
            key={idx}
            variants={waveItem}
            animate="animate"
            className="text-4xl font-bold gradient-text inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))
      }, [text])

      return (
        <motion.div
          className="flex justify-center gap-1"
          initial="hidden"
          whileInView="visible"
          variants={waveContainer}
          viewport={{ once: true }}
        >
          {chars}
        </motion.div>
      )
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section with enhanced parallax animations */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <HeroSection
          title="Gaming at Another Level"
          subtitle="High-Energy Streams, Epic Moments, Gaming Community"
        />
      </motion.div>

      {/* Video Grid Section with wave animation title */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <WaveText text="Latest Gaming Content" />
          <div className="flex justify-center mt-6">
            <Loading size={40} text="Loading latest content..." />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <VideoGrid />
          </motion.div>
        </motion.div>
      </section>

      {/* Newsletter Section with shimmer effect */}
      <section className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          variants={slideInLeft}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Newsletter />
        </motion.div>
      </section>

      {/* Giveaway Section with bounce animation */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={bounceIn}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <Giveaway />
        </motion.div>
      </section>

      {/* Leaderboard Section with multi-pulse glow */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          {...multiPulse}
          className="rounded-lg overflow-hidden"
        >
          <Leaderboard />
        </motion.div>
      </section>

      {/* Merchandise Section with right slide animation */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          variants={slideInRight}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: '-100px' }}
        >
          <MerchStore />
        </motion.div>
      </section>

      {/* Featured Section with enhanced animations and image effects */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Text content with staggered animations */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fastStaggerVariants}
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.h2 
              className="text-4xl font-bold gradient-text mb-4"
              variants={itemVariants}
            >
              Why Join?
            </motion.h2>
            <motion.ul className="space-y-4 text-gray-300" variants={fastStaggerVariants}>
              <motion.li 
                className="flex gap-3 items-center"
                variants={itemVariants}
                whileHover={{ x: 10, color: '#00D9FF' }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-neon-cyan text-xl font-bold"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
                <span>Daily gaming streams with epic moments</span>
              </motion.li>
              <motion.li 
                className="flex gap-3 items-center"
                variants={itemVariants}
                whileHover={{ x: 10, color: '#00D9FF' }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-neon-cyan text-xl font-bold"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                >
                  →
                </motion.span>
                <span>Exclusive Discord community with 50K+ members</span>
              </motion.li>
              <motion.li 
                className="flex gap-3 items-center"
                variants={itemVariants}
                whileHover={{ x: 10, color: '#00D9FF' }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-neon-cyan text-xl font-bold"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                >
                  →
                </motion.span>
                <span>Gaming tournaments and giveaways</span>
              </motion.li>
              <motion.li 
                className="flex gap-3 items-center"
                variants={itemVariants}
                whileHover={{ x: 10, color: '#00D9FF' }}
                transition={{ duration: 0.2 }}
              >
                <motion.span 
                  className="text-neon-cyan text-xl font-bold"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                >
                  →
                </motion.span>
                <span>Behind-the-scenes content & setup tours</span>
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* Right side image card with glow and hover effects */}
          <motion.div
            className="hud-panel rounded-lg p-8 text-center border-2 border-neon-cyan"
            {...imageGlow}
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              rotateX: 0,
              transition: { duration: 0.8, type: 'spring', stiffness: 100 }
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 40px rgba(0, 217, 255, 0.8), inset 0 0 20px rgba(0, 217, 255, 0.2)',
              transition: { duration: 0.3 }
            }}
            viewport={{ once: true, margin: '-100px' }}
            style={{ perspective: '1000px' }}
          >
            {/* Animated emoji icon */}
            <motion.p 
              className="text-6xl mb-4"
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            >
              🎮
            </motion.p>

            {/* Main text with shimmer */}
            <motion.p 
              className="text-xl font-bold text-neon-cyan mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Join 250K+ Subscribers
            </motion.p>

            {/* Subtitle with pulse */}
            <motion.p 
              className="text-gray-400 mt-2 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              animationDuration="2s"
            >
              Be part of the gaming revolution
            </motion.p>

            {/* Call to action button with pulsing glow */}
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-neon-red to-neon-purple rounded-lg font-bold text-white relative"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              variants={buttonGlow}
              whileHover="whileHover"
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              onClick={() => window.open('https://www.youtube.com/@YourChannel?sub_confirmation=1', '_blank')}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255, 0, 85, 0.7)',
                  '0 0 0 10px rgba(255, 0, 85, 0)'
                ]
              }}
              transitionProp={{ duration: 2, repeat: Infinity }}
            >
              Subscribe Now
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats showcase section with animated counters */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10">
        <div className="mb-12">
          <WaveText text="By The Numbers" />
        </div>

        <motion.div 
          className="grid md:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          variants={imageContainerVariants}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Stat cards with animated counters */}
          {[
            { icon: '📊', label: 'Total Streams', end: 500, duration: 2 },
            { icon: '👥', label: 'Community', end: 250, duration: 2.5 },
            { icon: '⏱️', label: 'Hours Streamed', end: 5000, duration: 3 },
            { icon: '🏆', label: 'Tournaments Won', end: 25, duration: 2 }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="hud-panel rounded-lg p-6 text-center border border-neon-cyan/50"
              variants={imageItemVariants}
              whileHover={{ 
                scale: 1.05,
                borderColor: '#FF0055',
                boxShadow: '0 0 30px rgba(255, 0, 85, 0.5)',
                transition: { duration: 0.2 }
              }}
            >
              <AnimatedCounter 
                end={stat.end}
                duration={stat.duration}
                label={stat.label}
                icon={stat.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section with interactive carousel-style buttons */}
      <section className="max-w-7xl mx-auto px-4 py-20 relative z-10 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold gradient-text mb-8">Ready to Join?</h2>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center flex-wrap"
            initial="hidden"
            whileInView="visible"
            variants={fastStaggerVariants}
            viewport={{ once: true }}
          >
            {[
              { text: '📺 Watch Live', delay: 0, action: () => window.open('https://www.youtube.com/@YourChannel/live', '_blank') },
              { text: '💬 Join Discord', delay: 0.1, action: () => window.open('https://discord.gg/your-server', '_blank') },
              { text: '🎮 Play Games', delay: 0.2, action: () => window.open('/videos', '_self') },
              { text: '🎁 Get Rewards', delay: 0.3, action: () => window.open('/giveaway', '_self') }
            ].map((btn, idx) => (
              <motion.button
                key={idx}
                className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-cyan rounded-lg font-bold text-white"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={btn.action}
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(157, 0, 255, 0.5)',
                    '0 0 30px rgba(0, 217, 255, 0.8)',
                    '0 0 10px rgba(157, 0, 255, 0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: idx * 0.2
                }}
              >
                {btn.text}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
