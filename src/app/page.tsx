'use client';

import React, { useState, useEffect } from 'react';
import { CMSStore } from '../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation, Testimonial, GalleryImage } from '../types';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ServicesGrid } from '../components/ServicesGrid';
import { GallerySection } from '../components/GallerySection';
import { ClinicLocations } from '../components/ClinicLocations';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { AppointmentForm } from '../components/AppointmentSection';
import { FloatingCTA } from '../components/FloatingCTA';
import { Footer } from '../components/Footer';

export default function HomePage() {
  const [profile, setProfile] = useState<DoctorProfile>(CMSStore.getProfile());
  const [services, setServices] = useState<Service[]>(CMSStore.getServices());
  const [clinics, setClinics] = useState<ClinicLocation[]>(CMSStore.getClinics());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(CMSStore.getTestimonials());
  const [gallery, setGallery] = useState<GalleryImage[]>(CMSStore.getGallery());

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [selectedClinicForBooking, setSelectedClinicForBooking] = useState('');

  useEffect(() => {
    setProfile(CMSStore.getProfile());
    setServices(CMSStore.getServices());
    setClinics(CMSStore.getClinics());
    setTestimonials(CMSStore.getTestimonials());
    setGallery(CMSStore.getGallery());
  }, []);

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
}
