module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          red: '#FF0055',
          purple: '#9D00FF',
          cyan: '#00D9FF',
          dark: '#0A0E27',
          darker: '#050810'
        },
        gaming: {
          primary: '#FF0055',
          secondary: '#9D00FF',
          accent: '#00D9FF'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        audiowide: ['Audiowide', 'sans-serif'],
        gaming: ['Orbitron', 'sans-serif']
      },
      backgroundImage: {
        'gradient-gaming': 'linear-gradient(135deg, #0A0E27 0%, #1a1f3a 100%)',
        'gradient-neon': 'linear-gradient(135deg, #FF0055 0%, #9D00FF 50%, #00D9FF 100%)'
      },
      boxShadow: {
        'neon-red': '0 0 20px rgba(255, 0, 85, 0.6)',
        'neon-purple': '0 0 20px rgba(157, 0, 255, 0.6)',
        'neon-cyan': '0 0 20px rgba(0, 217, 255, 0.6)',
        'neon-glow': '0 0 40px rgba(255, 0, 85, 0.8)'
      },
      animation: {
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-down': 'slide-down 0.3s ease-out'
      },
      keyframes: {
        'pulse-neon': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 85, 0.6)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 0, 85, 0.9)' }
        },
        'glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'slide-down': {
          'from': { transform: 'translateY(-100%)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}
