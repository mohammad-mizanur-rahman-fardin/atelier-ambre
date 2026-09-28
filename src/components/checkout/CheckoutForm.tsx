'use client';

import React, { useState } from 'react';
import { MapPin, Phone, User, Home, ChevronDown } from 'lucide-react';
import { divisions, Division } from '@/data/orders';
import { useCartStore } from '@/store/cart-store';
import { useAuthStore } from '@/store/auth-store';

interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  division: Division;
  city: string;
  address: string;
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const { user } = useAuthStore();
  const [formData, setFormData] = useState<CheckoutData>({
    fullName: user?.name || '',
    phone: user?.phone || '+880 ',
    division: 'Dhaka',
    city: '',
    address: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({});
  const { setDeliveryZone } = useCartStore();

  const handleDivisionChange = (division: Division) => {
    setFormData({ ...formData, division });
    setDeliveryZone(division === 'Dhaka' ? 'inside-dhaka' : 'outside-dhaka');
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutData, string>> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.phone.match(/^\+880\s?\d{4}-?\d{6}$/)) newErrors.phone = 'Valid BD phone required (e.g., +880 1712-345678)';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  // Set delivery zone on mount
  React.useEffect(() => {
    setDeliveryZone(formData.division === 'Dhaka' ? 'inside-dhaka' : 'outside-dhaka');
  }, [formData.division, setDeliveryZone]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h3 className="font-serif text-lg font-semibold text-text-primary flex items-center gap-2">
        <MapPin className="w-5 h-5 text-amber" />
        Delivery Information
      </h3>

      {/* Full Name */}
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => { setFormData({ ...formData, fullName: e.target.value }); setErrors({ ...errors, fullName: '' }); }}
            placeholder="e.g., Fahmida Rahman"
            className={`w-full bg-surface border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors ${
              errors.fullName ? 'border-error' : 'border-border'
            }`}
          />
        </div>
        {errors.fullName && <p className="text-xs text-error mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
            placeholder="+880 1712-345678"
            className={`w-full bg-surface border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors ${
              errors.phone ? 'border-error' : 'border-border'
            }`}
          />
        </div>
        {errors.phone && <p className="text-xs text-error mt-1">{errors.phone}</p>}
      </div>

      {/* Division & City Row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">Division</label>
          <div className="relative">
            <select
              value={formData.division}
              onChange={(e) => handleDivisionChange(e.target.value as Division)}
              className="w-full bg-surface border border-border rounded-xl pl-4 pr-10 py-3 text-sm text-text-primary focus:outline-none focus:border-amber transition-colors appearance-none"
            >
              {divisions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-text-secondary mb-1.5 block">City / Area</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => { setFormData({ ...formData, city: e.target.value }); setErrors({ ...errors, city: '' }); }}
            placeholder="e.g., Gulshan"
            className={`w-full bg-surface border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors ${
              errors.city ? 'border-error' : 'border-border'
            }`}
          />
          {errors.city && <p className="text-xs text-error mt-1">{errors.city}</p>}
        </div>
      </div>

      {/* Delivery zone info */}
      <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg border ${
        formData.division === 'Dhaka'
          ? 'bg-success/5 text-success border-success/20'
          : 'bg-amber/5 text-amber border-amber/20'
      }`}>
        <MapPin className="w-3 h-3" />
        {formData.division === 'Dhaka'
          ? 'Inside Dhaka — Delivery ৳80 (Free on orders above ৳5,000)'
          : `Outside Dhaka — Delivery ৳150 (Free on orders above ৳5,000)`
        }
      </div>

      {/* Address */}
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1.5 block">Delivery Address</label>
        <div className="relative">
          <Home className="absolute left-3 top-3.5 w-4 h-4 text-text-muted" />
          <textarea
            value={formData.address}
            onChange={(e) => { setFormData({ ...formData, address: e.target.value }); setErrors({ ...errors, address: '' }); }}
            placeholder="House/Flat number, Road, Area (e.g., House 14, Road 103, Gulshan-2, Dhaka 1212)"
            rows={3}
            className={`w-full bg-surface border rounded-xl pl-10 pr-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber transition-colors resize-none ${
              errors.address ? 'border-error' : 'border-border'
            }`}
          />
        </div>
        {errors.address && <p className="text-xs text-error mt-1">{errors.address}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-amber hover:bg-amber-light text-noir font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/20 active:scale-[0.98]"
      >
        Continue to Payment
      </button>
    </form>
  );
}
