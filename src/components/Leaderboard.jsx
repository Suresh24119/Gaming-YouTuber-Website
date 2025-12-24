import { motion } from 'framer-motion'

export function Leaderboard() {
  const leaderboardData = [
    { rank: 1, name: 'ProGamer_X', points: 5420, badge: '🏆' },
    { rank: 2, name: 'ShadowNinja', points: 4890, badge: '🥈' },
    { rank: 3, name: 'PhoenixRise', points: 4650, badge: '🥉' },
    { rank: 4, name: 'VortexStrike', points: 4120, badge: '⭐' },
    { rank: 5, name: 'CyberElite', points: 3950, badge: '⭐' },
    { rank: 6, name: 'NeonKnight', points: 3780, badge: '💫' },
    { rank: 7, name: 'ThunderVolt', points: 3450, badge: '💫' },
    { rank: 8, name: 'FrostByte', points: 3210, badge: '❄️' },
    { rank: 9, name: 'InfernoFury', points: 2980, badge: '🔥' },
    { rank: 10, name: 'SilentAssassin', points: 2750, badge: '🎯' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto my-12"
    >
      <motion.h2
        className="text-4xl font-bold gradient-text mb-2 text-center uppercase"
      >
        🏅 Community Leaderboard
      </motion.h2>
      <p className="text-center text-neon-cyan mb-8">Top supporters this month</p>

      <motion.div className="hud-panel rounded-lg p-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neon-purple border-opacity-30">
              <th className="text-left py-3 text-neon-cyan font-bold">Rank</th>
              <th className="text-left py-3 text-neon-cyan font-bold">Username</th>
              <th className="text-right py-3 text-neon-cyan font-bold">Points</th>
              <th className="text-center py-3 text-neon-cyan font-bold">Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((entry, idx) => (
              <motion.tr
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ backgroundColor: 'rgba(255, 0, 85, 0.1)' }}
                className="border-b border-neon-purple border-opacity-10 hover:bg-neon-red hover:bg-opacity-10 transition-all"
              >
                <td className="py-3 text-white font-bold">
                  {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                </td>
                <td className="py-3 text-white">{entry.name}</td>
                <td className="py-3 text-right">
                  <span className="bg-neon-purple bg-opacity-30 px-3 py-1 rounded text-neon-cyan font-bold">
                    {entry.points}
                  </span>
                </td>
                <td className="py-3 text-center text-xl">{entry.badge}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-3 gap-4 mt-8"
      >
        <div className="hud-panel rounded-lg p-4 text-center">
          <p className="text-neon-cyan font-bold">Your Rank</p>
          <p className="text-3xl font-bold text-white mt-2">#47</p>
          <p className="text-gray-400 text-sm">Sign in to see your stats</p>
        </div>
        <div className="hud-panel rounded-lg p-4 text-center">
          <p className="text-neon-cyan font-bold">Your Points</p>
          <p className="text-3xl font-bold text-white mt-2">1,230</p>
          <p className="text-gray-400 text-sm">Keep watching & engaging!</p>
        </div>
        <div className="hud-panel rounded-lg p-4 text-center">
          <p className="text-neon-cyan font-bold">Until Next Rank</p>
          <p className="text-3xl font-bold text-white mt-2">890 pts</p>
          <p className="text-gray-400 text-sm">Almost there!</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
