'use client';

import React, { useState } from 'react';
import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle, MapPin, Download, X, Save, PackagePlus } from 'lucide-react';
import { useOrderStore } from '@/store/order-store';
import { useProductStore } from '@/store/product-store';
import { useToastStore } from '@/store/toast-store';

export default function AnalyticsDashboard() {
  const { orders } = useOrderStore();
  const { products, updateProduct } = useProductStore();
  const { addToast } = useToastStore();

  const [isLowStockModalOpen, setIsLowStockModalOpen] = useState(false);
  const [restockValues, setRestockValues] = useState<Record<string, string>>({});

  const successOrders = orders.filter((o) => o.paymentStatus === 'Success');
  const grossRevenue = successOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const aov = successOrders.length > 0 ? Math.round(grossRevenue / successOrders.length) : 0;
  const lowStockProducts = products.filter((p) => p.stock <= 10);

  // Division distribution
  const divisionData: Record<string, number> = {};
  orders.forEach((o) => {
    divisionData[o.customer.division] = (divisionData[o.customer.division] || 0) + 1;
  });
  const maxDivision = Math.max(...Object.values(divisionData), 1);

  // Order status distribution
  const statusCounts = {
    Pending: orders.filter((o) => o.orderStatus === 'Pending').length,
    Processing: orders.filter((o) => o.orderStatus === 'Processing').length,
    Dispatched: orders.filter((o) => o.orderStatus === 'Dispatched').length,
    Delivered: orders.filter((o) => o.orderStatus === 'Delivered').length,
  };

  const handleRestock = (productId: string) => {
    const addValue = parseInt(restockValues[productId] || '0');
    if (addValue <= 0) return;
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    updateProduct(productId, { stock: product.stock + addValue });
    setRestockValues((prev) => ({ ...prev, [productId]: '' }));
    addToast({ type: 'success', title: 'Stock Updated', message: `Added ${addValue} units to ${product.name}` });
  };

  const handleExportCSV = () => {
    const rows = [
      ['Metric', 'Value'],
      ['Gross Revenue (৳)', grossRevenue.toString()],
      ['Total Orders', totalOrders.toString()],
      ['Average Order Value (৳)', aov.toString()],
      ['Successful Orders', successOrders.length.toString()],
      ['Low Stock Products', lowStockProducts.length.toString()],
      [''],
      ['Product', 'Family', '50ml Price', '100ml Price', 'Stock', 'Status'],
      ...products.map((p) => [
        p.name,
        p.scentFamily,
        p.price50ml.toString(),
        p.price100ml.toString(),
        p.stock.toString(),
        p.stock === 0 ? 'Sold Out' : p.stock <= 10 ? 'Low Stock' : 'In Stock',
      ]),
      [''],
      ['Order ID', 'Customer', 'Total', 'Payment Status', 'Order Status', 'Date'],
      ...orders.map((o) => [
        o.id,
        o.customer.name,
        o.total.toString(),
        o.paymentStatus,
        o.orderStatus,
        new Date(o.createdAt).toLocaleDateString(),
      ]),
    ];

    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `atelier-ambre-report-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    addToast({ type: 'success', title: 'Export Complete', message: 'CSV report downloaded successfully' });
  };

  const kpis = [
    { label: 'Gross Revenue', value: `৳${grossRevenue.toLocaleString()}`, icon: DollarSign, trend: '+12.5%', trendUp: true, color: 'text-amber', clickable: false },
    { label: 'Total Orders', value: totalOrders.toString(), icon: ShoppingCart, trend: '+8.3%', trendUp: true, color: 'text-blue-400', clickable: false },
    { label: 'Average Order Value', value: `৳${aov.toLocaleString()}`, icon: TrendingUp, trend: '+4.2%', trendUp: true, color: 'text-emerald-400', clickable: false },
    { label: 'Low Stock Alerts', value: lowStockProducts.length.toString(), icon: AlertTriangle, trend: '', trendUp: false, color: 'text-warning', clickable: true },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">Executive Analytics</h1>
          <p className="text-sm text-text-secondary mt-1">Real-time business intelligence overview</p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 bg-surface border border-border hover:border-amber hover:bg-amber-glow text-text-primary font-medium px-4 py-2.5 rounded-xl transition-all text-sm"
        >
          <Download className="w-4 h-4 text-amber" />
          Export CSV
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              onClick={kpi.clickable ? () => setIsLowStockModalOpen(true) : undefined}
              className={`rounded-xl border border-border-subtle bg-surface p-5 hover:border-amber/20 transition-all ${
                kpi.clickable ? 'cursor-pointer hover:gold-border-glow active:scale-[0.98]' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 rounded-xl bg-amber/5 flex items-center justify-center ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {kpi.trend && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    kpi.trendUp ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                  }`}>
                    {kpi.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-serif font-bold text-text-primary mt-3">{kpi.value}</p>
              <p className="text-xs text-text-muted mt-1">
                {kpi.label}
                {kpi.clickable && <span className="text-amber ml-1">→ Click to manage</span>}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Division Distribution */}
        <div className="rounded-xl border border-border-subtle bg-surface p-6">
          <div className="flex items-center gap-2 mb-5">
            <MapPin className="w-4 h-4 text-amber" />
            <h3 className="text-sm font-semibold text-text-primary">Division-wise Orders</h3>
          </div>
          <div className="space-y-3">
            {Object.entries(divisionData)
              .sort((a, b) => b[1] - a[1])
              .map(([division, count]) => (
                <div key={division} className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary w-24 flex-shrink-0">{division}</span>
                  <div className="flex-1 h-6 bg-surface-hover rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber to-amber-light rounded-lg transition-all duration-1000 flex items-center justify-end pr-2"
                      style={{ width: `${(count / maxDivision) * 100}%` }}
                    >
                      <span className="text-[10px] font-bold text-noir">{count}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="rounded-xl border border-border-subtle bg-surface p-6">
          <h3 className="text-sm font-semibold text-text-primary mb-5">Order Status Breakdown</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(statusCounts).map(([status, count]) => {
              const colors: Record<string, string> = {
                Pending: 'bg-warning/10 text-warning border-warning/20',
                Processing: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
                Dispatched: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
                Delivered: 'bg-success/10 text-success border-success/20',
              };
              return (
                <div key={status} className={`rounded-xl border p-4 ${colors[status]}`}>
                  <p className="text-2xl font-serif font-bold">{count}</p>
                  <p className="text-xs mt-1 opacity-80">{status}</p>
                </div>
              );
            })}
          </div>

          {/* Low stock alerts */}
          {lowStockProducts.length > 0 && (
            <div className="mt-5 pt-5 border-t border-border-subtle">
              <h4 className="text-xs font-semibold text-warning mb-3 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Low Stock Alerts
              </h4>
              <div className="space-y-2">
                {lowStockProducts.map((p) => (
                  <div key={p.id} className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary">{p.name}</span>
                    <span className={`font-medium px-2 py-0.5 rounded-full ${
                      p.stock === 0 ? 'bg-error/10 text-error' : 'bg-warning/10 text-warning'
                    }`}>
                      {p.stock} units
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders Quick View */}
      <div className="rounded-xl border border-border-subtle bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle">
                <th className="text-left py-2 text-xs text-text-muted font-medium">Order ID</th>
                <th className="text-left py-2 text-xs text-text-muted font-medium">Customer</th>
                <th className="text-left py-2 text-xs text-text-muted font-medium">Amount</th>
                <th className="text-left py-2 text-xs text-text-muted font-medium">Status</th>
                <th className="text-left py-2 text-xs text-text-muted font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-border-subtle/50 hover:bg-surface-hover transition-colors">
                  <td className="py-3 font-mono text-xs text-amber">{order.id}</td>
                  <td className="py-3 text-text-primary">{order.customer.name}</td>
                  <td className="py-3 text-text-primary font-medium">৳{order.total.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      order.orderStatus === 'Delivered' ? 'bg-success/10 text-success border-success/20' :
                      order.orderStatus === 'Dispatched' ? 'bg-violet-400/10 text-violet-400 border-violet-400/20' :
                      order.orderStatus === 'Processing' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-text-muted">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Low Stock Modal */}
      {isLowStockModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[500] animate-fade-in" onClick={() => setIsLowStockModalOpen(false)} />
          <div className="fixed inset-0 z-[501] flex items-center justify-center p-4" onClick={() => setIsLowStockModalOpen(false)}>
            <div
              className="w-full max-w-lg bg-surface rounded-2xl overflow-hidden luxury-shadow-lg animate-scale-in border border-border max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <h2 className="font-serif text-lg font-semibold text-text-primary">Low Stock Management</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20">
                    {lowStockProducts.length} items
                  </span>
                </div>
                <button onClick={() => setIsLowStockModalOpen(false)} className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center hover:bg-border transition-colors">
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto flex-1">
                {lowStockProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-text-muted text-sm">All products are well-stocked! 🎉</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 rounded-xl border border-border-subtle hover:border-amber/20 transition-all">
                        {/* Product Info */}
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: product.imageBg }}
                        >
                          <span className="text-white font-serif font-bold">{product.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">{product.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              product.stock === 0
                                ? 'bg-error/10 text-error border border-error/20'
                                : 'bg-warning/10 text-warning border border-warning/20'
                            }`}>
                              {product.stock} units
                            </span>
                            <span className="text-[10px] text-text-muted">{product.scentFamily}</span>
                          </div>
                        </div>
                        {/* Restock Input */}
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <input
                            type="number"
                            placeholder="Qty"
                            value={restockValues[product.id] || ''}
                            onChange={(e) => setRestockValues((prev) => ({ ...prev, [product.id]: e.target.value }))}
                            className="w-16 bg-surface border border-border rounded-lg px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:border-amber text-center"
                            min="1"
                          />
                          <button
                            onClick={() => handleRestock(product.id)}
                            disabled={!restockValues[product.id] || parseInt(restockValues[product.id]) <= 0}
                            className="flex items-center gap-1 bg-amber hover:bg-amber-light text-noir text-xs font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            <PackagePlus className="w-3.5 h-3.5" />
                            Restock
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
