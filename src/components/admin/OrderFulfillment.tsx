'use client';

import React, { useState } from 'react';
import { ChevronDown, Package, Phone, MapPin, Filter, Search } from 'lucide-react';
import { useOrderStore } from '@/store/order-store';
import { useToastStore } from '@/store/toast-store';
import { OrderStatus } from '@/data/orders';

export default function OrderFulfillment() {
  const { orders, updateOrderStatus } = useOrderStore();
  const { addToast } = useToastStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    // Status filter
    if (filterStatus !== 'all' && o.orderStatus !== filterStatus) return false;
    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesPhone = o.customer.phone.toLowerCase().includes(q);
      const matchesTranId = o.tranId.toLowerCase().includes(q);
      const matchesOrderId = o.id.toLowerCase().includes(q);
      const matchesName = o.customer.name.toLowerCase().includes(q);
      if (!matchesPhone && !matchesTranId && !matchesOrderId && !matchesName) return false;
    }
    return true;
  });

  const statuses: OrderStatus[] = ['Pending', 'Processing', 'Dispatched', 'Delivered'];

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    addToast({ type: 'success', title: 'Order Updated', message: `Status changed to ${status}` });
  };

  const statusColors: Record<string, string> = {
    Pending: 'bg-warning/10 text-warning border-warning/20',
    Processing: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    Dispatched: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
    Delivered: 'bg-success/10 text-success border-success/20',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">Order Fulfillment</h1>
          <p className="text-sm text-text-secondary mt-1">{filteredOrders.length} of {orders.length} orders</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phone, TRAN_ID, name..."
              className="bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber w-64"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-text-muted" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-amber"
            >
              <option value="all">All Orders</option>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-border-subtle bg-surface p-12 text-center">
          <p className="text-text-muted font-serif text-lg">No orders found</p>
          <p className="text-sm text-text-muted mt-2">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border-subtle bg-surface overflow-hidden hover:border-amber/20 transition-all"
            >
              {/* Order Header */}
              <div
                className="px-5 py-4 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-amber">{order.id}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[order.orderStatus]}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-text-primary mt-1">{order.customer.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-text-primary">৳{order.total.toLocaleString()}</p>
                    <p className="text-[10px] text-text-muted">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="px-5 pb-5 pt-0 border-t border-border-subtle animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {/* Customer Info */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Customer Details</p>
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Phone className="w-3.5 h-3.5 text-amber" />
                        {order.customer.phone}
                      </div>
                      <div className="flex items-start gap-2 text-sm text-text-secondary">
                        <MapPin className="w-3.5 h-3.5 text-amber flex-shrink-0 mt-0.5" />
                        <span>{order.customer.address}, {order.customer.city}, {order.customer.division}</span>
                      </div>
                      <p className="text-xs text-text-muted mt-2">
                        TRAN_ID: <span className="font-mono text-amber">{order.tranId}</span>
                      </p>
                      <p className="text-xs text-text-muted">
                        Payment: {order.paymentMethod} ({order.paymentStatus})
                      </p>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Order Items</p>
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="w-3.5 h-3.5 text-text-muted" />
                            <span className="text-text-primary">{item.productName} ({item.size})</span>
                          </div>
                          <span className="text-text-secondary">×{item.quantity} — ৳{(item.unitPrice * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-border-subtle flex justify-between text-sm">
                        <span className="text-text-muted">Delivery: ৳{order.deliveryFee}</span>
                        <span className="font-semibold text-text-primary">Total: ৳{order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="mt-4 pt-4 border-t border-border-subtle flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-text-muted">Update Status:</span>
                    <div className="flex gap-2 flex-wrap">
                      {statuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(order.id, status)}
                          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                            order.orderStatus === status
                              ? statusColors[status]
                              : 'border-border text-text-muted hover:border-amber/30 hover:text-text-secondary'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
