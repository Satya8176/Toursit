import axios from 'axios';

// TODO: Replace with actual API base URL
const API_BASE_URL = 'https://api.smart-tourist-safety.com';

const alertsAPI = axios.create({
  baseURL: `${API_BASE_URL}/alerts`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const alertsService = {
  // TODO: Replace with actual endpoints
  getAlerts: async (touristId: string) => {
    // const response = await alertsAPI.get(`/${touristId}`);
    // return response.data;
    throw new Error('API endpoint not implemented');
  },

  markAsRead: async (alertId: string) => {
    // await alertsAPI.patch(`/${alertId}/read`);
    console.log('TODO: Mark alert as read via API', alertId);
  },

  acknowledgeAlert: async (alertId: string) => {
    // await alertsAPI.patch(`/${alertId}/acknowledge`);
    console.log('TODO: Acknowledge alert via API', alertId);
  },

  createAlert: async (alertData: any) => {
    // const response = await alertsAPI.post('/', alertData);
    // return response.data;
    console.log('TODO: Create alert via API', alertData);
  }
};