'use client';

import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Loader2, CheckCircle, XCircle, Shield } from 'lucide-react';
import { PaymentMethod } from '@/data/orders';

interface SSLCommerzModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: (method: PaymentMethod, tranId: string, valId: string) => void;
  onFail: () => void;
  tranId: string;
  valId: string;
}

type PaymentTab = 'card' | 'bkash' | 'nagad' | 'rocket';
type PaymentStage = 'input' | 'otp' | 'processing' | 'success' | 'failed';

export default function SSLCommerzModal({ isOpen, onClose, amount, onSuccess, onFail, tranId, valId }: SSLCommerzModalProps) {
  const [activeTab, setActiveTab] = useState<PaymentTab>('bkash');
  const [stage, setStage] = useState<PaymentStage>('input');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [mfsPhone, setMfsPhone] = useState('');
  const [mfsPin, setMfsPin] = useState('');
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const methodMap: Record<PaymentTab, PaymentMethod> = {
    card: 'Visa',
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
  };

  const formatCardNumber = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handlePaymentSubmit = async () => {
    if (activeTab !== 'card') {
      // MFS flow: show PIN → OTP → process
      if (stage === 'input') {
        setStage('otp');
        return;
      }
    }

    if (stage === 'otp' || stage === 'input') {
      setStage('processing');

      // Simulate payment processing
      await new Promise((r) => setTimeout(r, 1500));

      // Simulate validation
      const willSucceed = Math.random() > 0.1; // 90% success
      if (willSucceed) {
        setStage('success');
        await new Promise((r) => setTimeout(r, 1500));
        onSuccess(methodMap[activeTab], tranId, valId);
      } else {
        setStage('failed');
      }
    }
  };

  const handleRetry = () => {
    setStage('input');
    setOtp('');
    setMfsPin('');
  };

  const tabs: { id: PaymentTab; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'bkash', label: 'bKash', icon: <Smartphone className="w-4 h-4" />, color: '#E2136E' },
    { id: 'nagad', label: 'Nagad', icon: <Smartphone className="w-4 h-4" />, color: '#F6921E' },
    { id: 'rocket', label: 'Rocket', icon: <Smartphone className="w-4 h-4" />, color: '#8C3494' },
    { id: 'card', label: 'Card', icon: <CreditCard className="w-4 h-4" />, color: '#D4AF37' },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[400] animate-fade-in" onClick={onClose} />
      <div className="fixed inset-0 z-[401] flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="w-full max-w-md bg-surface rounded-2xl overflow-hidden luxury-shadow-lg animate-scale-in border border-border"
          onClick={(e) => e.stopPropagation()}
          id="sslcommerz-modal"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2B4C2F] to-[#1a3a1e] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-white/80" />
              <div>
                <p className="text-white text-sm font-bold">SSLCommerz</p>
                <p className="text-white/60 text-[10px]">Secure Payment Gateway</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/60 text-[10px]">Amount</p>
              <p className="text-white font-bold">৳{amount.toLocaleString()}</p>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors ml-2"
              aria-label="Close payment"
            >
              <X className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          {/* Transaction info */}
          <div className="px-6 py-2 bg-surface-hover flex items-center justify-between text-[10px] text-text-muted border-b border-border-subtle">
            <span>TRAN_ID: {tranId}</span>
            <span>Merchant: Atelier Ambre</span>
          </div>

          {(stage === 'processing' || stage === 'success' || stage === 'failed') ? (
            /* Status Screen */
            <div className="px-6 py-12 text-center">
              {stage === 'processing' && (
                <div className="animate-fade-in">
                  <Loader2 className="w-16 h-16 text-amber mx-auto mb-4 animate-spin" />
                  <p className="font-semibold text-text-primary">Validating Payment...</p>
                  <p className="text-sm text-text-secondary mt-1">Please do not close this window</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" style={{ animationDelay: '0.3s' }} />
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" style={{ animationDelay: '0.6s' }} />
                  </div>
                </div>
              )}
              {stage === 'success' && (
                <div className="animate-scale-in">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <p className="font-semibold text-text-primary text-lg">Payment Successful!</p>
                  <p className="text-sm text-text-secondary mt-1">Transaction verified</p>
                  <div className="mt-4 bg-success/5 border border-success/20 rounded-xl p-3">
                    <p className="text-xs text-success">VAL_ID: {valId}</p>
                  </div>
                </div>
              )}
              {stage === 'failed' && (
                <div className="animate-scale-in">
                  <XCircle className="w-16 h-16 text-error mx-auto mb-4" />
                  <p className="font-semibold text-text-primary text-lg">Payment Failed</p>
                  <p className="text-sm text-text-secondary mt-1">Transaction could not be completed</p>
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handleRetry}
                      className="flex-1 py-3 bg-amber hover:bg-amber-light text-noir font-semibold rounded-xl transition-all text-sm"
                    >
                      Retry Payment
                    </button>
                    <button
                      onClick={() => { onFail(); onClose(); }}
                      className="flex-1 py-3 border border-border rounded-xl text-text-secondary hover:text-text-primary transition-all text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Payment Method Tabs */}
              <div className="px-6 pt-4">
                <div className="flex gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setStage('input'); }}
                      className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl border text-xs font-medium transition-all ${
                        activeTab === tab.id
                          ? 'border-amber bg-amber/10 text-amber'
                          : 'border-border text-text-muted hover:border-border hover:text-text-secondary'
                      }`}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Form */}
              <div className="px-6 py-5 space-y-4">
                {activeTab === 'card' ? (
                  <>
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="4242 4242 4242 4242"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-text-secondary mb-1.5 block">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          placeholder="MM/YY"
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-text-secondary mb-1.5 block">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          placeholder="•••"
                          maxLength={3}
                          className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                        />
                      </div>
                    </div>
                  </>
                ) : stage === 'otp' ? (
                  <>
                    <div className="text-center py-2">
                      <p className="text-sm text-text-primary font-medium">Enter OTP</p>
                      <p className="text-xs text-text-secondary mt-1">
                        A 6-digit code has been sent to your {activeTab === 'bkash' ? 'bKash' : activeTab === 'nagad' ? 'Nagad' : 'Rocket'} number
                      </p>
                    </div>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors text-center tracking-[0.5em] text-lg"
                    />
                  </>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                        {activeTab === 'bkash' ? 'bKash' : activeTab === 'nagad' ? 'Nagad' : 'Rocket'} Number
                      </label>
                      <input
                        type="tel"
                        value={mfsPhone}
                        onChange={(e) => setMfsPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-text-secondary mb-1.5 block">
                        PIN
                      </label>
                      <input
                        type="password"
                        value={mfsPin}
                        onChange={(e) => setMfsPin(e.target.value.replace(/\D/g, '').slice(0, 5))}
                        placeholder="Enter your PIN"
                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors"
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={handlePaymentSubmit}
                  className="w-full bg-amber hover:bg-amber-light text-noir font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/20 active:scale-[0.98] text-sm"
                >
                  {stage === 'otp' ? 'Verify & Pay' : `Pay ৳${amount.toLocaleString()}`}
                </button>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="px-6 py-3 bg-surface-hover border-t border-border-subtle flex items-center justify-between">
            <span className="text-[10px] text-text-muted">🔒 256-bit SSL Encrypted</span>
            <span className="text-[10px] text-text-muted">Powered by SSLCommerz</span>
          </div>
        </div>
      </div>
    </>
  );
}
