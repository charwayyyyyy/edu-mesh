import { useState, useCallback } from 'react';
import { useAuthStore } from '../store';
import authApi, { LoginCredentials, RegisterData } from '../api/auth';
import { User } from '../types';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading: storeLoading,
    error: storeError,
    login: storeLogin,
    register: storeRegister,
    logout: storeLogout,
    updateProfile: storeUpdateProfile,
  } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Login with email and password
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await authApi.login(credentials);
      
      // Update the store
      await storeLogin(credentials.email, credentials.password);
      
      return response.user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeLogin]);

  /**
   * Register a new user
   */
  const register = useCallback(async (userData: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await authApi.register(userData);
      
      // Update the store
      await storeRegister(userData);
      
      return response.user;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeRegister]);

  /**
   * Logout the current user
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      await authApi.logout();
      
      // Update the store
      storeLogout();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Logout failed';
      setError(errorMessage);
      // Still logout from store even if API fails
      storeLogout();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeLogout]);

  /**
   * Update user profile
   */
  const updateProfile = useCallback(async (userData: Partial<User>) => {
    if (!user) {
      setError('User not authenticated');
      throw new Error('User not authenticated');
    }

    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const updatedUser = await authApi.updateProfile(user.id, userData);
      
      // Update the store
      await storeUpdateProfile(userData);
      
      return updatedUser;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Profile update failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user, storeUpdateProfile]);

  /**
   * Get user profile
   */
  const getProfile = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const profile = await authApi.getProfile(userId);
      return profile;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || storeLoading,
    error: error || storeError,
    login,
    register,
    logout,
    updateProfile,
    getProfile,
  };
};