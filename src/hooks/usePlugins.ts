import { useState, useCallback } from 'react';
import { usePluginStore } from '../store';
import pluginsApi, { PluginFilters } from '../api/plugins';
import { Plugin } from '../types';

export const usePlugins = () => {
  const {
    plugins,
    isLoading: storeLoading,
    error: storeError,
    fetchPlugins: storeFetchPlugins,
    enablePlugin: storeEnablePlugin,
    disablePlugin: storeDisablePlugin,
    installPlugin: storeInstallPlugin,
  } = usePluginStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch plugins with optional filtering
   */
  const fetchPlugins = useCallback(async (filters?: PluginFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await pluginsApi.fetchPlugins(filters);
      
      // Update the store
      await storeFetchPlugins();
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch plugins';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchPlugins]);

  /**
   * Get a single plugin by ID
   */
  const getPlugin = useCallback(async (pluginId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const plugin = await pluginsApi.getPlugin(pluginId);
      return plugin;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch plugin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Enable a plugin
   */
  const enablePlugin = useCallback(async (pluginId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const enabledPlugin = await pluginsApi.enablePlugin(pluginId);
      
      // Update the store
      await storeEnablePlugin(pluginId);
      
      return enabledPlugin;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to enable plugin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeEnablePlugin]);

  /**
   * Disable a plugin
   */
  const disablePlugin = useCallback(async (pluginId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const disabledPlugin = await pluginsApi.disablePlugin(pluginId);
      
      // Update the store
      await storeDisablePlugin(pluginId);
      
      return disabledPlugin;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to disable plugin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeDisablePlugin]);

  /**
   * Install a plugin from the marketplace
   */
  const installPlugin = useCallback(async (pluginId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const installedPlugin = await pluginsApi.installPlugin(pluginId);
      
      // Update the store
      await storeInstallPlugin(installedPlugin);
      
      return installedPlugin;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to install plugin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeInstallPlugin]);

  /**
   * Uninstall a plugin
   */
  const uninstallPlugin = useCallback(async (pluginId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await pluginsApi.uninstallPlugin(pluginId);
      
      // Refresh plugins after uninstallation
      await storeFetchPlugins();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to uninstall plugin';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchPlugins]);

  /**
   * Update plugin settings
   */
  const updatePluginSettings = useCallback(async (pluginId: string, settings: Record<string, any>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedPlugin = await pluginsApi.updatePluginSettings(pluginId, settings);
      
      // Refresh plugins after settings update
      await storeFetchPlugins();
      
      return updatedPlugin;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update plugin settings';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchPlugins]);

  /**
   * Get plugin marketplace listings
   */
  const getPluginMarketplace = useCallback(async (filters?: { category?: string, search?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const marketplace = await pluginsApi.getPluginMarketplace(filters);
      return marketplace;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch plugin marketplace';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    plugins,
    isLoading: isLoading || storeLoading,
    error: error || storeError,
    fetchPlugins,
    getPlugin,
    enablePlugin,
    disablePlugin,
    installPlugin,
    uninstallPlugin,
    updatePluginSettings,
    getPluginMarketplace,
  };
};