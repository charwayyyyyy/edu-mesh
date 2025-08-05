// API client configuration
import axios from 'axios';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.edumesh.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error codes
    if (error.response) {
      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        // Clear local storage and redirect to login
        localStorage.removeItem('auth_token');
        window.location.href = '/auth';
      }
      
      // Handle 403 Forbidden errors
      if (error.response.status === 403) {
        console.error('Permission denied');
      }
      
      // Handle 500 Server errors
      if (error.response.status >= 500) {
        console.error('Server error occurred');
      }
    } else if (error.request) {
      // Network error
      console.error('Network error - no response received');
    } else {
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;