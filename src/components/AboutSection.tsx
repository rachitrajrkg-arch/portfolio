import React from 'react';
import { DoctorProfile } from '../types';
import { StatsCounter } from './StatsCounter';

interface AboutProps {
  profile: DoctorProfile;
}

export const AboutSection: React.FC<AboutProps> = ({ profile }) => {
  return (
    <section id="about" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-start">

          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-ink/10 aspect-[6/10]">
              <img
                src="https://res.cloudinary.com/dlv1uvt41/image/upload/v1786444347/WhatsApp_Image_2026-08-11_at_11.35.41_AM_1_v7dhvu.jpg"
                alt="Doctor consultation"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-7 space-y-5">
            <p className="text-sm font-bold uppercase tracking-widest text-forest-700">About the Doctor</p>
            <h2 className="text-3xl sm:text-4xl font-serif text-ink">
              Trained at KGMU, focused on painless recovery
            </h2>
            <p className="text-ink/70 text-base leading-relaxed max-w-xl">
              {profile.longBio}
            </p>

            <ul className="space-y-2 pt-1 border-l border-ink/15 pl-4">
              {profile.degrees.map((degree) => (
                <li key={degree} className="text-base font-medium text-ink/80">
                  {degree}
                </li>
              ))}
            </ul>

            <StatsCounter profile={profile} />
          </div>

        </div>
      </div>
    </section>
  );
};
