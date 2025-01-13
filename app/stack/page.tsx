'use client';

import { useState } from 'react';
import TechStackList from '../ui/TechStackList';
import techStacksData from '../../data/techstacks.json';

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
      <div className="flex flex-1 max-w-7xl">
        <TechStackList
          techStacks={techStacksData.techStacks}
          error={null}
          loading={false}
          onTechSelect={setSelectedTech}
        />
        
        {selectedTech && (
          <div className="flex-1 relative">
            <div className="h-screen flex items-center justify-center p-8">
              <div className="max-w-3xl -mt-20">
                {/* Tech Header */}
                <div className="flex flex-col items-center text-center space-y-6 mb-8">
                  <img
                    src={selectedTech.icon}
                    alt={selectedTech.name}
                    className="w-32 h-32 rounded bg-white/10 p-6 object-contain"
                  />
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {selectedTech.name}
                    </h1>
                    <div className="flex items-center justify-center space-x-4 text-gray-400">
                      <span className="text-lg">{selectedTech.level}</span>
                      <span>•</span>
                      <span>{selectedTech.experience} Experience</span>
                    </div>
                  </div>
                </div>

                {/* Tech Details */}
                <div className="space-y-6">
                  <div className="bg-zinc-800/50 rounded-lg p-8">
                    <h2 className="text-xl font-semibold text-white mb-4 text-center">About this Technology</h2>
                    <p className="text-gray-300 leading-relaxed text-center">
                      {selectedTech.description}
                    </p>
                    <div className="mt-8">
                      <h3 className="text-sm font-medium text-gray-400 mb-3 text-center">Projects</h3>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {selectedTech.projects.map((project, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}