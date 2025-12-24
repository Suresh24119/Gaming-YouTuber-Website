import { motion } from 'framer-motion'
import { NeonButton } from './NeonButton'
import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto hud-panel rounded-lg p-8 my-8"
    >
      <h2 className="text-3xl font-bold gradient-text mb-4">📧 Join Our Newsletter</h2>
      <p className="text-gray-300 mb-6">Get exclusive gaming tips, stream announcements, and special offers!</p>

      {submitted ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-green-600 bg-opacity-30 border border-green-500 rounded-lg p-4 text-green-300 text-center"
        >
          ✅ Thanks for subscribing! Check your email for confirmation.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 bg-neon-darker border border-neon-purple border-opacity-30 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
          />
          <NeonButton type="submit" className="px-8">
            Subscribe
          </NeonButton>
        </form>
      )}

      <p className="text-xs text-gray-400 mt-4">We respect your privacy. No spam, ever!</p>
    </motion.section>
  )
}
