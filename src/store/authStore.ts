import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tourist } from '../types/Tourist';

interface AuthState {
  isAuthenticated: boolean;
  user: Tourist | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<Tourist>) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<Tourist>) => Promise<void>;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,

      login: async (email: string, password: string) => {
        set({ loading: true });
        try {
          // TODO: Replace with actual API endpoint
          // const response = await axios.post('/api/auth/login', { email, password });
          
          // Mock login response
          const mockUser: Tourist = {
            id: 'tourist-123',
            email,
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '+91 9876543210',
            digitalTouristId: '0x1234567890abcdef',
            kycHash: 'hash123456',
            kycStatus: 'verified',
            emergencyContact: {
              name: 'Jane Doe',
              phoneNumber: '+91 9876543211',
              relationship: 'Spouse'
            },
            tripItinerary: {
              destination: 'Goa, India',
              startDate: '2025-01-15',
              endDate: '2025-01-22',
              purpose: 'Tourism'
            },
            isLocationTrackingEnabled: true,
            notificationPreferences: {
              safetyAlerts: true,
              locationUpdates: true,
              incidentReports: true
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ loading: true });
        try {
          // TODO: Replace with actual API endpoint
          // const response = await axios.post('/api/auth/register', userData);
          
          // Mock registration
          const mockUser: Tourist = {
            id: 'tourist-' + Date.now(),
            email: userData.email || '',
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            phoneNumber: userData.phoneNumber || '',
            digitalTouristId: '0x' + Math.random().toString(16).substring(2),
            kycHash: 'hash' + Date.now(),
            kycStatus: 'pending',
            emergencyContact: userData.emergencyContact || {
              name: '',
              phoneNumber: '',
              relationship: ''
            },
            tripItinerary: userData.tripItinerary || {
              destination: '',
              startDate: '',
              endDate: '',
              purpose: ''
            },
            isLocationTrackingEnabled: false,
            notificationPreferences: {
              safetyAlerts: true,
              locationUpdates: true,
              incidentReports: true
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          const mockToken = 'mock-jwt-token-' + Date.now();
          
          set({
            isAuthenticated: true,
            user: mockUser,
            token: mockToken,
            loading: false
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
          loading: false
        });
      },

      updateProfile: async (updates) => {
        const { user } = get();
        if (!user) return;

        set({ loading: true });
        try {
          // TODO: Replace with actual API endpoint
          // await axios.put(`/api/tourists/${user.id}`, updates);
          
          const updatedUser = {
            ...user,
            ...updates,
            updatedAt: new Date().toISOString()
          };
          
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ loading: false });
          throw error;
        }
      },

      setLoading: (loading) => set({ loading })
    }),
    {
      name: 'auth-store',
    }
  )
);