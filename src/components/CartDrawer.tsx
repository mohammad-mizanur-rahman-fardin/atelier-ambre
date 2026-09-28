'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getDeliveryFee,
    getTotal,
    deliveryZone,
  } = useCartStore();

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  // Track per-item image errors for fallback
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fade-in"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md z-[101] animate-slide-in-right" id="cart-drawer">
        <div className="h-full flex flex-col bg-surface border-l border-border">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-amber" />
              <h2 className="text-lg font-serif font-semibold text-text-primary">Shopping Bag</h2>
              <span className="text-xs text-text-muted bg-amber-glow text-amber px-2 py-0.5 rounded-full font-medium">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="w-9 h-9 rounded-full flex items-center justify-center border border-border hover:border-amber hover:bg-amber-glow transition-all"
              aria-label="Close cart"
            >
              <X className="w-4 h-4 text-text-secondary" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-text-muted mb-4 opacity-30" />
                <p className="text-text-secondary font-serif text-lg mb-2">Your bag is empty</p>
                <p className="text-text-muted text-sm">Discover our exquisite collection</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item) => {
                  const itemKey = `${item.productId}-${item.size}`;
                  const hasImgError = imgErrors[itemKey];
                  return (
                    <div
                      key={itemKey}
                      className="flex gap-4 p-3 rounded-xl border border-border-subtle hover:border-border transition-all group"
                    >
                      {/* Product image */}
                      <div
                        className="w-20 h-20 rounded-lg flex-shrink-0 overflow-hidden relative"
                        style={{ background: item.imageBg }}
                      >
                        {!hasImgError && item.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.imageUrl}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                            onError={() => setImgErrors((prev) => ({ ...prev, [itemKey]: true }))}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl font-serif text-white/90 font-semibold">
                              {item.productName.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-text-primary truncate">
                              {item.productName}
                            </p>
                            <p className="text-xs text-text-muted mt-0.5">{item.size}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, item.size)}
                            className="text-text-muted hover:text-error transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                            aria-label={`Remove ${item.productName}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-1 border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-surface-hover rounded-l-lg transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-surface-hover rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <p className="text-sm font-semibold text-amber">
                            ৳{(item.unitPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer / Totals */}
          {items.length > 0 && (
            <div className="border-t border-border px-6 py-5 space-y-3 flex-shrink-0">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary font-medium">৳{subtotal.toLocaleString()}</span>
              </div>
              {deliveryZone && (
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    Delivery {deliveryFee === 0 ? '(Free)' : `(${deliveryZone === 'inside-dhaka' ? 'Dhaka' : 'Outside Dhaka'})`}
                  </span>
                  <span className="text-text-primary font-medium">
                    {deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}
                  </span>
                </div>
              )}
              {subtotal >= 5000 && !deliveryZone && (
                <p className="text-xs text-success flex items-center gap-1">
                  ✨ You qualify for free delivery!
                </p>
              )}
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center">
                <span className="text-text-primary font-semibold">Total</span>
                <span className="text-xl font-serif font-bold text-gold-gradient">
                  ৳{total.toLocaleString()}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/20 active:scale-[0.98]"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
