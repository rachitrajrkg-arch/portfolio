import React from 'react';
import { DoctorProfile } from '../types';
import { MessageSquare } from 'lucide-react';

interface FloatingCTAProps {
  profile: DoctorProfile;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ profile }) => {
  const formattedWhatsAppUrl = `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Dr. Rachit Raj, I would like to consult with you.')}`;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <a
        href={formattedWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-forest-600 hover:bg-forest-700 text-white shadow-md transition-all hover:scale-105"
      >
        <MessageSquare className="w-5 h-5" />
      </a>
    </div>
  );
};
