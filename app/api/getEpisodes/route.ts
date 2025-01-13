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
  
  try {
    // First, try to get the show details
    const showUrl = `https://api.spotify.com/v1/shows/${showId}?market=US`;
    
    console.log(`${isRetry ? 'Retrying' : 'Making'} show request...`, {
      showId,
      isRetry,
      hasToken: !!accessToken,
      tokenLength: accessToken?.length
    });

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
        isRetry,
        responseHeaders: Object.fromEntries(showResponse.headers.entries())
      });

      // If we get a 401 and haven't retried yet, throw a specific error
      if (showResponse.status === 401 && !isRetry) {
        console.log('Token appears to be invalid or expired, will retry with new token');
        throw new Error('401');
      }
      throw new Error(`Failed to fetch show: ${showResponse.status} - ${errorData}`);
    }

    const showData = await showResponse.json();
    console.log('Successfully fetched show:', {
      name: showData.name,
      total_episodes: showData.total_episodes,
      id: showData.id
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
        isRetry,
        responseHeaders: Object.fromEntries(episodesResponse.headers.entries())
      });

      if (episodesResponse.status === 401 && !isRetry) {
        console.log('Token appears to be invalid or expired during episodes fetch, will retry with new token');
        throw new Error('401');
      }
      throw new Error(`Failed to fetch episodes: ${episodesResponse.status} - ${errorData}`);
    }

    const data = await episodesResponse.json();
    console.log('Successfully fetched episodes:', {
      count: data.items?.length,
      firstEpisodeName: data.items?.[0]?.name
    });
    return data;
  } catch (error) {
    // If it's our special 401 error, let it propagate
    if (error instanceof Error && error.message === '401') {
      throw error;
    }
    // Otherwise, add more context
    throw new Error(`Error in fetchEpisodes: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function GET() {
  let retryCount = 0;
  const MAX_RETRIES = 2;

  async function attemptFetch() {
    try {
      console.log(`Attempt ${retryCount + 1}/${MAX_RETRIES + 1} to fetch episodes...`);
      const accessToken = await getValidToken();
      console.log('Got access token, fetching episodes...');

      const data = await fetchEpisodes(accessToken, retryCount > 0);
      if (!data.items) {
        console.log('No episodes found in response');
        return NextResponse.json({ items: [] });
      }

      console.log(`Sorting ${data.items.length} episodes...`);
      const sortedEpisodes = data.items.sort((a: SpotifyEpisode, b: SpotifyEpisode) => {
        const dateA = new Date(a.release_date);
        const dateB = new Date(b.release_date);
        return dateB.getTime() - dateA.getTime();
      });

      return NextResponse.json({ items: sortedEpisodes });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Attempt ${retryCount + 1} failed:`, errorMessage);

      // Check if it's a 401 error and we haven't exceeded max retries
      if (errorMessage.includes('401') && retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`Retrying due to 401 error (attempt ${retryCount + 1}/${MAX_RETRIES + 1})...`);
        return attemptFetch();
      }

      // If we've exhausted retries or it's not a 401 error, throw the error
      throw error;
    }
  }

  try {
    return await attemptFetch();
  } catch (error) {
    console.error('All attempts failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}
