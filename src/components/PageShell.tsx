'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import ChatWidget from './ChatWidget';
import ToastContainer from './Toast';
import GoogleAuthModal from './auth/GoogleAuthModal';
import AdminLogin from './auth/AdminLogin';
import OlfactoryModal from './storefront/OlfactoryModal';

interface PageShellProps {
  children: React.ReactNode;
}

export default function PageShell({ children }: PageShellProps) {
  const { setTheme } = useThemeStore();
  const { restoreSession } = useAuthStore();

  useEffect(() => {
    const saved = localStorage.getItem('atelier-theme');
    if (saved === 'light') {
      setTheme(false);
    } else {
      setTheme(true);
    }
    restoreSession();
  }, [setTheme, restoreSession]);

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />

      {/* Overlays & Widgets */}
      <CartDrawer />
      <ChatWidget />
      <ToastContainer />
      <GoogleAuthModal />
      <AdminLogin />
      <OlfactoryModal />
    </>
  );
}
