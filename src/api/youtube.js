// Client-side wrapper that calls server proxy endpoints at `/api/youtube`
// Server will use server-side YOUTUBE_API_KEY and CHANNEL_ID from env.
import { demoVideos, demoShorts, demoLiveStreams } from '../data/demoVideos.js';

async function callProxy(params = {}) {
  try {
    const qs = new URLSearchParams(params).toString()
    const res = await fetch(`/api/youtube?${qs}`)
    if (!res.ok) {
      console.log('API not available, using demo data');
      return { items: [] }
    }
    const data = await res.json();
    
    // If API returns error or empty, use demo data
    if (data.error || !data.items || data.items.length === 0) {
      console.log('Using demo data for:', params.type);
      return getDemoData(params.type);
    }
    
    return data;
  } catch (error) {
    console.log('API error, using demo data:', error.message);
    return getDemoData(params.type);
  }
}

function getDemoData(type) {
  switch (type) {
    case 'latest':
      return { items: demoVideos };
    case 'shorts':
      return { items: demoShorts };
    case 'live':
      return { items: demoLiveStreams };
    default:
      return { items: demoVideos };
  }
}

export async function getLatestVideos(maxResults = 12) {
  const data = await callProxy({ type: 'latest', maxResults })
  return data.items || []
}

export async function getShorts(maxResults = 24) {
  const data = await callProxy({ type: 'shorts', maxResults })
  return data.items || []
}

export async function getLiveStreams() {
  const data = await callProxy({ type: 'live', maxResults: 8 })
  return data.items || []
}

export async function getVideoDetails(videoId) {
  try {
    const res = await fetch(`/api/youtube?type=details&id=${encodeURIComponent(videoId)}`)
    if (!res.ok) return null
    const data = await res.json().catch(() => null)
    return data?.items?.[0] || null
  } catch (error) {
    console.log('Video details error:', error);
    return null;
  }
}

export default {
  getLatestVideos,
  getShorts,
  getLiveStreams,
  getVideoDetails
}
