'use client';

import React, { useState } from 'react';
import { DoctorProfile, Service, ClinicLocation, Testimonial, GalleryImage } from '../types';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesGrid } from './ServicesGrid';
import { GallerySection } from './GallerySection';
import { ClinicLocations } from './ClinicLocations';
import { TestimonialSlider } from './TestimonialSlider';
import { AppointmentForm } from './AppointmentSection';
import { FloatingCTA } from './FloatingCTA';
import { Footer } from './Footer';

interface HomePageClientProps {
  profile: DoctorProfile;
  services: Service[];
  clinics: ClinicLocation[];
  testimonials: Testimonial[];
  gallery: GalleryImage[];
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  profile,
  services,
  clinics,
  testimonials,
  gallery,
}) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [selectedClinicForBooking, setSelectedClinicForBooking] = useState('');

  const handleOpenBooking = (serviceOrClinicName?: string) => {
    if (serviceOrClinicName) {
      if (clinics.some(c => c.name === serviceOrClinicName)) {
        setSelectedClinicForBooking(serviceOrClinicName);
      } else {
        setSelectedServiceForBooking(serviceOrClinicName);
      }
    }
    setBookingModalOpen(true);
  };

  const primaryClinic = clinics.find((c) => c.isPrimary) || clinics[0];

  return (
    <main className="min-h-screen bg-paper relative flex flex-col">
      {/* 1. Header */}
      <Header profile={profile} primaryClinic={primaryClinic} onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Hero: name, credentials, primary CTAs */}
      <HeroSection profile={profile} onOpenBooking={() => handleOpenBooking()} />

      {/* 3. About: bio, degrees, trust-strip stats */}
      <AboutSection profile={profile} />

      {/* 4. Surgical Specialties */}
      <ServicesGrid services={services} onOpenBooking={(serviceName) => handleOpenBooking(serviceName)} />

      {/* 5. Clinic Gallery */}
      <GallerySection images={gallery} />

      {/* 6. Patient Reviews */}
      <TestimonialSlider testimonials={testimonials} />

      {/* 6. Clinic OPD Locations */}
      <ClinicLocations clinics={clinics} onOpenBooking={(clinicName) => handleOpenBooking(clinicName)} />

      {/* 7. Book Appointment */}
      <AppointmentForm profile={profile} clinics={clinics} services={services} />

      {/* Single floating WhatsApp action */}
      <FloatingCTA profile={profile} />

      <Footer profile={profile} />

      {bookingModalOpen && (
        <AppointmentForm
          profile={profile}
          clinics={clinics}
          services={services}
          preselectedService={selectedServiceForBooking}
          preselectedClinic={selectedClinicForBooking}
          isOpenModal={true}
          onCloseModal={() => setBookingModalOpen(false)}
        />
      )}
    </main>
  );
};
