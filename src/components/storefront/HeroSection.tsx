'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-noir via-espresso/30 to-noir" />
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber/5 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber/3 rounded-full blur-[150px]" />
        
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative top line */}
        <div className="flex items-center justify-center gap-4 mb-8 opacity-0 animate-fade-in-up">
          <div className="w-12 h-px bg-amber/40" />
          <Sparkles className="w-4 h-4 text-amber/60" />
          <div className="w-12 h-px bg-amber/40" />
        </div>

        {/* Eyebrow */}
        <p className="text-amber/80 text-sm font-medium tracking-[0.3em] uppercase mb-6 opacity-0 animate-fade-in-up animate-delay-100">
          The Art of Olfactory Excellence
        </p>

        {/* Main headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory leading-[1.1] mb-6 opacity-0 animate-fade-in-up animate-delay-200">
          Where Artistry
          <br />
          <span className="text-gold-gradient">Meets Aroma</span>
        </h1>

        {/* Subheading */}
        <p className="text-text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-10 opacity-0 animate-fade-in-up animate-delay-300">
          Each fragrance in our collection is a hand-crafted opus — rare ingredients sourced from the world&apos;s most
          storied groves, distilled into liquid poetry by our master perfumers in Dhaka.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in-up animate-delay-400">
          <Link
            href="/collections"
            className="group flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/25 active:scale-[0.98]"
          >
            Explore Collection
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#quiz"
            className="flex items-center gap-2 border border-amber/40 text-amber hover:bg-amber-glow px-8 py-4 rounded-xl font-medium transition-all hover:border-amber"
          >
            <Sparkles className="w-4 h-4" />
            Find Your Signature Scent
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 sm:gap-12 max-w-lg mx-auto items-center opacity-0 animate-fade-in-up animate-delay-500">
          {[
            { value: '24+', label: 'Formulations' },
            { value: '8', label: 'Rare Accords' },
            { value: '6+', label: 'Years Aging' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-serif font-bold text-gold-gradient">{stat.value}</p>
              <p className="text-xs text-text-muted mt-1.5 tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in animate-delay-500">
        <span className="text-[10px] text-text-muted tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-amber/60 to-transparent" />
      </div>
    </section>
  );
}
