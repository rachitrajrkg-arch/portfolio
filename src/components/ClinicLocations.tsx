import React from 'react';
import { ClinicLocation } from '../types';
import { MapPin, Clock, Navigation } from 'lucide-react';

interface ClinicProps {
  clinics: ClinicLocation[];
  onOpenBooking: (clinicName?: string) => void;
}

export const ClinicLocations: React.FC<ClinicProps> = ({ clinics, onOpenBooking }) => {
  return (
    <section id="clinics" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <h2 className="text-2xl sm:text-3xl font-serif text-ink">Clinics &amp; OPD Hours</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {clinics.map((clinic) => (
            <div
              key={clinic.id}
              className="border border-ink/10 rounded-2xl overflow-hidden flex flex-col"
            >
              {clinic.imageUrl && (
                <div className="h-36 overflow-hidden">
                  <img
                    src={clinic.imageUrl}
                    alt={clinic.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-ink">{clinic.name}</h3>
                    <p className="text-xs text-forest-700 mt-0.5">{clinic.tagline}</p>
                  </div>

                  <div className="space-y-2 text-xs text-ink/70 pt-2 border-t border-ink/10">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-ink/40 shrink-0 mt-0.5" />
                      <p className="leading-snug">{clinic.address}, {clinic.city}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-ink/40 shrink-0" />
                      <span>{clinic.days} · {clinic.timings}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onOpenBooking(clinic.name)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-forest-600 hover:bg-forest-700 text-white text-xs font-medium transition-colors"
                  >
                    Book Slot
                  </button>
                  <a
                    href={clinic.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-4 rounded-full border border-ink/15 text-ink/70 hover:border-ink/30 text-xs font-medium transition-colors flex items-center gap-1.5"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Map</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
