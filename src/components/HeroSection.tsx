'use client';

import React from 'react';
import { DoctorProfile } from '../types';
import { Calendar, Phone, ExternalLink } from 'lucide-react';

interface HeroProps {
  profile: DoctorProfile;
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ profile, onOpenBooking }) => {
  const linkedinUrl = "https://www.linkedin.com/in/rachit-raj-b34220189/";

  return (
    <section className="py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-16 items-center">

          <div className="md:col-span-7 space-y-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-700">
              {profile.heroBadge} 
            </p>

            <div>
              <h1 className="text-4xl sm:text-5xl font-serif text-ink leading-[1.1]">
                {profile.name}
              </h1>
              <p className="text-base sm:text-lg text-ink/70 mt-2">
                {profile.titles}
              </p>
              <p className="text-base sm:text-base text-forest-700 font-semibold mt-1">
                {profile.clinicName}
              </p>
            </div>

            <p className="text-ink/70 text-base sm:text-base leading-relaxed max-w-xl">
              {profile.bio}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-full bg-forest-600 hover:bg-forest-700 text-white font-semibold text-base transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

              <a
                href={`tel:${profile.phonePrimary}`}
                className="px-5 py-3 rounded-full text-ink/80 font-semibold text-base border border-ink/15 hover:border-ink/30 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>{profile.phonePrimary}</span>
              </a>
            </div>

            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-ink/50 hover:text-forest-700 transition-colors"
            >
              <span>Verified LinkedIn profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="rounded-2xl overflow-hidden border border-ink/10 aspect-[4/5] bg-forest-50">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-5 left-5 right-5 bg-paper border border-ink/10 rounded-xl px-4 py-3 flex items-center justify-around text-center shadow-sm">
                <div>
                  <p className="text-lg font-serif text-forest-700">{profile.experienceYears}+</p>
                  <p className="text-sm text-ink/50 uppercase tracking-wide">Years</p>
                </div>
                <div className="w-px h-8 bg-ink/10" />
                <div>
                  <p className="text-lg font-serif text-forest-700">{profile.surgeriesCount.toLocaleString()}+</p>
                  <p className="text-sm text-ink/50 uppercase tracking-wide">Surgeries</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
