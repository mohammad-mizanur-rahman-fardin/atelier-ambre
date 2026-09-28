'use client';

import React, { useState, useRef } from 'react';
import { X, Shield, Loader2, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import { useToastStore } from '@/store/toast-store';

export default function AdminLogin() {
  const { isAdminLoginOpen, closeAdminLogin, signInAsAdmin } = useAuthStore();
  const { addToast } = useToastStore();
  const [email, setEmail] = useState('admin@atelier.com');
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  if (!isAdminLoginOpen) return null;

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    setError('');

    if (value && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const fullPin = pin.join('');
    if (fullPin.length !== 4) {
      setError('Please enter a 4-digit PIN');
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const success = signInAsAdmin(email, fullPin);
    setIsLoading(false);

    if (success) {
      addToast({ type: 'success', title: 'Admin Access Granted', message: 'Welcome to the Command Center' });
    } else {
      setError('Invalid credentials. Try admin@atelier.com / 1234');
      setPin(['', '', '', '']);
      pinRefs.current[0]?.focus();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[300] animate-fade-in" onClick={closeAdminLogin} />
      <div className="fixed inset-0 z-[301] flex items-center justify-center p-4" onClick={closeAdminLogin}>
        <div
          className="w-full max-w-sm glass-strong rounded-2xl overflow-hidden luxury-shadow-lg animate-scale-in"
          onClick={(e) => e.stopPropagation()}
          id="admin-login-modal"
        >
          <div className="p-8">
            <button
              onClick={closeAdminLogin}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center hover:bg-border transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 text-amber" />
              </div>
              <h2 className="font-serif text-xl font-semibold text-text-primary">
                Admin Access
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Command Center Authentication
              </p>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-amber transition-colors"
                placeholder="admin@atelier.com"
              />
            </div>

            {/* PIN */}
            <div className="mb-5">
              <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                Security PIN
              </label>
              <div className="flex gap-3 justify-center">
                {pin.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { pinRefs.current[i] = el; }}
                    type="password"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(i, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(i, e)}
                    className="w-14 h-14 text-center text-xl font-bold bg-surface border border-border rounded-xl text-text-primary focus:outline-none focus:border-amber transition-all"
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-error text-xs mb-4 px-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold py-3.5 rounded-xl transition-all disabled:opacity-60"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  Authenticate
                </>
              )}
            </button>

            <p className="text-[10px] text-text-muted text-center mt-4">
              Default: admin@atelier.com / PIN: 1234
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
