'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost } from '../types';
import { BlogCard } from './BlogCard';

interface BlogSectionProps {
  posts: BlogPost[];
}

const CARD_STEP = 360; // card width (340) + gap

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (posts.length === 0) return null;

  const scrollByCard = (direction: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: direction * CARD_STEP, behavior: 'smooth' });
  };

  return (
    <section id="blog" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif text-ink">Latest from the Blog</h2>
            <p className="text-ink/60 text-base max-w-xl">
              Health guidance and recovery insights on laser proctology and laparoscopic surgery.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {posts.length > 3 && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCard(-1)}
                  aria-label="Previous posts"
                  className="w-9 h-9 rounded-full border border-ink/15 text-ink/70 hover:bg-forest-600 hover:text-white hover:border-forest-600 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCard(1)}
                  aria-label="Next posts"
                  className="w-9 h-9 rounded-full border border-ink/15 text-ink/70 hover:bg-forest-600 hover:text-white hover:border-forest-600 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold transition-colors"
            >
              View all posts
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-4 px-4"
        >
          {posts.map((post) => (
            <div key={post.id} className="snap-start shrink-0 w-[82%] sm:w-[340px] flex">
              <BlogCard post={post} className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
