'use client';

import { useState } from 'react';
import CertificatesList from '../ui/CertificatesList';
import certificatesData from '../../data/certificates.json';

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

export default function CertificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <main className="min-h-screen bg-[#121212] flex">
      <CertificatesList
        certificates={certificatesData.certificates}
        error={null}
        loading={false}
        onCertificateSelect={setSelectedCertificate}
      />
      
      {selectedCertificate && (
        <div className="flex-1 relative">
          <div className="h-screen flex items-center justify-center p-8">
            <div className="max-w-3xl -mt-20">
              {/* Certificate Header */}
              <div className="flex flex-col items-center text-center space-y-6 mb-8">
                <img
                  src={selectedCertificate.badgeIcon}
                  alt={selectedCertificate.provider}
                  className="w-32 h-32 rounded bg-white/10 p-4 object-contain"
                />
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {selectedCertificate.name}
                  </h1>
                  <div className="flex items-center justify-center space-x-4 text-gray-400">
                    <span className="text-lg">{selectedCertificate.provider}</span>
                    <span>•</span>
                    <span>Issued: {new Date(selectedCertificate.issueDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>
                      Expires: {isNaN(new Date(selectedCertificate.expiryDate).getTime()) ? 'N/A' : new Date(selectedCertificate.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="space-y-6">
                <div className="bg-zinc-800/50 rounded-lg p-8">
                  <h2 className="text-xl font-semibold text-white mb-4 text-center">About this Certification</h2>
                  <p className="text-gray-300 leading-relaxed text-center">
                    {selectedCertificate.description}
                  </p>
                  <div className="mt-8">
                    <h3 className="text-sm font-medium text-gray-400 mb-3 text-center">Skills</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {selectedCertificate.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm"
                        >
                          {skill}
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
    </main>
  )
}