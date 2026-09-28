'use client';

import React from 'react';
import {
  BarChart3,
  Package,
  ShoppingCart,
  MessageCircle,
  CreditCard,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useAuthStore } from '@/store/auth-store';
import { useChatStore } from '@/store/chat-store';

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'chat', label: 'Concierge', icon: MessageCircle },
  { id: 'transactions', label: 'Transactions', icon: CreditCard },
];

export default function AdminSidebar({ activeTab, onTabChange, isCollapsed, onToggleCollapse }: AdminSidebarProps) {
  const { signOut } = useAuthStore();
  const { getTotalUnread } = useChatStore();
  const unreadCount = getTotalUnread();

  return (
    <aside
      className={`h-screen flex flex-col border-r border-border bg-surface transition-all duration-300 ${
        isCollapsed ? 'w-[72px]' : 'w-[240px]'
      }`}
    >
      {/* Logo */}
      <div className="px-4 py-6 border-b border-border-subtle flex items-center justify-center">
        <Logo size={isCollapsed ? 'sm' : 'md'} showSubtitle={!isCollapsed} />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? 'bg-amber/10 text-amber border border-amber/20'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover border border-transparent'
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
              {item.id === 'chat' && unreadCount > 0 && (
                <span className={`${isCollapsed ? 'absolute -top-1 -right-1' : 'ml-auto'} w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center`}>
                  {unreadCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-2 border-t border-border-subtle">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs text-text-muted hover:text-text-primary hover:bg-surface-hover transition-all"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Sign Out */}
      <div className="px-3 py-3 border-t border-border-subtle">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-text-muted hover:text-error hover:bg-error/5 transition-all"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
