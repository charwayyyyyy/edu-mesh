import React, { useState, useEffect } from 'react';
import { Plugin } from '../types';
import { getInstalledPlugins, enablePlugin, disablePlugin, uninstallPlugin } from './index';

/**
 * PluginManager Component
 * 
 * This component allows users to view, enable, disable, and uninstall plugins.
 * In a real implementation, it would also allow users to install new plugins from a marketplace.
 */
const PluginManager: React.FC = () => {
  const [plugins, setPlugins] = useState<Plugin[]>([]);
  const [activeTab, setActiveTab] = useState<'installed' | 'marketplace'>('installed');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Mock plugin context for demonstration purposes
  const mockPluginContext = {
    services: {
      auth: {
        getCurrentUser: () => ({}),
        isAuthenticated: () => true,
      },
      navigation: {
        navigateTo: (route: string) => console.log(`Navigate to: ${route}`),
        getCurrentRoute: () => '/plugins',
      },
      notification: {
        showNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => 
          console.log(`Notification: ${message} (${type})`),
      },
      storage: {
        getData: (key: string) => null,
        setData: (key: string, value: any) => {},
      },
    },
    extensionPoints: {
      registerMenuItem: () => {},
      registerDashboardWidget: () => {},
      registerProfileSection: () => {},
      registerSkill: () => {},
    },
  };
  
  // Load installed plugins
  useEffect(() => {
    setIsLoading(true);
    // In a real implementation, this would fetch plugins from an API
    setTimeout(() => {
      const installedPlugins = getInstalledPlugins();
      setPlugins(installedPlugins);
      setIsLoading(false);
    }, 500);
  }, []);
  
  // Mock marketplace plugins
  const marketplacePlugins: Plugin[] = [
    {
      id: 'certification-plugin',
      name: 'Certification Tracker',
      description: 'Track and showcase your professional certifications',
      version: '1.0.0',
      author: 'EduMesh Team',
      enabled: false,
      installed: false,
      requiredPermissions: [],
    },
    {
      id: 'events-plugin',
      name: 'Events & Networking',
      description: 'Discover, join, and create educational and networking events',
      version: '1.0.0',
      author: 'EduMesh Team',
      enabled: false,
      installed: false,
      requiredPermissions: [],
    },
    {
      id: 'github-integration',
      name: 'GitHub Integration',
      description: 'Connect your GitHub account and showcase your repositories',
      version: '1.0.0',
      author: 'Developer Tools Inc.',
      enabled: false,
      installed: false,
      requiredPermissions: ['profile:write'],
    },
    {
      id: 'linkedin-import',
      name: 'LinkedIn Import',
      description: 'Import your profile data from LinkedIn',
      version: '1.0.0',
      author: 'Career Connect Ltd.',
      enabled: false,
      installed: false,
      requiredPermissions: ['profile:write'],
    },
    {
      id: 'code-challenges',
      name: 'Code Challenges',
      description: 'Practice coding skills with interactive challenges',
      version: '1.0.0',
      author: 'CodeMaster Inc.',
      enabled: false,
      installed: false,
      requiredPermissions: [],
    },
  ];
  
  // Handle enabling a plugin
  const handleEnablePlugin = (pluginId: string) => {
    // In a real implementation, this would call an API
    const success = enablePlugin(pluginId, mockPluginContext as any);
    if (success) {
      setPlugins(prevPlugins =>
        prevPlugins.map(plugin =>
          plugin.id === pluginId ? { ...plugin, enabled: true } : plugin
        )
      );
    }
  };
  
  // Handle disabling a plugin
  const handleDisablePlugin = (pluginId: string) => {
    // In a real implementation, this would call an API
    const success = disablePlugin(pluginId);
    if (success) {
      setPlugins(prevPlugins =>
        prevPlugins.map(plugin =>
          plugin.id === pluginId ? { ...plugin, enabled: false } : plugin
        )
      );
    }
  };
  
  // Handle uninstalling a plugin
  const handleUninstallPlugin = (pluginId: string) => {
    // In a real implementation, this would call an API
    const success = uninstallPlugin(pluginId);
    if (success) {
      setPlugins(prevPlugins => prevPlugins.filter(plugin => plugin.id !== pluginId));
    }
  };
  
  // Handle installing a plugin
  const handleInstallPlugin = (plugin: Plugin) => {
    // In a real implementation, this would call an API
    setPlugins(prevPlugins => [
      ...prevPlugins,
      { ...plugin, installed: true },
    ]);
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Plugin Manager</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('installed')}
            className={`${activeTab === 'installed' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Installed Plugins
          </button>
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`${activeTab === 'marketplace' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Plugin Marketplace
          </button>
        </nav>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'installed' ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">Installed Plugins</h2>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : plugins.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 mb-4">You don't have any plugins installed.</p>
              <button 
                onClick={() => setActiveTab('marketplace')} 
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Browse Plugin Marketplace
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {plugins.map(plugin => (
                <div key={plugin.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{plugin.name}</h3>
                      <p className="text-gray-600 mt-1">{plugin.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">v{plugin.version}</span>
                        <span className="text-gray-500">By {plugin.author}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="relative inline-block w-10 mr-2 align-middle select-none">
                        <input 
                          type="checkbox" 
                          id={`toggle-${plugin.id}`} 
                          checked={plugin.enabled} 
                          onChange={() => plugin.enabled ? handleDisablePlugin(plugin.id) : handleEnablePlugin(plugin.id)}
                          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                        />
                        <label 
                          htmlFor={`toggle-${plugin.id}`} 
                          className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer ${plugin.enabled ? 'bg-indigo-500' : 'bg-gray-300'}`}
                        ></label>
                      </div>
                      <span className="text-sm text-gray-500">{plugin.enabled ? 'Enabled' : 'Disabled'}</span>
                      
                      <button 
                        onClick={() => handleUninstallPlugin(plugin.id)}
                        className="ml-4 text-sm text-red-600 hover:text-red-800"
                      >
                        Uninstall
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">Plugin Marketplace</h2>
          
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Search plugins..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="space-y-4">
            {marketplacePlugins.map(plugin => {
              const isInstalled = plugins.some(p => p.id === plugin.id);
              
              return (
                <div key={plugin.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{plugin.name}</h3>
                      <p className="text-gray-600 mt-1">{plugin.description}</p>
                      <div className="mt-2 flex items-center space-x-4 text-sm">
                        <span className="text-gray-500">v{plugin.version}</span>
                        <span className="text-gray-500">By {plugin.author}</span>
                      </div>
                      
                      {plugin.requiredPermissions.length > 0 && (
                        <div className="mt-2">
                          <span className="text-xs text-gray-500">Required permissions: </span>
                          {plugin.requiredPermissions.map(permission => (
                            <span key={permission} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded ml-1">
                              {permission}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={() => handleInstallPlugin(plugin)}
                      className={`px-4 py-2 rounded text-sm ${isInstalled ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                      disabled={isInstalled}
                    >
                      {isInstalled ? 'Installed' : 'Install'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PluginManager;

// Add some CSS for the toggle switch
const style = document.createElement('style');
style.textContent = `
  .toggle-checkbox:checked {
    right: 0;
    border-color: #fff;
  }
  .toggle-checkbox:checked + .toggle-label {
    background-color: #4f46e5;
  }
  .toggle-label {
    transition: background-color 0.2s ease;
  }
`;
document.head.appendChild(style);