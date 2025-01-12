'use client';

import { useEffect, useState } from 'react';

interface Episode {
  id: string;
  name: string;
  release_date: string;
  duration_ms: number;
  images: { url: string }[];
  external_urls: { spotify: string };
  description: string;
  html_description?: string;
}

interface PodcastListProps {
  onEpisodeSelect: (episode: Episode | null) => void;
}

export default function PodcastList({ onEpisodeSelect }: PodcastListProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEpisodes() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getEpisodes`);
        if (!response.ok) {
          const error = await response.json();
          console.error('Failed to fetch episodes:', error);
          return;
        }
        const data = await response.json();
        setEpisodes(data.items || []);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      }
    }
    fetchEpisodes();
  }, []);

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedId(episode.id);
    onEpisodeSelect(episode);
  };

  return (
    <div className="fixed left-[250px] top-0 w-[350px] h-screen bg-[#171717] border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold mb-2">Africa's Blank Canvas</h1>
        <p className="text-gray-400 mb-4 text-sm">
          A podcast focused on sharing African stories and letting people know it is possible.
        </p>
      </div>

      {/* Scrollable episodes list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4">All Episodes</h2>
          {episodes.map((episode) => (
            <button
              key={episode.id}
              onClick={() => handleEpisodeClick(episode)}
              className={`w-full text-left hover:bg-[#252525] p-3 rounded-lg transition-colors ${
                selectedId === episode.id ? 'bg-[#252525]' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <img 
                  src={episode.images[0]?.url} 
                  alt={episode.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{episode.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(episode.release_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    {' · '}
                    {Math.floor(episode.duration_ms / 60000)} min
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #171717;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }
      `}</style>
    </div>
  );
}
