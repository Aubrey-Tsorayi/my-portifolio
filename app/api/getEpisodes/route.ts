import { NextResponse } from 'next/server';

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
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Missing Spotify credentials');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
      body: 'grant_type=client_credentials',
      next: { revalidate: 3600 }, // Cache token for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to get token: ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
}

async function fetchEpisodes(token: string): Promise<SpotifyEpisode[]> {
  const showId = process.env.NEXT_PUBLIC_SPOTIFY_SHOW_ID;
  if (!showId) {
    throw new Error('Missing Spotify show ID');
  }

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3600 }, // Cache episodes for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status}`);
    }

    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching episodes:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const token = await getToken();
    const episodes = await fetchEpisodes(token);

    // Sort episodes by release date (newest first)
    const sortedEpisodes = episodes.sort((a, b) => {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });

    return NextResponse.json(
      { items: sortedEpisodes },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600', // Cache for 1 hour
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
