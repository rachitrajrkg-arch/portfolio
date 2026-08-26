import { getValue } from '../lib/db';
import {
  INITIAL_DOCTOR_PROFILE,
  INITIAL_SERVICES,
  INITIAL_CLINICS,
  INITIAL_TESTIMONIALS,
  INITIAL_GALLERY,
} from '../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation, Testimonial, GalleryImage } from '../types';
import { HomePageClient } from '../components/HomePageClient';

// Always fetch fresh from Neon on every request — admin edits must show up immediately,
// not only after a rebuild.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [profile, services, clinics, testimonials, gallery] = await Promise.all([
    getValue<DoctorProfile>('profile').then((v) => v ?? INITIAL_DOCTOR_PROFILE),
    getValue<Service[]>('services').then((v) => v ?? INITIAL_SERVICES),
    getValue<ClinicLocation[]>('clinics').then((v) => v ?? INITIAL_CLINICS),
    getValue<Testimonial[]>('testimonials').then((v) => v ?? INITIAL_TESTIMONIALS),
    getValue<GalleryImage[]>('gallery').then((v) => v ?? INITIAL_GALLERY),
  ]);

  return (
    <HomePageClient
      profile={profile}
      services={services}
      clinics={clinics}
      testimonials={testimonials}
      gallery={gallery}
    />
  );
}
