'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useThemeStore } from '@/store/theme-store';
import { useAuthStore } from '@/store/auth-store';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import ProductManager from '@/components/admin/ProductManager';
import OrderFulfillment from '@/components/admin/OrderFulfillment';
import ConciergeDesk from '@/components/admin/ConciergeDesk';
import TransactionLedger from '@/components/admin/TransactionLedger';
import ToastContainer from '@/components/Toast';
import { Shield, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
  const { setTheme } = useThemeStore();
  const { user, openAdminLogin, restoreSession } = useAuthStore();
  const [activeTab, setActiveTab] = useState('analytics');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem('atelier-theme');
    if (saved === 'light') setTheme(false);
    else setTheme(true);
    restoreSession();
  }, [setTheme, restoreSession]);

  // If not admin, show access denied
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-amber" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-text-primary mb-3">
            Access Restricted
          </h1>
          <p className="text-text-secondary mb-8">
            This workspace is reserved for authorized administrators only. Please authenticate to continue.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={openAdminLogin}
              className="flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-8 py-4 rounded-xl transition-all"
            >
              <Shield className="w-5 h-5" />
              Admin Sign In
            </button>
            <Link
              href="/"
              className="text-sm text-text-muted hover:text-amber transition-colors"
            >
              ← Return to Storefront
            </Link>
          </div>
        </div>
        <ToastContainer />
        {/* Render AdminLogin modal so it can be triggered */}
        {(() => {
          const AdminLogin = require('@/components/auth/AdminLogin').default;
          return <AdminLogin />;
        })()}
      </div>
    );
  }

  const tabComponents: Record<string, React.ReactNode> = {
    analytics: <AnalyticsDashboard />,
    products: <ProductManager />,
    orders: <OrderFulfillment />,
    chat: <ConciergeDesk />,
    transactions: <TransactionLedger />,
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      <main className="flex-1 overflow-y-auto p-6 lg:p-8">
        {tabComponents[activeTab]}
      </main>
      <ToastContainer />
    </div>
  );
}
