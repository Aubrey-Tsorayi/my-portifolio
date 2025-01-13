'use client';

import { useState } from 'react';
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

interface PodcastListProps {
  episodes: Episode[];
  error: string | null;
  loading: boolean;
  onEpisodeSelect: (episode: Episode | null) => void;
}

function LoadingSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-lg bg-zinc-800 animate-pulse"
        >
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-zinc-700 rounded flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-zinc-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function PodcastList({ episodes, error, loading, onEpisodeSelect }: PodcastListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedId(episode.id);
    onEpisodeSelect(episode);
  };

  return (
    <div className="fixed left-[300px] top-0 w-[350px] h-screen bg-[#171717] border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold mb-2 text-white">{`Africa's Blank Canvas`}</h1>
        <p className="text-gray-400 mb-4 text-sm">
          A podcast focused on sharing African stories and letting people know it is possible.
        </p>
      </div>

      {/* Scrollable episodes list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-4">
          <h2 className="text-lg font-semibold mb-4 text-white">All Episodes</h2>
          
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
              <p className="font-medium">Error loading episodes</p>
              <p className="text-sm opacity-80 mt-1">{error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <div
                  key={episode.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedId === episode.id
                      ? 'bg-green-500 hover:bg-green-400'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                  onClick={() => handleEpisodeClick(episode)}
                >
                  <div className="flex items-start space-x-4">
                    <Image
                      src={episode.images[0]?.url}
                      alt={episode.name}
                      width={50}
                      height={50}
                      className="w-14 h-14 rounded object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className={`font-medium mb-1 text-[15px] ${
                        selectedId === episode.id ? 'text-black' : 'text-white'
                      }`}>
                        {episode.name}
                      </h3>
                      <div className={`text-[12px] space-x-2 ${
                        selectedId === episode.id ? 'text-black/70' : 'text-gray-400'
                      }`}>
                        <span>{new Date(episode.release_date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{Math.round(episode.duration_ms / 60000)} min</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
