'use client';

import React from 'react';
import PageShell from '@/components/PageShell';
import HeroSection from '@/components/storefront/HeroSection';
import FeaturedCollection from '@/components/storefront/FeaturedCollection';
import ScentQuiz from '@/components/storefront/ScentQuiz';
import BrandStory from '@/components/storefront/BrandStory';
import Testimonials from '@/components/storefront/Testimonials';

export default function HomePage() {
  return (
    <PageShell>
      <HeroSection />
      <FeaturedCollection />
      <ScentQuiz />
      <BrandStory />
      <Testimonials />
    </PageShell>
  );
}
