import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface SpotifyEpisode {
  release_date: string;
  name: string;
  description: string;
  duration_ms: number;
  images: { url: string }[];
  external_urls: { spotify: string };
  html_description?: string;
  id: string;  
}

async function getToken() {
  try {
    const headersList = headers();
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = headersList.get('host') || 'localhost:3000';
    const tokenUrl = `${protocol}://${host}/api/getToken`;
    
    const response = await fetch(tokenUrl, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Token request failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}

async function fetchEpisodes(token: string): Promise<SpotifyEpisode[]> {
  const showId = process.env.SPOTIFY_SHOW_ID;
  if (!showId) {
    throw new Error('Missing Spotify show ID');
  }

  const response = await fetch(
    `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch episodes: ${response.status}`);
  }

  const data = await response.json();
  return data.items;
}

export async function GET() {
  try {
    const token = await getToken();
    const episodes = await fetchEpisodes(token);
    
    // Sort episodes by release date (newest first)
    const sortedEpisodes = episodes.sort((a, b) => {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });
    
    return NextResponse.json({ 
      items: sortedEpisodes 
    }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('Error in GET episodes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
