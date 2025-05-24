import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { PricingManager } from '../components/admin/PricingManager';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { SkillsManager } from '../components/admin/SkillsManager';
import { TestimonialsManager } from '../components/admin/TestimonialsManager';
import { Layers, DollarSign, Briefcase, Code, MessageSquare } from 'lucide-react';

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<string>('experiences');

  const tabs = [
    { id: 'experiences', label: 'Experiences', icon: <Briefcase size={18} /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Layers size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
  ];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-black text-white py-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 pb-4 border-b border-gray-800">
          <span className="text-indigo-400">Admin</span> Dashboard
        </h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-gray-900/50 text-gray-400 border border-gray-800/30 hover:bg-gray-800/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-gray-900/30 backdrop-blur-lg rounded-xl border border-gray-800/50 p-6">
          {activeTab === 'experiences' && <ExperienceManager />}
          {activeTab === 'pricing' && <PricingManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminPage;
