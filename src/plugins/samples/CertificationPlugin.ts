import { PluginContext } from '../PluginContext';
import CertificationWidget from './certification/CertificationWidget';
import CertificationProfileSection from './certification/CertificationProfileSection';
import { mockCertifications } from './certification/mock-data';

export { mockCertifications };

// Plugin initialization function
export const initialize = (context: PluginContext) => {
  context.services.notifications.showNotification('Initializing Certification Plugin...', 'info');

  // Here, you would register the components with the extension points.
  // Since the extension points are not yet implemented, we will just log them.
  console.log('Registering certification components', {
    widget: CertificationWidget,
    profileSection: CertificationProfileSection,
  });

  context.services.notifications.showNotification('Certification Plugin initialized successfully', 'success');
};

// Plugin cleanup function
export const cleanup = () => {
  console.log('Cleaning up Certification Plugin...');
  // In a real implementation, we would unregister all extensions and clean up resources
};