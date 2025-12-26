import { motion } from 'framer-motion'
import { VideoCard } from './VideoCard'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import yt from '../api/youtube'

export function VideoGrid({ videos: propVideos = null, title = 'Latest Videos' }) {
  const [videos, setVideos] = useState(propVideos || [])
  const [loading, setLoading] = useState(!propVideos)

  useEffect(() => {
    if (propVideos) return
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const items = await yt.getLatestVideos(12)
        if (!mounted) return
        
        // Map YouTube API response to expected format
        const mapped = items.map(item => ({
          id: item.id?.videoId || item.id,
          title: item.snippet?.title || item.title,
          thumbnail: item.snippet?.thumbnails?.medium?.url || item.thumbnail,
          duration: formatDuration(item.contentDetails?.duration),
          views: formatViews(item.statistics?.viewCount),
          publishedAt: item.snippet?.publishedAt,
          channelTitle: item.snippet?.channelTitle || 'Kailash Live'
        }))
        
        setVideos(mapped)
      } catch (e) {
        console.error('Error loading videos:', e)
        // Fallback to demo data if API fails
        setVideos([
          {
            id: 'demo1',
            title: 'Epic Gaming Moments - Best Highlights 2024',
            thumbnail: 'https://youtube.com/shorts/2ueVFTp5d4M?si=qESXBrc32-LNrAid',
            duration: '15:30',
            views: '250K',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'demo2',
            title: 'Live Gaming Stream - Fortnite Victory Royale',
            thumbnail: 'https://youtube.com/shorts/hB9thJHkR2o?si=eLnpoa7aJ_cG5HIn',
            duration: '22:45',
            views: '180K',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'demo3',
            title: 'Gaming Setup Tour 2024 - Complete Streaming Setup',
            thumbnail: 'https://youtube.com/shorts/Vf440irHn7Q?si=orzm2MT7VmzIXS78',
            duration: '12:15',
            views: '500K',
            channelTitle: 'Kailash Live'
          },
          {
            id: 'demo4',
            title: 'Call of Duty Warzone - 20 Kill Game!',
            thumbnail: 'https://youtube.com/shorts/4FkeyMFMoe8?si=Jifuj2ZtJqZOjh-u',
            duration: '18:20',
            views: '320K',
            channelTitle: 'Kailash Live'
          }
        ])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [propVideos])

  const formatDuration = (duration) => {
    if (!duration) return '15:30' // Default duration
    
    // Handle ISO 8601 duration format (PT15M30S)
    if (typeof duration === 'string' && duration.startsWith('PT')) {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
      if (match) {
        const hours = parseInt(match[1]) || 0
        const minutes = parseInt(match[2]) || 0
        const seconds = parseInt(match[3]) || 0
        
        if (hours > 0) {
          return `${hours}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')}`
        }
        return `${minutes}:${String(seconds).padStart(2,'0')}`
      }
    }
    
    // Handle numeric seconds
    if (typeof duration === 'number') {
      const h = Math.floor(duration / 3600)
      const m = Math.floor((duration % 3600) / 60)
      const s = duration % 60
      if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
      return `${m}:${String(s).padStart(2,'0')}`
    }
    
    return duration || '15:30'
  }

  const formatViews = (viewCount) => {
    if (!viewCount) return '250K' // Default view count
    
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {title && (
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-bold mb-8 gradient-text uppercase"
        >
          {title}
        </motion.h2>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <Loading text="Loading Kailash Live videos..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, idx) => (
            <VideoCard
              key={video.id || idx}
              video={video}
              onWatchClick={() => {
                const videoUrl = video.id.startsWith('demo') 
                  ? 'https://www.youtube.com/channel/UCN5w9zFhA_fzklkfgpaSdyw'
                  : `https://youtube.com/watch?v=${video.id}`
                window.open(videoUrl, '_blank')
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
