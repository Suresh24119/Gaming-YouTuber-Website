# Gaming Streamer Site

## Local development:

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file or export environment variables:

```powershell
# PowerShell
$env:YOUTUBE_API_KEY="AIzaSyBKb6WbmsZmVIbjNwyKqON0hCIo-FUgpOU"
$env:CHANNEL_ID="your_actual_channel_id"  # Replace with your YouTube channel ID
$env:GEMINI_API_KEY="AIzaSyBKb6WbmsZmVIbjNwyKqON0hCIo-FUgpOU"
```

Or create `.env.local`:

```bash
YOUTUBE_API_KEY=AIzaSyBKb6WbmsZmVIbjNwyKqON0hCIo-FUgpOU
CHANNEL_ID=your_actual_channel_id
GEMINI_API_KEY=AIzaSyBKb6WbmsZmVIbjNwyKqON0hCIo-FUgpOU
```

### 3. Start the proxy server

```bash
npm run start:server
```

Server will listen on `http://localhost:4000` and expose:
- `GET /api/youtube?type=latest|shorts|live` — fetch videos
- `POST /api/gemini` — forward prompts to Gemini AI
- `GET /api/health` — server health check

### 4. Start the frontend

```bash
npm run dev
```

Open `http://localhost:3000` and test:
- **Chat:** Click the chat bubble (bottom-right), use FAQ or ask questions
- **Videos:** Home page loads latest videos from YouTube API
- **Shorts:** Available via `/api/youtube?type=shorts`
- **Live:** Available via `/api/youtube?type=live`

## Notes

- **Never commit `.env` with real keys.** Use environment variable secrets in deployment (Vercel, Netlify, AWS).
- The proxy server uses Node's built-in `fetch` (or `node-fetch` fallback for Node <18).
- Rate-limiting and TTL cleanup are built-in to prevent abuse and memory leaks.
- YouTube and Gemini API keys are kept server-side; the frontend only calls the proxy endpoints.

Push to GitHub
----------------

If you want to publish this repository to GitHub, run these commands (replace `<your-repo-url>`):

```bash
# create a remote repo on GitHub first, then:
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

CI
--

A GitHub Actions workflow was added at `.github/workflows/ci.yml` that installs dependencies, runs lint (best-effort), and builds the project on pushes and PRs.
# 🎮 Gaming YouTuber Website

A high-energy, animated, interactive gaming YouTuber website built with React, Vite, Tailwind CSS, and Framer Motion. Perfect for streamers, content creators, and gaming influencers.

## 🚀 Features

### Core Pages
- **Home** - Animated hero section with stats and featured videos
- **Live** - YouTube live stream embed with schedule and stream info
- **Videos** - Grid-based video gallery with filtering and game categories
- **About** - Gamer bio, achievements, games played, and PC setup
- **Schedule** - Weekly streaming schedule with upcoming events
- **Contact** - Contact form, social links, and business inquiries

### Visual Effects & Animation
- ✨ Animated hero banner with gradient text
- 🎯 Particle background animation
- 🎮 Neon glow effects and hover animations
- 💫 Framer Motion smooth transitions
- 🌟 HUD-style gaming panels
- 🔴 Live status badge with pulse animation
- 📱 Fully responsive mobile-first design

### Gaming UI/UX
- Dark neon theme (Red/Purple/Cyan)
- Gaming fonts (Orbitron, Audiowide)
- Esports-style panels and borders
- Smooth scrolling and transitions
- Interactive button animations
- Custom scrollbar styling

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **React Router** - Page navigation
- **PostCSS** - CSS processing

## 📦 Installation

1. **Navigate to project directory**
   ```bash
   cd gaming-streamer-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
gaming-streamer-site/
├── public/
│   ├── images/          # Hero, thumbnail, and background images
│   └── sounds/          # Button clicks, background music
├── src/
│   ├── components/
│   │   ├── NeonButton.jsx
│   │   ├── LivePlayer.jsx
│   │   ├── VideoCard.jsx
│   │   ├── VideoGrid.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Navigation.jsx
│   │   └── ParticleBackground.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Live.jsx
│   │   ├── Videos.jsx
│   │   ├── About.jsx
│   │   ├── Schedule.jsx
│   │   └── Contact.jsx
│   ├── animations/      # Custom animation utilities
│   ├── api/            # API calls (YouTube, Discord)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css       # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
neon: {
  red: '#FF0055',
  purple: '#9D00FF',
  cyan: '#00D9FF'
}
```

### Update Channel Info
- Edit component files to add your YouTube channel ID
- Replace placeholder text with your actual content
- Add your images to `public/images/`

### Add YouTube Integration
1. Get YouTube Data API key
2. Fetch videos in `src/api/youtube.js`
3. Update `VideoGrid.jsx` to use real data

### Add Discord Widget
1. Get Discord server invite link
2. Add to Navigation and Contact pages
3. Use Discord's embed widget

## 🌟 Key Components

### NeonButton
Animated gaming-style button with glow effects
```jsx
<NeonButton variant="primary">Subscribe</NeonButton>
```

### LivePlayer
Embedded YouTube live player with status badge
```jsx
<LivePlayer isLive={true} channelId="YOUR_ID" />
```

### VideoGrid
Responsive video card grid with animations
```jsx
<VideoGrid videos={videos} title="Latest Videos" />
```

### ParticleBackground
Animated particle effects background
```jsx
<ParticleBackground />
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages
Add to `vite.config.js`:
```javascript
export default {
  base: '/gaming-streamer-site/'
}
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly buttons
- Optimized images
- Fast loading on mobile

## 🔧 Environment Variables

Create `.env` file:
```
VITE_YOUTUBE_API_KEY=your_key_here
VITE_DISCORD_SERVER_ID=your_id_here
VITE_CHANNEL_ID=your_channel_id
```

## 🎯 Future Enhancements

- [ ] YouTube API integration for live videos
- [ ] Discord widget integration
- [ ] Comments section with Discord API
- [ ] Video upload management
- [ ] Newsletter signup
- [ ] Giveaway system
- [ ] Fan leaderboard
- [ ] Merchandise store
- [ ] AI chatbot
- [ ] Analytics dashboard

## 📄 License

MIT License - Feel free to use this for your gaming channel!

## 💬 Support

For issues or questions, reach out via:
- 📧 Email: business@gamername.com
- 💬 Discord: Join our server
- 🐦 Twitter: @gamername

---

**Built with ❤️ for gamers, by gamers**

🎮 Start streaming, start winning! 🎮
