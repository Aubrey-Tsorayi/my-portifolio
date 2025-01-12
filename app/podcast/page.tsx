'use client';

import { useState, useEffect } from 'react';
import PodcastList from '../ui/PodcastList';

interface Episode {
  id: string;
  name: string;
  release_date: string;
  duration_ms: number;
  images: { url: string }[];
  external_urls: { spotify: string };
  description: string;
  html_description?: string;
  uri: string;
}

export default function PodcastPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/getEpisodes');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Failed to fetch episodes: ${response.status}`);
        }
        const data = await response.json();
        setEpisodes(data.items || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch episodes');
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <PodcastList 
        episodes={episodes}
        error={error}
        loading={loading}
        onEpisodeSelect={setSelectedEpisode} 
      />
      
      {selectedEpisode && (
        <div className="pl-[600px] p-8">
          <div className="max-w-3xl">
            {/* Episode Header */}
            <div className="flex items-start space-x-6 mb-8">
              <img
                src={selectedEpisode.images[0]?.url}
                alt={selectedEpisode.name}
                className="w-32 h-32 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{selectedEpisode.name}</h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                  <span>{new Date(selectedEpisode.release_date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{Math.round(selectedEpisode.duration_ms / 60000)} min</span>
                </div>
              </div>
            </div>

            {/* Spotify Player */}
            <div className="mb-8">
              <iframe
                src={`https://open.spotify.com/embed/episode/${selectedEpisode.id}`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="encrypted-media"
                className="rounded-lg"
              />
            </div>
            
            {/* Episode Description */}
            <div 
              className="text-gray-300 prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ 
                __html: selectedEpisode.html_description || selectedEpisode.description 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}