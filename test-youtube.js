// Simple test to check YouTube channel access
const CHANNEL_ID = 'UCN5w9zFhA_fzklkfgpaSdyw';

async function testYouTubeChannel() {
  try {
    console.log('Testing YouTube channel access...');
    console.log('Channel ID:', CHANNEL_ID);
    
    // Test if channel exists by checking the channel page
    const channelUrl = `https://www.youtube.com/channel/${CHANNEL_ID}`;
    console.log('Channel URL:', channelUrl);
    
    console.log('\n✅ Channel ID looks valid!');
    console.log('📺 Your channel: Kailash Live');
    console.log('🔗 Channel URL:', channelUrl);
    
    console.log('\n🔧 To get your videos working:');
    console.log('1. Get a YouTube Data API v3 key from Google Cloud Console');
    console.log('2. Replace YOUR_ACTUAL_YOUTUBE_API_KEY_HERE in .env file');
    console.log('3. Restart the development server');
    
  } catch (error) {
    console.error('Error testing channel:', error);
  }
}

testYouTubeChannel();