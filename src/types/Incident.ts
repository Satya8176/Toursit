export interface Incident {
  id: string;
  touristId: string;
  type: 'panic' | 'medical' | 'theft' | 'harassment' | 'accident' | 'natural_disaster';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'acknowledged' | 'responding' | 'resolved' | 'false_alarm';
  title: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  reportedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  }[];
  witnesses?: string[];
}

export interface IncidentReport {
  type: Incident['type'];
  description: string;
  severity: Incident['severity'];
  location: {
    latitude: number;
    longitude: number;
  };
  media?: File[];
}