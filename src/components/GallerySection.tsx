'use client';

import React, { useState, useRef, useLayoutEffect } from 'react';
import { GalleryImage } from '../types';
import { X } from 'lucide-react';

interface GalleryProps {
  images: GalleryImage[];
}

const AUTO_SCROLL_SPEED = 35; // px per second

export const GallerySection: React.FC<GalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const centeredRef = useRef(false);
  const pausedRef = useRef(false);

  const loopImages = [...images, ...images, ...images];

  const remeasure = () => {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.scrollWidth / 3;
    if (width <= 0) return;
    loopWidthRef.current = width;
    if (!centeredRef.current) {
      el.scrollLeft = width;
      centeredRef.current = true;
    }
  };

  useLayoutEffect(() => {
    centeredRef.current = false;
    remeasure();
    window.addEventListener('resize', remeasure);
    return () => window.removeEventListener('resize', remeasure);
  }, [images.length]);

  useLayoutEffect(() => {
    pausedRef.current = !!activeImage;
  }, [activeImage]);

  useLayoutEffect(() => {
    if (images.length === 0) return;
    let lastTime = Date.now();

    const id = window.setInterval(() => {
      const el = scrollRef.current;
      const now = Date.now();
      const deltaSeconds = (now - lastTime) / 1000;
      lastTime = now;

      if (el && !pausedRef.current) {
        el.scrollLeft += AUTO_SCROLL_SPEED * deltaSeconds;
      }
    }, 30);

    return () => window.clearInterval(id);
  }, [images.length]);

  const handleScroll = () => {
    const el = scrollRef.current;
    const width = loopWidthRef.current;
    if (!el || !width) return;
    if (el.scrollLeft < width * 0.5) {
      el.scrollLeft += width;
    } else if (el.scrollLeft > width * 1.5) {
      el.scrollLeft -= width;
    }
  };

  const pause = () => { pausedRef.current = true; };
  const resume = () => { if (!activeImage) pausedRef.current = false; };

  if (images.length === 0) return null;

  return (
    <section id="gallery" className="py-16 sm:py-20 border-t border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-5">

        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 className="text-3xl sm:text-4xl font-serif text-ink">Gallery</h2>
          <p className="text-ink/60 text-base max-w-sm">
            A look inside Dr. Rachit's Laser &amp; Laparoscopy Clinic.
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={pause}
        onPointerUp={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        className="flex gap-4 overflow-x-auto scroll-auto no-scrollbar pb-2 px-4 sm:px-6 lg:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {loopImages.map((img, i) => (
          <button
            key={`${img.id}-${i}`}
            onClick={() => setActiveImage(img)}
            className="group shrink-0 h-64 sm:h-80 rounded-xl overflow-hidden border border-ink/10 bg-forest-50"
            aria-label={`View ${img.caption}`}
          >
            <img
              src={img.url}
              alt={img.caption}
              onLoad={remeasure}
              className="h-full w-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </button>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80"
          onClick={() => setActiveImage(null)}
        >
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-paper/10 text-white hover:bg-paper/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImage.url}
            alt={activeImage.caption}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};
