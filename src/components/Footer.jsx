import { motion } from 'framer-motion'
import { LINKS, FOLLOWER_COUNTS } from '../config/links'
import { SocialIcons } from './SocialIcons'

export function Footer() {
  const socialLinks = [
    { name: 'YouTube', icon: <SocialIcons.YouTube size={20} className="text-white" />, url: LINKS.youtube.channel },
    { name: 'Discord', icon: <SocialIcons.Discord size={20} className="text-white" />, url: LINKS.discord },
    { name: 'Twitch', icon: <SocialIcons.Twitch size={20} className="text-white" />, url: LINKS.twitch },
    { name: 'Twitter', icon: <SocialIcons.Twitter size={20} className="text-white" />, url: LINKS.twitter },
    { name: 'Instagram', icon: <SocialIcons.Instagram size={20} className="text-white" />, url: LINKS.instagram },
    { name: 'TikTok', icon: <SocialIcons.TikTok size={20} className="text-white" />, url: LINKS.tiktok },
    { name: 'WhatsApp', icon: <SocialIcons.WhatsApp size={20} className="text-white" />, url: LINKS.whatsapp },
    { name: 'LinkedIn', icon: <SocialIcons.LinkedIn size={20} className="text-white" />, url: LINKS.linkedin }
  ]

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Videos', path: '/videos' },
    { name: 'Live Stream', path: '/live' },
    { name: 'About', path: '/about' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <footer className="bg-neon-darker border-t border-neon-red border-opacity-30 relative z-10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold gradient-text mb-4">
                🎮 Kailash Live
              </h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Epic gaming content, live streams, and community fun. Join {FOLLOWER_COUNTS.youtube} subscribers 
                for daily gaming adventures and epic moments!
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-neon-cyan rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <span className="flex justify-center">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, idx) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.path}
                      className="text-gray-400 hover:text-neon-cyan transition-colors duration-200 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Gaming Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-bold text-white mb-4">Community</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">📺</span>
                  <span className="text-sm text-gray-400">
                    {FOLLOWER_COUNTS.youtube} YouTube Subscribers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-indigo-500">💬</span>
                  <span className="text-sm text-gray-400">
                    {FOLLOWER_COUNTS.discord} Discord Members
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-500">🎮</span>
                  <span className="text-sm text-gray-400">
                    {FOLLOWER_COUNTS.twitch} Twitch Followers
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">🔴</span>
                  <span className="text-sm text-gray-400">
                    Live Daily at 8PM EST
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm mb-2">
              🎮 Kailash Live Gaming Community © 2025
            </p>
            <p className="text-xs text-gray-500">
              Built with React • Vite • Tailwind CSS • Framer Motion
            </p>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-neon-cyan transition-colors">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-neon-cyan transition-colors">
              Terms of Service
            </a>
            <span>•</span>
            <a href={`mailto:${LINKS.email}`} className="hover:text-neon-cyan transition-colors">
              Business Inquiries
            </a>
          </div>
        </motion.div>

        {/* Gaming Achievement Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-neon-red to-neon-purple px-4 py-2 rounded-full text-sm font-bold">
            <span>🏆</span>
            <span>Verified Gaming Creator</span>
            <span>⚡</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}