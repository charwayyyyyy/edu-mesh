/**
 * Plugin System for EduMesh
 * 
 * This module provides the infrastructure for loading and managing plugins
 * within the EduMesh application. Plugins allow third-party developers to extend
 * the functionality of the platform without modifying the core codebase.
 */

import { Plugin } from '../types';

export interface PluginContext {
  // Core services that plugins can access
  services: {
    auth: {
      getCurrentUser: () => any;
      isAuthenticated: () => boolean;
    };
    navigation: {
      navigateTo: (route: string) => void;
      getCurrentRoute: () => string;
    };
    notification: {
      showNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
    };
    storage: {
      getData: (key: string) => any;
      setData: (key: string, value: any) => void;
    };
  };
  // Extension points that plugins can hook into
  extensionPoints: {
    registerMenuItem: (item: MenuItem) => void;
    registerDashboardWidget: (widget: DashboardWidget) => void;
    registerProfileSection: (section: ProfileSection) => void;
    registerSkill: (skill: Skill) => void;
  };
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  onClick?: () => void;
  position: 'header' | 'sidebar' | 'footer';
  order: number;
  requiredPermissions?: string[];
}

export interface DashboardWidget {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  width: 'full' | 'half' | 'third';
  height: 'small' | 'medium' | 'large';
  order: number;
  requiredPermissions?: string[];
}

export interface ProfileSection {
  id: string;
  title: string;
  component: React.ComponentType<any>;
  order: number;
  requiredPermissions?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface PluginModule {
  initialize: (context: PluginContext) => void;
  cleanup?: () => void;
}

// Registry of installed plugins
const installedPlugins: Map<string, Plugin> = new Map();

// Registry of loaded plugin modules
const loadedPluginModules: Map<string, PluginModule> = new Map();

// Registry of registered extension points
const menuItems: MenuItem[] = [];
const dashboardWidgets: DashboardWidget[] = [];
const profileSections: ProfileSection[] = [];
const skills: Skill[] = [];

/**
 * Initialize the plugin system
 */
export const initializePluginSystem = (services: PluginContext['services']) => {
  console.log('Initializing plugin system...');
  
  // Create the plugin context
  const context: PluginContext = {
    services,
    extensionPoints: {
      registerMenuItem: (item: MenuItem) => {
        menuItems.push(item);
      },
      registerDashboardWidget: (widget: DashboardWidget) => {
        dashboardWidgets.push(widget);
      },
      registerProfileSection: (section: ProfileSection) => {
        profileSections.push(section);
      },
      registerSkill: (skill: Skill) => {
        skills.push(skill);
      },
    },
  };
  
  // Load and initialize all enabled plugins
  Array.from(installedPlugins.values())
    .filter(plugin => plugin.enabled)
    .forEach(plugin => {
      loadPlugin(plugin, context);
    });
};

/**
 * Load a plugin
 */
export const loadPlugin = async (plugin: Plugin, context: PluginContext) => {
  try {
    console.log(`Loading plugin: ${plugin.name}`);
    
    // In a real implementation, this would dynamically import the plugin module
    // For now, we'll simulate this with a mock implementation
    const mockPluginModule: PluginModule = {
      initialize: (ctx: PluginContext) => {
        console.log(`Initializing plugin: ${plugin.name}`);
        // Plugin would register its extensions here
      },
      cleanup: () => {
        console.log(`Cleaning up plugin: ${plugin.name}`);
      },
    };
    
    // Initialize the plugin
    mockPluginModule.initialize(context);
    
    // Store the loaded plugin module
    loadedPluginModules.set(plugin.id, mockPluginModule);
    
    console.log(`Plugin loaded successfully: ${plugin.name}`);
  } catch (error) {
    console.error(`Failed to load plugin: ${plugin.name}`, error);
  }
};

/**
 * Unload a plugin
 */
export const unloadPlugin = (pluginId: string) => {
  const pluginModule = loadedPluginModules.get(pluginId);
  if (pluginModule) {
    // Call cleanup if available
    if (pluginModule.cleanup) {
      pluginModule.cleanup();
    }
    
    // Remove from loaded modules
    loadedPluginModules.delete(pluginId);
    
    // Remove all extensions registered by this plugin
    // In a real implementation, we would track which extensions were registered by which plugin
    // For now, we'll just log that this would happen
    console.log(`Removed all extensions for plugin: ${pluginId}`);
    
    return true;
  }
  
  return false;
};

/**
 * Install a plugin
 */
export const installPlugin = (plugin: Plugin) => {
  installedPlugins.set(plugin.id, plugin);
  return true;
};

/**
 * Uninstall a plugin
 */
export const uninstallPlugin = (pluginId: string) => {
  // Unload the plugin first
  unloadPlugin(pluginId);
  
  // Remove from installed plugins
  return installedPlugins.delete(pluginId);
};

/**
 * Enable a plugin
 */
export const enablePlugin = (pluginId: string, context: PluginContext) => {
  const plugin = installedPlugins.get(pluginId);
  if (plugin) {
    plugin.enabled = true;
    installedPlugins.set(pluginId, plugin);
    
    // Load the plugin
    loadPlugin(plugin, context);
    
    return true;
  }
  
  return false;
};

/**
 * Disable a plugin
 */
export const disablePlugin = (pluginId: string) => {
  const plugin = installedPlugins.get(pluginId);
  if (plugin) {
    plugin.enabled = false;
    installedPlugins.set(pluginId, plugin);
    
    // Unload the plugin
    unloadPlugin(pluginId);
    
    return true;
  }
  
  return false;
};

/**
 * Get all installed plugins
 */
export const getInstalledPlugins = () => {
  return Array.from(installedPlugins.values());
};

/**
 * Get all registered menu items
 */
export const getMenuItems = (position: MenuItem['position'], userPermissions: string[] = []) => {
  return menuItems
    .filter(item => item.position === position)
    .filter(item => {
      if (!item.requiredPermissions || item.requiredPermissions.length === 0) {
        return true;
      }
      
      return item.requiredPermissions.every(permission => userPermissions.includes(permission));
    })
    .sort((a, b) => a.order - b.order);
};

/**
 * Get all registered dashboard widgets
 */
export const getDashboardWidgets = (userPermissions: string[] = []) => {
  return dashboardWidgets
    .filter(widget => {
      if (!widget.requiredPermissions || widget.requiredPermissions.length === 0) {
        return true;
      }
      
      return widget.requiredPermissions.every(permission => userPermissions.includes(permission));
    })
    .sort((a, b) => a.order - b.order);
};

/**
 * Get all registered profile sections
 */
export const getProfileSections = (userPermissions: string[] = []) => {
  return profileSections
    .filter(section => {
      if (!section.requiredPermissions || section.requiredPermissions.length === 0) {
        return true;
      }
      
      return section.requiredPermissions.every(permission => userPermissions.includes(permission));
    })
    .sort((a, b) => a.order - b.order);
};

/**
 * Get all registered skills
 */
export const getSkills = () => {
  return [...skills];
};