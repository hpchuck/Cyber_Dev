import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash, Save, X, AlertTriangle, Download, Upload } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface EditModalProps {
  product: any;
  onClose: () => void;
  onSave: (updates: any) => void;
}

const EditModal: React.FC<EditModalProps> = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState(product);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.price < 0) newErrors.price = 'Price cannot be negative';
    if (form.stock < 0) newErrors.stock = 'Stock cannot be negative';
    if (!form.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(form);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-black/90 border border-[#00FF41]/30 rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#00FF41]">Edit Product</h3>
          <button onClick={onClose} className="text-[#00FF41]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Product Name"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })}
              placeholder="Price"
              step="0.01"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <input
              type="number"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: parseInt(e.target.value) })}
              placeholder="Stock"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>

          <div>
            <input
              type="text"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              placeholder="Category"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
            />
          </div>

          <div>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Description"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white h-24"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 btn flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn bg-red-500/10 border-red-500/30 text-red-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export const ProductManager = () => {
  const { products, addProduct, updateProduct, deleteProduct, updateBatchProducts } = useStore();
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleExport = () => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(products))}`;
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', 'products.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedProducts = JSON.parse(e.target?.result as string);
        updateBatchProducts(importedProducts.map((p: any) => ({ id: p.id, updates: p })));
        showNotification('success', 'Products imported successfully');
      } catch (error) {
        showNotification('error', 'Failed to import products');
      }
    };
    reader.readAsText(file);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setEditingProduct({})}
          className="btn flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="btn flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <label className="btn flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#00FF41]/30">
              <th className="text-left p-4 text-[#00FF41]">Name</th>
              <th className="text-left p-4 text-[#00FF41]">Price</th>
              <th className="text-left p-4 text-[#00FF41]">Stock</th>
              <th className="text-left p-4 text-[#00FF41]">Category</th>
              <th className="text-left p-4 text-[#00FF41]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-[#00FF41]/10">
                <td className="p-4 text-white">{product.name}</td>
                <td className="p-4 text-white">${product.price.toFixed(2)}</td>
                <td className="p-4 text-white">{product.stock}</td>
                <td className="p-4 text-white">{product.category}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowConfirm(product.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {editingProduct && (
          <EditModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSave={(updates) => {
              if (updates.id) {
                updateProduct(updates.id, updates);
                showNotification('success', 'Product updated successfully');
              } else {
                addProduct(updates);
                showNotification('success', 'Product added successfully');
              }
            }}
          />
        )}

        {showConfirm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-black/90 border border-[#00FF41]/30 rounded-lg p-6"
            >
              <div className="flex items-center gap-4 mb-4 text-[#00FF41]">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Confirm Delete</h3>
              </div>
              <p className="text-white mb-6">Are you sure you want to delete this product?</p>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    deleteProduct(showConfirm);
                    setShowConfirm(null);
                    showNotification('success', 'Product deleted successfully');
                  }}
                  className="flex-1 btn bg-red-500/10 border-red-500/30 text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowConfirm(null)}
                  className="flex-1 btn"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 p-4 rounded-lg ${
              notification.type === 'success' 
                ? 'bg-[#00FF41]/10 border-[#00FF41]/30 text-[#00FF41]' 
                : 'bg-red-500/10 border-red-500/30 text-red-500'
            } border backdrop-blur-sm`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};