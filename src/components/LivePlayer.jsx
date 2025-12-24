import { motion } from 'framer-motion'
import { useState } from 'react'

export function LivePlayer({ isLive = false, channelId = 'CHANNEL_ID' }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {isLive && (
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 left-4 z-20 live-badge"
        >
          LIVE NOW
        </motion.div>
      )}

      <div className="relative w-full bg-neon-darker rounded-lg overflow-hidden border border-neon-red border-opacity-30">
        <div className="aspect-video bg-neon-darker flex items-center justify-center">
          {isLive ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${channelId}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-neon-purple border-t-neon-cyan rounded-full mx-auto mb-4"
              />
              <p className="text-2xl font-bold gradient-text">Stream Offline</p>
              <p className="text-neon-cyan mt-2">Check back soon!</p>
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 hud-panel rounded-lg"
      >
        <h3 className="text-xl font-bold mb-2 gradient-text">Stream Info</h3>
        <p className="text-neon-cyan">Next Stream: Check Discord for schedule</p>
        <p className="text-gray-400 text-sm mt-2">Stay tuned for epic gaming content!</p>
      </motion.div>
    </div>
  )
}
