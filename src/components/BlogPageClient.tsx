'use client';

import React, { useState } from 'react';
import { DoctorProfile, Service, ClinicLocation, BlogPost } from '../types';
import { BlogCard } from './BlogCard';
import { Header } from './Header';
import { AppointmentForm } from './AppointmentSection';
import { FloatingCTA } from './FloatingCTA';
import { Footer } from './Footer';

interface BlogPageClientProps {
  profile: DoctorProfile;
  services: Service[];
  clinics: ClinicLocation[];
  posts: BlogPost[];
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({ profile, services, clinics, posts }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const primaryClinic = clinics.find((c) => c.isPrimary) || clinics[0];

  return (
    <main className="min-h-screen bg-paper relative flex flex-col">
      <Header profile={profile} primaryClinic={primaryClinic} onOpenBooking={() => setBookingModalOpen(true)} />

      <section className="py-16 sm:py-20 border-t border-ink/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif text-ink">Health &amp; Recovery Blog</h1>
            <p className="text-ink/60 text-base max-w-xl">
              Guidance on laser proctology, laparoscopic surgery and daycare recovery from {profile.name}.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="text-ink/60 text-base">No posts published yet — check back soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FloatingCTA profile={profile} />
      <Footer profile={profile} />

      {bookingModalOpen && (
        <AppointmentForm
          profile={profile}
          clinics={clinics}
          services={services}
          isOpenModal={true}
          onCloseModal={() => setBookingModalOpen(false)}
        />
      )}
    </main>
  );
};
