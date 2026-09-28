'use client';

import React, { useState } from 'react';
import { CreditCard, RefreshCw, XCircle, Filter, CheckCircle, Clock, AlertCircle, Search } from 'lucide-react';
import { mockTransactions, Transaction } from '@/data/transactions';
import { useToastStore } from '@/store/toast-store';
import { useOrderStore } from '@/store/order-store';

export default function TransactionLedger() {
  const { addToast } = useToastStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionConfirm, setActionConfirm] = useState<{ tranId: string; action: 'refund' | 'void' } | null>(null);

  const filtered = transactions.filter((t) => {
    if (filterMethod !== 'all' && t.paymentMethod !== filterMethod) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTranId = t.tranId.toLowerCase().includes(q);
      const matchesPhone = t.customerPhone.toLowerCase().includes(q);
      const matchesName = t.customerName.toLowerCase().includes(q);
      if (!matchesTranId && !matchesPhone && !matchesName) return false;
    }
    return true;
  });

  const handleAction = (tranId: string, action: 'refund' | 'void') => {
    const txn = transactions.find((t) => t.tranId === tranId);

    // Update transaction status
    setTransactions((prev) =>
      prev.map((t) =>
        t.tranId === tranId
          ? { ...t, status: action === 'refund' ? 'Refunded' as const : 'Voided' as const }
          : t
      )
    );

    // Also update the corresponding order's payment status
    if (txn) {
      const matchedOrder = orders.find((o) => o.tranId === tranId);
      if (matchedOrder) {
        // Use the order store to update payment status
        // Since we don't have a direct updatePaymentStatus, we update via the order itself
        useOrderStore.getState().updateOrderStatus(matchedOrder.id, matchedOrder.orderStatus);
        // We need to update the payment status directly in the orders array
        useOrderStore.setState((state) => ({
          orders: state.orders.map((o) =>
            o.tranId === tranId
              ? { ...o, paymentStatus: action === 'refund' ? 'Refunded' as const : 'Voided' as const }
              : o
          ),
        }));
      }
    }

    setActionConfirm(null);
    addToast({
      type: 'success',
      title: action === 'refund' ? 'Refund Processed' : 'Transaction Voided',
      message: `Transaction ${tranId} — ৳${txn?.amount.toLocaleString() || '0'} ${action === 'refund' ? 'refunded' : 'voided'} successfully`,
    });
  };

  const statusIcons: Record<string, React.ReactNode> = {
    Success: <CheckCircle className="w-3.5 h-3.5 text-success" />,
    Failed: <XCircle className="w-3.5 h-3.5 text-error" />,
    Initiated: <Clock className="w-3.5 h-3.5 text-warning" />,
    Validating: <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin" />,
    Refunded: <RefreshCw className="w-3.5 h-3.5 text-violet-400" />,
    Voided: <AlertCircle className="w-3.5 h-3.5 text-text-muted" />,
  };

  const statusColors: Record<string, string> = {
    Success: 'bg-success/10 text-success border-success/20',
    Failed: 'bg-error/10 text-error border-error/20',
    Initiated: 'bg-warning/10 text-warning border-warning/20',
    Validating: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    Refunded: 'bg-violet-400/10 text-violet-400 border-violet-400/20',
    Voided: 'bg-text-muted/10 text-text-muted border-text-muted/20',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">Transaction Ledger</h1>
          <p className="text-sm text-text-secondary mt-1">SSLCommerz payment audit trail — {filtered.length} transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search TRAN_ID, phone..."
            className="bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber w-56"
          />
        </div>
        <Filter className="w-4 h-4 text-text-muted" />
        <select
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
          className="bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-amber"
        >
          <option value="all">All Methods</option>
          <option value="bKash">bKash</option>
          <option value="Nagad">Nagad</option>
          <option value="Rocket">Rocket</option>
          <option value="Visa">Visa</option>
          <option value="Mastercard">Mastercard</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-surface border border-border rounded-xl px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-amber"
        >
          <option value="all">All Statuses</option>
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
          <option value="Voided">Voided</option>
        </select>
      </div>

      {/* Transaction Table */}
      <div className="rounded-xl border border-border-subtle bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-hover">
              <tr>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">TRAN_ID</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">VAL_ID</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Customer</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Amount</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Method</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Gateway</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Risk</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Status</th>
                <th className="text-left px-4 py-3 text-xs text-text-muted font-medium">Timestamp</th>
                <th className="text-right px-4 py-3 text-xs text-text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((txn) => (
                <tr key={txn.tranId} className="border-t border-border-subtle/50 hover:bg-surface-hover transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-amber">{txn.tranId}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-text-muted">{txn.valId}</td>
                  <td className="px-4 py-3">
                    <p className="text-text-primary text-xs">{txn.customerName}</p>
                    <p className="text-[10px] text-text-muted">{txn.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3 text-text-primary font-medium">৳{txn.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber/10 text-amber border border-amber/20">
                      {txn.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-text-secondary">{txn.bankGateway || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${
                      txn.riskLevel === 'Low' ? 'bg-success/10 text-success border-success/20' :
                      txn.riskLevel === 'Medium' ? 'bg-warning/10 text-warning border-warning/20' :
                      'bg-error/10 text-error border-error/20'
                    }`}>
                      {txn.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${statusColors[txn.status]}`}>
                      {statusIcons[txn.status]}
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[10px] text-text-muted">
                    {new Date(txn.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {txn.status === 'Success' && (
                      <div className="flex items-center justify-end gap-1">
                        {actionConfirm?.tranId === txn.tranId ? (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleAction(txn.tranId, actionConfirm.action)}
                              className="text-[10px] px-2 py-1 bg-error text-white rounded-lg hover:bg-error/80 transition-colors"
                            >
                              Confirm {actionConfirm.action === 'refund' ? 'Refund' : 'Void'}
                            </button>
                            <button
                              onClick={() => setActionConfirm(null)}
                              className="text-[10px] px-2 py-1 bg-surface-hover text-text-secondary rounded-lg"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => setActionConfirm({ tranId: txn.tranId, action: 'refund' })}
                              className="text-[10px] px-2 py-1 border border-border rounded-lg text-text-muted hover:text-violet-400 hover:border-violet-400/30 transition-all"
                              title="Issue Refund"
                            >
                              Refund
                            </button>
                            <button
                              onClick={() => setActionConfirm({ tranId: txn.tranId, action: 'void' })}
                              className="text-[10px] px-2 py-1 border border-border rounded-lg text-text-muted hover:text-error hover:border-error/30 transition-all"
                              title="Void Transaction"
                            >
                              Void
                            </button>
                          </>
                        )}
                      </div>
                    )}
                    {txn.status === 'Refunded' && (
                      <span className="text-[10px] text-violet-400 italic">Refunded</span>
                    )}
                    {txn.status === 'Voided' && (
                      <span className="text-[10px] text-text-muted italic">Voided</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
