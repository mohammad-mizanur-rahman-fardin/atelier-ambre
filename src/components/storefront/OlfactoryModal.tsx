'use client';

import React, { useEffect } from 'react';
import { X, Droplets, Clock, Wind } from 'lucide-react';
import { useProductStore } from '@/store/product-store';

export default function OlfactoryModal() {
  const { selectedProduct, isOlfactoryModalOpen, closeOlfactoryModal } = useProductStore();

  // Body scroll lock
  useEffect(() => {
    if (isOlfactoryModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOlfactoryModalOpen]);

  if (!isOlfactoryModalOpen || !selectedProduct) return null;

  const sillageMap = { Intimate: 1, Moderate: 2, Strong: 3, Enormous: 4 };
  const sillageLevel = sillageMap[selectedProduct.sillage];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] animate-fade-in"
        onClick={closeOlfactoryModal}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[201] flex items-center justify-center p-4" onClick={closeOlfactoryModal}>
        <div
          className="w-full max-w-lg glass-strong rounded-2xl overflow-hidden luxury-shadow-lg animate-scale-in"
          onClick={(e) => e.stopPropagation()}
          id="olfactory-modal"
        >
          {/* Header */}
          <div
            className="relative px-6 py-8 text-center"
            style={{ background: selectedProduct.imageBg }}
          >
            <button
              onClick={closeOlfactoryModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center hover:bg-black/50 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            <Droplets className="w-8 h-8 text-white/60 mx-auto mb-3" />
            <h2 className="font-serif text-2xl font-bold text-white">{selectedProduct.name}</h2>
            <p className="text-white/60 text-sm mt-1 italic">{selectedProduct.subtitle}</p>
            <span className="inline-block mt-3 text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/20">
              {selectedProduct.scentFamily}
            </span>
          </div>

          {/* Olfactory Pyramid */}
          <div className="px-6 py-6 space-y-5">
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-[0.2em] text-center">
              Olfactory Pyramid
            </h3>

            {/* Top Notes */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-amber-light/20 flex items-center justify-center">
                  <span className="text-[10px] text-amber font-bold">T</span>
                </div>
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Top Notes
                </span>
                <span className="text-[10px] text-text-muted ml-auto">First 15 min</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-7">
                {selectedProduct.pyramid.top.map((note) => (
                  <span
                    key={note.name}
                    className="text-xs px-3 py-1.5 rounded-full bg-amber/10 text-amber border border-amber/20 font-medium"
                  >
                    {note.name}
                  </span>
                ))}
              </div>
              <div className="absolute left-2.5 top-7 bottom-0 w-px bg-gradient-to-b from-amber/40 to-amber/10" />
            </div>

            {/* Heart Notes */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center">
                  <span className="text-[10px] text-rose-400 font-bold">H</span>
                </div>
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Heart Notes
                </span>
                <span className="text-[10px] text-text-muted ml-auto">15 min – 3 hrs</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-7">
                {selectedProduct.pyramid.heart.map((note) => (
                  <span
                    key={note.name}
                    className="text-xs px-3 py-1.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-medium"
                  >
                    {note.name}
                  </span>
                ))}
              </div>
              <div className="absolute left-2.5 top-7 bottom-0 w-px bg-gradient-to-b from-rose-400/40 to-rose-400/10" />
            </div>

            {/* Base Notes */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <span className="text-[10px] text-violet-400 font-bold">B</span>
                </div>
                <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Base Notes
                </span>
                <span className="text-[10px] text-text-muted ml-auto">3+ hrs</span>
              </div>
              <div className="flex flex-wrap gap-2 ml-7">
                {selectedProduct.pyramid.base.map((note) => (
                  <span
                    key={note.name}
                    className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 font-medium"
                  >
                    {note.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Ratings */}
            <div className="border-t border-border-subtle pt-5 grid grid-cols-2 gap-4">
              {/* Sillage */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-3.5 h-3.5 text-amber" />
                  <span className="text-xs font-semibold text-text-primary">Sillage</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`flex-1 h-2 rounded-full transition-colors ${
                        level <= sillageLevel ? 'bg-amber' : 'bg-border'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-text-muted mt-1">{selectedProduct.sillage}</p>
              </div>

              {/* Longevity */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-3.5 h-3.5 text-amber" />
                  <span className="text-xs font-semibold text-text-primary">Longevity</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => {
                    const longevityLevel =
                      selectedProduct.longevity <= 4 ? 1 :
                      selectedProduct.longevity <= 8 ? 2 :
                      selectedProduct.longevity <= 11 ? 3 : 4;
                    return (
                      <div
                        key={level}
                        className={`flex-1 h-2 rounded-full transition-colors ${
                          level <= longevityLevel ? 'bg-amber' : 'bg-border'
                        }`}
                      />
                    );
                  })}
                </div>
                <p className="text-[10px] text-text-muted mt-1">{selectedProduct.longevity} hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
