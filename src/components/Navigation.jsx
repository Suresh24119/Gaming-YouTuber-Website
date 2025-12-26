import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { NeonButton } from './NeonButton'
import { Logo, TextLogo } from './Logo'

export function Navigation() {
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Live', path: '/live' },
    { name: 'Videos', path: '/videos' },
    { name: 'About', path: '/about' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-neon-dark bg-opacity-95 backdrop-blur-md border-b border-neon-red border-opacity-30"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size="default" />
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.05 }}>
              <Link
                to={link.path}
                className="text-white hover:text-neon-cyan transition-colors font-semibold uppercase text-sm"
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <NeonButton variant="outline" className="hidden sm:block text-xs py-2 px-4">
            Subscribe
          </NeonButton>
          <NeonButton className="text-xs py-2 px-4">
            Join Discord
          </NeonButton>
        </div>
      </div>
    </motion.nav>
  )
}
