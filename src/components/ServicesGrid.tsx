'use client';

import React from 'react';
import { Service } from '../types';
import { Zap, Activity, HeartPulse, ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  services: Service[];
  onOpenBooking: (serviceName?: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Activity,
  HeartPulse,
};

export const ServicesGrid: React.FC<ServicesProps> = ({ services, onOpenBooking }) => {
  return (
    <section id="services" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-serif text-ink">Surgical Specialties</h2>
          <p className="text-ink/60 text-sm max-w-sm">
            Daycare procedures with same-day discharge and minimal recovery time.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Zap;

            return (
              <div
                key={service.id}
                className="group border border-ink/10 rounded-2xl overflow-hidden hover:border-ink/20 transition-colors flex flex-col"
              >
                <div className="h-40 overflow-hidden relative bg-forest-50">
                  {service.imageUrl && (
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-paper flex items-center justify-center text-forest-700">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{service.title}</h3>
                    <p className="text-xs text-ink/60 mt-1.5 leading-relaxed line-clamp-2">{service.shortDesc}</p>
                  </div>

                  <div className="pt-3 border-t border-ink/10 flex items-center justify-between">
                    <span className="text-[11px] text-ink/50">
                      {service.procedureTime} · {service.recoveryTime}
                    </span>
                    <button
                      onClick={() => onOpenBooking(service.title)}
                      className="w-7 h-7 rounded-full border border-ink/15 text-ink/70 hover:bg-forest-600 hover:text-white hover:border-forest-600 flex items-center justify-center transition-colors"
                      aria-label={`Book ${service.title}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
