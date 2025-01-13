'use client';

import { useState } from 'react';

interface Certificate {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  expiryDate: string;
  credentialId: string;
  badgeIcon: string;
  badgeUrl: string;
  description: string;
  skills: string[];
}

interface CertificatesListProps {
  certificates: Certificate[];
  error: string | null;
  loading: boolean;
  onCertificateSelect: (certificate: Certificate | null) => void;
}

function LoadingSkeleton() {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="p-3 rounded-lg bg-zinc-800 animate-pulse"
        >
          <div className="flex items-start space-x-3">
            <div className="w-14 h-14 bg-zinc-700 rounded flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-zinc-700 rounded w-3/4 mb-2" />
              <div className="h-3 bg-zinc-700 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default function CertificatesList({ certificates, error, loading, onCertificateSelect }: CertificatesListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleCertificateClick = (certificate: Certificate) => {
    setSelectedId(certificate.id);
    onCertificateSelect(certificate);
  };

  return (
    <div className="fixed left-[300px] top-0 w-[300px] h-screen bg-[#171717] border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h1 className="text-xl font-bold mb-1 text-white">Professional Certifications</h1>
        <p className="text-gray-400 text-sm">
          Industry-recognized credentials
        </p>
      </div>

      {/* Scrollable certificates list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-3">
          <h2 className="text-sm font-semibold mb-3 text-gray-400 uppercase tracking-wider">All Certifications</h2>
          
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-red-500 bg-red-500/10 p-3 rounded-lg text-sm">
              <p className="font-medium">Error loading certificates</p>
              <p className="opacity-80 mt-1 text-xs">{error}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedId === certificate.id
                      ? 'bg-blue-600 hover:bg-blue-500'
                      : 'bg-zinc-800/50 hover:bg-zinc-700/50'
                  }`}
                  onClick={() => handleCertificateClick(certificate)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={certificate.badgeIcon}
                      alt={certificate.provider}
                      className="w-14 h-14 rounded object-contain bg-white/10 p-2 flex-shrink-0"
                    />
                    <div>
                      <h3 className={`font-medium mb-1 text-[15px] ${
                        selectedId === certificate.id ? 'text-white' : 'text-white'
                      }`}>
                        {certificate.name}
                      </h3>
                      <div className={`text-[12px] space-x-2 ${
                        selectedId === certificate.id ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        <span>{certificate.provider}</span>
                        <span>•</span>
                        <span>{new Date(certificate.issueDate).getFullYear()}</span>
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
