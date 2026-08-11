import React from 'react';
import { DoctorProfile } from '../types';

interface StatsProps {
  profile: DoctorProfile;
}

export const StatsCounter: React.FC<StatsProps> = ({ profile }) => {
  return (
    <div className="pt-6 mt-6 border-t border-ink/10 grid grid-cols-3 gap-4 max-w-md">
      <div>
        <p className="text-xl font-serif text-forest-700">{profile.experienceYears}+</p>
        <p className="text-sm text-ink/50 mt-0.5">Years Experience</p>
      </div>
      <div>
        <p className="text-xl font-serif text-forest-700">{profile.surgeriesCount.toLocaleString()}+</p>
        <p className="text-sm text-ink/50 mt-0.5">Procedures</p>
      </div>
      <div>
        <p className="text-xl font-serif text-forest-700">KGMU</p>
        <p className="text-sm text-ink/50 mt-0.5">Lucknow Alumnus</p>
      </div>
    </div>
  );
};
