# 🚀 Quick Start Guide - Gaming YouTuber Website

## Phase 1: Initial Setup (5 minutes)

### Step 1: Install Dependencies
```bash
cd gaming-streamer-site
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The site will open at `http://localhost:3000`

### Step 3: Explore Pages
- **Home** (`/`) - Main landing page with hero section
- **Live** (`/live`) - Live stream page
- **Videos** (`/videos`) - Video gallery
- **About** (`/about`) - Your bio and setup
- **Schedule** (`/schedule`) - Stream schedule
- **Contact** (`/contact`) - Contact form and socials

---

## Phase 2: Customize Your Brand (15 minutes)

### 1. Update Site Content

**Navigation.jsx** - Change logo and links:
```jsx
<motion.div className="text-2xl font-bold gradient-text">
  🎮 YOUR_NAME
</motion.div>
```

**HeroSection.jsx** - Update hero text:
```jsx
<HeroSection
  title="Your Gaming Title"
  subtitle="Your tagline here"
/>
```

### 2. Update Colors

Edit `tailwind.config.js`:
```javascript
neon: {
  red: '#FF0055',      // Your primary color
  purple: '#9D00FF',   // Your secondary
  cyan: '#00D9FF'      // Your accent
}
```

### 3. Add Your Images

1. Create images folder: `public/images/`
2. Add:
   - `hero-bg.jpg` - Hero background
   - `profile.jpg` - Your profile pic
   - `setup.jpg` - PC setup photo
3. Update component imports:
```jsx
<img src="/images/profile.jpg" alt="Your Name" />
```

### 4. Update Social Links

**Contact.jsx** - Update socials array:
```javascript
const socials = [
  { icon: '▶️', label: 'YouTube', url: 'https://youtube.com/@yourname' },
  { icon: '🔵', label: 'Discord', url: 'https://discord.gg/yourserver' },
  // ... more socials
]
```

---

## Phase 3: Add YouTube Integration (Optional - 30 minutes)

### 1. Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable YouTube Data API v3
4. Create OAuth 2.0 credentials
5. Copy your API key

### 2. Setup Environment Variables

Create `.env` file:
```
VITE_YOUTUBE_API_KEY=your_api_key_here
VITE_CHANNEL_ID=your_channel_id_here
```

### 3. Fetch Real Videos

In `VideoGrid.jsx`, replace dummy videos:
```jsx
import { getLatestVideos } from '../api/youtube'

export function VideoGrid() {
  const [videos, setVideos] = useState([])
  
  useEffect(() => {
    getLatestVideos(12).then(setVideos)
  }, [])
  
  return <VideoGrid videos={videos} />
}
```

### 4. Add Live Stream Embed

In `Live.jsx`:
```jsx
<LivePlayer 
  isLive={true} 
  channelId={import.meta.env.VITE_CHANNEL_ID}
/>
```

---

## Phase 4: Add Discord Integration (Optional - 15 minutes)

### 1. Get Discord Server ID
- Enable Developer Mode in Discord
- Right-click server → Copy ID

### 2. Add Discord Widget

In `Navigation.jsx` and `Contact.jsx`:
```jsx
<NeonButton onClick={() => window.open('https://discord.gg/yourcode')}>
  Join Discord
</NeonButton>
```

### 3. Add Discord Widget Embed (Contact page)
```html
<iframe src="https://discord.com/widget?id=YOUR_SERVER_ID" 
        width="350" height="500"></iframe>
```

---

## Phase 5: Add Sounds (Optional - 10 minutes)

### 1. Add Sound Files

Create `public/sounds/` folder with:
- `click.mp3` - Button click sound
- `hover.mp3` - Button hover sound
- `notification.mp3` - Stream notification

### 2. Create Sound Manager

Create `src/api/sounds.js`:
```jsx
export function playSound(name) {
  const audio = new Audio(`/sounds/${name}.mp3`)
  audio.play()
}
```

### 3. Use in Components

```jsx
import { playSound } from '../api/sounds'

<NeonButton onClick={() => {
  playSound('click')
  // action
}}>
  Click Me
</NeonButton>
```

---

## Phase 6: Deploy Your Site (10 minutes)

### Option A: Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Option B: Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Option C: GitHub Pages
Add to `vite.config.js`:
```javascript
export default {
  base: '/gaming-streamer-site/'
}
```

Then:
```bash
npm run build
git add -A && git commit -m "Deploy"
git push origin main
```

---

## Common Customizations

### Change Theme Colors
Edit `src/index.css` and `tailwind.config.js`

### Add More Games
Update filter in `Videos.jsx`:
```jsx
const games = ['All', 'Your Game 1', 'Your Game 2']
```

### Update Schedule
Edit `Schedule.jsx` scheduleData array

### Add Contact Info
Edit `Contact.jsx` with your email and phone

### Change Fonts
Update `tailwind.config.js`:
```javascript
fontFamily: {
  gaming: ['Your Font', 'sans-serif']
}
```

---

## Useful Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## File Structure Quick Reference

```
gaming-streamer-site/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Full page components
│   ├── api/           # API calls (YouTube, Discord)
│   ├── animations/    # Animation utilities
│   ├── App.jsx        # Main app with routes
│   ├── main.jsx       # React entry point
│   └── index.css      # Global styles
├── public/            # Static assets
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind theme
└── postcss.config.js  # PostCSS config
```

---

## Tips & Best Practices

✅ **DO:**
- Optimize images before uploading
- Test on mobile before deploying
- Use real data instead of placeholders
- Keep animations under 0.5s for smoothness
- Test cross-browser compatibility

❌ **DON'T:**
- Overuse animations (performance)
- Use too many colors (sticks to neon theme)
- Forget to optimize images
- Use auto-play audio on page load
- Leave dummy text in production

---

## Troubleshooting

**Port 3000 already in use?**
```bash
npm run dev -- --port 3001
```

**Styles not updating?**
```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

**Build fails?**
```bash
# Clear and rebuild
rm -rf dist node_modules
npm install
npm run build
```

---

## Need Help?

- 📖 [React Docs](https://react.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 🎬 [Framer Motion](https://www.framer.com/motion)
- ▶️ [Vite Docs](https://vitejs.dev)

---

**You're all set! 🚀 Happy streaming!**
