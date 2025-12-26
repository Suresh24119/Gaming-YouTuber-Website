import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import yt from '../api/youtube'

export function ShortsGrid({ title = 'Latest Shorts' }) {
  const [shorts, setShorts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const items = await yt.getShorts(12)
        if (!mounted) return
        
        // Map YouTube API response to expected format
        const mapped = items.map(item => ({
          id: item.id?.videoId || item.id,
          title: item.snippet?.title || item.title,
          thumbnail: item.snippet?.thumbnails?.medium?.url || item.thumbnail,
          views: formatViews(item.statistics?.viewCount),
          publishedAt: item.snippet?.publishedAt,
          channelTitle: item.snippet?.channelTitle || 'Kailash Live'
        }))
        
        setShorts(mapped)
      } catch (e) {
        console.error('Error loading shorts:', e)
        // Fallback to demo shorts if API fails
        setShorts([
          {
            id: 'short1',
            title: '🔥 Epic Gaming Moment #shorts',
            thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
            views: '1.2M',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'short2',
            title: '⚡ Insane Clutch Play #gaming',
            thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg',
            views: '850K',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'short3',
            title: '🎮 Pro Gaming Tips #shorts',
            thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/mqdefault.jpg',
            views: '2.1M',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'short4',
            title: '💥 Best Gaming Setup #tech',
            thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/mqdefault.jpg',
            views: '650K',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'short5',
            title: '🏆 Victory Royale Reaction',
            thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/mqdefault.jpg',
            views: '1.8M',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'short6',
            title: '🎯 Perfect Headshot #fps',
            thumbnail: 'https://img.youtube.com/vi/fJ9rUzIMcZQ/mqdefault.jpg',
            views: '920K',
            channelTitle: 'Kailash Live'
          }
        ])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const formatViews = (viewCount) => {
    if (!viewCount) return '250K'
    
    try {
      const num = Number(viewCount)
      if (isNaN(num)) return viewCount
      if (num >= 1e6) return `${(num/1e6).toFixed(1)}M`
      if (num >= 1e3) return `${Math.round(num/1e3)}K`
      return `${num}`
    } catch {
      return viewCount || '250K'
    }
  }

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold mb-8 gradient-text uppercase flex items-center gap-3"
      >
        <span className="text-4xl">📱</span>
        {title}
      </motion.h2>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loading text="Loading YouTube Shorts..." />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {shorts.map((short, idx) => (
            <motion.div
              key={short.id || idx}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="group cursor-pointer"
              onClick={() => {
                const shortUrl = short.id.startsWith('short') 
                  ? 'https://www.youtube.com/channel/UCN5w9zFhA_fzklkfgpaSdyw/shorts'
                  : `https://youtube.com/shorts/${short.id}`
                window.open(shortUrl, '_blank')
              }}
            >
              {/* Shorts Card - Vertical aspect ratio */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden border border-gray-700 group-hover:border-neon-cyan transition-all duration-300">
                {/* Thumbnail with overlay */}
                <div className="relative aspect-[9/16] overflow-hidden">
                  <img
                    src={short.thumbnail}
                    alt={short.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/360x640/1a1a1a/00d9ff?text=Short'
                    }}
                  />
                  
                  {/* Shorts indicator */}
                  <div className="absolute top-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                    <span className="text-red-500">📱</span>
                    Shorts
                  </div>
                  
                  {/* Views overlay */}
                  <div className="absolute bottom-2 left-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {short.views} views
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-red-600 rounded-full p-3 transform group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Title */}
                <div className="p-3">
                  <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-neon-cyan transition-colors duration-200">
                    {short.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* View All Shorts Button */}
      <motion.div
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg font-bold text-white hover:from-red-500 hover:to-pink-500 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://www.youtube.com/channel/UCN5w9zFhA_fzklkfgpaSdyw/shorts', '_blank')}
        >
          📱 View All Shorts
        </motion.button>
      </motion.div>
    </motion.div>
  )
}