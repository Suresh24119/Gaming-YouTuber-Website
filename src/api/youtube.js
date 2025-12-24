// Client-side wrapper that calls server proxy endpoints at `/api/youtube`
// Server will use server-side YOUTUBE_API_KEY and CHANNEL_ID from env.

async function callProxy(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`/api/youtube?${qs}`)
  if (!res.ok) return { items: [] }
  return res.json().catch(() => ({ items: [] }))
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
  const res = await fetch(`/api/youtube?type=details&id=${encodeURIComponent(videoId)}`)
  if (!res.ok) return null
  const data = await res.json().catch(() => null)
  return data?.items?.[0] || null
}

export default {
  getLatestVideos,
  getShorts,
  getLiveStreams,
  getVideoDetails
}
