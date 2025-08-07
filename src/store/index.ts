import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define types for our store
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  university?: string;
  department?: string;
  graduationYear?: number;
  hometown?: string;
  isVerified: boolean;
  skills: string[];
  bio?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<User> & { password: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          // This would be replaced with actual API call to Puter.js
          // For now, we'll simulate a successful login
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              name: 'John Doe',
              email,
              isVerified: true,
              skills: ['React', 'JavaScript', 'UI/UX'],
              university: 'University of Ghana',
              department: 'Computer Science',
              graduationYear: 2023,
              hometown: 'Accra',
            },
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      register: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // This would be replaced with actual API call to Puter.js
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set({
            isAuthenticated: true,
            user: {
              id: '1',
              name: userData.name || '',
              email: userData.email || '',
              isVerified: false,
              skills: [],
              ...userData,
            } as User,
            isLoading: false,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
      logout: () => {
        set({ isAuthenticated: false, user: null });
      },
      updateProfile: async (userData) => {
        set({ isLoading: true, error: null });
        try {
          // This would be replaced with actual API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          set((state) => ({
            user: state.user ? { ...state.user, ...userData } : null,
            isLoading: false,
          }));
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred',
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

import { mockJobs } from '../api/mock-data/jobs';
import { Job } from '../components/jobs/JobCard';

// Job and Opportunity Store
interface JobState {
  jobs: Job[];
  isLoading: boolean;
  error: string | null;
  fetchJobs: () => Promise<void>;
  addJob: (job: Omit<Job, 'id' | 'postedAt'>) => Promise<void>;
  applyToJob: (jobId: string) => Promise<void>;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  isLoading: false,
  error: null,
  fetchJobs: async () => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        jobs: mockJobs,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  addJob: async (job) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        jobs: [
          ...state.jobs,
          {
            ...job,
            id: Math.random().toString(36).substr(2, 9),
            postedAt: new Date(),
          },
        ],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  applyToJob: async (jobId) => {
    // Implementation would depend on the application tracking system
    console.log(`Applied to job ${jobId}`);
  },
}));

// Mentorship Store
interface Mentor {
  id: string;
  name: string;
  university: string;
  department: string;
  graduationYear: number;
  currentPosition: string;
  company?: string;
  expertise: string[];
  bio: string;
  hometown?: string;
  availability: 'high' | 'medium' | 'low';
  avatar?: string;
}

interface MentorshipState {
  mentors: Mentor[];
  isLoading: boolean;
  error: string | null;
  fetchMentors: () => Promise<void>;
  becomeMentor: (mentorData: Omit<Mentor, 'id'>) => Promise<void>;
  requestMentorship: (mentorId: string, message: string) => Promise<void>;
  filterMentors: (filters: Partial<{ department: string; expertise: string; hometown: string }>) => Promise<void>;
}

export const useMentorshipStore = create<MentorshipState>((set) => ({
  mentors: [],
  isLoading: false,
  error: null,
  fetchMentors: async () => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        mentors: [
          {
            id: '1',
            name: 'Dr. Kofi Mensah',
            university: 'University of Ghana',
            department: 'Computer Science',
            graduationYear: 2010,
            currentPosition: 'Senior Software Engineer',
            company: 'Google',
            expertise: ['Machine Learning', 'Python', 'Data Science'],
            bio: 'I help students navigate the tech industry and build meaningful careers.',
            hometown: 'Accra',
            availability: 'medium',
          },
          {
            id: '2',
            name: 'Ama Darko',
            university: 'Kwame Nkrumah University of Science and Technology',
            department: 'Business Administration',
            graduationYear: 2015,
            currentPosition: 'Marketing Manager',
            company: 'Unilever Ghana',
            expertise: ['Digital Marketing', 'Brand Management', 'Market Research'],
            bio: 'Passionate about helping young professionals build their personal brand.',
            hometown: 'Kumasi',
            availability: 'high',
          },
        ],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  becomeMentor: async (mentorData) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        mentors: [
          ...state.mentors,
          {
            ...mentorData,
            id: Math.random().toString(36).substr(2, 9),
          },
        ],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  requestMentorship: async (mentorId, message) => {
    // Implementation would depend on the mentorship system
    console.log(`Requested mentorship from ${mentorId} with message: ${message}`);
  },
  filterMentors: async (filters) => {
    // This would be replaced with actual API call with filters
    console.log('Filtering mentors with:', filters);
  },
}));

// Skill Exchange Store
interface SkillExchange {
  id: string;
  offeredSkill: string;
  requestedSkill: string;
  description: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  university: string;
  department?: string;
  createdAt: string;
  status: 'open' | 'matched' | 'completed';
}

interface SkillExchangeState {
  exchanges: SkillExchange[];
  isLoading: boolean;
  error: string | null;
  fetchExchanges: () => Promise<void>;
  createExchange: (exchange: Omit<SkillExchange, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  respondToExchange: (exchangeId: string, message: string) => Promise<void>;
  filterExchanges: (filters: Partial<{ offeredSkill: string; requestedSkill: string; university: string }>) => Promise<void>;
}

export const useSkillExchangeStore = create<SkillExchangeState>((set) => ({
  exchanges: [],
  isLoading: false,
  error: null,
  fetchExchanges: async () => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        exchanges: [
          {
            id: '1',
            offeredSkill: 'Graphic Design',
            requestedSkill: 'Statistics Tutoring',
            description: "I'll design your poster if you help me prep for my statistics exam.",
            userId: '1',
            userName: 'Kwame Osei',
            university: 'University of Ghana',
            department: 'Visual Arts',
            createdAt: '2023-05-01',
            status: 'open',
          },
          {
            id: '2',
            offeredSkill: 'Python Programming',
            requestedSkill: 'French Language Practice',
            description: 'I can help with Python assignments in exchange for French conversation practice.',
            userId: '2',
            userName: 'Abena Mensah',
            university: 'Kwame Nkrumah University of Science and Technology',
            department: 'Computer Engineering',
            createdAt: '2023-05-03',
            status: 'open',
          },
        ],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  createExchange: async (exchange) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        exchanges: [
          ...state.exchanges,
          {
            ...exchange,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString().split('T')[0],
            status: 'open',
          },
        ],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  respondToExchange: async (exchangeId, message) => {
    // Implementation would depend on the exchange system
    console.log(`Responded to exchange ${exchangeId} with message: ${message}`);
  },
  filterExchanges: async (filters) => {
    // This would be replaced with actual API call with filters
    console.log('Filtering exchanges with:', filters);
  },
}));

// Plugin Store for extensibility
interface Plugin {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  isEnabled: boolean;
  requiredPermissions: string[];
  version: string;
  author: string;
}

interface PluginState {
  plugins: Plugin[];
  isLoading: boolean;
  error: string | null;
  fetchPlugins: () => Promise<void>;
  enablePlugin: (pluginId: string) => void;
  disablePlugin: (pluginId: string) => void;
  installPlugin: (plugin: Omit<Plugin, 'id' | 'isEnabled'>) => Promise<void>;
}

export const usePluginStore = create<PluginState>((set) => ({
  plugins: [],
  isLoading: false,
  error: null,
  fetchPlugins: async () => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({
        plugins: [
          {
            id: '1',
            name: 'Scholarship Finder',
            description: 'Find scholarships tailored to your profile and interests.',
            component: () => <div>Scholarship Finder Plugin</div>,
            isEnabled: true,
            requiredPermissions: ['profile:read'],
            version: '1.0.0',
            author: 'EduMesh Team',
          },
          {
            id: '2',
            name: 'Event Calendar',
            description: 'Stay updated with campus events and activities.',
            component: () => <div>Event Calendar Plugin</div>,
            isEnabled: false,
            requiredPermissions: ['calendar:read', 'calendar:write'],
            version: '1.0.0',
            author: 'University of Ghana',
          },
        ],
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
  enablePlugin: (pluginId) => {
    set((state) => ({
      plugins: state.plugins.map((plugin) =>
        plugin.id === pluginId ? { ...plugin, isEnabled: true } : plugin
      ),
    }));
  },
  disablePlugin: (pluginId) => {
    set((state) => ({
      plugins: state.plugins.map((plugin) =>
        plugin.id === pluginId ? { ...plugin, isEnabled: false } : plugin
      ),
    }));
  },
  installPlugin: async (plugin) => {
    set({ isLoading: true, error: null });
    try {
      // This would be replaced with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({
        plugins: [
          ...state.plugins,
          {
            ...plugin,
            id: Math.random().toString(36).substr(2, 9),
            isEnabled: true,
          },
        ],
        isLoading: false,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  },
}));