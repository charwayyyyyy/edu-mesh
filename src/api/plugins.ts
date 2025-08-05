import apiClient from './index';
import { Plugin, PaginatedResponse, ApiResponse } from '../types';

export interface PluginFilters {
  enabled?: boolean;
  author?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const pluginsApi = {
  /**
   * Fetch plugins with optional filtering
   */
  fetchPlugins: async (filters?: PluginFilters): Promise<PaginatedResponse<Plugin>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Plugin>>('/plugins', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single plugin by ID
   */
  getPlugin: async (pluginId: string): Promise<Plugin> => {
    try {
      const response = await apiClient.get<ApiResponse<Plugin>>(`/plugins/${pluginId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Enable a plugin
   */
  enablePlugin: async (pluginId: string): Promise<Plugin> => {
    try {
      const response = await apiClient.put<ApiResponse<Plugin>>(`/plugins/${pluginId}/enable`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Disable a plugin
   */
  disablePlugin: async (pluginId: string): Promise<Plugin> => {
    try {
      const response = await apiClient.put<ApiResponse<Plugin>>(`/plugins/${pluginId}/disable`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Install a plugin from the marketplace
   */
  installPlugin: async (pluginId: string): Promise<Plugin> => {
    try {
      const response = await apiClient.post<ApiResponse<Plugin>>(`/plugins/marketplace/${pluginId}/install`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Uninstall a plugin
   */
  uninstallPlugin: async (pluginId: string): Promise<void> => {
    try {
      await apiClient.delete(`/plugins/${pluginId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update plugin settings
   */
  updatePluginSettings: async (pluginId: string, settings: Record<string, any>): Promise<Plugin> => {
    try {
      const response = await apiClient.put<ApiResponse<Plugin>>(`/plugins/${pluginId}/settings`, { settings });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get plugin marketplace listings
   */
  getPluginMarketplace: async (filters?: { category?: string, search?: string }): Promise<PaginatedResponse<Plugin>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Plugin>>('/plugins/marketplace', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default pluginsApi;