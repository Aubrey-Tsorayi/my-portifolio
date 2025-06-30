import { headers } from 'next/headers';

interface TokenData {
  access_token: string;
  expires_at: number;
}

class TokenManager {
  private static instance: TokenManager;
  private currentToken: TokenData | null = null;
  private refreshInterval: NodeJS.Timeout | null = null;

  private constructor() {
    // Start the refresh interval
    this.startRefreshInterval();
  }

  public static getInstance(): TokenManager {
    if (!TokenManager.instance) {
      TokenManager.instance = new TokenManager();
    }
    return TokenManager.instance;
  }

  private startRefreshInterval() {
    // Clear any existing interval
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    // Set up refresh interval slightly before token expires
    // Spotify tokens expire in 3600 seconds (1 hour)
    // We'll refresh 5 minutes before expiration to be safe
    const REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds
    const HOUR_IN_MS = 3600 * 1000; // 1 hour in milliseconds

    this.refreshInterval = setInterval(async () => {
      await this.refreshToken();
    }, HOUR_IN_MS - REFRESH_BUFFER); // Refresh 5 minutes before expiration
  }

  private async fetchNewToken(): Promise<TokenData> {
    const headersList = headers();
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = (await headersList).get('host') || 'localhost:3000';
    const tokenUrl = `${protocol}://${host}/api/getToken`;

    const response = await fetch(tokenUrl, {
      cache: 'no-store',
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch token: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data.access_token || !data.expires_in) {
      throw new Error('Invalid token response');
    }
    
    // Calculate expiration time based on expires_in from Spotify
    // Subtract 5 minutes as a safety buffer
    const BUFFER_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds
    const expiresAt = Date.now() + (data.expires_in * 1000) - BUFFER_TIME;
    
    return {
      access_token: data.access_token,
      expires_at: expiresAt
    };
  }

  private async refreshToken() {
    try {
      const newToken = await this.fetchNewToken();
      this.currentToken = newToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  }

  public async getToken(): Promise<string> {
    const currentTime = Date.now();
    
    // If we don't have a token or it's expired or about to expire (within 5 minutes)
    if (!this.currentToken || currentTime >= this.currentToken.expires_at) {
      await this.refreshToken();
    }
    
    return this.currentToken!.access_token;
  }

  public cleanup() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
      this.refreshInterval = null;
    }
  }
}

export const tokenManager = TokenManager.getInstance();
