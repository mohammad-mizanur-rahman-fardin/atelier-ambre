'use client';

import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    name: 'Sultana Begum',
    location: 'Gulshan, Dhaka',
    review: 'Oud Noir is nothing short of magnificent. The sillage lasts from Fajr to Isha. My colleagues always ask what I am wearing. Worth every taka.',
    rating: 5,
    product: 'Oud Noir',
    avatar: 'S',
  },
  {
    name: 'Rafiqul Hasan',
    location: 'Chittagong',
    review: 'I gifted Amber Royale to my wife on our anniversary. She says it reminds her of a warm embrace. The presentation was impeccable — true luxury.',
    rating: 5,
    product: 'Amber Royale',
    avatar: 'R',
  },
  {
    name: 'Nadia Chowdhury',
    location: 'Banani, Dhaka',
    review: 'Bergamot Velvet is my everyday signature now. Fresh yet sophisticated, it transitions beautifully from my morning meetings to evening gatherings.',
    rating: 5,
    product: 'Bergamot Velvet',
    avatar: 'N',
  },
  {
    name: 'Kamrul Islam',
    location: 'Sylhet',
    review: 'The scent quiz recommended Santal Mystique and it was perfect. The delivery was fast and the unboxing experience felt like opening a treasure.',
    rating: 5,
    product: 'Santal Mystique',
    avatar: 'K',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-surface-hover/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-2">
            Client Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            Voices of Our Patrons
          </h2>
          <div className="w-16 h-0.5 bg-amber mt-3 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border-subtle bg-surface p-6 hover:border-amber/20 transition-all duration-500 hover:luxury-shadow group"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber fill-amber" />
                ))}
              </div>

              <p className="text-sm text-text-secondary leading-relaxed mb-5 italic">
                &ldquo;{t.review}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center text-amber font-serif font-bold text-sm">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                    <CheckCircle className="w-3.5 h-3.5 text-success" />
                  </div>
                  <p className="text-xs text-text-muted">{t.location}</p>
                </div>
              </div>
              <span className="inline-block mt-3 text-[10px] text-amber bg-amber/10 px-2 py-0.5 rounded-full border border-amber/20">
                {t.product}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
