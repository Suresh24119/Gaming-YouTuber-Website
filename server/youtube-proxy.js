import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const YOUTUBE_API_KEY = process.env.VITE_YOUTUBE_API_KEY || 'YOUR_ACTUAL_YOUTUBE_API_KEY_HERE';
const CHANNEL_ID = process.env.VITE_CHANNEL_ID || 'UCN5w9zFhA_fzklkfgpaSdyw';

// YouTube API proxy endpoint
app.get('/api/youtube', async (req, res) => {
  try {
    const { type, maxResults = 12, id } = req.query;
    let url = '';

    switch (type) {
      case 'latest':
        url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
        break;
      
      case 'shorts':
        url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video&videoDuration=short`;
        break;
      
      case 'live':
        url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&eventType=live&type=video&maxResults=${maxResults}`;
        break;
      
      case 'details':
        if (!id) return res.status(400).json({ error: 'Video ID required' });
        url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${id}&part=snippet,statistics,contentDetails`;
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid type parameter' });
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('YouTube API Error:', data);
      return res.status(response.status).json({ error: data.error?.message || 'YouTube API error' });
    }

    res.json(data);
  } catch (error) {
    console.error('YouTube proxy error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`YouTube proxy server running on port ${PORT}`);
});

export default app;