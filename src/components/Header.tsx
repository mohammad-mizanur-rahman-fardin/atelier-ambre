'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X, Shield, LogOut, Package, MapPin } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore, getInitials } from '@/store/auth-store';
import { useProductStore } from '@/store/product-store';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const { getItemCount, openCart } = useCartStore();
  const { user, openAuthModal, openAdminLogin, signOut } = useAuthStore();
  const { searchQuery, setSearchQuery } = useProductStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isProfileDropdownOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#user-profile-area')) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isProfileDropdownOpen]);

  const navLinks = [
    { label: 'Collections', href: '/collections' },
    { label: 'Our Story', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'py-3 border-[#D4AF37]/20 luxury-shadow'
          : 'py-5 border-[#D4AF37]/10'
      }`}
      style={{
        backgroundColor: 'var(--background)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-text-primary" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <Logo size="sm" showSubtitle={!isScrolled} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-amber transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency */}
            <span className="hidden sm:flex text-xs text-text-muted font-medium bg-surface px-2.5 py-1 rounded-full border border-border-subtle">
              BDT ৳
            </span>

            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-amber hover:bg-amber-glow transition-all"
                aria-label="Search"
              >
                <Search className="w-[18px] h-[18px] text-text-secondary" />
              </button>
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 animate-scale-in">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search fragrances..."
                    className="w-full rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber border border-border bg-surface"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <button
              id="cart-button"
              onClick={openCart}
              className="relative w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-amber hover:bg-amber-glow transition-all"
              aria-label={`Shopping bag with ${itemCount} items`}
            >
              <ShoppingBag className="w-[18px] h-[18px] text-text-secondary" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber text-noir text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User / Profile */}
            <div className="relative" id="user-profile-area">
              <button
                id="user-button"
                onClick={() => {
                  if (user) {
                    setIsProfileDropdownOpen(!isProfileDropdownOpen);
                  } else {
                    openAuthModal();
                  }
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-border hover:border-amber hover:bg-amber-glow transition-all overflow-hidden"
                aria-label={user ? `Profile: ${user.name}` : 'Sign in'}
              >
                {user ? (
                  user.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null
                ) : (
                  <User className="w-[18px] h-[18px] text-text-secondary" />
                )}
                {user && (
                  <span className={`w-full h-full flex items-center justify-center text-xs font-bold text-amber bg-amber/10 ${user.avatar ? 'hidden' : ''}`}>
                    {getInitials(user.name)}
                  </span>
                )}
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && user && (
                <div className="absolute top-full right-0 mt-2 w-56 rounded-xl overflow-hidden luxury-shadow-lg animate-scale-in bg-surface border border-border">
                  <div className="px-4 py-3 border-b border-border-subtle">
                    <p className="text-sm font-semibold text-text-primary">{user.name}</p>
                    <p className="text-xs text-text-muted truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    {user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-amber hover:bg-amber-glow transition-all"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <Shield className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/checkout"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-amber hover:bg-amber-glow transition-all"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>
                    <Link
                      href="/contact"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-amber hover:bg-amber-glow transition-all"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <MapPin className="w-4 h-4" />
                      Saved Addresses
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-text-secondary hover:text-error hover:bg-error/10 transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin login shortcut (hidden in nav for access) */}
            <button
              onClick={openAdminLogin}
              className="hidden sm:flex w-10 h-10 rounded-full items-center justify-center border border-border-subtle hover:border-amber hover:bg-amber-glow transition-all"
              aria-label="Admin login"
              title="Admin Login"
            >
              <Shield className="w-[16px] h-[16px] text-text-muted" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 pb-4 px-4 border-t border-border-subtle animate-fade-in-up" style={{ backgroundColor: 'var(--background)' }}>
          <nav className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-amber hover:bg-amber-glow transition-all"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                openAdminLogin();
                setIsMobileMenuOpen(false);
              }}
              className="px-4 py-3 rounded-xl text-sm font-medium text-text-muted hover:text-amber hover:bg-amber-glow transition-all text-left flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />
              Admin Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
