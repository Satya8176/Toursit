import axios from 'axios';

// TODO: Replace with actual API base URL
const API_BASE_URL = 'https://api.smart-tourist-safety.com';

const emergencyAPI = axios.create({
  baseURL: `${API_BASE_URL}/emergency`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const emergencyService = {
  // TODO: Replace with actual endpoints
  activatePanic: async (panicData: any) => {
    // const response = await emergencyAPI.post('/panic', panicData);
    // return response.data;
    console.log('TODO: Activate panic button via API', panicData);
    
    // Mock emergency response
    return {
      emergencyId: 'emer-' + Date.now(),
      status: 'activated',
      responders: [
        { type: 'Police', eta: '5-8 minutes', contact: '100' },
        { type: 'Medical', eta: '8-12 minutes', contact: '108' },
        { type: 'Tourist Helpline', eta: '2-5 minutes', contact: '1363' }
      ]
    };
  },

  deactivatePanic: async (emergencyId: string) => {
    // await emergencyAPI.post('/deactivate', { emergencyId });
    console.log('TODO: Deactivate panic button via API', emergencyId);
  },

  reportIncident: async (incidentData: any) => {
    // const response = await emergencyAPI.post('/incident', incidentData);
    // return response.data;
    console.log('TODO: Report incident via API', incidentData);
  }
};