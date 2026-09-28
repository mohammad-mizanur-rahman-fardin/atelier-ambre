'use client';

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '@/store/theme-store';
import { useCartStore } from '@/store/cart-store';
import { useOrderStore } from '@/store/order-store';
import { useAuthStore } from '@/store/auth-store';
import { useToastStore } from '@/store/toast-store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ChatWidget from '@/components/ChatWidget';
import ToastContainer from '@/components/Toast';
import GoogleAuthModal from '@/components/auth/GoogleAuthModal';
import AdminLogin from '@/components/auth/AdminLogin';
import CheckoutForm, { CheckoutData } from '@/components/checkout/CheckoutForm';
import SSLCommerzModal from '@/components/checkout/SSLCommerzModal';
import OrderReceipt from '@/components/checkout/OrderReceipt';
import { Order, PaymentMethod } from '@/data/orders';
import { ShoppingBag, ArrowLeft, Shield } from 'lucide-react';
import Link from 'next/link';

type CheckoutStep = 'delivery' | 'review' | 'payment' | 'receipt';

export default function CheckoutPage() {
  const { setTheme } = useThemeStore();
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart, deliveryZone } = useCartStore();
  const { addOrder, generateTranId, generateValId, generateOrderId } = useOrderStore();
  const { user } = useAuthStore();
  const { addToast } = useToastStore();

  const [step, setStep] = useState<CheckoutStep>('delivery');
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [tranId, setTranId] = useState('');
  const [valId, setValId] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('atelier-theme');
    if (saved === 'light') setTheme(false);
    else setTheme(true);
  }, [setTheme]);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  const handleDeliverySubmit = (data: CheckoutData) => {
    setCheckoutData(data);
    setTranId(generateTranId());
    setValId(generateValId());
    setStep('review');
  };

  const handlePayNow = () => {
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = (method: PaymentMethod, tId: string, vId: string) => {
    if (!checkoutData) return;

    const order: Order = {
      id: generateOrderId(),
      tranId: tId,
      valId: vId,
      customer: {
        name: checkoutData.fullName,
        phone: checkoutData.phone,
        email: user?.email,
        division: checkoutData.division,
        city: checkoutData.city,
        address: checkoutData.address,
        avatar: user?.avatar,
      },
      items: items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        size: item.size,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod: method,
      paymentStatus: 'Success',
      orderStatus: 'Pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addOrder(order);
    setCompletedOrder(order);
    clearCart();
    setIsPaymentOpen(false);
    setStep('receipt');
    addToast({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Order ${order.id} confirmed`,
      duration: 6000,
    });
  };

  const handlePaymentFail = () => {
    addToast({ type: 'error', title: 'Payment Failed', message: 'Please try again' });
  };

  if (step === 'receipt' && completedOrder) {
    return <OrderReceipt order={completedOrder} onClose={() => { setStep('delivery'); setCompletedOrder(null); }} />;
  }

  return (
    <>
      <Header />
      <main className="flex-1 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link href="/collections" className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-amber transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          {items.length === 0 && step !== 'receipt' ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-20 h-20 text-text-muted opacity-20 mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-semibold text-text-primary mb-2">Your bag is empty</h2>
              <p className="text-text-secondary mb-6">Add some fragrances to begin checkout</p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-8 py-3 rounded-xl transition-all"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left: Forms */}
              <div className="lg:col-span-3">
                {/* Progress Steps */}
                <div className="flex items-center gap-3 mb-8">
                  {['Delivery', 'Review', 'Payment'].map((label, idx) => {
                    const stepMap = ['delivery', 'review', 'payment'] as const;
                    const isActive = stepMap.indexOf(step as typeof stepMap[number]) >= idx;
                    return (
                      <React.Fragment key={label}>
                        <div className={`flex items-center gap-2 ${isActive ? 'text-amber' : 'text-text-muted'}`}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isActive ? 'border-amber bg-amber/10' : 'border-border'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="text-sm font-medium hidden sm:inline">{label}</span>
                        </div>
                        {idx < 2 && <div className={`flex-1 h-px ${isActive ? 'bg-amber' : 'bg-border'}`} />}
                      </React.Fragment>
                    );
                  })}
                </div>

                {step === 'delivery' && (
                  <CheckoutForm onSubmit={handleDeliverySubmit} />
                )}

                {step === 'review' && checkoutData && (
                  <div className="space-y-6 animate-fade-in-up">
                    <h3 className="font-serif text-lg font-semibold text-text-primary flex items-center gap-2">
                      <Shield className="w-5 h-5 text-amber" />
                      Order Review
                    </h3>

                    {/* Delivery Summary */}
                    <div className="rounded-xl border border-border-subtle p-4 space-y-2">
                      <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Delivering To</p>
                      <p className="text-sm text-text-primary font-medium">{checkoutData.fullName}</p>
                      <p className="text-xs text-text-secondary">{checkoutData.phone}</p>
                      <p className="text-xs text-text-secondary">{checkoutData.address}</p>
                      <p className="text-xs text-text-secondary">{checkoutData.city}, {checkoutData.division}</p>
                    </div>

                    {/* Items */}
                    <div className="rounded-xl border border-border-subtle p-4 space-y-3">
                      <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Items ({items.length})</p>
                      {items.map((item) => (
                        <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between py-2 border-b border-border-subtle/50 last:border-0">
                          <div>
                            <p className="text-sm text-text-primary font-medium">{item.productName}</p>
                            <p className="text-xs text-text-muted">{item.size} × {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium text-text-primary">৳{(item.unitPrice * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep('delivery')}
                        className="flex-1 border border-border py-3 rounded-xl text-sm text-text-secondary hover:text-text-primary hover:border-amber/30 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePayNow}
                        className="flex-1 bg-amber hover:bg-amber-light text-noir font-semibold py-3 rounded-xl transition-all text-sm"
                      >
                        Pay ৳{total.toLocaleString()}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-2">
                <div className="rounded-xl border border-border-subtle bg-surface p-5 sticky top-32">
                  <h3 className="text-sm font-semibold text-text-primary mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                        <span className="text-text-secondary">
                          {item.productName} ({item.size}) ×{item.quantity}
                        </span>
                        <span className="text-text-primary">৳{(item.unitPrice * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-border mb-3" />
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="text-text-primary">৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="text-text-secondary">
                      Delivery {deliveryZone === 'inside-dhaka' ? '(Dhaka)' : deliveryZone === 'outside-dhaka' ? '(Outside Dhaka)' : ''}
                    </span>
                    <span className="text-text-primary">{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
                  </div>
                  <div className="h-px bg-border mb-3" />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-text-primary">Total</span>
                    <span className="text-xl font-serif font-bold text-gold-gradient">৳{total.toLocaleString()}</span>
                  </div>
                  {subtotal >= 5000 && (
                    <p className="text-xs text-success mt-3 flex items-center gap-1">✨ Free delivery applied!</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <ChatWidget />
      <ToastContainer />
      <GoogleAuthModal />
      <AdminLogin />

      {/* SSLCommerz Payment Modal */}
      <SSLCommerzModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={total}
        onSuccess={handlePaymentSuccess}
        onFail={handlePaymentFail}
        tranId={tranId}
        valId={valId}
      />
    </>
  );
}
