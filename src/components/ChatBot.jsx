import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo, useRef, useEffect } from 'react'
import Loading from './Loading'

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showFAQ, setShowFAQ] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hey! 👾 I'm your gaming assistant powered by Gemini AI. Ask me anything about gaming!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Frontend: do NOT import server-side SDKs. Use a backend proxy at /api/gemini.
  // The backend holds the real API key; enable the UI and check server health.
  const [serverAvailable, setServerAvailable] = useState(null)
  const hasGeminiKey = true // allow using the proxy; backend must provide key

  // Gaming context for better responses
  const gamingContext = useMemo(() => `You are an expert gaming assistant for a gaming YouTube channel and esports community.
EXPERTISE: Gaming strategy, game recommendations, streaming tips, esports news, competitive gameplay, FPS/Battle Royale games.
PERSONALITY: Enthusiastic, knowledgeable, use gaming slang and emojis naturally (🎮 🔥 ⚡ 🏆).
GUIDELINES: 
- Provide concise gaming advice (1-3 sentences max for quick questions)
- For in-depth questions, elaborate with tips and strategies
- Recommend our games: Free Fire, BGMI, Call of Duty, Valorant
- Keep answers gaming-focused, redirect non-gaming questions politely
- Use actual gaming terminology and meta knowledge
- Show enthusiasm for gaming culture and competitive play
CHANNEL INFO: We stream Mon-Fri 8PM EST, Sat 3PM EST, Sun 6PM EST. Competitive and casual content.
TONE: Friendly streamer who loves gaming, knowledgeable about current gaming trends`, [])

  // Rate limiting - debounce rapid requests
  const lastMessageTimeRef = useRef(0)
  const MESSAGE_THROTTLE_MS = 800 // Minimum 800ms between messages

  // Gaming-focused FAQ with indexed lookup for O(1) performance
  const faqDatabase = useMemo(() => [
    {
      id: 'schedule',
      question: 'What is your stream schedule?',
      answer: "📅 Stream Times:\n• Mon-Fri: 8 PM EST\n• Sat: 3 PM EST\n• Sun: 6 PM EST\nCheck Schedule page for more zones!"
    },
    {
      id: 'discord',
      question: 'How do I join the Discord?',
      answer: "🔵 discord.gg/gaming\n• Competitive squad building\n• Game tournaments\n• Exclusive clips\n• Community events!"
    },
    {
      id: 'youtube',
      question: 'Where do I find your gaming videos?',
      answer: "📹 YouTube drops:\n• Tuesdays & Thursdays: New gameplay\n• Montages & highlights daily\n• Game tips & guides\n• Subscribe for uploads!"
    },
    {
      id: 'games',
      question: 'What games do you main?',
      answer: "🎮 Current rotation:\n• Free Fire (BR King)\n• BGMI (Tactical plays)\n• Call of Duty (Multiplayer sweat)\n• Valorant (5-stack grind)"
    },
    {
      id: 'contact',
      question: 'How can I contact you?',
      answer: "📧 Reach out:\n• YouTube comments\n• Discord DM\n• Twitter @GamingStreamer\n• Business inquiries welcome!"
    },
    {
      id: 'merch',
      question: 'Do you have gaming merch?',
      answer: "🛒 Gaming Merch Store:\n• Neon hoodies & caps\n• Gaming RGB accessories\n• Limited drops\n• Exclusive streamer editions!"
    }
  ], [])

  // Create indexed FAQ map for O(1) lookup
  const faqMap = useMemo(() => {
    const map = {}
    faqDatabase.forEach(faq => {
      map[faq.id] = faq.answer
    })
    return map
  }, [faqDatabase])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Auto-scroll when messages change or chat opens
  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  // Check backend health to give better UX
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await fetch('/api/health')
        if (!mounted) return
        setServerAvailable(res.ok)
      } catch (e) {
        if (!mounted) return
        setServerAvailable(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  // Check rate limit
  const isRateLimited = () => {
    const now = Date.now()
    if (now - lastMessageTimeRef.current < MESSAGE_THROTTLE_MS) {
      return true
    }
    lastMessageTimeRef.current = now
    return false
  }

  // Check for FAQ quick answers
  const checkFAQAnswer = (userInput) => {
    const lowerInput = userInput.toLowerCase()
    for (const faq of faqDatabase) {
      // Check both ID and question text for better matching
      const questionMatch = faq.question.toLowerCase().split(' ').some(word => lowerInput.includes(word) && word.length > 2)
      if (lowerInput.includes(faq.id) || questionMatch) {
        return faqMap[faq.id]
      }
    }
    return null
  }

  // Sanitize user input to prevent prompt injection
  const sanitizeInput = (input) => {
    // Remove special prompt injection markers
    return input
      .replace(/[\n\r]+/g, ' ') // Remove newlines
      .replace(/^(ignore|disregard|override|system:|assistant:)/gi, '') // Remove injection keywords
      .trim()
      .substring(0, 500) // Limit length to prevent abuse
  }

  // Query Gemini AI for detailed response
  const queryGeminiAI = async (userMessage) => {
    // This frontend function proxies the request to a backend endpoint '/api/gemini'.
    // Implement a server-side proxy that calls the official Gemini API with your API key.
    const prompt = `${gamingContext}\n\nUser question: ${userMessage}\n\nRespond about gaming:`

    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })

    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      throw new Error(`Gemini proxy error: ${res.status} ${txt}`)
    }
    const data = await res.json().catch(() => null)
    return (data && (data.text || data.response)) || null
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    // Check rate limit
    if (isRateLimited()) {
      console.warn('Please wait before sending another message')
      return
    }

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setLoading(true)

    try {
      // Sanitize input for security
      const sanitizedMessage = sanitizeInput(userMessage)

      // Check for quick FAQ answers first
      const quickAnswer = checkFAQAnswer(sanitizedMessage)
      if (quickAnswer) {
        setMessages(prev => [...prev, { type: 'bot', text: quickAnswer }])
        setLoading(false)
        return
      }

      // Use Gemini AI for detailed gaming questions
      const response = await queryGeminiAI(sanitizedMessage)
      if (response) {
        setMessages(prev => [...prev, { type: 'bot', text: response }])
      } else {
        setMessages(prev => [...prev, { type: 'bot', text: "Sorry, I couldn't get an answer — try again or use FAQ." }])
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: "Oops! AI had an error. Try again or use the FAQ for quick answers." 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleFAQClick = (faqItem) => {
    setShowFAQ(false)
    setMessages(prev => [
      ...prev,
      { type: 'user', text: faqItem.question },
      { type: 'bot', text: faqItem.answer }
    ])
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-neon-red to-neon-purple rounded-full flex items-center justify-center text-2xl shadow-neon-glow hover:shadow-neon-glow"
      >
        {loading ? '⏳' : '💬'}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-h-[600px] hud-panel rounded-lg p-4 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-neon-purple border-opacity-30">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <p className="font-bold text-white">Gaming AI Assistant</p>
                  <p className="text-xs text-neon-cyan">Powered by Gemini</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  title={serverAvailable === null ? 'Checking server...' : serverAvailable ? 'Server available' : 'Server unavailable'}
                  className={`w-3 h-3 rounded-full ${serverAvailable === null ? 'bg-yellow-400' : serverAvailable ? 'bg-green-400' : 'bg-red-500'}`}
                />
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            {/* FAQ View */}
            {showFAQ && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex-1 overflow-y-auto mb-4 space-y-2"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="font-bold text-neon-cyan">Gaming FAQ</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setShowFAQ(false)}
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    ← Back
                  </motion.button>
                </div>
                {faqDatabase.map((faq, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => handleFAQClick(faq)}
                    className="w-full text-left bg-neon-darker border border-neon-purple border-opacity-30 rounded p-3 text-sm text-neon-cyan hover:border-neon-cyan hover:bg-neon-purple hover:bg-opacity-20 transition-all"
                  >
                    <p className="font-semibold text-white">{faq.question}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Messages */}
            {!showFAQ && (
              <motion.div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.type === 'user'
                          ? 'bg-neon-red bg-opacity-30 text-white'
                          : 'bg-neon-purple bg-opacity-30 text-neon-cyan'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-neon-purple bg-opacity-30 text-neon-cyan px-4 py-2 rounded-lg flex items-center">
                      <Loading size={28} text="AI thinking..." />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </motion.div>
            )}

            {/* Quick Buttons */}
            {!showFAQ && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'Schedule', emoji: '📅', key: 'schedule' },
                  { label: 'Discord', emoji: '🔵', key: 'discord' },
                  { label: 'Games', emoji: '🎮', key: 'games' },
                  { label: 'FAQ', emoji: '❓', key: 'faq' }
                ].map((btn, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => {
                      if (btn.key === 'faq') {
                        setShowFAQ(true)
                      } else {
                        const faq = faqDatabase.find(f => f.id === btn.key)
                        if (faq) handleFAQClick(faq)
                      }
                    }}
                    disabled={loading}
                    className="text-xs bg-neon-darker border border-neon-purple border-opacity-30 rounded px-2 py-1 text-neon-cyan hover:border-neon-cyan transition-all disabled:opacity-50"
                  >
                    {btn.emoji} {btn.label}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            {!showFAQ && (
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={loading ? "AI thinking..." : "Ask me anything gaming..."}
                  disabled={!hasGeminiKey || loading}
                  className="flex-1 bg-neon-darker border border-neon-purple border-opacity-30 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-neon-cyan transition-colors disabled:opacity-50"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  type="submit"
                  disabled={!hasGeminiKey || loading}
                  className="bg-neon-red hover:bg-neon-purple transition-colors text-white rounded px-4 py-2 font-bold disabled:opacity-50"
                >
                  {loading ? '⏳' : '→'}
                </motion.button>
              </form>
            )}

            {/* API Status */}
            {!hasGeminiKey && (
              <p className="text-xs text-neon-red mt-2 text-center">
                ⚠️ Add VITE_GEMINI_API_KEY to .env to enable AI
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}



