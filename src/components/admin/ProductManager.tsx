'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Package, AlertTriangle, PackagePlus } from 'lucide-react';
import { useProductStore } from '@/store/product-store';
import { useToastStore } from '@/store/toast-store';
import { Product, ScentFamily, scentFamilies } from '@/data/products';

interface EditFormData {
  name: string;
  subtitle: string;
  description: string;
  scentFamily: ScentFamily;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  price50ml: string;
  price100ml: string;
  stock: string;
  imageUrl: string;
}

export default function ProductManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductStore();
  const { addToast } = useToastStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [quickRestockId, setQuickRestockId] = useState<string | null>(null);
  const [quickRestockAmount, setQuickRestockAmount] = useState('');

  const [newProduct, setNewProduct] = useState({
    name: '', scentFamily: 'Woody' as ScentFamily, topNotes: '', heartNotes: '', baseNotes: '',
    price50ml: '', price100ml: '', stock: '', imageUrl: '', subtitle: '', description: '',
  });

  const [editForm, setEditForm] = useState<EditFormData>({
    name: '', subtitle: '', description: '', scentFamily: 'Woody',
    topNotes: '', heartNotes: '', baseNotes: '',
    price50ml: '', price100ml: '', stock: '', imageUrl: '',
  });

  const handleAdd = () => {
    const product: Product = {
      id: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      name: newProduct.name,
      subtitle: newProduct.subtitle || 'New Fragrance',
      description: newProduct.description || 'A new addition to our collection.',
      scentFamily: newProduct.scentFamily,
      pyramid: {
        top: newProduct.topNotes.split(',').map((n) => ({ name: n.trim() })).filter((n) => n.name),
        heart: newProduct.heartNotes.split(',').map((n) => ({ name: n.trim() })).filter((n) => n.name),
        base: newProduct.baseNotes.split(',').map((n) => ({ name: n.trim() })).filter((n) => n.name),
      },
      price50ml: parseInt(newProduct.price50ml) || 0,
      price100ml: parseInt(newProduct.price100ml) || 0,
      stock: parseInt(newProduct.stock) || 0,
      sillage: 'Moderate',
      longevity: 8,
      imageUrl: newProduct.imageUrl || '/perfumes/default.jpg',
      imageBg: 'linear-gradient(135deg, #44403c 0%, #292524 50%, #1c1917 100%)',
      featured: false,
      tags: [newProduct.scentFamily],
    };
    addProduct(product);
    setIsAddModalOpen(false);
    setNewProduct({ name: '', scentFamily: 'Woody', topNotes: '', heartNotes: '', baseNotes: '', price50ml: '', price100ml: '', stock: '', imageUrl: '', subtitle: '', description: '' });
    addToast({ type: 'success', title: 'Product Added', message: `${product.name} has been added to the catalog` });
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      subtitle: product.subtitle,
      description: product.description,
      scentFamily: product.scentFamily,
      topNotes: product.pyramid.top.map((n) => n.name).join(', '),
      heartNotes: product.pyramid.heart.map((n) => n.name).join(', '),
      baseNotes: product.pyramid.base.map((n) => n.name).join(', '),
      price50ml: product.price50ml.toString(),
      price100ml: product.price100ml.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl,
    });
  };

  const handleEditSave = () => {
    if (!editingProduct) return;
    const updates: Partial<Product> = {
      name: editForm.name,
      subtitle: editForm.subtitle,
      description: editForm.description,
      scentFamily: editForm.scentFamily,
      pyramid: {
        top: editForm.topNotes.split(',').map((n) => ({ name: n.trim() })).filter((n) => n.name),
        heart: editForm.heartNotes.split(',').map((n) => ({ name: n.trim() })).filter((n) => n.name),
        base: editForm.baseNotes.split(',').map((n) => ({ name: n.trim() })).filter((n) => n.name),
      },
      price50ml: parseInt(editForm.price50ml) || 0,
      price100ml: parseInt(editForm.price100ml) || 0,
      stock: parseInt(editForm.stock) || 0,
      imageUrl: editForm.imageUrl,
    };
    updateProduct(editingProduct.id, updates);
    setEditingProduct(null);
    addToast({ type: 'success', title: 'Product Updated', message: `${editForm.name} has been updated` });
  };

  const handleQuickRestock = (productId: string) => {
    const amount = parseInt(quickRestockAmount);
    if (amount <= 0) return;
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    updateProduct(productId, { stock: product.stock + amount });
    setQuickRestockId(null);
    setQuickRestockAmount('');
    addToast({ type: 'success', title: 'Stock Updated', message: `Added ${amount} units to ${product.name}` });
  };

  const handleDelete = (id: string) => {
    const p = products.find((p) => p.id === id);
    deleteProduct(id);
    setDeleteConfirm(null);
    addToast({ type: 'info', title: 'Product Removed', message: `${p?.name} has been deleted` });
  };

  // Shared form fields renderer
  const renderFormFields = (
    data: typeof newProduct | EditFormData,
    setData: (data: typeof newProduct | EditFormData) => void,
  ) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="col-span-2">
        <label className="text-xs font-medium text-text-secondary mb-1 block">Name *</label>
        <input type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="e.g., Ambre Solaire" />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1 block">Subtitle</label>
        <input type="text" value={data.subtitle} onChange={(e) => setData({ ...data, subtitle: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="e.g., Golden Hour" />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1 block">Scent Family *</label>
        <select value={data.scentFamily} onChange={(e) => setData({ ...data, scentFamily: e.target.value as ScentFamily })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber">
          {scentFamilies.map((f) => <option key={f} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="col-span-2">
        <label className="text-xs font-medium text-text-secondary mb-1 block">Description</label>
        <textarea value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} rows={2} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber resize-none" placeholder="Product description..." />
      </div>
      <div className="col-span-2">
        <label className="text-xs font-medium text-text-secondary mb-1 block">Top Notes (comma separated)</label>
        <input type="text" value={data.topNotes} onChange={(e) => setData({ ...data, topNotes: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="e.g., Bergamot, Lemon, Pink Pepper" />
      </div>
      <div className="col-span-2">
        <label className="text-xs font-medium text-text-secondary mb-1 block">Heart Notes (comma separated)</label>
        <input type="text" value={data.heartNotes} onChange={(e) => setData({ ...data, heartNotes: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="e.g., Rose, Jasmine, Oud" />
      </div>
      <div className="col-span-2">
        <label className="text-xs font-medium text-text-secondary mb-1 block">Base Notes (comma separated)</label>
        <input type="text" value={data.baseNotes} onChange={(e) => setData({ ...data, baseNotes: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="e.g., Musk, Amber, Sandalwood" />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1 block">50ml Price (৳)</label>
        <input type="number" value={data.price50ml} onChange={(e) => setData({ ...data, price50ml: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="3500" />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1 block">100ml Price (৳)</label>
        <input type="number" value={data.price100ml} onChange={(e) => setData({ ...data, price100ml: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="6000" />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1 block">Stock Count</label>
        <input type="number" value={data.stock} onChange={(e) => setData({ ...data, stock: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="25" />
      </div>
      <div>
        <label className="text-xs font-medium text-text-secondary mb-1 block">Image URL</label>
        <input type="text" value={data.imageUrl} onChange={(e) => setData({ ...data, imageUrl: e.target.value })} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber" placeholder="https://..." />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-text-primary">Product Management</h1>
          <p className="text-sm text-text-secondary mt-1">{products.length} fragrances in catalog</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-amber hover:bg-amber-light text-noir font-semibold px-5 py-2.5 rounded-xl transition-all text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Perfume
        </button>
      </div>

      {/* Product Table */}
      <div className="rounded-xl border border-border-subtle bg-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-hover">
              <tr>
                <th className="text-left px-5 py-3 text-xs text-text-muted font-medium">Product</th>
                <th className="text-left px-5 py-3 text-xs text-text-muted font-medium">Family</th>
                <th className="text-left px-5 py-3 text-xs text-text-muted font-medium">50ml</th>
                <th className="text-left px-5 py-3 text-xs text-text-muted font-medium">100ml</th>
                <th className="text-left px-5 py-3 text-xs text-text-muted font-medium">Stock</th>
                <th className="text-left px-5 py-3 text-xs text-text-muted font-medium">Status</th>
                <th className="text-right px-5 py-3 text-xs text-text-muted font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border-subtle/50 hover:bg-surface-hover transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{ background: product.imageBg }}
                      >
                        {product.imageUrl && product.imageUrl.startsWith('http') ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-serif font-bold text-sm">
                            {product.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">{product.name}</p>
                        <p className="text-xs text-text-muted">{product.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-amber/10 text-amber border border-amber/20">
                      {product.scentFamily}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-primary">৳{product.price50ml.toLocaleString()}</td>
                  <td className="px-5 py-4 text-text-primary">৳{product.price100ml.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className="text-text-primary">{product.stock}</span>
                  </td>
                  <td className="px-5 py-4">
                    {product.stock === 0 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-error/10 text-error border border-error/20">Sold Out</span>
                    ) : product.stock <= 10 ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-warning/10 text-warning border border-warning/20 flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> Low
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">In Stock</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {/* Quick restock */}
                      {quickRestockId === product.id ? (
                        <div className="flex items-center gap-1 mr-1">
                          <input
                            type="number"
                            value={quickRestockAmount}
                            onChange={(e) => setQuickRestockAmount(e.target.value)}
                            className="w-14 bg-surface border border-amber rounded-lg px-2 py-1 text-xs text-text-primary focus:outline-none text-center"
                            placeholder="Qty"
                            min="1"
                            autoFocus
                          />
                          <button
                            onClick={() => handleQuickRestock(product.id)}
                            className="w-7 h-7 rounded-lg bg-success/10 text-success flex items-center justify-center hover:bg-success/20"
                            title="Confirm restock"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => { setQuickRestockId(null); setQuickRestockAmount(''); }}
                            className="w-7 h-7 rounded-lg bg-error/10 text-error flex items-center justify-center hover:bg-error/20"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setQuickRestockId(product.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-success hover:bg-success/10 transition-all"
                          title="Quick restock"
                        >
                          <PackagePlus className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Edit */}
                      <button
                        onClick={() => openEditModal(product)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-amber hover:bg-amber/10 transition-all"
                        title="Edit product"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete */}
                      {deleteConfirm === product.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-[10px] px-2 py-1 bg-error text-white rounded-lg"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-[10px] px-2 py-1 bg-surface-hover text-text-secondary rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(product.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-error hover:bg-error/10 transition-all"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[500] animate-fade-in" onClick={() => setIsAddModalOpen(false)} />
          <div className="fixed inset-0 z-[501] flex items-center justify-center p-4" onClick={() => setIsAddModalOpen(false)}>
            <div
              className="w-full max-w-lg bg-surface rounded-2xl overflow-hidden luxury-shadow-lg animate-scale-in border border-border max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-amber" />
                  <h2 className="font-serif text-lg font-semibold text-text-primary">Add New Perfume</h2>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center hover:bg-border transition-colors">
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {renderFormFields(newProduct, (data) => setNewProduct(data as typeof newProduct))}
                <button
                  onClick={handleAdd}
                  disabled={!newProduct.name}
                  className="w-full bg-amber hover:bg-amber-light text-noir font-semibold py-3 rounded-xl transition-all disabled:opacity-40 text-sm mt-2"
                >
                  Add to Catalog
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[500] animate-fade-in" onClick={() => setEditingProduct(null)} />
          <div className="fixed inset-0 z-[501] flex items-center justify-center p-4" onClick={() => setEditingProduct(null)}>
            <div
              className="w-full max-w-lg bg-surface rounded-2xl overflow-hidden luxury-shadow-lg animate-scale-in border border-border max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-amber" />
                  <h2 className="font-serif text-lg font-semibold text-text-primary">Edit Product</h2>
                </div>
                <button onClick={() => setEditingProduct(null)} className="w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center hover:bg-border transition-colors">
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {renderFormFields(editForm, (data) => setEditForm(data as EditFormData))}
                <button
                  onClick={handleEditSave}
                  disabled={!editForm.name}
                  className="w-full bg-amber hover:bg-amber-light text-noir font-semibold py-3 rounded-xl transition-all disabled:opacity-40 text-sm mt-2 flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
