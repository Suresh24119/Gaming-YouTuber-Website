import http from 'http'

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY

const rateLimitMap = new Map()
const RATE_LIMIT_MS = 800
const RATE_LIMIT_TTL_MS = 5 * 60 * 1000 // keep entries for 5 minutes

// Periodically clean up old entries to prevent unbounded memory growth
setInterval(() => {
  const now = Date.now()
  for (const [ip, ts] of rateLimitMap.entries()) {
    if (now - ts > RATE_LIMIT_TTL_MS) rateLimitMap.delete(ip)
  }
}, 60 * 1000)

function sanitizePrompt(text) {
  if (typeof text !== 'string') return ''
  return text.replace(/\s+/g, ' ').trim().slice(0, 4000)
}

async function proxyToGemini(prompt) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY environment variable')
  }

  const url = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate?key=${GEMINI_API_KEY}`
  const body = {
    prompt: { text: prompt },
    temperature: 0.2,
    maxOutputTokens: 512
  }

  // Support environments where global fetch may not be available (Node <18)
  let fetchImpl = globalThis.fetch
  if (!fetchImpl) {
    try {
      const mod = await import('node-fetch')
      fetchImpl = mod.default || mod
      globalThis.fetch = fetchImpl
    } catch (e) {
      throw new Error('Fetch not available and node-fetch failed to import')
    }
  }

  const res = await fetchImpl(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })

  if (!res.ok) {
    const txt = await res.text().catch(() => '')
    throw new Error(`Upstream error: ${res.status} ${txt}`)
  }

  const json = await res.json()
  // Try a few possible response shapes
  const candidate = json?.candidates?.[0]?.output || json?.candidates?.[0]?.content || json?.output || json?.text
  if (candidate && typeof candidate === 'string') return candidate
  if (candidate && candidate?.length) return candidate[0]?.content || JSON.stringify(candidate)
  return JSON.stringify(json)
}

const server = http.createServer(async (req, res) => {
  const { method, url, socket } = req
  try {
    if (method === 'POST' && url === '/api/gemini') {
      const ip = socket.remoteAddress || 'unknown'
        const last = rateLimitMap.get(ip) || 0
        const now = Date.now()
        if (now - last < RATE_LIMIT_MS) {
          res.writeHead(429, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Too many requests' }))
          return
        }

        // update timestamp (will be pruned later)
        rateLimitMap.set(ip, now)

        // Efficiently read request body as Buffer
        const chunks = []
        for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
        const bodyStr = Buffer.concat(chunks).toString()
        let parsed = {}
        try { parsed = JSON.parse(bodyStr || '{}') } catch (e) { parsed = { prompt: String(bodyStr || '') } }

      const rawPrompt = parsed.prompt || parsed.message || parsed.input || ''
      const prompt = sanitizePrompt(rawPrompt)
      if (!prompt) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Empty prompt' }))
        return
      }

      try {
        const text = await proxyToGemini(prompt)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ text }))
        return
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: err.message }))
        return
      }
    }

    // YouTube proxy endpoints - allow client to request latest/shorts/live data
    if (method === 'GET' && url.startsWith('/api/youtube')) {
      const urlObj = new URL(req.url, `http://${req.headers.host}`)
      const type = urlObj.searchParams.get('type') || 'latest'
      const maxResults = Number(urlObj.searchParams.get('maxResults') || 12)

      const YT_KEY = process.env.YOUTUBE_API_KEY || process.env.VITE_YOUTUBE_API_KEY
      const CHANNEL_ID = process.env.CHANNEL_ID || process.env.VITE_CHANNEL_ID
      if (!YT_KEY || !CHANNEL_ID) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'Missing YOUTUBE_API_KEY or CHANNEL_ID on server' }))
        return
      }

      let fetchImpl = globalThis.fetch
      if (!fetchImpl) {
        try {
          const mod = await import('node-fetch')
          fetchImpl = mod.default || mod
          globalThis.fetch = fetchImpl
        } catch (e) {
          res.writeHead(500, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: 'Server fetch not available' }))
          return
        }
      }

      try {
        // Helper to fetch video details for an array of ids
        const fetchVideoDetails = async (ids) => {
          const vids = ids.join(',')
          const vres = await fetchImpl(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${vids}&key=${YT_KEY}`
          )
          const vjson = await vres.json()
          return vjson.items || []
        }

        if (type === 'live') {
          const sres = await fetchImpl(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${YT_KEY}`)
          const sjson = await sres.json()
          const ids = (sjson.items || []).map(i => i.id?.videoId).filter(Boolean)
          const details = ids.length ? await fetchVideoDetails(ids) : []
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ items: details }))
          return
        }

        if (type === 'details') {
          const id = urlObj.searchParams.get('id')
          if (!id) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Missing id' }))
            return
          }
          const details = await fetchVideoDetails([id])
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ items: details }))
          return
        }

        // For latest and shorts: search recent videos then enrich with details
        const searchRes = await fetchImpl(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=${Math.min(maxResults,50)}&order=date&type=video&key=${YT_KEY}`)
        const searchJson = await searchRes.json()
        const ids = (searchJson.items || []).map(i => i.id?.videoId).filter(Boolean)
        const detailItems = ids.length ? await fetchVideoDetails(ids) : []

        // Convert contentDetails ISO8601 duration to seconds
        const parseDurationSeconds = (iso) => {
          if (!iso) return 0
          const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
          if (!match) return 0
          const h = parseInt(match[1]||0,10)
          const m = parseInt(match[2]||0,10)
          const s = parseInt(match[3]||0,10)
          return h*3600 + m*60 + s
        }

        const items = detailItems.map(it => ({
          id: it.id,
          title: it.snippet?.title || '',
          thumbnail: it.snippet?.thumbnails?.high?.url || it.snippet?.thumbnails?.default?.url || '',
          duration: it.contentDetails ? parseDurationSeconds(it.contentDetails.duration) : 0,
          durationText: it.contentDetails ? it.contentDetails.duration : '',
          views: it.statistics?.viewCount || '0',
          liveBroadcastContent: it.snippet?.liveBroadcastContent || 'none'
        }))

        let out = items
        if (type === 'shorts') {
          out = items.filter(i => i.duration > 0 && i.duration < 60)
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ items: out }))
        return
      } catch (err) {
        res.writeHead(502, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: String(err) }))
        return
      }
    }

    // Health check
    if (method === 'GET' && url === '/api/health') {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok' }))
      return
    }

    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Not found' }))
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: e.message }))
  }
})

server.listen(PORT, () => {
  console.log(`Gemini proxy listening on http://localhost:${PORT}`)
  if (!GEMINI_API_KEY) console.warn('No GEMINI_API_KEY found in environment; proxy will return errors until set')
})

export default server
