import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { ParticleBackground } from './components/ParticleBackground'
import { ChatBot } from './components/ChatBot'
import { FloatingSocial } from './components/FloatingSocial'
import { Footer } from './components/Footer'
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
        <FloatingSocial />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/live" element={<Live />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/about" element={<About />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
