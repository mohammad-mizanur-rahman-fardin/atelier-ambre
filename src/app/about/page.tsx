'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import Link from 'next/link';
import { ArrowRight, Leaf, Heart, FlaskRound, Globe, Sparkles } from 'lucide-react';

const values = [
  {
    icon: FlaskRound,
    title: 'Artisanal Mastery',
    description:
      'Every fragrance is meticulously composed by hand in our Dhaka atelier — never mass-produced. We believe that perfumery is one of the last true artisanal crafts, where a single accord can take months to perfect.',
  },
  {
    icon: Leaf,
    title: 'Ethical Sourcing',
    description:
      'From Mysore sandalwood to Grasse jasmine, each ingredient is sourced through verified fair-trade cooperatives. We invest directly in grower communities, ensuring sustainability from soil to bottle.',
  },
  {
    icon: Globe,
    title: 'Rare Provenance',
    description:
      'We travel the world\'s most storied groves — Cambodian oud forests, Turkish rose valleys, Calabrian bergamot orchards — to secure ingredients of uncompromising purity and character.',
  },
  {
    icon: Heart,
    title: 'Made with Devotion',
    description:
      'Our fragrances are aged for a minimum of 6 months before release, allowing the olfactory composition to mature into a harmonious, multi-layered experience worthy of the Atelier Ambre name.',
  },
];

const milestones = [
  { year: '2020', title: 'The Founding', description: 'Atelier Ambre was born in a modest Dhaka workshop with a singular vision: to bring haute parfumerie to Bangladesh.' },
  { year: '2021', title: 'First Collection', description: 'Our debut collection of four signature scents launched to critical acclaim, establishing our reputation for uncompromising quality.' },
  { year: '2022', title: 'The Atelier Expands', description: 'We expanded our maceration cellar and partnered with rare ingredient houses in Grasse, France and Kannauj, India.' },
  { year: '2023', title: 'Oud Noir Phenomenon', description: 'Oud Noir became our bestselling fragrance, earning recognition as one of the finest oud compositions in South Asia.' },
  { year: '2024', title: 'Gulshan Flagship', description: 'The Atelier Ambre flagship experience center opened at Gulshan Avenue, Dhaka — a sensory gallery for fragrance connoisseurs.' },
  { year: '2025', title: '24+ Rare Ingredients', description: 'Our ingredient library reached 24+ rare accords sourced from 12 countries, enabling bespoke fragrance commissions.' },
];

export default function AboutPage() {
  return (
    <PageShell>
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Banner */}
          <section className="text-center mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-amber/40" />
              <Sparkles className="w-4 h-4 text-amber/60" />
              <div className="w-12 h-px bg-amber/40" />
            </div>
            <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-4">
              Our Heritage
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
              The Art of
              <br />
              <span className="text-gold-gradient">Olfactory Excellence</span>
            </h1>
            <div className="w-16 h-0.5 bg-amber rounded-full mx-auto mb-6" />
            <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              From a modest workshop in Dhaka to one of South Asia&apos;s most distinguished perfume houses,
              Atelier Ambre has spent over six years mastering the delicate alchemy of turning rare
              ingredients into liquid poetry.
            </p>
          </section>

          {/* Brand Manifesto */}
          <section className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-3">
                  Brand Manifesto
                </p>
                <h2 className="font-serif text-3xl font-bold text-text-primary mb-6">
                  Where Every Drop Tells a Story
                </h2>
                <div className="space-y-4 text-text-secondary text-sm leading-relaxed">
                  <p>
                    At Atelier Ambre, we believe that fragrance is the most intimate form of self-expression.
                    It is invisible yet unforgettable — a signature that lingers long after you&apos;ve left the room.
                    We don&apos;t create perfumes for the masses; we compose bespoke olfactory experiences for the discerning few.
                  </p>
                  <p>
                    Our name pays homage to amber — that ancient fossilized resin treasured across civilizations
                    for its warmth, depth, and ethereal glow. Like amber itself, our fragrances capture a moment
                    in time, preserving the essence of the world&apos;s rarest botanicals in each flacon.
                  </p>
                  <p>
                    Every composition begins with a story. Our master perfumer draws inspiration from the sensory
                    tapestry of Bangladesh — the monsoon rains on terracotta, the twilight fragrance of jasmine
                    blooming in old Dhaka gardens, the smoky incense of centuries-old shrines. These memories are
                    distilled into accords that transcend geography and time.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="rounded-2xl border border-border overflow-hidden bg-surface p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-amber/10 flex items-center justify-center">
                      <FlaskRound className="w-6 h-6 text-amber" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-text-primary">The Master Perfumer</h3>
                      <p className="text-xs text-text-muted">Dhaka Atelier, Since 2020</p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Our founder and master perfumer trained under the legendary noses of Grasse before
                    returning to Dhaka with a revolutionary vision: to marry French haute parfumerie
                    techniques with the rich aromatic traditions of South Asia. The result is a uniquely
                    Bangladeshi luxury — compositions that honor both heritage and modernity.
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-subtle">
                    {[
                      { value: '24+', label: 'Rare Ingredients' },
                      { value: '8', label: 'Signature Scents' },
                      { value: '6+', label: 'Years of Craft' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-xl font-serif font-bold text-gold-gradient">{stat.value}</p>
                        <p className="text-[10px] text-text-muted mt-1 tracking-wider">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-amber/5 rounded-3xl blur-2xl -z-10" />
              </div>
            </div>
          </section>

          {/* Olfactive Philosophy */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-3">
                Our Philosophy
              </p>
              <h2 className="font-serif text-3xl font-bold text-text-primary">
                Pillars of Excellence
              </h2>
              <div className="w-16 h-0.5 bg-amber mt-3 rounded-full mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="group rounded-2xl border border-border-subtle hover:border-amber/30 p-8 transition-all duration-500 hover:gold-border-glow bg-surface"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center mb-5 group-hover:bg-amber/20 transition-colors">
                    <value.icon className="w-6 h-6 text-amber" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-3">
                Our Journey
              </p>
              <h2 className="font-serif text-3xl font-bold text-text-primary">
                Milestones
              </h2>
              <div className="w-16 h-0.5 bg-amber mt-3 rounded-full mx-auto" />
            </div>

            <div className="relative">
              {/* Center line */}
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-amber/40 via-amber/20 to-transparent" />

              <div className="space-y-8">
                {milestones.map((milestone, idx) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-start gap-6 sm:gap-0 ${
                      idx % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    }`}
                  >
                    {/* Dot */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-amber border-2 border-background z-10 mt-1.5" />

                    {/* Content */}
                    <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${idx % 2 === 0 ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                      <span className="inline-block text-amber text-xs font-semibold tracking-wider mb-1.5">
                        {milestone.year}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-text-primary mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center rounded-2xl border border-border bg-surface p-12 sm:p-16">
            <h2 className="font-serif text-3xl font-bold text-text-primary mb-4">
              Discover Your Signature
            </h2>
            <p className="text-text-secondary max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              Explore our curated collection of artisanal fragrances and find the scent that speaks to your soul.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/collections"
                className="group flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/25 active:scale-[0.98]"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center gap-2 border border-amber/40 text-amber hover:bg-amber-glow px-8 py-4 rounded-xl font-medium transition-all hover:border-amber"
              >
                Contact Our Concierge
              </Link>
            </div>
          </section>
        </div>
      </div>
    </PageShell>
  );
}
