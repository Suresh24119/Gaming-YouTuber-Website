import { motion } from 'framer-motion'
import { NeonButton } from './NeonButton'

export function VideoCard({ video = {}, onWatchClick }) {
  const { title = 'Video Title', thumbnail = '', duration = '10:25', views = '100K', game = 'Gaming' } = video

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  }

  return (
    <motion.div
      variants={containerVariants}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg mb-4 neon-border">
        <motion.img
          src={thumbnail || 'https://via.placeholder.com/400x225?text=Gaming+Video'}
          alt={title}
          className="w-full aspect-video object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
        >
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className="text-white"
          >
            <svg className="w-16 h-16" fill="white" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.button>
        </motion.div>

        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs font-bold">
          {duration}
        </div>
      </div>

      <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:gradient-text transition-all">
        {title}
      </h3>

      <div className="flex items-center justify-between mb-3 text-sm text-gray-400">
        <span className="bg-neon-purple bg-opacity-30 px-2 py-1 rounded text-neon-cyan">
          {game}
        </span>
        <span>{views} views</span>
      </div>

      <NeonButton
        variant="outline"
        className="w-full text-sm py-2"
        onClick={onWatchClick}
      >
        Watch on YouTube
      </NeonButton>
    </motion.div>
  )
}
