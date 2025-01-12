'use client';

import { useState } from 'react';
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
}

export default function PodcastPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  // Fetch episodes data
  const response = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getEpisodes`);
  const data = response.then(res => res.json());
  const episodes = data.then(data => data.items || []);

  return (
    <div className="min-h-screen bg-black">
      <PodcastList onEpisodeSelect={setSelectedEpisode} episodes={episodes} />
      
      {selectedEpisode ? (
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
                <h1 className="text-3xl font-bold mb-2">{selectedEpisode.name}</h1>
                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                  <span>{new Date(selectedEpisode.release_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}</span>
                  <span>·</span>
                  <span>{Math.floor(selectedEpisode.duration_ms / 60000)} min</span>
                </div>
                <a
                  href={selectedEpisode.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 bg-[#1DB954] text-black px-4 py-2 rounded-full font-medium hover:bg-[#1ed760] transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.015 17.41a.748.748 0 01-1.03.247c-2.825-1.725-6.37-2.116-10.54-1.158a.748.748 0 11-.258-1.472c4.57-1.037 8.51-.592 11.67 1.354a.748.748 0 01.158 1.029zm1.34-2.982a.935.935 0 01-1.287.308c-3.235-1.988-8.158-2.563-11.98-1.402a.935.935 0 11-.543-1.79c4.374-1.327 9.815-.68 13.557 1.595.44.27.578.847.308 1.287zm.116-3.103c-3.88-2.304-10.277-2.515-13.975-1.39a1.12 1.12 0 11-.65-2.147c4.265-1.293 11.36-1.044 15.84 1.608a1.12 1.12 0 11-1.215 1.882v.047z"/>
                  </svg>
                  <span>Play on Spotify</span>
                </a>
              </div>
            </div>

            {/* Episode Description */}
            <div className="prose prose-invert max-w-none">
              {selectedEpisode.html_description ? (
                <div dangerouslySetInnerHTML={{ __html: selectedEpisode.html_description }} />
              ) : (
                <p className="text-gray-300 whitespace-pre-wrap">{selectedEpisode.description}</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="pl-[600px] p-8 text-gray-400">
          Select an episode to start listening
        </div>
      )}
    </div>
  );
}