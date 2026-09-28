'use client';

import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Globe, Share2, Mail, MapPin, Phone } from 'lucide-react';

const maisonLinks = [
  { label: 'Our Heritage', href: '/about' },
  { label: 'The Atelier', href: '/about' },
  { label: 'Master Perfumer', href: '/about' },
  { label: 'Sustainability', href: '/about' },
  { label: 'Press & Media', href: '/contact' },
  { label: 'Careers', href: '/contact' },
];

export default function Footer() {
  return (
    <footer id="footer" className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo size="md" />
            <p className="mt-6 text-sm text-text-secondary leading-relaxed">
              Crafting bespoke fragrances that transcend time. Each composition is a masterwork of rare ingredients and artisanal expertise.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-amber hover:bg-amber-glow transition-all group"
                aria-label="Instagram"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-amber hover:bg-amber-glow transition-all group"
                aria-label="Facebook"
              >
                <Share2 className="w-5 h-5" />
              </a>
              <a
                href="mailto:concierge@atelierambre.com"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:border-amber hover:bg-amber-glow transition-all group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-text-muted group-hover:text-amber transition-colors" />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-5">
              Collections
            </h3>
            <ul className="space-y-3">
              {['Oud Collection', 'Amber Series', 'Floral Garden', 'Fresh Essentials', 'Woody Reserve', 'Limited Editions'].map((item) => (
                <li key={item}>
                  <Link
                    href="/collections"
                    className="text-sm text-text-secondary hover:text-amber transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Maison */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-5">
              Maison
            </h3>
            <ul className="space-y-3">
              {maisonLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-secondary hover:text-amber transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                <span className="text-sm text-text-secondary">
                  Gulshan Avenue, Road 137<br />
                  Dhaka 1212, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber flex-shrink-0" />
                <span className="text-sm text-text-secondary">+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber flex-shrink-0" />
                <span className="text-sm text-text-secondary">concierge@atelierambre.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © 2026 Atelier Ambre. All rights reserved. Haute Parfumerie since 2020.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-text-muted hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-text-muted hover:text-amber transition-colors">
              Terms of Service
            </Link>
            <Link href="/shipping-returns" className="text-xs text-text-muted hover:text-amber transition-colors">
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
