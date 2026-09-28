'use client';

import { create } from 'zustand';

interface ThemeStore {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark: true,
  toggleTheme: () =>
    set((state) => {
      const newDark = !state.isDark;
      if (typeof window !== 'undefined') {
        document.documentElement.classList.toggle('light', !newDark);
        localStorage.setItem('atelier-theme', newDark ? 'dark' : 'light');
      }
      return { isDark: newDark };
    }),
  setTheme: (dark: boolean) => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('light', !dark);
      localStorage.setItem('atelier-theme', dark ? 'dark' : 'light');
    }
    set({ isDark: dark });
  },
}));
