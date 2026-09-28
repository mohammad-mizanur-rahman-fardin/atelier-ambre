'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { emblem: 32, fontSize: '0.85rem', subSize: '0.5rem', kerning: '0.2em', gap: 4 },
  md: { emblem: 44, fontSize: '1.1rem', subSize: '0.6rem', kerning: '0.25em', gap: 6 },
  lg: { emblem: 56, fontSize: '1.35rem', subSize: '0.7rem', kerning: '0.3em', gap: 8 },
  xl: { emblem: 80, fontSize: '1.8rem', subSize: '0.85rem', kerning: '0.35em', gap: 10 },
};

export default function Logo({ size = 'md', showSubtitle = true, className = '' }: LogoProps) {
  const s = sizeMap[size];

  return (
    <div className={`flex flex-col items-center select-none ${className}`} style={{ gap: s.gap }}>
      {/* SVG Emblem — Geometric Amber Teardrop with Faceted Monogram Crest */}
      <svg
        width={s.emblem}
        height={s.emblem}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Atelier Ambre emblem"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8C84A" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B8962E" />
          </linearGradient>
          <linearGradient id="goldGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F0D860" />
            <stop offset="50%" stopColor="#E8C84A" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
          <filter id="emblemGlow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Outer octagonal crest border */}
        <polygon
          points="40,2 62,10 74,28 74,52 62,70 40,78 18,70 6,52 6,28 18,10"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.6"
        />
        
        {/* Inner octagonal crest */}
        <polygon
          points="40,8 58,14 68,30 68,50 58,66 40,72 22,66 12,50 12,30 22,14"
          stroke="url(#goldGradient)"
          strokeWidth="0.8"
          fill="none"
          opacity="0.3"
        />
        
        {/* Central amber teardrop / perfume bottle silhouette */}
        <path
          d="M40,16 C40,16 34,20 34,24 L34,28 C30,30 28,34 28,38 L28,52 C28,60 33,66 40,66 C47,66 52,60 52,52 L52,38 C52,34 50,30 46,28 L46,24 C46,20 40,16 40,16 Z"
          fill="url(#goldGradient)"
          opacity="0.15"
        />
        <path
          d="M40,16 C40,16 34,20 34,24 L34,28 C30,30 28,34 28,38 L28,52 C28,60 33,66 40,66 C47,66 52,60 52,52 L52,38 C52,34 50,30 46,28 L46,24 C46,20 40,16 40,16 Z"
          stroke="url(#goldGradient)"
          strokeWidth="1.2"
          fill="none"
          filter="url(#emblemGlow)"
        />
        
        {/* Bottle cap detail */}
        <rect x="36" y="18" width="8" height="4" rx="1" stroke="url(#goldGradient)" strokeWidth="0.8" fill="none" />
        
        {/* Faceted diamond cut lines inside bottle */}
        <line x1="32" y1="40" x2="40" y2="34" stroke="url(#goldGradientLight)" strokeWidth="0.6" opacity="0.5" />
        <line x1="48" y1="40" x2="40" y2="34" stroke="url(#goldGradientLight)" strokeWidth="0.6" opacity="0.5" />
        <line x1="32" y1="48" x2="40" y2="42" stroke="url(#goldGradientLight)" strokeWidth="0.6" opacity="0.4" />
        <line x1="48" y1="48" x2="40" y2="42" stroke="url(#goldGradientLight)" strokeWidth="0.6" opacity="0.4" />
        <line x1="34" y1="56" x2="40" y2="50" stroke="url(#goldGradientLight)" strokeWidth="0.6" opacity="0.3" />
        <line x1="46" y1="56" x2="40" y2="50" stroke="url(#goldGradientLight)" strokeWidth="0.6" opacity="0.3" />
        
        {/* Central "A" monogram */}
        <text
          x="40"
          y="49"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="600"
          fontSize="18"
          fill="url(#goldGradient)"
          filter="url(#emblemGlow)"
        >
          A
        </text>

        {/* Small decorative dots at cardinal points */}
        <circle cx="40" cy="5" r="1.2" fill="url(#goldGradient)" opacity="0.6" />
        <circle cx="40" cy="75" r="1.2" fill="url(#goldGradient)" opacity="0.6" />
        <circle cx="9" cy="40" r="1.2" fill="url(#goldGradient)" opacity="0.6" />
        <circle cx="71" cy="40" r="1.2" fill="url(#goldGradient)" opacity="0.6" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col items-center" style={{ gap: 2 }}>
        <span
          className="text-gold-gradient font-serif font-semibold"
          style={{
            fontSize: s.fontSize,
            letterSpacing: s.kerning,
            lineHeight: 1.1,
          }}
        >
          ATELIER AMBRE
        </span>
        {showSubtitle && (
          <span
            className="text-text-secondary font-sans uppercase tracking-[0.35em]"
            style={{ fontSize: s.subSize }}
          >
            Haute Parfumerie
          </span>
        )}
      </div>
    </div>
  );
}
