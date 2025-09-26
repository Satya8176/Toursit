import { create } from 'zustand';
import { Alert } from '../types/Alert';

interface AlertState {
  alerts: Alert[];
  unreadCount: number;
  loading: boolean;
  
  fetchAlerts: () => Promise<void>;
  markAsRead: (alertId: string) => Promise<void>;
  markAsAcknowledged: (alertId: string) => Promise<void>;
  createAlert: (alert: Omit<Alert, 'id' | 'isRead' | 'isAcknowledged' | 'createdAt'>) => void;
  clearAlert: (alertId: string) => void;
}

export const useAlertStore = create<AlertState>((set, get) => ({
  alerts: [],
  unreadCount: 0,
  loading: false,

  fetchAlerts: async () => {
    set({ loading: true });
    try {
      // TODO: Replace with actual API endpoint
      // const response = await axios.get('/api/alerts');
      
      // Mock alerts data
      const mockAlerts: Alert[] = [
        {
          id: 'alert-1',
          touristId: 'tourist-123',
          type: 'geo_fence',
          subType: 'high_risk_zone',
          title: 'Entering High Risk Zone',
          message: 'You are approaching a construction area. Please exercise caution.',
          severity: 'warning',
          location: {
            latitude: 15.2830,
            longitude: 74.1170,
            address: 'Construction Site, Beach Road'
          },
          isRead: false,
          isAcknowledged: false,
          createdAt: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
          actionRequired: true
        },
        {
          id: 'alert-2',
          touristId: 'tourist-123',
          type: 'anomaly',
          subType: 'route_deviation',
          title: 'Route Deviation Detected',
          message: 'Your current route differs from your planned itinerary.',
          severity: 'info',
          isRead: false,
          isAcknowledged: false,
          createdAt: new Date(Date.now() - 900000).toISOString(), // 15 minutes ago
          actionRequired: false
        }
      ];
      
      const unreadCount = mockAlerts.filter(alert => !alert.isRead).length;
      
      set({ 
        alerts: mockAlerts, 
        unreadCount,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
    }
  },

  markAsRead: async (alertId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // await axios.patch(`/api/alerts/${alertId}/read`);
      
      set(state => {
        const updatedAlerts = state.alerts.map(alert =>
          alert.id === alertId ? { ...alert, isRead: true } : alert
        );
        
        const unreadCount = updatedAlerts.filter(alert => !alert.isRead).length;
        
        return { alerts: updatedAlerts, unreadCount };
      });
    } catch (error) {
      console.error('Failed to mark alert as read:', error);
    }
  },

  markAsAcknowledged: async (alertId: string) => {
    try {
      // TODO: Replace with actual API endpoint
      // await axios.patch(`/api/alerts/${alertId}/acknowledge`);
      
      set(state => ({
        alerts: state.alerts.map(alert =>
          alert.id === alertId 
            ? { ...alert, isAcknowledged: true, isRead: true }
            : alert
        )
      }));
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
    }
  },

  createAlert: (alertData) => {
    const newAlert: Alert = {
      id: 'alert-' + Date.now(),
      isRead: false,
      isAcknowledged: false,
      createdAt: new Date().toISOString(),
      ...alertData
    };
    
    set(state => ({
      alerts: [newAlert, ...state.alerts],
      unreadCount: state.unreadCount + 1
    }));
  },

  clearAlert: (alertId: string) => {
    set(state => ({
      alerts: state.alerts.filter(alert => alert.id !== alertId)
    }));
  }
}));