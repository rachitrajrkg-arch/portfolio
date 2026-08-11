'use client';

import React, { useState } from 'react';
import { ClinicLocation, Service, DoctorProfile } from '../types';
import { CMSStore } from '../lib/payloadData';
import { Phone, CheckCircle2, MessageSquare, X, Clock } from 'lucide-react';

interface BookingProps {
  profile: DoctorProfile;
  clinics: ClinicLocation[];
  services: Service[];
  preselectedService?: string;
  preselectedClinic?: string;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const AppointmentForm: React.FC<BookingProps> = ({
  profile,
  clinics,
  services,
  preselectedService = '',
  preselectedClinic = '',
  isOpenModal = false,
  onCloseModal,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedClinic, setSelectedClinic] = useState(preselectedClinic || (clinics[0]?.name || ''));
  const [selectedService, setSelectedService] = useState(preselectedService || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const whatsappMessage = `Hello Dr. Rachit Raj, I would like to book an appointment.%0A` +
    `Name: ${encodeURIComponent(patientName || '-')}%0A` +
    `Phone: ${encodeURIComponent(phone || '-')}%0A` +
    `Clinic: ${encodeURIComponent(selectedClinic)}%0A` +
    `Treatment: ${encodeURIComponent(selectedService || 'General OPD')}%0A` +
    `Preferred Date: ${encodeURIComponent(preferredDate || 'Not specified')}`;

  const whatsappUrl = `https://wa.me/${profile.whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;
  const primaryClinic = clinics.find((c) => c.isPrimary) || clinics[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) return;

    CMSStore.addAppointment({
      patientName,
      phone,
      clinicId: selectedClinic,
      serviceId: selectedService,
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      preferredTime: "11:00 AM",
    });

    // Hand off straight to WhatsApp so the doctor gets the patient's name & number to call back.
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
  };

  const formFields = (
    <div className="space-y-4">
      {submitted ? (
        <div className="py-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-forest-600 mx-auto" />
          <h4 className="text-lg font-serif text-ink">Appointment Request Sent</h4>
          <p className="text-sm text-ink/60">Our clinic team will contact you shortly to confirm your slot.</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Confirm on WhatsApp
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink/70">Name *</label>
              <input
                type="text"
                required
                placeholder="Full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-base focus:border-forest-600 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink/70">Phone *</label>
              <input
                type="tel"
                required
                placeholder="+91 mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-base focus:border-forest-600 outline-none"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink/70">Clinic</label>
              <select
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-base focus:border-forest-600 outline-none"
              >
                {clinics.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-ink/70">Treatment</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-base focus:border-forest-600 outline-none"
              >
                <option value="">General OPD Consultation</option>
                {services.map((s) => (
                  <option key={s.id} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-ink/70">Preferred Date</label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-paper border border-ink/15 text-base focus:border-forest-600 outline-none"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-forest-600 hover:bg-forest-700 text-white font-semibold text-base transition-colors"
            >
              Book Appointment
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full border border-ink/15 hover:border-ink/30 text-ink/80 font-semibold text-base transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60">
        <div className="bg-paper rounded-2xl p-6 sm:p-8 max-w-lg w-full relative border border-ink/10">
          <button
            onClick={onCloseModal}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-ink/5 text-ink/50"
          >
            <X className="w-5 h-5" />
          </button>

          <h3 className="text-xl font-serif text-ink mb-6">Book OPD Consultation</h3>

          {formFields}
        </div>
      </div>
    );
  }

  return (
    <section id="appointment" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-10 items-start">

          <div className="md:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-ink">Book Your Appointment</h2>
            {formFields}
          </div>

          <div className="md:col-span-5 border border-ink/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-ink font-semibold text-base">
              <Clock className="w-4 h-4 text-forest-600" />
              <h3>Clinic Hours</h3>
            </div>

            <div className="space-y-2 text-base text-ink/70 pt-2 border-t border-ink/10">
              {primaryClinic && (
                <div className="flex justify-between gap-3">
                  <span>{primaryClinic.days}</span>
                  <span className="text-ink font-semibold text-right">{primaryClinic.timings}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Emergency OPD</span>
                <span className="text-forest-700 font-semibold">24/7 Helpline</span>
              </div>
            </div>

            <a
              href={`tel:${profile.emergencyContact}`}
              className="w-full py-2.5 rounded-full border border-ink/15 hover:border-ink/30 text-ink/80 font-semibold text-base text-center flex items-center justify-center gap-1.5 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {profile.emergencyContact}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
