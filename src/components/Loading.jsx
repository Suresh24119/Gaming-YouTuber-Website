import React from 'react'
import { motion } from 'framer-motion'
import { loadingSpinner, loadingDots, loadingTextShimmer } from '../animations/variants'

export function Loading({ size = 48, text = 'Loading...', className = '' }) {
  const dotCount = 3
  const dots = Array.from({ length: dotCount })

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <motion.div
        style={{ width: size, height: size, borderRadius: '50%', border: '6px solid rgba(255,255,255,0.08)', borderTopColor: 'rgba(0,217,255,0.9)' }}
        variants={loadingSpinner}
        animate="animate"
      />

      <div className="flex items-center gap-2">
        {dots.map((_, i) => (
          <motion.span
            key={i}
            custom={i}
            className="w-3 h-3 bg-neon-cyan rounded-full"
            variants={loadingDots}
            animate="animate"
            style={{ display: 'inline-block' }}
          />
        ))}
      </div>

      <motion.span
        className="text-sm text-gray-300"
        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.18), rgba(255,255,255,0.06))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
        variants={loadingTextShimmer}
        animate="animate"
      >
        {text}
      </motion.span>
    </div>
  )
}

export default Loading
