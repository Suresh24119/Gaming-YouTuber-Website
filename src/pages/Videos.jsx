import { useState } from 'react'
import { motion } from 'framer-motion'
import { VideoGrid } from '../components/VideoGrid'
import { ShortsGrid } from '../components/ShortsGrid'
import { NeonButton } from '../components/NeonButton'

export function Videos() {
  const [activeTab, setActiveTab] = useState('all')

  const tabs = [
    { id: 'all', label: '🎮 All Videos', icon: '🎮' },
    { id: 'shorts', label: '📱 Shorts', icon: '📱' },
    { id: 'live', label: '🔴 Live Streams', icon: '🔴' },
    { id: 'gaming', label: '🎯 Gaming', icon: '🎯' }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Gaming Content Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore epic gaming moments, tutorials, live streams, and quick shorts from Kailash Live
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              variants={itemVariants}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-neon-cyan to-neon-purple text-white shadow-lg shadow-neon-cyan/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Content Sections */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'all' && (
            <div className="space-y-16">
              <VideoGrid title="Latest Videos" />
              <ShortsGrid title="Recent Shorts" />
            </div>
          )}
          
          {activeTab === 'shorts' && (
            <ShortsGrid title="All YouTube Shorts" />
          )}
          
          {activeTab === 'live' && (
            <VideoGrid title="Live Streams & VODs" />
          )}
          
          {activeTab === 'gaming' && (
            <VideoGrid title="Gaming Highlights" />
          )}
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 border border-neon-cyan/20"
        >
          <h2 className="text-3xl font-bold gradient-text mb-4">
            Never Miss a Stream!
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to get notified when I go live and catch all the epic gaming moments as they happen.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NeonButton
              onClick={() => window.open('https://www.youtube.com/channel/UCN5w9zFhA_fzklkfgpaSdyw?sub_confirmation=1', '_blank')}
              className="bg-red-600 hover:bg-red-500"
            >
              🔔 Subscribe on YouTube
            </NeonButton>
            
            <NeonButton
              onClick={() => window.open('https://www.youtube.com/channel/UCN5w9zFhA_fzklkfgpaSdyw/live', '_blank')}
              variant="outline"
            >
              🔴 Watch Live Now
            </NeonButton>
          </div>
        </motion.div>
      </section>
    </motion.div>
  )
}