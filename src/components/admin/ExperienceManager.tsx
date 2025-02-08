import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  logo: string;
}

export const ExperienceManager = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newExperience, setNewExperience] = useState<Omit<Experience, 'id'>>({
    company: '',
    role: '',
    period: '',
    description: '',
    achievements: [],
    logo: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateExperience(editingId, { ...newExperience });
      setEditingId(null);
    } else {
      const experienceToAdd = {
        ...newExperience,
      };
      // @ts-ignore - we know this is safe as the id will be added in the store
      addExperience(experienceToAdd);
    }
    setNewExperience({
      company: '',
      role: '',
      period: '',
      description: '',
      achievements: [],
      logo: ''
    });
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setNewExperience(experience);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Company"
          value={newExperience.company}
          onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Role"
          value={newExperience.role}
          onChange={(e) => setNewExperience(prev => ({ ...prev, role: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Period"
          value={newExperience.period}
          onChange={(e) => setNewExperience(prev => ({ ...prev, period: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <textarea
          placeholder="Description"
          value={newExperience.description}
          onChange={(e) => setNewExperience(prev => ({ ...prev, description: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white h-32"
        />
        <textarea
          placeholder="Achievements (one per line)"
          value={newExperience.achievements.join('\n')}
          onChange={(e) => setNewExperience(prev => ({ 
            ...prev, 
            achievements: e.target.value.split('\n').filter(a => a.trim() !== '')
          }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white h-32"
        />
        <input
          type="text"
          placeholder="Logo URL"
          value={newExperience.logo}
          onChange={(e) => setNewExperience(prev => ({ ...prev, logo: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <button type="submit" className="btn flex items-center gap-2">
          {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {editingId ? 'Save Experience' : 'Add Experience'}
        </button>
      </form>

      <div className="space-y-4">
        {experiences.map((experience: Experience) => (
          <motion.div
            key={experience.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-4 bg-black/30 border border-[#00FF41]/20 rounded-lg"
          >
            <div>
              <h3 className="text-[#00FF41] font-bold">{experience.company}</h3>
              <p className="text-gray-400">{experience.role}</p>
              <p className="text-gray-400">{experience.period}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(experience)}
                className="p-2 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteExperience(experience.id)}
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