'use client';

import React, { useState } from 'react';
import { ShoppingBag, Eye, Droplets, Tag } from 'lucide-react';
import { Product } from '@/data/products';
import { useCartStore } from '@/store/cart-store';
import { useProductStore } from '@/store/product-store';
import { useToastStore } from '@/store/toast-store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('50ml');
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCartStore();
  const { openOlfactoryModal } = useProductStore();
  const { addToast } = useToastStore();

  const price = selectedSize === '50ml' ? product.price50ml : product.price100ml;

  const stockStatus = product.stock === 0 ? 'out' : product.stock <= 10 ? 'low' : 'in';
  const stockBadge = {
    in: { label: 'In Stock', className: 'bg-success/10 text-success border-success/20' },
    low: { label: `Only ${product.stock} left`, className: 'bg-warning/10 text-warning border-warning/20' },
    out: { label: 'Sold Out', className: 'bg-error/10 text-error border-error/20' },
  }[stockStatus];

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      unitPrice: price,
      imageUrl: product.imageUrl,
      imageBg: product.imageBg,
    });
    addToast({
      type: 'success',
      title: 'Added to bag',
      message: `${product.name} (${selectedSize}) — ৳${price.toLocaleString()}`,
    });
  };

  return (
    <div className="group relative flex flex-col rounded-2xl border border-border-subtle hover:border-amber/30 transition-all duration-500 overflow-hidden hover:gold-border-glow bg-surface h-full">
      {/* Product Image Area */}
      <div
        className="relative aspect-[4/5] overflow-hidden flex-shrink-0"
        style={{ background: product.imageBg }}
      >
        {/* Actual product image */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          /* Fallback: gradient + bottle silhouette */
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 transition-transform duration-700 group-hover:scale-110">
              <div className="w-20 h-32 rounded-b-3xl rounded-t-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="w-8 h-3 bg-white/20 rounded-sm mb-2" />
                <span className="text-white/80 font-serif text-xl font-bold">{product.name.charAt(0)}</span>
                <span className="text-white/40 text-[8px] mt-1 tracking-[0.2em]">{selectedSize}</span>
              </div>
            </div>
          </div>
        )}

        {/* Subtle overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-[10px] font-medium bg-noir/70 text-amber backdrop-blur-sm px-2.5 py-1 rounded-full border border-amber/20"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>

        {/* Stock badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full border backdrop-blur-sm ${stockBadge.className}`}>
            {stockBadge.label}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Scent family badge */}
        <div className="flex items-center gap-2 mb-2">
          <Droplets className="w-3 h-3 text-amber" />
          <span className="text-[11px] text-amber font-medium tracking-wider uppercase">
            {product.scentFamily}
          </span>
        </div>

        <h3 className="font-serif text-lg font-semibold text-text-primary group-hover:text-amber transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-text-muted mt-0.5 italic">{product.subtitle}</p>
        <p className="text-sm text-text-secondary mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Size Toggle */}
        <div className="flex items-center gap-2 mt-4">
          {(['50ml', '100ml'] as const).map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                selectedSize === size
                  ? 'border-amber bg-amber/10 text-amber'
                  : 'border-border text-text-muted hover:border-border hover:text-text-secondary'
              }`}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-4">
          <p className="text-xl font-serif font-bold text-gold-gradient">
            ৳{price.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-xs text-text-muted">
            <span>Longevity: {product.longevity}h</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-4">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-amber/20 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
          <button
            onClick={() => openOlfactoryModal(product)}
            className="w-12 flex items-center justify-center border border-border rounded-xl hover:border-amber hover:bg-amber-glow transition-all"
            aria-label="Inspect notes"
            title="Inspect Olfactory Notes"
          >
            <Eye className="w-4 h-4 text-text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}
