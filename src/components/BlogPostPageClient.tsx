'use client';

import React, { useState } from 'react';
import { DoctorProfile, Service, ClinicLocation, BlogPost } from '../types';
import { estimateReadTime, formatBlogDate } from '../lib/blogUtils';
import { Header } from './Header';
import { BlockRenderer } from './BlockRenderer';
import { AppointmentForm } from './AppointmentSection';
import { FloatingCTA } from './FloatingCTA';
import { Footer } from './Footer';

interface BlogPostPageClientProps {
  profile: DoctorProfile;
  services: Service[];
  clinics: ClinicLocation[];
  post: BlogPost;
}

export const BlogPostPageClient: React.FC<BlogPostPageClientProps> = ({ profile, services, clinics, post }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const primaryClinic = clinics.find((c) => c.isPrimary) || clinics[0];
  const updatesNewestFirst = [...post.content.updates].reverse();

  return (
    <main className="min-h-screen bg-paper relative flex flex-col">
      <Header profile={profile} primaryClinic={primaryClinic} onOpenBooking={() => setBookingModalOpen(true)} />

      <article className="py-16 sm:py-20 border-t border-ink/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-3">
            {post.category && (
              <span className="inline-block px-2.5 py-1 rounded-full bg-forest-50 text-forest-700 text-sm font-semibold">
                {post.category}
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-serif text-ink leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/50">
              <span>{post.author}</span>
              <span>·</span>
              {post.publishedAt && <span>Published {formatBlogDate(post.publishedAt)}</span>}
              <span>·</span>
              <span>{estimateReadTime(post.content)}</span>
            </div>
          </div>

          {post.coverUrl && (
            <div className="rounded-2xl border border-ink/10 overflow-hidden">
              <img src={post.coverUrl} alt={post.title} className="w-full h-auto object-cover" />
            </div>
          )}

          <div className="space-y-10">
            {updatesNewestFirst.map((update) => (
              <div key={update.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-forest-600 text-white text-sm font-semibold">
                    Update — {formatBlogDate(update.date)}
                  </span>
                </div>
                <BlockRenderer blocks={update.blocks} />
              </div>
            ))}

            {updatesNewestFirst.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-ink/10">
                <span className="text-sm font-semibold uppercase tracking-widest text-ink/40">
                  Original — {post.publishedAt ? formatBlogDate(post.publishedAt) : ''}
                </span>
              </div>
            )}

            <BlockRenderer blocks={post.content.original.blocks} />
          </div>
        </div>
      </article>

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
