'use client';

import { create } from 'zustand';
import { Order, OrderStatus, mockOrders } from '@/data/orders';

interface OrderStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrdersByCustomer: (email: string) => Order[];
  generateTranId: () => string;
  generateValId: () => string;
  generateOrderId: () => string;
}

const generateRandomString = (length: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: mockOrders,

  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),

  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId
          ? { ...o, orderStatus: status, updatedAt: new Date().toISOString() }
          : o
      ),
    })),

  getOrdersByCustomer: (email) => {
    return get().orders.filter((o) => o.customer.email === email);
  },

  generateTranId: () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    return `TRAN_AA_${dateStr}_${generateRandomString(6)}`;
  },

  generateValId: () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    return `VAL_${dateStr}_${generateRandomString(6)}`;
  },

  generateOrderId: () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const count = get().orders.length + 1;
    return `ORD-${dateStr}-${String(count).padStart(3, '0')}`;
  },
}));
