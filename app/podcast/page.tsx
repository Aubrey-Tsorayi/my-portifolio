'use client';

import { useState, useEffect } from 'react';
import PodcastList from '../ui/PodcastList';
import Image from 'next/image';

interface Episode {
  id: string;
  name: string;
  release_date: string;
  duration_ms: number;
  images: { url: string }[];
  external_urls: { spotify: string };
  description: string;
  html_description?: string;
  uri?: string;
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
      <div className="lg:hidden flex justify-center p-4 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">{`Africa's Blank Canvas`}</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row">
        <PodcastList 
          episodes={episodes}
          error={error}
          loading={loading}
          onEpisodeSelect={setSelectedEpisode}
        />

        {selectedEpisode ? (
          <div className="flex-1 align-center p-4 md:p-8 lg:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                <Image
                  src={selectedEpisode.images[0]?.url}
                  alt={selectedEpisode.name}
                  width={200}
                  height={200}
                  className="w-full md:w-48 h-48 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {selectedEpisode.name}
                  </h1>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <span>{new Date(selectedEpisode.release_date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{Math.round(selectedEpisode.duration_ms / 60000)} minutes</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-zinc-900/50 rounded-lg p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-white mb-4">About this episode</h2>
                  <div className="text-gray-300 text-sm md:text-base space-y-4 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: selectedEpisode.html_description || selectedEpisode.description
                    }}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedEpisode.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1DB954] text-black font-semibold py-3 px-6 rounded-full hover:bg-[#1ed760] transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    Listen on Spotify
                  </a>
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(selectedEpisode.name + " Africa's Blank Canvas")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                    Listen on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center">
          </div>
        )}
      </div>
    </div>
  );
}