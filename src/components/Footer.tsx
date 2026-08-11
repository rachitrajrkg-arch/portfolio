import React from 'react';
import { DoctorProfile } from '../types';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  profile: DoctorProfile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const linkedinUrl = "https://www.linkedin.com/in/rachit-raj-b34220189/";

  return (
    <footer className="bg-forest-800 text-forest-100/70 text-xs py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-sm font-serif text-white">{profile.name}</h3>
            <p className="text-xs text-forest-200 mt-0.5">{profile.titles}</p>
          </div>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <span>LinkedIn Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <p>© {new Date().getFullYear()} Dr. Rachit Raj. All rights reserved.</p>
          <p>Kanpur &amp; Lucknow OPD Consultations</p>
        </div>
      </div>
    </footer>
  );
};
