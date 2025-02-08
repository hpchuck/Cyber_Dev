import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import initialData from '../data/initial-data.json';

// Define all interfaces
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

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  logo: string;
}

interface Skill {
  id: string;
  category: string;
  name: string;
  icon: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  category: string;
  features: string[];
  recommended: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  priceHistory: { price: number; date: string }[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  approved: boolean;
  createdAt: string;
}

interface AppState {
  isAudioEnabled: boolean;
  volume: number;
  audioFiles: {
    intro: string;
    buttonClick: string;
    soundToggle: string;
    formSubmit: string;
  };
  isAuthenticated: boolean;
  projects: Project[];
  experiences: Experience[];
  skills: Skill[];
  pricingPlans: PricingPlan[];
  products: Product[];
  testimonials: Testimonial[];
  contactMessage: string;
  setContactMessage: (message: string) => void;

  // Audio controls
  setAudioEnabled: (enabled: boolean) => void;
  setVolume: (volume: number) => void;

  // Auth
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Projects
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Experiences
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;

  // Skills
  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;

  // Pricing Plans
  addPricingPlan: (plan: Omit<PricingPlan, 'id'>) => void;
  updatePricingPlan: (id: string, plan: Partial<PricingPlan>) => void;
  deletePricingPlan: (id: string) => void;

  // Products
  addProduct: (product: Omit<Product, 'id' | 'priceHistory'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateBatchProducts: (updates: { id: string; updates: Partial<Product> }[]) => void;

  // Testimonials
  addTestimonial: (testimonial: Omit<Testimonial, 'id' | 'approved' | 'createdAt'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;
  approveTestimonial: (id: string) => void;
  rejectTestimonial: (id: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      isAudioEnabled: true,
      volume: 0.5,
      audioFiles: {
        intro: 'https://soundimage.org/wp-content/uploads/2019/06/Digital-Daydreams.mp3',
        buttonClick: 'https://soundimage.org/wp-content/uploads/2016/04/UI_Quirky32.mp3',
        soundToggle: 'https://soundimage.org/wp-content/uploads/2016/04/UI_Quirky19.mp3',
        formSubmit: 'https://soundimage.org/wp-content/uploads/2016/04/UI_Quirky27.mp3'
      },
      isAuthenticated: false,
      projects: initialData.projects as Project[],
      experiences: initialData.experiences as Experience[],
      skills: initialData.skills as Skill[],
      pricingPlans: initialData.pricingPlans as PricingPlan[],
      products: [],
      testimonials: initialData.testimonials || [],
      contactMessage: '',

      // Audio controls
      setAudioEnabled: (enabled) => set({ isAudioEnabled: enabled }),
      setVolume: (volume) => set({ volume }),

      // Auth
      login: (email: string, password: string) => {
        if (email === 'admin@example.com' && password === 'admin') {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false }),

      // Projects
      addProject: (project) => set((state) => ({
        projects: [...state.projects, { id: crypto.randomUUID(), ...project }]
      })),
      updateProject: (id, project) => set((state) => ({
        projects: state.projects.map((p) => p.id === id ? { ...p, ...project } : p)
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),

      // Experiences
      addExperience: (experience) => set((state) => ({
        experiences: [...state.experiences, { id: crypto.randomUUID(), ...experience }]
      })),
      updateExperience: (id, experience) => set((state) => ({
        experiences: state.experiences.map((e) => e.id === id ? { ...e, ...experience } : e)
      })),
      deleteExperience: (id) => set((state) => ({
        experiences: state.experiences.filter((e) => e.id !== id)
      })),

      // Skills
      addSkill: (skill) => set((state) => ({
        skills: [...state.skills, { id: crypto.randomUUID(), ...skill }]
      })),
      updateSkill: (id, skill) => set((state) => ({
        skills: state.skills.map((s) => s.id === id ? { ...s, ...skill } : s)
      })),
      deleteSkill: (id) => set((state) => ({
        skills: state.skills.filter((s) => s.id !== id)
      })),

      // Pricing Plans
      addPricingPlan: (plan) => set((state) => ({
        pricingPlans: [...state.pricingPlans, { id: crypto.randomUUID(), ...plan }]
      })),
      updatePricingPlan: (id, plan) => set((state) => ({
        pricingPlans: state.pricingPlans.map((p) => p.id === id ? { ...p, ...plan } : p)
      })),
      deletePricingPlan: (id) => set((state) => ({
        pricingPlans: state.pricingPlans.filter((p) => p.id !== id)
      })),

      // Products
      addProduct: (product) => set((state) => ({
        products: [...state.products, {
          id: crypto.randomUUID(),
          ...product,
          priceHistory: [{ price: product.price, date: new Date().toISOString() }]
        }]
      })),
      updateProduct: (id, updates) => set((state) => {
        const product = state.products.find(p => p.id === id);
        if (!product) return state;

        const priceHistory = updates.price && updates.price !== product.price
          ? [...product.priceHistory, { price: updates.price, date: new Date().toISOString() }]
          : product.priceHistory;

        return {
          products: state.products.map(p => 
            p.id === id ? { ...p, ...updates, priceHistory } : p
          )
        };
      }),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      updateBatchProducts: (updates) => set((state) => {
        const updatedProducts = [...state.products];
        updates.forEach(({ id, updates: productUpdates }) => {
          const index = updatedProducts.findIndex(p => p.id === id);
          if (index === -1) return;

          const product = updatedProducts[index];
          const priceHistory = productUpdates.price && productUpdates.price !== product.price
            ? [...product.priceHistory, { price: productUpdates.price, date: new Date().toISOString() }]
            : product.priceHistory;

          updatedProducts[index] = { ...product, ...productUpdates, priceHistory };
        });
        return { products: updatedProducts };
      }),

      // Testimonials
      addTestimonial: (testimonial) => set((state) => ({
        testimonials: [...state.testimonials, {
          id: crypto.randomUUID(),
          approved: false,
          createdAt: new Date().toISOString(),
          ...testimonial
        }]
      })),
      updateTestimonial: (id, testimonial) => set((state) => ({
        testimonials: state.testimonials.map((t) => 
          t.id === id ? { ...t, ...testimonial } : t
        )
      })),
      deleteTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter((t) => t.id !== id)
      })),
      approveTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.map((t) =>
          t.id === id ? { ...t, approved: true } : t
        )
      })),
      rejectTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter((t) => t.id !== id)
      })),
      setContactMessage: (message) => set({ contactMessage: message }),
    }),
    {
      name: 'portfolio-storage',
      version: 1,
      storage: createJSONStorage(() => localStorage)
    }
  )
);