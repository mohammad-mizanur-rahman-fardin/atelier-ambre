'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, User } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';
import { useToastStore } from '@/store/toast-store';

export default function ConciergeDesk() {
  const {
    conversations,
    activeConversationId,
    setActiveConversation,
    sendAdminMessage,
    markAsRead,
  } = useChatStore();
  const { addToast } = useToastStore();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find((c) => c.customerId === activeConversationId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = () => {
    if (!message.trim() || !activeConversationId) return;
    sendAdminMessage(activeConversationId, message.trim());
    setMessage('');
    addToast({ type: 'info', title: 'Message Sent' });
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
    markAsRead(id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-text-primary">Concierge Desk</h1>
        <p className="text-sm text-text-secondary mt-1">Live customer communication center</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 rounded-xl border border-border-subtle bg-surface overflow-hidden h-[600px]">
        {/* Conversation List */}
        <div className="lg:col-span-1 border-r border-border-subtle overflow-y-auto">
          <div className="px-4 py-3 border-b border-border-subtle bg-surface-hover">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Conversations</p>
          </div>
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[200px] text-center px-4">
              <MessageCircle className="w-10 h-10 text-text-muted opacity-30 mb-2" />
              <p className="text-xs text-text-muted">No conversations yet</p>
            </div>
          ) : (
            conversations.map((conv) => (
              <button
                key={conv.customerId}
                onClick={() => handleSelectConversation(conv.customerId)}
                className={`w-full px-4 py-4 text-left border-b border-border-subtle/50 transition-all ${
                  activeConversationId === conv.customerId
                    ? 'bg-amber/5 border-l-2 border-l-amber'
                    : 'hover:bg-surface-hover'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-amber/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-amber" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-text-primary truncate">{conv.customerName}</p>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-error text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-muted truncate mt-0.5">
                      {conv.messages[conv.messages.length - 1]?.message || 'No messages'}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2 flex flex-col">
          {activeConv ? (
            <>
              {/* Chat Header */}
              <div className="px-5 py-3 border-b border-border-subtle flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-amber" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{activeConv.customerName}</p>
                  <p className="text-[10px] text-text-muted">
                    Last activity: {new Date(activeConv.lastActivity).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {activeConv.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.sender === 'admin'
                          ? 'bg-amber text-noir rounded-br-md'
                          : 'bg-surface-hover text-text-primary rounded-bl-md border border-border-subtle'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'admin' ? 'text-noir/60' : 'text-text-muted'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-5 py-3 border-t border-border-subtle">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your reply..."
                    className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="px-4 py-2.5 bg-amber text-noir rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-amber-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <MessageCircle className="w-16 h-16 text-text-muted opacity-20 mb-4" />
              <p className="text-sm text-text-secondary">Select a conversation to begin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
