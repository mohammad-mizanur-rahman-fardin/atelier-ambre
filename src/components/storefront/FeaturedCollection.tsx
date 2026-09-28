'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { useProductStore } from '@/store/product-store';

export default function FeaturedCollection() {
  const { products } = useProductStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const featured = products.filter((p) => p.featured);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 360;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="featured" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-2">
              Curated Selection
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
              Signature Collection
            </h2>
            <div className="w-16 h-0.5 bg-amber mt-3 rounded-full" />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-amber hover:bg-amber-glow transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-text-secondary" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:border-amber hover:bg-amber-glow transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {featured.map((product) => (
            <div key={product.id} className="min-w-[320px] max-w-[340px] snap-start flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
