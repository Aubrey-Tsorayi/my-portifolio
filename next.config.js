/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: '**.spotify.com',  // This will match any subdomain of spotify.com
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',  // Spotify's image CDN
      },
    ],
  },
}

module.exports = nextConfig
