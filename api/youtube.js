// Vercel serverless function for YouTube API proxy
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Helper function to parse ISO 8601 duration to seconds
  function parseDuration(duration) {
    if (!duration || !duration.startsWith('PT')) return 0;
    
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;
    
    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;
    
    return hours * 3600 + minutes * 60 + seconds;
  }

  try {
    const { type, maxResults = 12, id } = req.query;
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.CHANNEL_ID || process.env.VITE_CHANNEL_ID;

    if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
      console.log('Missing API key or Channel ID');
      return res.status(200).json({ 
        error: 'YouTube API key or Channel ID not configured',
        items: []
      });
    }

    if (YOUTUBE_API_KEY === 'YOUR_ACTUAL_YOUTUBE_API_KEY_HERE') {
      console.log('Please update your YouTube API key');
      return res.status(200).json({ 
        error: 'Please update your YouTube API key in environment variables',
        items: []
      });
    }

    let url = '';

    switch (type) {
      case 'latest':
        url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
        break;
      
      case 'shorts':
        // First try to get shorts using duration filter
        url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video&videoDuration=short`;
        
        // If that doesn't work, we'll get recent videos and filter by duration in the response
        const searchResponse = await fetch(url);
        const searchData = await searchResponse.json();
        
        if (searchData.items && searchData.items.length > 0) {
          // Get video details to check actual duration
          const videoIds = searchData.items.map(item => item.id.videoId).join(',');
          const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=contentDetails,statistics`;
          const detailsResponse = await fetch(detailsUrl);
          const detailsData = await detailsResponse.json();
          
          // Filter for shorts (videos under 60 seconds)
          const shortsItems = searchData.items.filter((item, index) => {
            const details = detailsData.items[index];
            if (!details || !details.contentDetails) return false;
            
            const duration = details.contentDetails.duration;
            const seconds = parseDuration(duration);
            return seconds <= 60; // YouTube Shorts are 60 seconds or less
          });
          
          // Merge search data with details
          const mergedItems = shortsItems.map((item, index) => {
            const details = detailsData.items.find(d => d.id === item.id.videoId);
            return {
              ...item,
              contentDetails: details?.contentDetails,
              statistics: details?.statistics
            };
          });
          
          return res.json({ items: mergedItems });
        }
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

    console.log(`Fetching YouTube data: ${type} for channel ${CHANNEL_ID}`);
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('YouTube API Error:', data);
      return res.status(200).json({ 
        error: data.error?.message || 'YouTube API error',
        items: [],
        debug: {
          status: response.status,
          channelId: CHANNEL_ID,
          hasApiKey: !!YOUTUBE_API_KEY
        }
      });
    }

    console.log(`Successfully fetched ${data.items?.length || 0} items`);
    res.json(data);
  } catch (error) {
    console.error('YouTube proxy error:', error);
    res.status(200).json({ 
      error: 'Internal server error',
      items: [],
      debug: error.message
    });
  }
}