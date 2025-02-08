import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  category: string;
  features: string[];
  recommended: boolean;
}

const predefinedCategories = [
  'Web Development',
  'Mobile Development',
  'AI/ML Development',
  'DevOps Services',
  'Custom Development'
];

const currencyOptions = [
  { label: 'Indian Rupee (₹)', symbol: '₹' },
  { label: 'US Dollar ($)', symbol: '$' },
  { label: 'Euro (€)', symbol: '€' },
  { label: 'British Pound (£)', symbol: '£' }
];

export const PricingManager = () => {
  const { pricingPlans, addPricingPlan, updatePricingPlan, deletePricingPlan } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPlan, setNewPlan] = useState<Omit<PricingPlan, 'id'>>({
    name: '',
    price: '',
    category: '',
    features: [],
    recommended: false
  });
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
  const [priceValue, setPriceValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const planToSave = {
      ...newPlan,
      category: isCustomCategory ? customCategory : newPlan.category,
      price: `${selectedCurrency.symbol}${priceValue}`
    };

    if (editingId) {
      updatePricingPlan(editingId, planToSave);
      setEditingId(null);
    } else {
      // @ts-ignore - we know this is safe as the id will be added in the store
      addPricingPlan(planToSave);
    }
    setNewPlan({
      name: '',
      price: '',
      category: '',
      features: [],
      recommended: false
    });
    setCustomCategory('');
    setIsCustomCategory(false);
    setPriceValue('');
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingId(plan.id);
    const currencySymbol = plan.price.charAt(0);
    const currency = currencyOptions.find(c => c.symbol === currencySymbol) || currencyOptions[0];
    setSelectedCurrency(currency);
    setPriceValue(plan.price.slice(1));
    
    if (!predefinedCategories.includes(plan.category)) {
      setIsCustomCategory(true);
      setCustomCategory(plan.category);
    } else {
      setIsCustomCategory(false);
    }
    
    setNewPlan(plan);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-[#00FF41]">Category</label>
          <div className="flex gap-4">
            <select
              value={isCustomCategory ? '' : newPlan.category}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustomCategory(true);
                } else {
                  setIsCustomCategory(false);
                  setNewPlan(prev => ({ ...prev, category: e.target.value }));
                }
              }}
              className="flex-1 bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
            >
              <option value="">Select Category</option>
              {predefinedCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="custom">Custom Category</option>
            </select>
            {isCustomCategory && (
              <input
                type="text"
                placeholder="Custom Category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="flex-1 bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
              />
            )}
          </div>
        </div>

        <input
          type="text"
          placeholder="Plan Name"
          value={newPlan.name}
          onChange={(e) => setNewPlan(prev => ({ ...prev, name: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />

        <div className="flex gap-4">
          <select
            value={selectedCurrency.symbol}
            onChange={(e) => setSelectedCurrency(currencyOptions.find(c => c.symbol === e.target.value) || currencyOptions[0])}
            className="w-1/4 bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
          >
            {currencyOptions.map(currency => (
              <option key={currency.symbol} value={currency.symbol}>
                {currency.label}
              </option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Price"
            value={priceValue}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, '');
              setPriceValue(value);
            }}
            className="w-3/4 bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <textarea
          placeholder="Features (one per line)"
          value={newPlan.features.join('\n')}
          onChange={(e) => setNewPlan(prev => ({ 
            ...prev, 
            features: e.target.value.split('\n').filter(f => f.trim() !== '')
          }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white h-32"
        />

        <label className="flex items-center gap-2 text-white">
          <input
            type="checkbox"
            checked={newPlan.recommended}
            onChange={(e) => setNewPlan(prev => ({ ...prev, recommended: e.target.checked }))}
            className="form-checkbox text-[#00FF41]"
          />
          Recommended Plan
        </label>

        <button type="submit" className="btn flex items-center gap-2">
          {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {editingId ? 'Save Plan' : 'Add Plan'}
        </button>
      </form>

      <div className="space-y-4">
        {pricingPlans.map((plan: PricingPlan) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-4 bg-black/30 border border-[#00FF41]/20 rounded-lg"
          >
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[#00FF41] font-bold">{plan.name}</h3>
                {plan.recommended && (
                  <span className="px-2 py-1 text-xs bg-[#00FF41]/20 text-[#00FF41] rounded-full">
                    Recommended
                  </span>
                )}
              </div>
              <p className="text-gray-400">{plan.price} - {plan.category}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="p-2 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deletePricingPlan(plan.id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};