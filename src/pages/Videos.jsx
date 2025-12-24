import { VideoGrid } from '../components/VideoGrid'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Videos() {
  const [filter, setFilter] = useState('all')

  const games = ['All', 'Free Fire', 'BGMI', 'Call of Duty', 'Valorant']

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
          className="text-5xl font-bold gradient-text mb-8 uppercase"
        >
          📹 Videos & Clips
        </motion.h1>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {games.map((game) => (
            <motion.button
              key={game}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(game.toLowerCase())}
              className={`
                px-6 py-2 rounded-lg font-bold uppercase transition-all
                ${filter === game.toLowerCase()
                  ? 'bg-neon-red text-white shadow-neon-glow'
                  : 'border-2 border-neon-purple text-neon-cyan hover:border-neon-red'
                }
              `}
            >
              {game}
            </motion.button>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mb-12 border-b border-neon-purple border-opacity-30"
        >
          {['Videos', 'Shorts', 'Streams'].map((tab) => (
            <button
              key={tab}
              className="py-3 px-6 font-bold uppercase text-neon-cyan hover:text-neon-red transition-colors border-b-2 border-transparent hover:border-neon-red"
            >
              {tab}
            </button>
          ))}
        </motion.div>

        <VideoGrid title="" />
      </div>
    </motion.div>
  )
}
