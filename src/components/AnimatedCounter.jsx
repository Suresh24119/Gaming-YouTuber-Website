import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { counterContainer, numberRoll, counterPulse } from '../animations/variants'

export function AnimatedCounter({ end = 100, duration = 2, label = '', icon = '' }) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const countRef = useRef(0)

  useEffect(() => {
    if (!hasStarted) return

    // Reset counter when props change
    countRef.current = 0
    setCount(0)

    // Ensure minimum interval for 60fps (16ms)
    const incrementTime = Math.max((duration * 1000) / end, 16)
    
    const timer = setInterval(() => {
      countRef.current += 1
      setCount(countRef.current)
      if (countRef.current >= end) {
        clearInterval(timer)
      }
    }, incrementTime)

    return () => clearInterval(timer)
  }, [hasStarted, end, duration])

  return (
    <motion.div
      className="text-center"
      variants={counterContainer}
      initial="hidden"
      whileInView="visible"
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Icon with rotation */}
      {icon && (
        <motion.p
          className="text-5xl mb-3"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
        >
          {icon}
        </motion.p>
      )}

      {/* Counter with rolling animation */}
      <motion.div
        className="text-4xl font-bold text-neon-cyan mb-2"
        variants={numberRoll}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {Math.min(count, end).toLocaleString()}+
      </motion.div>

      {/* Label */}
      {label && (
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          {label}
        </motion.p>
      )}
    </motion.div>
  )
}
