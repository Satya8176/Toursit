import { create } from 'zustand';
import { TouristLocation, SafetyScore } from '../types/Tourist';
import { GeoFence } from '../types/Alert';

interface LocationState {
  currentLocation: TouristLocation | null;
  locationHistory: TouristLocation[];
  safetyScore: SafetyScore | null;
  geoFences: GeoFence[];
  isTracking: boolean;
  loading: boolean;
  error: string | null;
  
  updateLocation: (location: Omit<TouristLocation, 'id' | 'touristId' | 'timestamp'>) => void;
  startTracking: () => void;
  stopTracking: () => void;
  fetchSafetyScore: () => Promise<void>;
  fetchGeoFences: () => Promise<void>;
  checkGeoFenceViolations: (location: TouristLocation) => GeoFence[];
}

export const useLocationStore = create<LocationState>((set, get) => ({
  currentLocation: null,
  locationHistory: [],
  safetyScore: null,
  geoFences: [],
  isTracking: false,
  loading: false,
  error: null,

  updateLocation: (locationData) => {
    const newLocation: TouristLocation = {
      id: 'loc-' + Date.now(),
      touristId: 'tourist-123', // This should come from auth store
      ...locationData,
      timestamp: new Date().toISOString()
    };

    set(state => ({
      currentLocation: newLocation,
      locationHistory: [...state.locationHistory.slice(-99), newLocation] // Keep last 100 locations
    }));

    // Check for geo-fence violations
    const violations = get().checkGeoFenceViolations(newLocation);
    if (violations.length > 0) {
      // TODO: Trigger geo-fence alert
      console.log('Geo-fence violations detected:', violations);
    }
  },

  startTracking: () => {
    set({ isTracking: true, error: null });
    
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          get().updateLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          set({ error: error.message, isTracking: false });
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 15000
        }
      );
    } else {
      set({ error: 'Geolocation is not supported by this browser.', isTracking: false });
    }
  },

  stopTracking: () => {
    set({ isTracking: false });
  },

  fetchSafetyScore: async () => {
    set({ loading: true });
    try {
      // TODO: Replace with actual API endpoint
      // const response = await axios.get('/api/safety-score');
      
      // Mock safety score calculation
      const mockSafetyScore: SafetyScore = {
        overall: Math.floor(Math.random() * 40) + 60, // 60-100 range
        factors: {
          locationSafety: Math.floor(Math.random() * 30) + 70,
          timeOfDay: Math.floor(Math.random() * 40) + 60,
          crowdDensity: Math.floor(Math.random() * 50) + 50,
          weatherConditions: Math.floor(Math.random() * 20) + 80,
          historicalIncidents: Math.floor(Math.random() * 30) + 70
        },
        lastUpdated: new Date().toISOString()
      };
      
      set({ safetyScore: mockSafetyScore, loading: false });
    } catch (error) {
      set({ loading: false, error: 'Failed to fetch safety score' });
    }
  },

  fetchGeoFences: async () => {
    try {
      // TODO: Replace with actual API endpoint
      // const response = await axios.get('/api/geo-fences');
      
      // Mock geo-fences data
      const mockGeoFences: GeoFence[] = [
        {
          id: 'gf-1',
          name: 'Tourist Safe Zone - Beach Area',
          type: 'safe_zone',
          riskLevel: 'low',
          coordinates: [[15.2993, 74.1240], [15.2963, 74.1210], [15.2933, 74.1250], [15.2963, 74.1280]],
          description: 'Well-patrolled beach area with high tourist activity',
          isActive: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 'gf-2',
          name: 'High Risk Zone - Construction Area',
          type: 'risk_zone',
          riskLevel: 'high',
          coordinates: [[15.2853, 74.1180], [15.2823, 74.1150], [15.2793, 74.1190], [15.2823, 74.1220]],
          description: 'Active construction zone with safety hazards',
          isActive: true,
          createdAt: new Date().toISOString()
        }
      ];
      
      set({ geoFences: mockGeoFences });
    } catch (error) {
      set({ error: 'Failed to fetch geo-fences' });
    }
  },

  checkGeoFenceViolations: (location: TouristLocation) => {
    const { geoFences } = get();
    const violations: GeoFence[] = [];
    
    // Simple point-in-polygon check (simplified for demo)
    geoFences.forEach(fence => {
      if (fence.isActive && fence.type === 'risk_zone') {
        // In a real implementation, use a proper point-in-polygon algorithm
        const inFence = isPointInPolygon(
          [location.latitude, location.longitude],
          fence.coordinates
        );
        
        if (inFence) {
          violations.push(fence);
        }
      }
    });
    
    return violations;
  }
}));

// Simplified point-in-polygon check
function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [x, y] = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
}