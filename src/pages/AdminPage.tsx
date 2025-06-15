import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut, Shield, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ExperienceManager } from '../components/admin/ExperienceManager';
import { PricingManager } from '../components/admin/PricingManager';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { SkillsManager } from '../components/admin/SkillsManager';
import { TestimonialsManager } from '../components/admin/TestimonialsManager';
import { Layers, DollarSign, Briefcase, Code, MessageSquare } from 'lucide-react';

// Login Component
const AdminLogin = ({ onLogin }: { onLogin: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    setError('Invalid credentials. Try admin@example.com / admin');
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded-lg mb-4"
          >
            <Shield className="w-8 h-8 text-[#00FF41]" />
          </motion.div>
          <h1 className="text-4xl font-bold text-[#00FF41] mb-2">ADMIN_ACCESS</h1>
          <p className="text-gray-400">Secure portal authentication required</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <label className="block text-[#00FF41] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF41] transition-colors"
              placeholder="Enter admin email"
              required
            />
          </div>
          
          <div>
            <label className="block text-[#00FF41] mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF41] transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-lg p-3"
            >
              <Lock className="w-4 h-4 inline mr-2" />
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#00FF41] text-black font-bold py-3 rounded-lg hover:bg-[#00FF41]/90 transition-colors flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            ACCESS_SYSTEM
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );

};

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
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('experiences');
  const { isAuthenticated, login, logout } = useStore();

  const handleLogin = (email: string, password: string) => {
    const success = login(email, password);
    if (!success) {
      // Error will be handled in the login component
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'experiences', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'pricing', label: 'Pricing', icon: <DollarSign size={18} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'skills', label: 'Skills', icon: <Layers size={18} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={18} /> },
  ];

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="min-h-screen bg-black text-white py-16 px-4"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#00FF41] mb-2">ADMIN_DASHBOARD</h1>
            <p className="text-gray-400">System management interface</p>
          </div>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            LOGOUT
          </motion.button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all border ${
                activeTab === tab.id
                  ? 'bg-[#00FF41]/20 text-[#00FF41] border-[#00FF41]/30'
                  : 'bg-black/30 text-gray-400 border-[#00FF41]/20 hover:bg-black/50 hover:text-[#00FF41]/80'
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-md bg-black/30 border border-[#00FF41]/20 rounded-lg p-8"
        >
          {activeTab === 'experiences' && <ExperienceManager />}
          {activeTab === 'pricing' && <PricingManager />}
          {activeTab === 'projects' && <ProjectsManager />}
          {activeTab === 'skills' && <SkillsManager />}
          {activeTab === 'testimonials' && <TestimonialsManager />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminPage;
