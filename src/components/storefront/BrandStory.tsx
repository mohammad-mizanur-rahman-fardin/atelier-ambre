'use client';

import React from 'react';
import { Gem, Leaf, FlaskConical } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="story" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-80 h-80 bg-amber/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-espresso/30 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Decorative Visual */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border-subtle bg-gradient-to-br from-espresso/40 via-noir-lighter to-espresso/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-amber/30 flex items-center justify-center bg-amber/5">
                  <FlaskConical className="w-16 h-16 text-amber/60" />
                </div>
                <p className="font-serif text-2xl text-text-primary font-semibold mb-2">Since 2020</p>
                <p className="text-text-secondary text-sm">Dhaka, Bangladesh</p>
                <div className="flex justify-center gap-6 mt-8">
                  <div className="text-center">
                    <p className="text-2xl font-serif font-bold text-gold-gradient">150+</p>
                    <p className="text-[10px] text-text-muted mt-1">Raw Ingredients</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-serif font-bold text-gold-gradient">12</p>
                    <p className="text-[10px] text-text-muted mt-1">Master Blends</p>
                  </div>
                  <div className="w-px h-10 bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-serif font-bold text-gold-gradient">5K+</p>
                    <p className="text-[10px] text-text-muted mt-1">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-amber text-noir px-5 py-3 rounded-xl font-serif font-semibold text-sm luxury-shadow">
              Artisan Crafted
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-3">
              Our Heritage
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
              A Legacy Woven <br />
              <span className="text-gold-gradient">in Amber & Oud</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Atelier Ambre was born from a singular vision — to bring the world&apos;s most exquisite
              olfactory compositions to the discerning patrons of South Asia. Each fragrance in our
              maison is the product of months of patient artistry, blending rare essences sourced from
              the amber forests of the Baltics to the oud plantations of Cambodia.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Our master perfumer, trained in the traditions of Grasse, brings a distinctly Bangladeshi
              sensibility to every creation — honoring the rich aromatic heritage of the subcontinent
              while pushing the boundaries of modern perfumery.
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                  <Gem className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Rare Ingredients</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Sourced from 12 countries — only the finest botanical extracts and absolutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Sustainable Craft</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Ethically harvested, cruelty-free, and packaged in recyclable luxury vessels.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber/10 flex items-center justify-center flex-shrink-0">
                  <FlaskConical className="w-5 h-5 text-amber" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">Small Batch Excellence</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    Each batch is limited to ensure uncompromising quality and exclusivity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
