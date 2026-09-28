'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import { useProductStore } from '@/store/product-store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';
import ToastContainer from '@/components/Toast';
import GoogleAuthModal from '@/components/auth/GoogleAuthModal';
import AdminLogin from '@/components/auth/AdminLogin';
import OlfactoryModal from '@/components/storefront/OlfactoryModal';
import ProductCard from '@/components/storefront/ProductCard';
import { scentFamilies } from '@/data/products';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function CollectionsPage() {
  const { setTheme } = useThemeStore();
  const { restoreSession } = useAuthStore();
  const { getFilteredProducts, filterFamily, setFilterFamily, sortBy, setSortBy } = useProductStore();

  const products = getFilteredProducts();

  useEffect(() => {
    const saved = localStorage.getItem('atelier-theme');
    if (saved === 'light') setTheme(false);
    else setTheme(true);
    restoreSession();
  }, [setTheme, restoreSession]);

  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <p className="text-amber text-xs font-medium tracking-[0.3em] uppercase mb-2">
              The Full Collection
            </p>
            <h1 className="font-serif text-4xl font-bold text-text-primary">
              Our Fragrances
            </h1>
            <div className="w-16 h-0.5 bg-amber mt-3 rounded-full mx-auto" />
            <p className="text-text-secondary max-w-lg mx-auto mt-4 text-sm">
              Explore our complete range of artisanal perfumes. Each bottle tells a story of rare
              ingredients and masterful craftsmanship.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl border border-border-subtle bg-surface">
            <div className="flex items-center gap-2 flex-wrap">
              <SlidersHorizontal className="w-4 h-4 text-text-muted" />
              <button
                onClick={() => setFilterFamily(null)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  !filterFamily
                    ? 'border-amber bg-amber/10 text-amber'
                    : 'border-border text-text-muted hover:border-amber/30'
                }`}
              >
                All
              </button>
              {scentFamilies.map((family) => (
                <button
                  key={family}
                  onClick={() => setFilterFamily(filterFamily === family ? null : family)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    filterFamily === family
                      ? 'border-amber bg-amber/10 text-amber'
                      : 'border-border text-text-muted hover:border-amber/30'
                  }`}
                >
                  {family}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-text-muted" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price-asc' | 'price-desc' | 'newest')}
                className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-text-primary focus:outline-none focus:border-amber"
              >
                <option value="name">Name</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted font-serif text-xl">No fragrances found</p>
              <p className="text-sm text-text-muted mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <ChatWidget />
      <ToastContainer />
      <GoogleAuthModal />
      <AdminLogin />
      <OlfactoryModal />
    </>
  );
}
