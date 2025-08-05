import { useEffect } from 'react';
import { usePluginStore } from '../store';

const PluginLoader = () => {
  const { plugins, fetchPlugins, isLoading, error } = usePluginStore();

  useEffect(() => {
    fetchPlugins();
  }, [fetchPlugins]);

  if (isLoading) {
    return null; // Silent loading
  }

  if (error) {
    console.error('Error loading plugins:', error);
    return null;
  }

  // Only render enabled plugins
  const enabledPlugins = plugins.filter((plugin) => plugin.isEnabled);

  if (enabledPlugins.length === 0) {
    return null;
  }

  return (
    <div className="plugins-container">
      {enabledPlugins.map((plugin) => {
        const PluginComponent = plugin.component;
        return (
          <div key={plugin.id} className="plugin-wrapper">
            <PluginComponent />
          </div>
        );
      })}
    </div>
  );
};

export default PluginLoader;