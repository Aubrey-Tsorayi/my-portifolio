'use client';

import { useEffect, useState } from 'react';

interface Episode {
  id: string;
  name: string;
  release_date: string;
  external_urls: {
    spotify: string;
  };
}

export default function Home() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getEpisodes`);
        const data = await response.json();
        setEpisodes(data.items || []);
      } catch (error) {
        console.error('Error fetching episodes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div
        className="sticky top-0 left-0 w-full h-10 border-b border-gray-500 opacity-50 mb-10 md:mb-20"
        style={{
          backdropFilter: "blur(70px)",
        }}
      ></div>
      <div className="w-[90%] md:w-[70%] lg:w-1/2 px-4 md:px-0 text-[16px] md:text-[18px]">
        <div className="space-y-6">
          <p className="leading-relaxed">
            Hello, I am Tutsirayi Tsorayi. I am a
            <a
              href="https://github.com/Aubrey-Tsorayi"
              className="text-blue-600 hover:text-blue-400 transition-colors"
              target="_blank"
            >
              {" software engineer"}
            </a>
            ,
            <a
              href="https://www.youtube.com/@AfricasBlankCanvas"
              target="_blank"
              className="text-blue-600 hover:text-blue-400 transition-colors"
            >
              {" podcaster"}
            </a>
            ,
            <a
              href="https://www.instagram.com/21shots_media"
              target="_blank"
              className="text-blue-600 hover:text-blue-400 transition-colors"
            >
              {" graphic designer"}
            </a>
            . I am currently working on a news app (Naming in progress) that
            allows users to get access to the last news in Zimbabwe.
          </p>
          <br />
          <p>
            I am currently working at{" "}
            <a
              href="https://www.kenac.co.zw"
              target="_blank"
              className="text-blue-600 hover:text-blue-400 transition-colors"
            >
              {" Kenac Computer Systems"}
            </a>
            as a Technial Services Intern.
          </p>
          <br />
          <p>
            I also host the{" "}
            <a
              href="https://podcasters.spotify.com/pod/show/africasblankcanvas"
              target="_blank"
              className="text-blue-600 hover:text-blue-400 transition-colors"
            >
              {" "}
              {"Africa's Blank Canvas"}
            </a>{" "}
            podacast. I pocast focused on sharing african stories and leting
            people know it is posibble.
          </p>
        </div>
      </div>
      <div className="mt-20 text-lg w-[90%] md:w-[70%] lg:w-1/2 space-y-5">
        <a
          href="https://www.kenac.co.zw"
          target="_blank"
          className="flex flex-row justify-between items-center space-x-2 group"
        >
          <h1 className="group-hover:text-blue-600 group-hover:underline">
            Kenac Computer Systems
          </h1>
          <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
          <div className="flex items-center space-x-3 text-gray-500">
            <p>Technical Services Intern</p>
            <p>2024-</p>
          </div>
        </a>
        <a
          href="https://www.letiarts.com"
          target="_blank"
          className="flex flex-row justify-between items-center space-x-2 group"
        >
          <h1 className="group-hover:text-blue-600 group-hover:underline">
            Leti Arts
          </h1>
          <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
          <div className="flex items-center space-x-3 text-gray-500">
            <p>Game Dev Intern</p>
            <p>2024-</p>
          </div>
        </a>
        <a
          href="https://www.parallel-farm.com"
          target="_blank"
          className="flex flex-row justify-between items-center space-x-2 group"
        >
          <h1 className="group-hover:text-blue-600 group-hover:underline">
            Parrallel World
          </h1>
          <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
          <div className="flex items-center space-x-3 text-gray-500">
            <p>Front-end Dev Intern</p>
            <p>2024</p>
          </div>
        </a>
        <a
          href="https://podcasters.spotify.com/pod/show/africasblankcanvas"
          target="_blank"
          className="flex flex-row justify-between items-center space-x-2 group"
        >
          <h1 className="group-hover:text-blue-600 group-hover:underline">
            {"Africa's Blank Canvas"}
          </h1>
          <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
          <div className="flex items-center space-x-3 text-gray-500">
            <p>Host</p>
            <p>2022-</p>
          </div>
        </a>
        <a
          href="https://www.aplimac.co.zw"
          target="_blank"
          className="flex flex-row justify-between items-center space-x-2 group"
        >
          <h1 className="group-hover:text-blue-600 group-hover:underline">
            Aplicmac
          </h1>
          <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
          <div className="flex items-center space-x-3 text-gray-500">
            <p>Full-stack Dev Intern</p>
            <p>2021</p>
          </div>
        </a>
      </div>
      <div className="mt-20 text-[16px] md:text-[18px] w-[90%] md:w-[70%] lg:w-1/2 space-y-5 mb-10">
        <h4 className="text-xl font-semibold">Latest Episodes</h4>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex flex-row justify-between items-center space-x-2 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-[60%]"></div>
                <span className="hidden sm:flex flex-1 border-t border-gray-200 border-dashed shrink mx-4"></span>
                <div className="h-5 bg-gray-200 rounded w-[20%]"></div>
              </div>
            ))}
          </div>
        ) : (
          episodes.slice(0, 4).map((episode) => (
            <a
              key={episode.id}
              href={episode.external_urls.spotify}
              target="_blank"
              className="flex flex-row justify-between items-center space-x-2 group"
            >
              <h1 className="group-hover:text-blue-600 group-hover:underline">
                {episode.name}
              </h1>
              <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800"></span>
              <div className="flex items-center space-x-3 text-gray-500">
                <p>{new Date(episode.release_date).toLocaleDateString('en-US', { 
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</p>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}