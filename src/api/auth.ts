import axios from 'axios';

// TODO: Replace with actual API base URL
const API_BASE_URL = 'https://api.smart-tourist-safety.com';

const authAPI = axios.create({
  baseURL: `${API_BASE_URL}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
authAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // TODO: Replace with actual endpoints
  login: async (email: string, password: string) => {
    // const response = await authAPI.post('/login', { email, password });
    // return response.data;
    throw new Error('API endpoint not implemented');
  },

  register: async (userData: any) => {
    // const response = await authAPI.post('/register', userData);
    // return response.data;
    throw new Error('API endpoint not implemented');
  },

  logout: async () => {
    // await authAPI.post('/logout');
    localStorage.removeItem('auth-token');
  },

  refreshToken: async () => {
    // const response = await authAPI.post('/refresh');
    // return response.data;
    throw new Error('API endpoint not implemented');
  }
};