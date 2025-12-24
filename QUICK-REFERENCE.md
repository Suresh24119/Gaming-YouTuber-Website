# ⚡ Quick Reference Guide

## 🚀 Get Started in 3 Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open http://localhost:3000 in browser
```

---

## 📁 File Locations Guide

### Update Text Content
- **Site Title**: `index.html`
- **Hero Text**: `src/components/HeroSection.jsx`
- **Logo/Name**: `src/components/Navigation.jsx`
- **About Info**: `src/pages/About.jsx`
- **Contact Email**: `src/pages/Contact.jsx`
- **Schedule**: `src/pages/Schedule.jsx`

### Add Images
Create folders and add images:
```
public/images/
├── hero-bg.jpg
├── profile.jpg
├── setup.jpg
└── ... (video thumbnails)
```

Then use in components:
```jsx
<img src="/images/profile.jpg" alt="Your Name" />
```

### Change Colors
Edit `tailwind.config.js`:
```javascript
neon: {
  red: '#FF0055',      // Change this
  purple: '#9D00FF',   // Or this
  cyan: '#00D9FF'      // Or this
}
```

### Add YouTube
1. Get API key from Google Cloud Console
2. Create `.env`:
   ```
   VITE_YOUTUBE_API_KEY=your_key
   VITE_CHANNEL_ID=your_channel_id
   ```
3. Import in component:
   ```jsx
   import { getLatestVideos } from '../api/youtube'
   ```

---

## 🎨 Component Quick Reference

### NeonButton
```jsx
<NeonButton variant="primary">Subscribe</NeonButton>
<NeonButton variant="outline">Discord</NeonButton>
<NeonButton variant="secondary">YouTube</NeonButton>
```

### LivePlayer
```jsx
<LivePlayer isLive={true} channelId="UCxxxxxx" />
```

### VideoCard
```jsx
<VideoCard 
  video={{
    title: 'Video Title',
    thumbnail: '/images/thumbnail.jpg',
    duration: '10:25',
    views: '100K',
    game: 'Free Fire'
  }}
  onWatchClick={() => {}}
/>
```

### VideoGrid
```jsx
<VideoGrid 
  videos={videos}
  title="Latest Videos"
/>
```

### HeroSection
```jsx
<HeroSection 
  title="Your Title"
  subtitle="Your Subtitle"
/>
```

---

## 🔌 API Reference

### YouTube API
```javascript
import { getLatestVideos, getChannelInfo, checkIsLive } from '../api/youtube'

// Get latest videos
const videos = await getLatestVideos(12)

// Get channel info
const info = await getChannelInfo()

// Check if live
const live = await checkIsLive()
```

### Animation Variants
```javascript
import { 
  pageVariants,
  containerVariants, 
  itemVariants,
  pulseGlow,
  hoverLift,
  floating,
  rotating
} from '../animations/variants'

<motion.div variants={pageVariants}>Content</motion.div>
```

---

## 🎯 Common Tasks

### Add a New Page
1. Create `src/pages/NewPage.jsx`
2. Add route in `App.jsx`:
   ```jsx
   <Route path="/newpage" element={<NewPage />} />
   ```
3. Add link in `Navigation.jsx`

### Change Theme Color
Edit `tailwind.config.js`:
```javascript
colors: {
  neon: {
    red: '#YOUR_COLOR'
  }
}
```

### Add Sound Effect
1. Add audio file to `public/sounds/`
2. Create sound function:
   ```jsx
   function playSound(name) {
     new Audio(`/sounds/${name}.mp3`).play()
   }
   ```
3. Use on button click

### Update Social Links
Edit `Contact.jsx`:
```javascript
const socials = [
  { 
    icon: '▶️', 
    label: 'YouTube', 
    url: 'https://youtube.com/@yourname',
    color: 'text-red-500' 
  },
  // ... more
]
```

### Customize Schedule
Edit `Schedule.jsx`:
```javascript
const scheduleData = [
  { 
    day: 'Monday', 
    time: '8:00 PM', 
    game: 'Free Fire', 
    status: 'Scheduled' 
  },
  // ... more days
]
```

---

## 📊 Build & Deploy

### Build for Production
```bash
npm run build
```
Creates optimized `dist/` folder

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Preview Build Locally
```bash
npm run preview
```

---

## 🔍 Debugging

### Check for Errors
1. Open browser DevTools (F12)
2. Check Console tab
3. Look for red errors

### Test Component
Isolate in browser:
```jsx
export function TestComponent() {
  return <VideoCard video={{}} />
}
```

### Debug Animation
Slow down in DevTools:
1. Open DevTools
2. Cmd+Shift+P (or Ctrl+Shift+P)
3. Type "Slow down"
4. Set to 4x or 8x

---

## 📱 Responsive Breakpoints

```javascript
// Tailwind breakpoints
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Use in components:
```jsx
<div className="md:grid-cols-2 lg:grid-cols-3">
```

---

## 🎯 Performance Tips

1. **Optimize Images**
   ```bash
   # Use tools like ImageOptim or TinyPNG
   ```

2. **Lazy Load Images**
   ```jsx
   <img loading="lazy" src="/images/photo.jpg" />
   ```

3. **Check Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

4. **Monitor Performance**
   - Use Chrome DevTools Lighthouse
   - Target 90+ score

---

## 🆘 Common Issues & Fixes

### Port 3000 in Use
```bash
npm run dev -- --port 3001
```

### Styles Not Updating
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Build Fails
```bash
# Clean install
rm -rf dist node_modules
npm install
npm run build
```

### YouTube API Not Working
- Check API key in `.env`
- Verify channel ID is correct
- Check quota limits
- Enable YouTube Data API in Google Cloud

### Animations Laggy
- Reduce particle count in `ParticleBackground`
- Use `will-change` CSS property
- Check browser performance

---

## 📚 Quick Links

- React Docs: https://react.dev
- Tailwind: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion
- Vite: https://vitejs.dev
- YouTube API: https://developers.google.com/youtube

---

## 💡 Pro Tips

✅ **DO:**
- Test on mobile frequently
- Use semantic HTML
- Keep animations under 0.5s
- Optimize images before upload
- Use placeholder images while developing

❌ **DON'T:**
- Auto-play audio on page load
- Use more than 50 particles
- Create animations > 3 seconds
- Leave console errors
- Hardcode colors (use Tailwind)

---

## 🚀 Deployment Checklist

- [ ] Update all placeholder text
- [ ] Add your images
- [ ] Test on mobile
- [ ] Test all forms
- [ ] Check all links
- [ ] Optimize images
- [ ] Run `npm run build`
- [ ] Test build locally with preview
- [ ] Deploy to Vercel/Netlify
- [ ] Setup custom domain
- [ ] Configure SSL
- [ ] Add analytics
- [ ] Monitor errors

---

## 📞 Need Help?

1. Check `PROJECT-SUMMARY.md` for overview
2. Read `SETUP.md` for customization
3. See `ADVANCED.md` for features
4. Review component files for examples
5. Check React/Tailwind/Framer docs

---

**Everything you need is ready to go! 🎮✨**

**Happy building and streaming! 🚀**
