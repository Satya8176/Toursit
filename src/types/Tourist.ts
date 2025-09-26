export interface Tourist {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  digitalTouristId: string; // Blockchain address placeholder
  kycHash: string; // Hashed KYC info
  kycStatus: 'pending' | 'verified' | 'rejected';
  profilePicture?: string;
  emergencyContact: {
    name: string;
    phoneNumber: string;
    relationship: string;
  };
  tripItinerary: {
    destination: string;
    startDate: string;
    endDate: string;
    purpose: string;
  };
  isLocationTrackingEnabled: boolean;
  notificationPreferences: {
    safetyAlerts: boolean;
    locationUpdates: boolean;
    incidentReports: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface TouristLocation {
  id: string;
  touristId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
  address?: string;
}

export interface SafetyScore {
  overall: number;
  factors: {
    locationSafety: number;
    timeOfDay: number;
    crowdDensity: number;
    weatherConditions: number;
    historicalIncidents: number;
  };
  lastUpdated: string;
}