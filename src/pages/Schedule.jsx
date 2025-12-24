import { motion } from 'framer-motion'
import { NeonButton } from '../components/NeonButton'

export function Schedule() {
  const scheduleData = [
    { day: 'Monday', time: '8:00 PM', game: 'Free Fire', status: 'Scheduled' },
    { day: 'Tuesday', time: '8:00 PM', game: 'BGMI', status: 'Scheduled' },
    { day: 'Wednesday', time: 'OFF', game: '—', status: 'Rest Day' },
    { day: 'Thursday', time: '8:00 PM', game: 'Call of Duty', status: 'Scheduled' },
    { day: 'Friday', time: '7:00 PM', game: 'Variety Gaming', status: 'Scheduled' },
    { day: 'Saturday', time: '3:00 PM', game: 'Tournament', status: 'Special Event' },
    { day: 'Sunday', time: '5:00 PM', game: 'Community Games', status: 'Scheduled' }
  ]

  const upcomingEvents = [
    { date: 'Dec 25', event: '🎄 Christmas Special Stream', viewers: '50K+' },
    { date: 'Dec 31', event: '🎊 New Year Gaming Marathon', viewers: '100K+' },
    { date: 'Jan 15', event: '🏆 Community Tournament', viewers: '30K+' },
    { date: 'Jan 20', event: '🎁 Giveaway Stream', viewers: '80K+' }
  ]

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
          className="text-5xl font-bold gradient-text mb-4 uppercase text-center"
        >
          📅 Stream Schedule
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-neon-cyan text-lg mb-16"
        >
          Never miss a stream — check when I'm going live!
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Weekly Schedule */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 hud-panel rounded-lg p-8"
          >
            <h2 className="text-2xl font-bold mb-6 gradient-text">Weekly Schedule</h2>

            <div className="space-y-3">
              {scheduleData.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="bg-neon-darker rounded-lg p-4 border border-neon-purple border-opacity-30 hover:border-neon-cyan transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-bold text-white">{item.day}</p>
                      <p className="text-sm text-gray-400">{item.game}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-neon-cyan">{item.time}</p>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        item.status === 'Special Event' 
                          ? 'bg-neon-red text-white'
                          : item.status === 'Rest Day'
                          ? 'bg-gray-600 text-white'
                          : 'bg-green-600 text-white'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-8 border-t border-neon-purple border-opacity-30"
            >
              <p className="text-neon-cyan font-bold mb-4">⏰ Timezone</p>
              <p className="text-gray-300">All times in EST (Eastern Standard Time)</p>
              <p className="text-sm text-gray-400 mt-2">Can't make the exact time? VODs are always available on YouTube!</p>
            </motion.div>
          </motion.div>

          {/* Upcoming Events & Countdown */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Add to Calendar */}
            <div className="hud-panel rounded-lg p-6">
              <h3 className="font-bold text-neon-cyan mb-4">📍 Add to Calendar</h3>
              <div className="space-y-2">
                <NeonButton variant="outline" className="w-full text-sm py-2">
                  Google Calendar
                </NeonButton>
                <NeonButton variant="outline" className="w-full text-sm py-2">
                  Apple Calendar
                </NeonButton>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="hud-panel rounded-lg p-6">
              <h3 className="font-bold text-neon-cyan mb-4">🎯 Upcoming Events</h3>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ x: 5 }}
                    className="bg-neon-darker rounded p-3 border-l-2 border-neon-purple hover:border-neon-cyan transition-all"
                  >
                    <p className="text-sm font-bold text-neon-cyan">{event.date}</p>
                    <p className="text-white text-sm font-bold mt-1">{event.event}</p>
                    <p className="text-xs text-gray-400">Expected viewers: {event.viewers}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Notification */}
            <div className="hud-panel rounded-lg p-6">
              <h3 className="font-bold text-neon-cyan mb-4">🔔 Get Notified</h3>
              <p className="text-sm text-gray-300 mb-4">Never miss a stream!</p>
              <NeonButton className="w-full">
                Join Discord
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
