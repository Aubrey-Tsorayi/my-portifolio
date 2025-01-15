'use client';

import { useState } from 'react';
import TechStackList from '../ui/TechStackList';
import techStacksData from '../../data/techstacks.json';
import Image from 'next/image';

interface Technology {
  id: string;
  name: string;
  icon: string;
  description: string;
  experience: string;
  level: string;
  projects: string[];
}

export default function Stack() {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);

  return (
    <main className="min-h-screen bg-[#121212] flex justify-center">
      <div className="flex flex-col lg:flex-row flex-1 max-w-7xl">
        <div className="lg:hidden flex justify-center p-4 border-b border-gray-800">
          <h1 className="text-2xl font-bold text-white">Tech Stack</h1>
        </div>
        
        <TechStackList
          techStacks={techStacksData.techStacks}
          error={null}
          loading={false}
          onTechSelect={setSelectedTech}
        />
        
        {selectedTech ? (
          <div className="flex-1 relative">
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-3xl -mt-10 md:-mt-20">
                {/* Tech Header */}
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 mb-6 md:mb-8">
                  <Image
                    src={selectedTech.icon}
                    alt={selectedTech.name}
                    width={100}
                    height={100}
                    className="w-24 h-24 md:w-32 md:h-32 rounded bg-white/10 p-4 md:p-6 object-contain"
                  />
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {selectedTech.name}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-gray-400 text-sm md:text-base">
                      <span className="md:text-lg">{selectedTech.level}</span>
                      <span>•</span>
                      <span>{selectedTech.experience} Experience</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-zinc-900/50 rounded-lg p-4 md:p-6 mb-6 md:mb-8">
                  <h2 className="text-lg md:text-xl font-semibold text-white mb-3">About</h2>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                    {selectedTech.description}
                  </p>
                </div>

                {/* Projects */}
                <div className="bg-zinc-900/50 rounded-lg p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold text-white mb-3">Projects</h2>
                  <ul className="space-y-2">
                    {selectedTech.projects.map((project, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-sm md:text-base leading-relaxed"
                      >
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 items-center justify-center">
          </div>
        )}
      </div>
    </main>
  );
}