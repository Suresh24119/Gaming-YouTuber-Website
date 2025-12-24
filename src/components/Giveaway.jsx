import { motion } from 'framer-motion'
import { NeonButton } from './NeonButton'

export function Giveaway() {
  const prizePool = [
    { place: '1st Prize', reward: '$500 Gaming Setup', color: 'text-yellow-400' },
    { place: '2nd Prize', reward: '$250 Amazon Card', color: 'text-gray-300' },
    { place: '3rd Prize', reward: '$100 Gaming Gear', color: 'text-orange-600' }
  ]

  const entryRequirements = [
    '✅ Subscribe to YouTube',
    '✅ Follow on Twitter/Instagram',
    '✅ Join Discord Server',
    '✅ Comment on this post'
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto my-12"
    >
      <motion.h2
        className="text-4xl font-bold gradient-text mb-8 text-center uppercase"
      >
        🎁 Epic Gaming Giveaway
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {prizePool.map((prize, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="hud-panel rounded-lg p-6 text-center border-l-4 border-neon-cyan"
          >
            <p className={`text-2xl font-bold mb-2 ${prize.color}`}>{prize.place}</p>
            <p className="text-white font-bold">{prize.reward}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="hud-panel rounded-lg p-8 mb-8"
      >
        <h3 className="text-2xl font-bold gradient-text mb-6">How to Enter</h3>
        <div className="space-y-3 mb-8">
          {entryRequirements.map((req, idx) => (
            <motion.div
              key={idx}
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 text-white"
            >
              <span className="text-neon-cyan text-xl">{idx + 1}</span>
              <p>{req}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-neon-darker rounded p-4">
            <p className="text-neon-cyan font-bold">⏰ Ends</p>
            <p className="text-white">December 31, 2025</p>
          </div>
          <div className="bg-neon-darker rounded p-4">
            <p className="text-neon-cyan font-bold">📊 Entries</p>
            <p className="text-white">1,234 So Far</p>
          </div>
        </div>
      </motion.div>

      <motion.div className="text-center">
        <NeonButton className="text-lg px-8 py-4">
          Enter Giveaway Now
        </NeonButton>
      </motion.div>
    </motion.div>
  )
}
