import { LivePlayer } from '../components/LivePlayer'
import { motion } from 'framer-motion'

export function Live() {
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
          🔴 Live Stream
        </motion.h1>

        <LivePlayer isLive={false} channelId="YOUR_CHANNEL_ID" />

        {/* Schedule */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-16 hud-panel rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6 gradient-text">Weekly Schedule</h2>
          <div className="grid md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-neon-darker p-4 rounded text-center border border-neon-purple border-opacity-30"
              >
                <p className="font-bold text-neon-cyan">{day}</p>
                <p className="text-sm text-gray-400 mt-2">{idx < 5 ? '8:00 PM' : 'TBD'}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stream Info */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid md:grid-cols-2 gap-8"
        >
          <div className="hud-panel rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4 text-neon-cyan">Stream Info</h3>
            <p className="text-gray-300 mb-2">📺 Streaming: Free Fire, BGMI, Call of Duty</p>
            <p className="text-gray-300">🎤 High-Quality Audio & 1080p 60FPS</p>
          </div>
          <div className="hud-panel rounded-lg p-8">
            <h3 className="text-xl font-bold mb-4 text-neon-cyan">Connect</h3>
            <p className="text-gray-300 mb-2">💬 Live Chat Enabled</p>
            <p className="text-gray-300">🔔 Notifications On Discord</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
