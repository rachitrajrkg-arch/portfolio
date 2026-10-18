import { getValue } from '../lib/db';
import { listBlogPosts } from '../lib/blogDb';
import {
  INITIAL_DOCTOR_PROFILE,
  INITIAL_SERVICES,
  INITIAL_CLINICS,
  INITIAL_TESTIMONIALS,
  INITIAL_DOCTOR_GALLERY,
  INITIAL_CLINIC_GALLERY,
} from '../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation, Testimonial, GalleryImage } from '../types';
import { HomePageClient } from '../components/HomePageClient';

// Always fetch fresh from Neon on every request — admin edits must show up immediately,
// not only after a rebuild.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [profile, services, clinics, testimonials, doctorGallery, clinicGallery, blogPosts] = await Promise.all([
    getValue<DoctorProfile>('profile').then((v) => v ?? INITIAL_DOCTOR_PROFILE),
    getValue<Service[]>('services').then((v) => v ?? INITIAL_SERVICES),
    getValue<ClinicLocation[]>('clinics').then((v) => v ?? INITIAL_CLINICS),
    getValue<Testimonial[]>('testimonials').then((v) => v ?? INITIAL_TESTIMONIALS),
    getValue<GalleryImage[]>('doctorGallery').then((v) => v ?? INITIAL_DOCTOR_GALLERY),
    getValue<GalleryImage[]>('clinicGallery').then((v) => v ?? INITIAL_CLINIC_GALLERY),
    listBlogPosts({ includeDrafts: false }).then((posts) => posts.slice(0, 5)),
  ]);

  return (
    <HomePageClient
      profile={profile}
      services={services}
      clinics={clinics}
      testimonials={testimonials}
      doctorGallery={doctorGallery}
      clinicGallery={clinicGallery}
      blogPosts={blogPosts}
    />
  );
}
