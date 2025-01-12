import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    console.error('Missing credentials:', { client_id: !!client_id, client_secret: !!client_secret });
    return NextResponse.json({ error: 'Missing Spotify credentials' }, { status: 400 });
  }

  try {
    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        scope: 'user-read-playback-state user-read-currently-playing user-read-playback-position user-read-private user-read-email playlist-read-private playlist-read-collaborative'
      }).toString(),
    };

    console.log('Requesting Spotify token with scopes...');
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Token request failed:', {
        status: response.status,
        error: errorData
      });
      return NextResponse.json({ 
        error: 'Failed to fetch token',
        status: response.status,
        details: errorData
      }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('Token response:', {
      token_type: data.token_type,
      expires_in: data.expires_in,
      scope: data.scope
    });
    
    if (!data.access_token) {
      console.error('No access token in response:', data);
      return NextResponse.json({ 
        error: 'No access token in response',
        response: data
      }, { status: 500 });
    }

    console.log('Successfully obtained Spotify token');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Token fetch error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch token',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}