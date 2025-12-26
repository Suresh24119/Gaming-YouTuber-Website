import { motion } from 'framer-motion'
import { LINKS, FOLLOWER_COUNTS } from '../config/links'
import { SocialIcons } from './SocialIcons'

export function SocialMediaFollow({ title = "Follow Me", showTitle = true, size = "default" }) {
  const socialLinks = [
    {
      name: 'YouTube',
      icon: <SocialIcons.YouTube size={32} className="text-white" />,
      url: LINKS.youtube.subscribe,
      color: 'from-red-600 to-red-500',
      hoverColor: 'hover:from-red-500 hover:to-red-400',
      followers: FOLLOWER_COUNTS.youtube
    },
    {
      name: 'Discord',
      icon: <SocialIcons.Discord size={32} className="text-white" />,
      url: LINKS.discord,
      color: 'from-indigo-600 to-purple-600',
      hoverColor: 'hover:from-indigo-500 hover:to-purple-500',
      followers: FOLLOWER_COUNTS.discord
    },
    {
      name: 'Instagram',
      icon: <SocialIcons.Instagram size={32} className="text-white" />,
      url: 'https://www.instagram.com/kailashlivee?igsh=MWplcDNpOHhvN21jbw==',
      color: 'from-pink-500 to-orange-500',
      hoverColor: 'hover:from-pink-400 hover:to-orange-400',
      followers: FOLLOWER_COUNTS.instagram
    },
    {
      name: 'Twitter',
      icon: <SocialIcons.Twitter size={32} className="text-white" />,
      url: LINKS.twitter,
      color: 'from-blue-500 to-cyan-500',
      hoverColor: 'hover:from-blue-400 hover:to-cyan-400',
      followers: FOLLOWER_COUNTS.twitter
    },
    {
      name: 'Twitch',
      icon: <SocialIcons.Twitch size={32} className="text-white" />,
      url: LINKS.twitch,
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'hover:from-purple-500 hover:to-pink-500',
      followers: FOLLOWER_COUNTS.twitch
    },
    {
      name: 'TikTok',
      icon: <SocialIcons.TikTok size={32} className="text-white" />,
      url: LINKS.tiktok,
      color: 'from-gray-800 to-gray-700',
      hoverColor: 'hover:from-gray-700 hover:to-gray-600',
      followers: FOLLOWER_COUNTS.tiktok
    },
    {
      name: 'WhatsApp',
      icon: <SocialIcons.WhatsApp size={32} className="text-white" />,
      url: LINKS.whatsapp,
      color: 'from-green-600 to-green-500',
      hoverColor: 'hover:from-green-500 hover:to-green-400',
      followers: FOLLOWER_COUNTS.whatsapp
    },
    {
      name: 'LinkedIn',
      icon: <SocialIcons.LinkedIn size={32} className="text-white" />,
      url: LINKS.linkedin,
      color: 'from-blue-700 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-500',
      followers: FOLLOWER_COUNTS.linkedin
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  const buttonSize = size === 'small' ? 'text-sm px-4 py-2' : 'text-base px-6 py-3'

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {showTitle && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-8 gradient-text text-center"
        >
          {title}
        </motion.h2>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {socialLinks.map((social, idx) => (
          <motion.div
            key={social.name}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="group"
          >
            <motion.button
              className={`w-full bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-lg font-bold text-white transition-all duration-300 ${buttonSize} flex flex-col items-center gap-2 border border-transparent group-hover:border-white/20 shadow-lg`}
              onClick={() => window.open(social.url, '_blank')}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(255, 255, 255, 0.1)',
                  '0 0 20px 0 rgba(255, 255, 255, 0.2)',
                  '0 0 0 0 rgba(255, 255, 255, 0.1)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: idx * 0.2
              }}
            >
              <span className="flex justify-center">{social.icon}</span>
              <div className="text-center">
                <div className="font-bold">{social.name}</div>
                <div className="text-xs opacity-80">{social.followers}</div>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Featured YouTube & Discord Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-neon-cyan/20">
          <h3 className="text-2xl font-bold gradient-text mb-6">
            🔥 Join the Gaming Community!
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 rounded-lg font-bold text-white text-lg hover:from-red-500 hover:to-red-400 transition-all duration-300 flex items-center gap-3 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(LINKS.youtube.subscribe, '_blank')}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(239, 68, 68, 0.7)',
                  '0 0 0 10px rgba(239, 68, 68, 0)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SocialIcons.YouTube size={28} className="text-white" />
              <div>
                <div>Subscribe on YouTube</div>
                <div className="text-sm opacity-80">{FOLLOWER_COUNTS.youtube} Subscribers</div>
              </div>
            </motion.button>
            
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-bold text-white text-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 flex items-center gap-3 justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open(LINKS.discord, '_blank')}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(99, 102, 241, 0.7)',
                  '0 0 0 10px rgba(99, 102, 241, 0)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <SocialIcons.Discord size={28} className="text-white" />
              <div>
                <div>Join Discord Server</div>
                <div className="text-sm opacity-80">{FOLLOWER_COUNTS.discord} Members</div>
              </div>
            </motion.button>
          </div>
          
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Subscribe for daily gaming content, join our Discord for live chat during streams, 
            and follow on all platforms for exclusive updates and behind-the-scenes content!
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}