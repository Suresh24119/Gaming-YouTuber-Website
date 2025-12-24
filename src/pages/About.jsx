import { motion } from 'framer-motion'
import { NeonButton } from '../components/NeonButton'

export function About() {
  const stats = [
    { icon: '👥', label: 'Subscribers', value: '250K+' },
    { icon: '👁️', label: 'Total Views', value: '5M+' },
    { icon: '🎮', label: 'Games Played', value: '20+' },
    { icon: '⏱️', label: 'Hours Streamed', value: '1000+' }
  ]

  const games = ['Free Fire', 'BGMI', 'Call of Duty', 'Valorant', 'CS:GO', 'Apex Legends']

  const setup = [
    { item: 'PC', details: 'RTX 4090 | i9-13900K | 64GB RAM' },
    { item: 'Monitor', details: '4K 144Hz Gaming Monitor' },
    { item: 'Mic', details: 'Audio-Technica AT2020' },
    { item: 'Keyboard', details: 'Mechanical RGB Gaming Keyboard' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-gaming pt-24 pb-20 relative z-10"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="text-9xl mb-4 inline-block"
          >
            🎮
          </motion.div>
          <h1 className="text-5xl font-bold gradient-text mb-4">About Me</h1>
          <p className="text-xl text-neon-cyan max-w-2xl mx-auto">
            Professional Gaming Streamer | Content Creator | Community Builder
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="hud-panel rounded-lg p-6 text-center"
            >
              <p className="text-4xl mb-3">{stat.icon}</p>
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hud-panel rounded-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">My Journey</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            Started gaming in 2015, went professional in 2018, and now stream to a community of 250K+ subscribers. 
            My mission is to create high-energy, entertaining gaming content while building a supportive gaming community.
          </p>
          <p className="text-gray-300 leading-relaxed">
            When I'm not streaming, you'll find me competing in tournaments, collaborating with other creators, 
            or exploring new games. Gaming is my passion, and sharing it with you makes it all worthwhile!
          </p>
        </motion.div>

        {/* Games Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">Games I Play</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {games.map((game, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="hud-panel rounded-lg p-4 text-center border-l-4 border-neon-cyan"
              >
                <p className="font-bold text-white">{game}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Setup */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6 gradient-text">My Setup</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {setup.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="hud-panel rounded-lg p-6 border-l-4 border-neon-purple"
              >
                <p className="font-bold text-neon-cyan text-lg mb-2">{item.item}</p>
                <p className="text-gray-300">{item.details}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-xl text-gray-300 mb-6">Ready to join the community?</p>
          <NeonButton className="text-lg px-8 py-4">
            Subscribe & Join Discord
          </NeonButton>
        </motion.div>
      </div>
    </motion.div>
  )
}
