import { motion } from 'framer-motion'
import { NeonButton } from '../components/NeonButton'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thanks for reaching out! I\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const socials = [
    { icon: '▶️', label: 'YouTube', url: 'https://youtube.com', color: 'text-red-500' },
    { icon: '🔵', label: 'Discord', url: 'https://discord.com', color: 'text-blue-500' },
    { icon: '📱', label: 'Instagram', url: 'https://instagram.com', color: 'text-pink-500' },
    { icon: '🐦', label: 'Twitter', url: 'https://twitter.com', color: 'text-sky-500' },
    { icon: '💬', label: 'WhatsApp', url: 'https://whatsapp.com', color: 'text-green-500' },
    { icon: '💼', label: 'LinkedIn', url: 'https://linkedin.com', color: 'text-blue-600' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-gaming pt-24 pb-20 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl font-bold gradient-text mb-4 uppercase text-center"
        >
          📞 Get In Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-neon-cyan text-lg mb-16 max-w-2xl mx-auto"
        >
          Have a sponsorship offer, collaboration idea, or just want to say hello?
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="hud-panel rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Send a Message</h2>

            <div className="mb-4">
              <label className="block text-neon-cyan font-bold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neon-darker border border-neon-purple border-opacity-30 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-neon-cyan font-bold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neon-darker border border-neon-purple border-opacity-30 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-neon-cyan font-bold mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-neon-darker border border-neon-purple border-opacity-30 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                placeholder="Sponsorship / Collaboration / Other"
              />
            </div>

            <div className="mb-6">
              <label className="block text-neon-cyan font-bold mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full bg-neon-darker border border-neon-purple border-opacity-30 rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                placeholder="Your message here..."
              />
            </div>

            <NeonButton type="submit" className="w-full text-lg">
              Send Message
            </NeonButton>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Direct Contact */}
            <div className="hud-panel rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Direct Contact</h2>

              <motion.div whileHover={{ x: 5 }} className="mb-6 pb-6 border-b border-neon-purple border-opacity-30">
                <p className="text-neon-cyan font-bold mb-2">Email</p>
                <a href="mailto:business@gamername.com" className="text-gray-300 hover:text-neon-red transition-colors">
                  business@gamername.com
                </a>
              </motion.div>

              <motion.div whileHover={{ x: 5 }} className="mb-6 pb-6 border-b border-neon-purple border-opacity-30">
                <p className="text-neon-cyan font-bold mb-2">WhatsApp</p>
                <a href="https://wa.me/1234567890" className="text-gray-300 hover:text-neon-red transition-colors">
                  +1 (234) 567-8900
                </a>
              </motion.div>

              <motion.div whileHover={{ x: 5 }}>
                <p className="text-neon-cyan font-bold mb-2">Business</p>
                <p className="text-gray-300">Sponsorships & Collaborations</p>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="hud-panel rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Follow Me</h2>
              <div className="grid grid-cols-2 gap-4">
                {socials.map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-neon-darker border border-neon-purple border-opacity-30 rounded-lg p-4 text-center hover:border-neon-cyan transition-all"
                  >
                    <p className={`text-2xl mb-2 ${social.color}`}>{social.icon}</p>
                    <p className="text-sm font-bold text-white hover:text-neon-cyan transition-colors">
                      {social.label}
                    </p>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
