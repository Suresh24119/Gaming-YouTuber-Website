import { motion } from 'framer-motion'

export function NeonButton({ children, variant = 'primary', onClick, className = '', ...props }) {
  const variants = {
    primary: 'bg-gradient-to-r from-neon-red to-neon-purple hover:shadow-neon-glow',
    secondary: 'bg-neon-cyan text-neon-dark hover:shadow-neon-cyan',
    outline: 'border-2 border-neon-red hover:bg-neon-red hover:bg-opacity-10'
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95, y: 0 }}
      className={`
        px-6 py-3 font-bold uppercase tracking-wider 
        transition-all duration-300 relative overflow-hidden
        rounded-lg text-white
        ${variants[variant]}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
      />
    </motion.button>
  )
}
