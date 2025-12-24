import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { ParticleBackground } from './components/ParticleBackground'
import { ChatBot } from './components/ChatBot'
import { Home } from './pages/Home'
import { Live } from './pages/Live'
import { Videos } from './pages/Videos'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Schedule } from './pages/Schedule'
import './index.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neon-dark overflow-x-hidden">
        <ParticleBackground />
        <Navigation />
        <ChatBot />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-neon-darker border-t border-neon-red border-opacity-30 relative z-10">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-400">
            <p className="mb-2">🎮 Gaming YouTuber Website © 2025</p>
            <p className="text-sm">Built with React • Vite • Tailwind CSS • Framer Motion</p>
            <p className="text-xs mt-4">Join 250K+ Gaming Community Members</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
