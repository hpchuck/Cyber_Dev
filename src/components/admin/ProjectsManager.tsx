import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash, Save } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  category: 'web' | 'mobile' | 'ai' | 'other';
  techStack: string[];
}

export const ProjectsManager = () => {
  const { projects, addProject, updateProject, deleteProject } = useStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    image: '',
    tags: [],
    github: '',
    live: '',
    category: 'web',
    techStack: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateProject(editingId, { ...newProject });
      setEditingId(null);
    } else {
      const projectToAdd = {
        ...newProject,
      };
      // @ts-ignore - we know this is safe as the id will be added in the store
      addProject(projectToAdd);
    }
    setNewProject({
      title: '',
      description: '',
      image: '',
      tags: [],
      github: '',
      live: '',
      category: 'web',
      techStack: []
    });
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setNewProject(project);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={newProject.title}
          onChange={(e) => setNewProject(prev => ({ ...prev, title: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <textarea
          placeholder="Description"
          value={newProject.description}
          onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white h-32"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newProject.image}
          onChange={(e) => setNewProject(prev => ({ ...prev, image: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <select
          value={newProject.category}
          onChange={(e) => setNewProject(prev => ({ ...prev, category: e.target.value as any }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        >
          <option value="web">Web App</option>
          <option value="mobile">Mobile App</option>
          <option value="ai">AI/ML Project</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          placeholder="Tech Stack (comma-separated)"
          value={newProject.techStack.join(', ')}
          onChange={(e) => setNewProject(prev => ({ 
            ...prev, 
            techStack: e.target.value.split(',').map(tag => tag.trim())
          }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Tags (comma-separated)"
          value={newProject.tags.join(', ')}
          onChange={(e) => setNewProject(prev => ({ 
            ...prev, 
            tags: e.target.value.split(',').map(tag => tag.trim())
          }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="GitHub URL"
          value={newProject.github}
          onChange={(e) => setNewProject(prev => ({ ...prev, github: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <input
          type="text"
          placeholder="Live URL"
          value={newProject.live}
          onChange={(e) => setNewProject(prev => ({ ...prev, live: e.target.value }))}
          className="w-full bg-black/50 border border-[#00FF41]/30 rounded-lg px-4 py-2 text-white"
        />
        <button type="submit" className="btn flex items-center gap-2">
          {editingId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {editingId ? 'Save Project' : 'Add Project'}
        </button>
      </form>

      <div className="space-y-4">
        {projects?.map((project: Project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between p-4 bg-black/30 border border-[#00FF41]/20 rounded-lg"
          >
            <div>
              <h3 className="text-[#00FF41] font-bold">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-[#00FF41]/20 text-[#00FF41] rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="p-2 text-[#00FF41] hover:bg-[#00FF41]/10 rounded-lg"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => deleteProject(project.id)}
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