'use client';

import { create } from 'zustand';

export interface CartItem {
  productId: string;
  productName: string;
  size: '50ml' | '100ml';
  quantity: number;
  unitPrice: number;
  imageUrl: string;
  imageBg: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  deliveryZone: 'inside-dhaka' | 'outside-dhaka' | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryZone: (zone: 'inside-dhaka' | 'outside-dhaka') => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const FREE_DELIVERY_THRESHOLD = 5000;
const DHAKA_DELIVERY_FEE = 80;
const OUTSIDE_DHAKA_DELIVERY_FEE = 150;

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  deliveryZone: null,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.size === item.size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          isOpen: true,
        };
      }
      return { items: [...state.items, { ...item, quantity: 1 }], isOpen: true };
    }),

  removeItem: (productId, size) =>
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.size === size)
      ),
    })),

  updateQuantity: (productId, size, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.productId === productId && i.size === size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i
        ),
      };
    }),

  clearCart: () => set({ items: [], deliveryZone: null }),

  setDeliveryZone: (zone) => set({ deliveryZone: zone }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  },

  getDeliveryFee: () => {
    const { deliveryZone } = get();
    const subtotal = get().getSubtotal();
    if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
    if (deliveryZone === 'inside-dhaka') return DHAKA_DELIVERY_FEE;
    if (deliveryZone === 'outside-dhaka') return OUTSIDE_DHAKA_DELIVERY_FEE;
    return 0;
  },

  getTotal: () => {
    return get().getSubtotal() + get().getDeliveryFee();
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
