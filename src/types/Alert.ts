export interface Alert {
  id: string;
  touristId: string;
  type: 'geo_fence' | 'anomaly' | 'weather' | 'incident' | 'system';
  subType: 'inactive' | 'route_deviation' | 'sudden_stop' | 'high_risk_zone' | 'emergency';
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger';
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  isRead: boolean;
  isAcknowledged: boolean;
  createdAt: string;
  expiresAt?: string;
  actionRequired: boolean;
  actionTaken?: string;
}

export interface GeoFence {
  id: string;
  name: string;
  type: 'safe_zone' | 'risk_zone' | 'restricted_zone';
  riskLevel: 'low' | 'medium' | 'high';
  coordinates: [number, number][];
  description: string;
  isActive: boolean;
  createdAt: string;
}