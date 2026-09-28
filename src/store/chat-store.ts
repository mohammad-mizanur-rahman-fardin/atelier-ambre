'use client';

import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'admin';
  senderName: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatConversation {
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  messages: ChatMessage[];
  lastActivity: string;
  unreadCount: number;
}

interface ChatStore {
  conversations: ChatConversation[];
  activeConversationId: string | null;
  isWidgetOpen: boolean;
  customerName: string;
  openWidget: () => void;
  closeWidget: () => void;
  toggleWidget: () => void;
  setCustomerName: (name: string) => void;
  setActiveConversation: (id: string | null) => void;
  sendCustomerMessage: (message: string) => void;
  sendAdminMessage: (conversationId: string, message: string) => void;
  markAsRead: (conversationId: string) => void;
  getTotalUnread: () => number;
}

const generateId = () => Math.random().toString(36).substring(2, 10);

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [
    {
      customerId: 'customer-demo-1',
      customerName: 'Zara Mahmud',
      customerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zara',
      messages: [
        {
          id: 'msg-1',
          sender: 'customer',
          senderName: 'Zara Mahmud',
          message: 'Hi! I\'m looking for a warm, cozy fragrance for winter evenings. Any recommendations?',
          timestamp: '2026-09-20T10:30:00+06:00',
          read: true,
        },
        {
          id: 'msg-2',
          sender: 'admin',
          senderName: 'Atelier Concierge',
          message: 'Welcome to Atelier Ambre, Zara! For warm winter evenings, I\'d highly recommend our Amber Royale or Oud Noir. Both have rich, enveloping base notes perfect for the season.',
          timestamp: '2026-09-20T10:32:00+06:00',
          read: true,
        },
        {
          id: 'msg-3',
          sender: 'customer',
          senderName: 'Zara Mahmud',
          message: 'Amber Royale sounds lovely! What\'s the longevity like?',
          timestamp: '2026-09-20T10:33:00+06:00',
          read: false,
        },
      ],
      lastActivity: '2026-09-20T10:33:00+06:00',
      unreadCount: 1,
    },
  ],
  activeConversationId: null,
  isWidgetOpen: false,
  customerName: '',

  openWidget: () => set({ isWidgetOpen: true }),
  closeWidget: () => set({ isWidgetOpen: false }),
  toggleWidget: () => set((s) => ({ isWidgetOpen: !s.isWidgetOpen })),
  setCustomerName: (name) => set({ customerName: name }),
  setActiveConversation: (id) => set({ activeConversationId: id }),

  sendCustomerMessage: (message) => {
    const { customerName, conversations } = get();
    const name = customerName || 'Guest Customer';
    let customerId = conversations.find((c) => c.customerName === name)?.customerId;

    if (!customerId) {
      customerId = `customer-${generateId()}`;
      const newConv: ChatConversation = {
        customerId,
        customerName: name,
        messages: [],
        lastActivity: new Date().toISOString(),
        unreadCount: 0,
      };
      set((state) => ({
        conversations: [...state.conversations, newConv],
      }));
    }

    const newMsg: ChatMessage = {
      id: `msg-${generateId()}`,
      sender: 'customer',
      senderName: name,
      message,
      timestamp: new Date().toISOString(),
      read: false,
    };

    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.customerId === customerId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastActivity: newMsg.timestamp,
              unreadCount: c.unreadCount + 1,
            }
          : c
      ),
    }));
  },

  sendAdminMessage: (conversationId, message) => {
    const newMsg: ChatMessage = {
      id: `msg-${generateId()}`,
      sender: 'admin',
      senderName: 'Atelier Concierge',
      message,
      timestamp: new Date().toISOString(),
      read: true,
    };

    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.customerId === conversationId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastActivity: newMsg.timestamp,
            }
          : c
      ),
    }));
  },

  markAsRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.customerId === conversationId
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c
      ),
    })),

  getTotalUnread: () => {
    return get().conversations.reduce((sum, c) => sum + c.unreadCount, 0);
  },
}));
