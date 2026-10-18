import { getValue } from '../../lib/db';
import { listBlogPosts } from '../../lib/blogDb';
import { INITIAL_DOCTOR_PROFILE, INITIAL_SERVICES, INITIAL_CLINICS } from '../../lib/payloadData';
import { DoctorProfile, Service, ClinicLocation } from '../../types';
import { BlogPageClient } from '../../components/BlogPageClient';
import { Metadata } from 'next';

// Same freshness convention as the homepage — admin edits (and new posts) show up
// immediately, without a rebuild.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Dr. Rachit Raj — Dr. Rachit\'s Laser & Laparoscopy Clinic',
  description: 'Health guidance on laser proctology, laparoscopic surgery and daycare recovery from Dr. Rachit Raj, Gomti Nagar, Lucknow.',
};

export default async function BlogIndexPage() {
  const [profile, services, clinics, posts] = await Promise.all([
    getValue<DoctorProfile>('profile').then((v) => v ?? INITIAL_DOCTOR_PROFILE),
    getValue<Service[]>('services').then((v) => v ?? INITIAL_SERVICES),
    getValue<ClinicLocation[]>('clinics').then((v) => v ?? INITIAL_CLINICS),
    listBlogPosts({ includeDrafts: false }),
  ]);

  return <BlogPageClient profile={profile} services={services} clinics={clinics} posts={posts} />;
}
