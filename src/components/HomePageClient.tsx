'use client';

import React, { useState } from 'react';
import { DoctorProfile, Service, ClinicLocation, Testimonial, GalleryImage, BlogPost } from '../types';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { ServicesGrid } from './ServicesGrid';
import { ClinicLocations } from './ClinicLocations';
import { TestimonialSlider } from './TestimonialSlider';
import { BlogSection } from './BlogSection';
import { AppointmentForm } from './AppointmentSection';
import { FloatingCTA } from './FloatingCTA';
import { Footer } from './Footer';

interface HomePageClientProps {
  profile: DoctorProfile;
  services: Service[];
  clinics: ClinicLocation[];
  testimonials: Testimonial[];
  doctorGallery: GalleryImage[];
  clinicGallery: GalleryImage[];
  blogPosts: BlogPost[];
}

export const HomePageClient: React.FC<HomePageClientProps> = ({
  profile,
  services,
  clinics,
  testimonials,
  doctorGallery,
  clinicGallery,
  blogPosts,
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

      {/* 3. About: bio, degrees, trust-strip stats, doctor gallery */}
      <AboutSection profile={profile} doctorGallery={doctorGallery} />

      {/* 4. Surgical Specialties */}
      <ServicesGrid services={services} onOpenBooking={(serviceName) => handleOpenBooking(serviceName)} />

      {/* 5. Patient Reviews */}
      <TestimonialSlider testimonials={testimonials} />

      {/* 6. Latest blog posts (hidden until at least one is published) */}
      <BlogSection posts={blogPosts} />

      {/* 7. Clinic OPD Locations + clinic gallery */}
      <ClinicLocations clinics={clinics} clinicGallery={clinicGallery} onOpenBooking={(clinicName) => handleOpenBooking(clinicName)} />

      {/* 8. Book Appointment */}
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
