import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // First, get the access token
    const tokenResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getToken`);
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }

    // Use the token to fetch episodes
    const showId = '1y0ib1t6UOV4VLVyibU9bh';
    const response = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?market=US&limit=50`,
      {
        headers: {
          'Authorization': 'Bearer ' + tokenData.access_token,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch episodes: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items) {
      return NextResponse.json({ items: [] });
    }

    // Sort episodes by release date
    const sortedEpisodes = data.items.sort((a: any, b: any) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB.getTime() - dateA.getTime();
    });

    return NextResponse.json({ items: sortedEpisodes });
  } catch (error) {
    console.error('Error in getEpisodes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episodes' },
      { status: 500 }
    );
  }
}
