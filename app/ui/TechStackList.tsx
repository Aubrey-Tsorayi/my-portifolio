'use client';

import { useState } from 'react';

interface Technology {
  id: string;
  name: string;
  icon: string;
  description: string;
  experience: string;
  level: string;
  projects: string[];
}

interface TechStack {
  id: string;
  category: string;
  technologies: Technology[];
}

interface TechStackListProps {
  techStacks: TechStack[];
  error: string | null;
  loading: boolean;
  onTechSelect: (tech: Technology | null) => void;
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
            <div className="w-14 h-14 bg-zinc-700 rounded flex-shrink-0" />
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

export default function TechStackList({ techStacks, error, loading, onTechSelect }: TechStackListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleTechClick = (tech: Technology) => {
    if (selectedId === tech.id) {
      setSelectedId(null);
      onTechSelect(null);
    } else {
      setSelectedId(tech.id);
      onTechSelect(tech);
    }
  };

  return (
    <div className="fixed left-[300px] top-0 w-[350px] h-screen bg-[#171717] border-r border-gray-800 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold mb-1 text-white">Tech Stack</h1>
        <p className="text-gray-400 text-sm">
          Technologies I use to build software solutions
        </p>
      </div>

      {/* Scrollable tech list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-3">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-500 bg-red-500/10 p-4 rounded-lg">
              <p className="font-medium">Error loading tech stack</p>
              <p className="text-xs opacity-80 mt-1">{error}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {techStacks.map((stack) => (
                <div key={stack.id} className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">{stack.category}</h2>
                  <div className="space-y-3">
                    {stack.technologies.map((tech) => (
                      <div
                        key={tech.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedId === tech.id
                            ? 'bg-blue-600 hover:bg-blue-500'
                            : 'bg-zinc-800/50 hover:bg-zinc-700/50'
                        }`}
                        onClick={() => handleTechClick(tech)}
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="w-12 h-12 rounded bg-white/10 p-2 object-contain flex-shrink-0"
                          />
                          <div>
                            <h3 className={`font-medium mb-1 text-[15px] ${
                              selectedId === tech.id ? 'text-white' : 'text-white'
                            }`}>
                              {tech.name}
                            </h3>
                            <div className={`text-[12px] space-x-2 ${
                              selectedId === tech.id ? 'text-white/70' : 'text-gray-400'
                            }`}>
                              <span>{tech.level}</span>
                              <span>•</span>
                              <span>{tech.experience}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #171717;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a4a4a;
        }
      `}</style>
    </div>
  );
}
