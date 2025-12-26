import { motion } from 'framer-motion'

export function Logo({ className = "", size = "default" }) {
  const sizeClasses = {
    small: "w-16 h-8",
    default: "w-24 h-10",
    large: "w-32 h-12"
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 ${className}`}
    >
      {/* Gaming Controller SVG Icon */}
      <div className={`${sizeClasses[size]} flex items-center`}>
        <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor:"#00ffff", stopOpacity:1}} />
              <stop offset="50%" style={{stopColor:"#ff0080", stopOpacity:1}} />
              <stop offset="100%" style={{stopColor:"#8000ff", stopOpacity:1}} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Gaming Controller Icon */}
          <g transform="translate(5, 8)">
            <rect x="0" y="8" width="24" height="16" rx="8" fill="url(#logoGradient)" filter="url(#glow)"/>
            <circle cx="6" cy="16" r="2" fill="#000"/>
            <circle cx="18" cy="16" r="2" fill="#000"/>
            <rect x="10" y="14" width="4" height="1" fill="#000"/>
            <rect x="11.5" y="12.5" width="1" height="4" fill="#000"/>
            <circle cx="16" cy="13" r="1" fill="#000"/>
            <circle cx="19" cy="13" r="1" fill="#000"/>
          </g>
          
          {/* Text */}
          <text x="35" y="16" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="bold" fill="url(#logoGradient)" filter="url(#glow)">GAMING</text>
          <text x="35" y="28" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="normal" fill="#00ffff">STREAMER</text>
        </svg>
      </div>
    </motion.div>
  )
}

// Alternative text-based logo
export function TextLogo({ className = "" }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 ${className}`}
    >
      <div className="text-2xl">🎮</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold gradient-text leading-none">GAMING</span>
        <span className="text-xs text-neon-cyan leading-none">STREAMER</span>
      </div>
    </motion.div>
  )
}