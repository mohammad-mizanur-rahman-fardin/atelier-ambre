'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import { useChatStore } from '@/store/chat-store';

export default function ChatWidget() {
  const {
    isWidgetOpen,
    toggleWidget,
    closeWidget,
    conversations,
    customerName,
    setCustomerName,
    sendCustomerMessage,
  } = useChatStore();

  const [message, setMessage] = useState('');
  const [hasSetName, setHasSetName] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv = conversations.find((c) => c.customerName === customerName);
  const messages = currentConv?.messages || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    sendCustomerMessage(message.trim());
    setMessage('');
  };

  const handleSetName = () => {
    if (!nameInput.trim()) return;
    setCustomerName(nameInput.trim());
    setHasSetName(true);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        id="chat-widget-toggle"
        onClick={toggleWidget}
        className={`fixed bottom-8 right-6 z-[90] w-14 h-14 rounded-full bg-amber text-noir flex items-center justify-center shadow-lg hover:bg-amber-light transition-all hover:scale-105 active:scale-95 ${
          !isWidgetOpen ? 'animate-pulse-gold' : ''
        }`}
        aria-label="Open live chat"
      >
        {isWidgetOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isWidgetOpen && (
        <div
          className="fixed bottom-[6.5rem] right-6 z-[90] w-[360px] max-w-[calc(100vw-3rem)] max-h-[520px] rounded-2xl overflow-hidden glass-strong luxury-shadow-lg animate-scale-in flex flex-col"
          id="chat-widget-panel"
        >
          {/* Header */}
          <div className="bg-amber/10 border-b border-amber/20 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-amber" />
              </div>
              <div>
                <p className="text-sm font-serif font-semibold text-text-primary">
                  Atelier Concierge
                </p>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                  Online — Typically replies in minutes
                </p>
              </div>
            </div>
          </div>

          {!hasSetName ? (
            /* Name Input */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
              <User className="w-12 h-12 text-text-muted mb-4 opacity-40" />
              <p className="text-sm font-serif font-semibold text-text-primary mb-1">
                Welcome to Atelier Ambre
              </p>
              <p className="text-xs text-text-secondary mb-5">
                Please share your name to begin the consultation
              </p>
              <div className="w-full flex gap-2">
                <input
                  type="text"
                  placeholder="Your name..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSetName()}
                  className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                />
                <button
                  onClick={handleSetName}
                  className="bg-amber text-noir px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-amber-light transition-colors"
                >
                  Start
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px] max-h-[340px]">
                {/* Welcome message */}
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-xs text-text-muted">
                      Send a message to start your fragrance consultation
                    </p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.sender === 'customer'
                          ? 'bg-amber text-noir rounded-br-md'
                          : 'bg-surface-hover text-text-primary rounded-bl-md border border-border-subtle'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <p className={`text-[10px] mt-1 ${msg.sender === 'customer' ? 'text-noir/60' : 'text-text-muted'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-border p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type a message..."
                    className="flex-1 bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-10 h-10 rounded-xl bg-amber text-noir flex items-center justify-center hover:bg-amber-light transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
