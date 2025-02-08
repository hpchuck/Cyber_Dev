import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save, Code } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { iconMap } from '../SkillsSection';

interface Skill {
  id: string;
  category: string;
  name: string;
  icon: string;
}

const predefinedCategories = [
  'Frontend',
  'Backend',
  'AI/ML',
  'DevOps',
  'Database',
  'Other'
];

export const SkillsManager = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    category: '',
    name: '',
    icon: ''
  });
  const [customCategory, setCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillToSave = {
      ...newSkill,
      category: isCustomCategory ? customCategory : newSkill.category
    };

    if (editingId) {
      updateSkill(editingId, skillToSave);
      setEditingId(null);
    } else {
      // @ts-ignore - we know this is safe as the id will be added in the store
      addSkill(skillToSave);
    }
    setNewSkill({
      category: '',
      name: '',
      icon: ''
    });
    setCustomCategory('');
    setIsCustomCategory(false);
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill.id);
    setNewSkill(skill);
    if (!predefinedCategories.includes(skill.category)) {
      setIsCustomCategory(true);
      setCustomCategory(skill.category);
    } else {
      setIsCustomCategory(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <label className="text-[#00FF41]">Category</label>
          <div className="flex gap-4">
            <select
              value={isCustomCategory ? '' : newSkill.category}
              onChange={(e) => {
                if (e.target.value === 'custom') {
                  setIsCustomCategory(true);
                } else {
                  setIsCustomCategory(false);
                  setNewSkill(prev => ({ ...prev, category: e.target.value }));
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

        <div className="flex flex-col space-y-2">
          <label className="text-[#00FF41]">Icon</label>
          <select
            value={newSkill.icon}
            onChange={(e) => setNewSkill(prev => ({ ...prev, icon: e.target.value }))}
            className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
          >
            <option value="">Select Icon</option>
            {Object.keys(iconMap).map(icon => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-[#00FF41]">Name</label>
          <input
            type="text"
            placeholder="Skill Name"
            value={newSkill.name}
            onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
            className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <button type="submit" className="btn flex items-center gap-2">
          {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {editingId ? 'Save Skill' : 'Add Skill'}
        </button>
      </form>

      <div className="space-y-4">
        {skills.map((skill: Skill) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-4 bg-black/30 border border-[#00FF41]/20 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className="text-[#00FF41] w-8 h-8 flex items-center justify-center">
                {iconMap[skill.icon.toLowerCase()] || <Code />}
              </div>
              <div>
                <h3 className="text-[#00FF41] font-bold">{skill.name}</h3>
                <p className="text-gray-400">{skill.category}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="p-2 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteSkill(skill.id)}
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