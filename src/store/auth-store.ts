'use client';

import { create } from 'zustand';

export type UserRole = 'guest' | 'customer' | 'admin';

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: UserRole;
}

interface AuthStore {
  user: User | null;
  isAuthModalOpen: boolean;
  isAdminLoginOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  openAdminLogin: () => void;
  closeAdminLogin: () => void;
  signInWithGoogle: () => void;
  signInWithEmail: (email: string) => void;
  signInAsAdmin: (email: string, pin: string) => boolean;
  signOut: () => void;
  restoreSession: () => void;
}

const STORAGE_KEY = 'atelier_ambre_session';

const mockGoogleUsers: User[] = [
  {
    name: 'Aisha Sultana',
    email: 'aisha.sultana@gmail.com',
    phone: '+880 1712-345678',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha&backgroundColor=d4af37',
    role: 'customer',
  },
  {
    name: 'Imran Hossain',
    email: 'imran.hossain@gmail.com',
    phone: '+880 1800-123456',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Imran&backgroundColor=d4af37',
    role: 'customer',
  },
  {
    name: 'Tasnim Ferdous',
    email: 'tasnim.f@gmail.com',
    phone: '+880 1600-789012',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tasnim&backgroundColor=d4af37',
    role: 'customer',
  },
];

const ADMIN_CREDENTIALS = {
  email: 'admin@atelier.com',
  pin: '1234',
};

/** Extract a display name from an email address */
function extractNameFromEmail(email: string): string {
  const localPart = email.split('@')[0] || 'User';
  // Replace dots, underscores, hyphens with spaces, then capitalize each word
  return localPart
    .replace(/[._-]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || 'User';
}

/** Generate initials from a name */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/** Persist user to localStorage */
function persistUser(user: User | null) {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
}

/** Load user from localStorage */
function loadPersistedUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.email && parsed.name) {
        // Ensure phone field exists for backward compatibility
        if (!parsed.phone) parsed.phone = '';
        return parsed as User;
      }
    }
    // Also check the legacy key for migration
    const legacyRaw = localStorage.getItem('atelier_ambre_user');
    if (legacyRaw) {
      const parsed = JSON.parse(legacyRaw);
      if (parsed && parsed.email && parsed.name) {
        if (!parsed.phone) parsed.phone = '';
        // Migrate to new key
        localStorage.setItem(STORAGE_KEY, legacyRaw);
        localStorage.removeItem('atelier_ambre_user');
        return parsed as User;
      }
    }
  } catch {
    // corrupt data — ignore
  }
  return null;
}

/** Lock body scroll */
function lockBodyScroll() {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden';
  }
}

/** Unlock body scroll */
function unlockBodyScroll() {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthModalOpen: false,
  isAdminLoginOpen: false,

  openAuthModal: () => {
    lockBodyScroll();
    set({ isAuthModalOpen: true });
  },
  closeAuthModal: () => {
    unlockBodyScroll();
    set({ isAuthModalOpen: false });
  },
  openAdminLogin: () => {
    lockBodyScroll();
    set({ isAdminLoginOpen: true });
  },
  closeAdminLogin: () => {
    unlockBodyScroll();
    set({ isAdminLoginOpen: false });
  },

  signInWithGoogle: () => {
    const randomUser = mockGoogleUsers[Math.floor(Math.random() * mockGoogleUsers.length)];
    persistUser(randomUser);
    unlockBodyScroll();
    set({ user: randomUser, isAuthModalOpen: false });
  },

  signInWithEmail: (email: string) => {
    const name = extractNameFromEmail(email);
    const seed = name.split(' ')[0] || 'User';
    const user: User = {
      name,
      email,
      phone: '',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=d4af37`,
      role: 'customer',
    };
    persistUser(user);
    unlockBodyScroll();
    set({ user, isAuthModalOpen: false });
  },

  signInAsAdmin: (email: string, pin: string) => {
    if (email === ADMIN_CREDENTIALS.email && pin === ADMIN_CREDENTIALS.pin) {
      const adminUser: User = {
        name: 'Admin',
        email: ADMIN_CREDENTIALS.email,
        phone: '',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=0a0a0b',
        role: 'admin',
      };
      persistUser(adminUser);
      unlockBodyScroll();
      set({
        user: adminUser,
        isAdminLoginOpen: false,
      });
      return true;
    }
    return false;
  },

  signOut: () => {
    persistUser(null);
    set({ user: null });
  },

  restoreSession: () => {
    const persisted = loadPersistedUser();
    if (persisted) {
      set({ user: persisted });
    }
  },
}));
