import React from 'react';
import { ClinicLocation } from '../types';
import { MapPin, Clock, Navigation, Phone, MessageSquare } from 'lucide-react';

interface ClinicProps {
  clinics: ClinicLocation[];
  onOpenBooking: (clinicName?: string) => void;
}

export const ClinicLocations: React.FC<ClinicProps> = ({ clinics, onOpenBooking }) => {
  const primaryClinic = clinics.find((c) => c.isPrimary) || clinics[0];
  const otherClinics = clinics.filter((c) => c.id !== primaryClinic?.id);

  const whatsappUrl = (clinic: ClinicLocation) =>
    `https://wa.me/${clinic.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello, I would like to book an appointment at ${clinic.name}.`)}`;

  return (
    <section id="clinics" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <h2 className="text-2xl sm:text-3xl font-serif text-ink">Clinic &amp; OPD Hours</h2>

        {primaryClinic && (
          <div className="border border-ink/10 rounded-2xl overflow-hidden grid md:grid-cols-2">
            <div className="h-64 md:h-full">
              <iframe
                title={`Map to ${primaryClinic.name}`}
                src={primaryClinic.mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="p-6 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-forest-700">Primary Clinic</p>
                  <h3 className="text-xl font-serif text-ink mt-1">{primaryClinic.name}</h3>
                  <p className="text-base text-forest-700 mt-0.5">{primaryClinic.tagline}</p>
                </div>

                <div className="space-y-2.5 text-base text-ink/70 pt-3 border-t border-ink/10">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-ink/40 shrink-0 mt-0.5" />
                    <p className="leading-snug">{primaryClinic.address}, {primaryClinic.city}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-ink/40 shrink-0" />
                    <span>{primaryClinic.days} · {primaryClinic.timings}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-ink/40 shrink-0" />
                    <a href={`tel:${primaryClinic.phone}`} className="hover:text-forest-700 transition-colors">{primaryClinic.phone}</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => onOpenBooking(primaryClinic.name)}
                  className="flex-1 py-2.5 px-4 rounded-full bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold transition-colors"
                >
                  Book Appointment
                </button>
                <a
                  href={whatsappUrl(primaryClinic)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={primaryClinic.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-full border border-ink/15 text-ink/70 hover:border-ink/30 text-sm font-semibold transition-colors flex items-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {otherClinics.length > 0 && (
          <div className="space-y-5 pt-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-ink/50">Also available at</p>
            <div className="grid md:grid-cols-2 gap-6">
              {otherClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className="border border-ink/10 rounded-2xl overflow-hidden flex flex-col"
                >
                  {clinic.imageUrl && (
                    <div className="h-32 overflow-hidden">
                      <img
                        src={clinic.imageUrl}
                        alt={clinic.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div>
                        <h3 className="text-base font-semibold text-ink">{clinic.name}</h3>
                        <p className="text-sm text-forest-700 mt-0.5">{clinic.tagline}</p>
                      </div>

                      <div className="space-y-1.5 text-sm text-ink/70 pt-2 border-t border-ink/10">
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
                        className="flex-1 py-2 px-4 rounded-full bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold transition-colors"
                      >
                        Book Slot
                      </button>
                      <a
                        href={clinic.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-4 rounded-full border border-ink/15 text-ink/70 hover:border-ink/30 text-sm font-semibold transition-colors flex items-center gap-1.5"
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
        )}

      </div>
    </section>
  );
};
