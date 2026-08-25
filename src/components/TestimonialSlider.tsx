'use client';

import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { getInitials, getAvatarColor } from '../lib/avatarColor';
import { GOOGLE_REVIEWS_URL } from '../lib/payloadData';

interface TestimonialProps {
  testimonials: Testimonial[];
}

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial: t }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="snap-start shrink-0 w-[82%] sm:w-[340px] p-6 rounded-2xl border border-ink/10 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <div>
          <p
            className={`text-ink/80 text-base leading-relaxed ${expanded ? '' : 'line-clamp-5'}`}
          >
            "{t.comment}"
          </p>
          {t.comment.length > 180 && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-sm font-semibold text-forest-600 hover:text-forest-700 mt-1"
            >
              {expanded ? 'Show less' : '…more'}
            </button>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-ink/10 flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
          style={{ background: getAvatarColor(t.patientName) }}
        >
          {getInitials(t.patientName)}
        </div>
        <div className="min-w-0">
          <p className="text-base font-semibold text-ink truncate">{t.patientName}</p>
          <p className="text-sm text-ink/50 truncate">{t.procedure}</p>
        </div>
        {t.verified && (
          <CheckCircle2 className="w-4 h-4 text-forest-600 ml-auto shrink-0" aria-label="Verified patient" />
        )}
      </div>
    </div>
  );
};

export const TestimonialSlider: React.FC<TestimonialProps> = ({ testimonials }) => {
  const average = testimonials.length
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : null;

  return (
    <section id="reviews" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-serif text-ink">Patient Reviews</h2>
          <div className="flex flex-wrap items-center gap-4">
            {average && (
              <p className="text-base text-ink/60 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-ink">{average}</span>
                <span>· {testimonials.length} patient reviews</span>
              </p>
            )}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-ink/15 text-sm font-semibold text-ink/80 hover:bg-ink/5 transition-colors"
            >
              View All Reviews
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-4 px-4">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>

      </div>
    </section>
  );
};
