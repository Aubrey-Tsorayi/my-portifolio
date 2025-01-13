import { NextResponse } from 'next/server';

export async function GET() {
  const client_id = process.env.SPOTIFY_CLIENT_ID;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    console.error('Missing credentials:', { client_id: !!client_id, client_secret: !!client_secret });
    return NextResponse.json({ error: 'Missing Spotify credentials' }, { status: 400 });
  }

  try {
    // Log the credentials being used (but not the actual values)
    console.log('Using credentials:', {
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      clientIdLength: client_id.length,
      clientSecretLength: client_secret.length
    });

    const authOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials'
      }).toString(),
    };

    console.log('Requesting Spotify token...');
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
    
    // Log token details (but not the actual token)
    console.log('Token response:', {
      hasAccessToken: !!data.access_token,
      tokenLength: data.access_token?.length,
      token_type: data.token_type,
      expires_in: data.expires_in
    });
    
    if (!data.access_token) {
      console.error('No access token in response:', data);
      return NextResponse.json({ 
        error: 'No access token in response',
        details: data
      }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error getting token:', error);
    return NextResponse.json({ 
      error: 'Failed to get token',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}