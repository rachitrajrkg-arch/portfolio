import React from 'react';
import Link from 'next/link';
import { DoctorProfile } from '../types';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  profile: DoctorProfile;
}

// Footer renders on the homepage and on /blog pages, so section links are absolute (/#id).
const FOOTER_LINKS = [
  { label: 'About', href: '/#about' },
  { label: 'Specialties', href: '/#services' },
  { label: 'Gallery', href: '/#doctor-gallery' },
  { label: 'Reviews', href: '/#reviews' },
  { label: 'Clinics', href: '/#clinics' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/#appointment' },
];

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const linkedinUrl = "https://www.linkedin.com/in/rachit-raj-b34220189/";

  return (
    <footer className="bg-forest-800 text-forest-100/70 text-sm py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="text-base font-serif text-white">{profile.name}</h3>
            <p className="text-sm text-forest-200 mt-0.5">{profile.clinicName}</p>
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

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-base font-semibold text-forest-100/80">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <p>© {new Date().getFullYear()} Dr. Rachit Raj. All rights reserved.</p>
          <p>Gomti Nagar, Lucknow OPD Consultations</p>
        </div>
      </div>
    </footer>
  );
};
