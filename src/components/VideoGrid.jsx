import { motion } from 'framer-motion'
import { VideoCard } from './VideoCard'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import yt from '../api/youtube'

const dummyVideos = [
  {
    title: 'Epic Gaming Session - Free Fire Highlights',
    thumbnail: 'https://via.placeholder.com/400x225?text=Free+Fire',
    duration: '15:30',
    views: '250K',
    game: 'Free Fire'
  },
  {
    title: 'BGMI Ranked Match - Road to Pro',
    thumbnail: 'https://via.placeholder.com/400x225?text=BGMI',
    duration: '22:45',
    views: '180K',
    game: 'BGMI'
  },
  {
    title: 'Call of Duty - 40 Kill Rampage',
    thumbnail: 'https://via.placeholder.com/400x225?text=Call+of+Duty',
    duration: '18:20',
    views: '320K',
    game: 'Call of Duty'
  },
  {
    title: 'Gaming Setup Tour 2025',
    thumbnail: 'https://via.placeholder.com/400x225?text=Setup+Tour',
    duration: '12:15',
    views: '500K',
    game: 'Other'
  }
]

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
        // map to expected shape
        const mapped = items.map(it => ({
          title: it.title,
          thumbnail: it.thumbnail,
          duration: formatDuration(it.duration),
          views: formatViews(it.views),
          id: it.id
        }))
        setVideos(mapped)
      } catch (e) {
        console.error('Error loading videos', e)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [propVideos])

  const formatDuration = (sec) => {
    if (!sec) return '00:00'
    const s = Number(sec)
    const h = Math.floor(s / 3600)
    const m = Math.floor((s % 3600) / 60)
    const ss = s % 60
    if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(ss).padStart(2,'0')}`
    return `${m}:${String(ss).padStart(2,'0')}`
  }

  const formatViews = (n) => {
    try {
      const num = Number(n)
      if (isNaN(num)) return n
      if (num >= 1e6) return `${Math.round(num/1e6)}M`
      if (num >= 1e3) return `${Math.round(num/1e3)}K`
      return `${num}`
    } catch { return n }
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
        <div className="flex justify-center py-8"><Loading text="Fetching latest videos..." /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video, idx) => (
            <VideoCard
              key={video.id || idx}
              video={video}
              onWatchClick={() => window.open(`https://youtube.com/watch?v=${video.id}`, '_blank')}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
