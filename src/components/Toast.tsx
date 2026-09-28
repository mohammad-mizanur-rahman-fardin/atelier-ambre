'use client';

import React, { useState, useEffect } from 'react';
import { useToastStore } from '@/store/toast-store';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none" id="toast-container">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={removeToast} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: { id: string; type: string; title: string; message?: string; duration?: number }; onDismiss: (id: string) => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTime = (toast.duration || 4000) - 400;
    const timer = setTimeout(() => setIsExiting(true), exitTime);
    return () => clearTimeout(timer);
  }, [toast.duration]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-error flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-amber flex-shrink-0" />,
  };

  const borderColors = {
    success: 'border-l-success',
    error: 'border-l-error',
    info: 'border-l-amber',
  };

  const type = toast.type as 'success' | 'error' | 'info';

  return (
    <div
      className={`pointer-events-auto glass luxury-shadow rounded-lg border-l-4 ${borderColors[type]} px-4 py-3 min-w-[320px] max-w-[420px] flex items-start gap-3 ${
        isExiting ? 'animate-toast-out' : 'animate-toast-in'
      }`}
    >
      {icons[type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-text-secondary mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="text-text-muted hover:text-text-primary transition-colors flex-shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border-subtle rounded-b-lg overflow-hidden">
        <div
          className={`h-full ${type === 'success' ? 'bg-success' : type === 'error' ? 'bg-error' : 'bg-amber'}`}
          style={{
            animation: `progress-shrink ${toast.duration || 4000}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}
