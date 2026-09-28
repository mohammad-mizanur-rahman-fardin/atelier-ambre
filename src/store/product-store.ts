'use client';

import { create } from 'zustand';
import { products as initialProducts, Product } from '@/data/products';

interface ProductStore {
  products: Product[];
  selectedProduct: Product | null;
  isOlfactoryModalOpen: boolean;
  searchQuery: string;
  filterFamily: string | null;
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'newest';
  setSearchQuery: (query: string) => void;
  setFilterFamily: (family: string | null) => void;
  setSortBy: (sort: 'name' | 'price-asc' | 'price-desc' | 'newest') => void;
  openOlfactoryModal: (product: Product) => void;
  closeOlfactoryModal: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getFilteredProducts: () => Product[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  selectedProduct: null,
  isOlfactoryModalOpen: false,
  searchQuery: '',
  filterFamily: null,
  sortBy: 'name',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterFamily: (family) => set({ filterFamily: family }),
  setSortBy: (sort) => set({ sortBy: sort }),

  openOlfactoryModal: (product) =>
    set({ selectedProduct: product, isOlfactoryModalOpen: true }),
  closeOlfactoryModal: () =>
    set({ selectedProduct: null, isOlfactoryModalOpen: false }),

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  updateProduct: (id, updates) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  getFilteredProducts: () => {
    const { products, searchQuery, filterFamily, sortBy } = get();
    let filtered = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.scentFamily.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filterFamily) {
      filtered = filtered.filter((p) => p.scentFamily === filterFamily);
    }

    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        filtered.sort((a, b) => a.price50ml - b.price50ml);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price50ml - a.price50ml);
        break;
      case 'newest':
        filtered.reverse();
        break;
    }

    return filtered;
  },
}));
