import apiClient from './index';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends Partial<User> {
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const authApi = {
  /**
   * Login a user with email and password
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      // Store the token in localStorage
      localStorage.setItem('auth_token', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register a new user
   */
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      // Store the token in localStorage
      localStorage.setItem('auth_token', response.data.token);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      const response = await apiClient.put<User>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user profile
   */
  getProfile: async (userId: string): Promise<User> => {
    try {
      const response = await apiClient.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      // Still remove token even if API call fails
      localStorage.removeItem('auth_token');
      throw error;
    }
  },

  /**
   * Verify email address
   */
  verifyEmail: async (token: string): Promise<void> => {
    try {
      await apiClient.post('/auth/verify-email', { token });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    try {
      await apiClient.post('/auth/forgot-password', { email });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<void> => {
    try {
      await apiClient.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      throw error;
    }
  },
};

export default authApi;