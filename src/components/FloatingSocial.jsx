import { motion } from 'framer-motion'
import { useState } from 'react'
import { LINKS } from '../config/links'
import { SocialIcons } from './SocialIcons'

export function FloatingSocial() {
  const [isExpanded, setIsExpanded] = useState(false)

  const socialLinks = [
    {
      name: 'YouTube',
      icon: <SocialIcons.YouTube size={20} className="text-white" />,
      url: LINKS.youtube.subscribe,
      color: 'bg-red-600 hover:bg-red-500',
      label: 'Subscribe'
    },
    {
      name: 'Discord',
      icon: <SocialIcons.Discord size={20} className="text-white" />,
      url: LINKS.discord,
      color: 'bg-indigo-600 hover:bg-indigo-500',
      label: 'Join Server'
    },
    {
      name: 'Twitch',
      icon: <SocialIcons.Twitch size={20} className="text-white" />,
      url: LINKS.twitch,
      color: 'bg-purple-600 hover:bg-purple-500',
      label: 'Follow'
    },
    {
      name: 'Twitter',
      icon: <SocialIcons.Twitter size={20} className="text-white" />,
      url: LINKS.twitter,
      color: 'bg-blue-500 hover:bg-blue-400',
      label: 'Follow'
    }
  ]

  const containerVariants = {
    collapsed: {
      width: '60px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    expanded: {
      width: '200px',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  }

  return (
    <motion.div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      variants={containerVariants}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="bg-gray-900/95 backdrop-blur-md rounded-2xl border border-neon-cyan/30 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-neon-cyan text-xl"
            >
              🚀
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
              className="text-white font-bold text-sm whitespace-nowrap"
            >
              Follow Me
            </motion.span>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-2">
          {socialLinks.map((social, idx) => (
            <motion.button
              key={social.name}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              animate={isExpanded ? "visible" : "hidden"}
              className={`w-full ${social.color} rounded-lg p-3 mb-2 last:mb-0 transition-all duration-200 flex items-center gap-3 group`}
              onClick={() => window.open(social.url, '_blank')}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex justify-center">{social.icon}</span>
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: isExpanded ? 1 : 0,
                  width: isExpanded ? 'auto' : 0
                }}
                transition={{ duration: 0.2, delay: isExpanded ? 0.1 : 0 }}
                className="text-white text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                {social.label}
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Live Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExpanded ? 1 : 0 }}
          transition={{ duration: 0.2, delay: isExpanded ? 0.2 : 0 }}
          className="p-4 border-t border-gray-700"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 bg-red-500 rounded-full"
            />
            <span className="text-xs text-gray-400">Live Status</span>
          </div>
          <p className="text-xs text-white mt-1">Next stream: Today 8PM</p>
        </motion.div>
      </div>
    </motion.div>
  )
}