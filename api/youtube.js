// Vercel serverless function for YouTube API proxy
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { type, maxResults = 12, id } = req.query;
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.CHANNEL_ID || process.env.VITE_CHANNEL_ID;

    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      return res.status(500).json({ 
        error: 'YouTube API key or Channel ID not configured',
        items: []
      });
    }

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
        if (!id) return res.status(400).json({ error: 'Video ID required', items: [] });
        url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${id}&part=snippet,statistics,contentDetails`;
        break;
      
      default:
        return res.status(400).json({ error: 'Invalid type parameter', items: [] });
    }

    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('YouTube API Error:', data);
      return res.status(200).json({ items: [] }); // Return empty array instead of error for frontend
    }

    res.json(data);
  } catch (error) {
    console.error('YouTube proxy error:', error);
    res.status(200).json({ items: [] }); // Return empty array instead of error for frontend
  }
}