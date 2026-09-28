'use client';

import React from 'react';
import { Printer, Download, CheckCircle, Package } from 'lucide-react';
import { Order } from '@/data/orders';
import Logo from '@/components/Logo';

interface OrderReceiptProps {
  order: Order;
  onClose: () => void;
}

export default function OrderReceipt({ order, onClose }: OrderReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Action buttons - no print */}
        <div className="flex items-center justify-between mb-6 no-print">
          <button
            onClick={onClose}
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            ← Back to Store
          </button>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-sm bg-surface border border-border px-4 py-2 rounded-xl hover:border-amber transition-colors"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 text-sm bg-amber text-noir px-4 py-2 rounded-xl hover:bg-amber-light transition-colors"
            >
              <Download className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>

        {/* Receipt */}
        <div className="print-receipt bg-surface border border-border rounded-2xl overflow-hidden luxury-shadow">
          {/* Header */}
          <div className="bg-gradient-to-br from-noir-light to-noir px-8 py-8 text-center relative">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,175,55,0.1) 10px, rgba(212,175,55,0.1) 20px)',
              }} />
            </div>
            <div className="relative z-10">
              <Logo size="md" />
              <div className="mt-4 flex items-center justify-center gap-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Order Confirmed</span>
              </div>
            </div>
          </div>

          <div className="px-8 py-6 space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-muted text-xs mb-1">Order ID</p>
                <p className="text-text-primary font-mono font-medium">{order.id}</p>
              </div>
              <div className="text-right">
                <p className="text-text-muted text-xs mb-1">Date</p>
                <p className="text-text-primary font-medium">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs mb-1">Transaction ID</p>
                <p className="text-amber font-mono text-xs font-medium">{order.tranId}</p>
              </div>
              <div className="text-right">
                <p className="text-text-muted text-xs mb-1">Validation ID</p>
                <p className="text-amber font-mono text-xs font-medium">{order.valId}</p>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Customer */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Delivery To</p>
              <p className="text-sm font-medium text-text-primary">{order.customer.name}</p>
              <p className="text-xs text-text-secondary mt-0.5">{order.customer.phone}</p>
              <p className="text-xs text-text-secondary">{order.customer.address}</p>
              <p className="text-xs text-text-secondary">{order.customer.city}, {order.customer.division}</p>
            </div>

            <div className="h-px bg-border" />

            {/* Items */}
            <div>
              <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Order Items</p>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4 text-amber" />
                      <div>
                        <p className="text-sm text-text-primary font-medium">{item.productName}</p>
                        <p className="text-xs text-text-muted">{item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-text-primary">
                      ৳{(item.unitPrice * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* Totals */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">Subtotal</span>
                <span className="text-text-primary">৳{order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Delivery</span>
                <span className="text-text-primary">
                  {order.deliveryFee === 0 ? 'FREE' : `৳${order.deliveryFee}`}
                </span>
              </div>
              <div className="h-px bg-border" />
              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-text-primary">Grand Total</span>
                <span className="text-2xl font-serif font-bold text-gold-gradient">
                  ৳{order.total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-surface-hover rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-text-muted">Payment Method</p>
                <p className="text-sm font-medium text-text-primary">{order.paymentMethod}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                order.paymentStatus === 'Success'
                  ? 'bg-success/10 text-success border border-success/20'
                  : 'bg-error/10 text-error border border-error/20'
              }`}>
                {order.paymentStatus}
              </div>
            </div>

            {/* Footer note */}
            <p className="text-center text-[10px] text-text-muted pt-4 border-t border-border-subtle">
              Thank you for choosing Atelier Ambre. For any queries, contact us at concierge@atelierambre.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
