'use client';

import React, { useState } from 'react';
import { Phone, Menu, X, Calendar } from 'lucide-react';
import { DoctorProfile, ClinicLocation } from '../types';
import Link from 'next/link';

interface HeaderProps {
  profile: DoctorProfile;
  primaryClinic?: ClinicLocation;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ profile, primaryClinic, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-40 bg-paper/95 backdrop-blur-sm border-b border-ink/10">
      {/* Slim contact strip */}
      <div className="hidden md:block border-b border-ink/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-sm text-ink/60">
          <a href={`tel:${profile.phonePrimary}`} className="flex items-center gap-1.5 hover:text-forest-700 transition-colors">
            <Phone className="w-3 h-3" />
            <span>{profile.phonePrimary}</span>
          </a>
          {primaryClinic && <span>{primaryClinic.days}: {primaryClinic.timings}</span>}
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          {profile.logoUrl ? (
            <img
              src={profile.logoUrl}
              alt={profile.clinicName}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-forest-600 flex items-center justify-center text-white font-serif text-sm shrink-0">
              RLC
            </div>
          )}
          <div>
            <h1 className="text-base font-semibold text-ink leading-tight">
              {profile.name}
            </h1>
            <p className="text-sm text-ink/60">
              {profile.clinicName}
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-ink/70">
          <a href="#about" className="hover:text-forest-700 transition-colors">About</a>
          <a href="#services" className="hover:text-forest-700 transition-colors">Specialties</a>
          <a href="#gallery" className="hover:text-forest-700 transition-colors">Gallery</a>
          <a href="#reviews" className="hover:text-forest-700 transition-colors">Reviews</a>
          <a href="#clinics" className="hover:text-forest-700 transition-colors">Clinics</a>
          <a href="#appointment" className="hover:text-forest-700 transition-colors">Contact</a>
        </nav>

        <div className="hidden sm:block">
          <button
            onClick={onOpenBooking}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm transition-colors"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </button>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full text-ink/70 hover:bg-ink/5 transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-paper border-t border-ink/10 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-base text-ink/80">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-ink/10">About</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-ink/10">Specialties</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-ink/10">Gallery</a>
            <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-ink/10">Reviews</a>
            <a href="#clinics" onClick={() => setMobileMenuOpen(false)} className="py-1 border-b border-ink/10">Clinics</a>
            <a href="#appointment" onClick={() => setMobileMenuOpen(false)} className="py-1">Contact</a>
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 rounded-full bg-forest-600 text-white font-semibold text-base text-center"
          >
            Book Appointment
          </button>
        </div>
      )}
    </header>
  );
};
