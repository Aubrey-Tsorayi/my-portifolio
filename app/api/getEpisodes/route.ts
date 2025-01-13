import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface SpotifyEpisode {
  release_date: string;
  name: string;
  description: string;
  duration_ms: number;
  images: { url: string }[];
  external_urls: { spotify: string };
  id: string;
  html_description?: string;
}

async function getValidToken() {
  try {
    console.log('Fetching new token...');
    const headersList = headers();
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = headersList.get('host') || 'localhost:3000';
    const tokenUrl = `${protocol}://${host}/api/getToken`;
    
    console.log('Token URL:', tokenUrl);
    const tokenResponse = await fetch(tokenUrl);
    
    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error('Token fetch failed:', {
        status: tokenResponse.status,
        error: errorData
      });
      throw new Error(`Token request failed with status: ${tokenResponse.status}`);
    }
    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      console.error('No access token in response:', tokenData);
      throw new Error('No access token received');
    }
    console.log('Successfully obtained new token');
    return tokenData.access_token;
  } catch (error) {
    console.error('Error getting token:', error);
    throw new Error(`Failed to get access token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function fetchEpisodes(accessToken: string, isRetry = false) {
  // Using TED Radio Hour as a test (a public podcast)
  const showId = '1y0ib1t6UOV4VLVyibU9bh';
  
  // First, try to get the show details
  const showUrl = `https://api.spotify.com/v1/shows/${showId}?market=US`;
  
  console.log(`${isRetry ? 'Retrying' : 'Making'} show request...`);
  const showResponse = await fetch(showUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!showResponse.ok) {
    const errorData = await showResponse.text();
    console.error('Show fetch failed:', {
      status: showResponse.status,
      error: errorData,
      isRetry
    });
    throw new Error(`Failed to fetch show${isRetry ? ' after token refresh' : ''}: ${showResponse.status}`);
  }

  const showData = await showResponse.json();
  console.log('Successfully fetched show:', {
    name: showData.name,
    total_episodes: showData.total_episodes
  });

  // Then get the episodes
  const episodesUrl = `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=50`;
  console.log(`Fetching episodes for show...`);
  const episodesResponse = await fetch(episodesUrl, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!episodesResponse.ok) {
    const errorData = await episodesResponse.text();
    console.error('Episodes fetch failed:', {
      status: episodesResponse.status,
      error: errorData,
      isRetry
    });
    throw new Error(`Failed to fetch episodes${isRetry ? ' after token refresh' : ''}: ${episodesResponse.status}`);
  }

  const data = await episodesResponse.json();
  console.log('Successfully fetched episodes:', {
    count: data.items?.length
  });
  return data;
}

export async function GET() {
  try {
    // Get initial token
    const accessToken = await getValidToken();

    try {
      // Try to fetch episodes
      const data = await fetchEpisodes(accessToken);
      if (!data.items) {
        return NextResponse.json({ items: [] });
      }

      // Sort episodes by release date
      const sortedEpisodes = data.items.sort((a: SpotifyEpisode, b: SpotifyEpisode) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB.getTime() - dateA.getTime();
      });

      return NextResponse.json({ items: sortedEpisodes });
    } catch (error) {
      // If first attempt fails with 401, try once more with a new token
      if (error instanceof Error && error.message.includes('401')) {
        console.log('Initial request failed with 401, trying with new token...');
        const newToken = await getValidToken();
        const retryData = await fetchEpisodes(newToken, true);
        if (!retryData.items) {
          return NextResponse.json({ items: [] });
        }

        // Sort episodes by release date
        const sortedEpisodes = retryData.items.sort((a: SpotifyEpisode, b: SpotifyEpisode) => {
          const dateA = new Date(a.release_date);
          const dateB = new Date(b.release_date);
          return dateB.getTime() - dateA.getTime();
        });

        return NextResponse.json({ items: sortedEpisodes });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in getEpisodes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}
