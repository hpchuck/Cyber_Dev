import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ProjectsManager } from './admin/ProjectsManager';
import { ExperienceManager } from './admin/ExperienceManager';
import { SkillsManager } from './admin/SkillsManager';
import { PricingManager } from './admin/PricingManager';
import { ProductManager } from './admin/ProductManager';
import { TestimonialsManager } from './admin/TestimonialsManager';

const LoginForm = ({ onLogin }: { onLogin: (email: string, password: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
    setError('Invalid credentials. Try admin@example.com / admin');
  };

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <h1 className="text-4xl font-bold gradient-text mb-8 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button type="submit" className="w-full btn">
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<'products' | 'projects' | 'experience' | 'skills' | 'pricing' | 'testimonials'>('testimonials');
  const { isAuthenticated, login, logout } = useStore();

  const handleLogin = (email: string, password: string) => {
    const success = login(email, password);
    if (!success) {
      // Error handling is done in the LoginForm component
      return;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="btn flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          {(['products', 'projects', 'experience', 'skills', 'pricing', 'testimonials'] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-lg transition-all flex items-center gap-2 ${
                activeSection === section 
                  ? 'bg-[#00FF41] text-black' 
                  : 'bg-black/30 border border-[#00FF41]/20 text-[#00FF41]'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>

        {activeSection === 'products' && <ProductManager />}
        {activeSection === 'projects' && <ProjectsManager />}
        {activeSection === 'experience' && <ExperienceManager />}
        {activeSection === 'skills' && <SkillsManager />}
        {activeSection === 'pricing' && <PricingManager />}
        {activeSection === 'testimonials' && <TestimonialsManager />}
      </div>
    </div>
  );
};