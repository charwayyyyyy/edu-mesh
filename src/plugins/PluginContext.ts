import { useAuthStore } from '../store';
import { useNotificationStore } from '../store/notificationStore';
import { useChatStore } from '../store/chatStore';
import { router } from '../router';

export interface PluginContext {
  services: {
    auth: {
      getCurrentUser: () => any;
      isAuthenticated: () => boolean;
    };
    navigation: {
      navigateTo: (route: string) => void;
      getCurrentRoute: () => string;
    };
    notifications: {
      showNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => void;
    };
    chat: {
      sendMessage: (channelId: string, message: string) => void;
    };
  };
  extensionPoints: {
    // These would be implemented in the core application
  };
}

export const createPluginContext = (): PluginContext => {
  return {
    services: {
      auth: {
        getCurrentUser: () => useAuthStore.getState().user,
        isAuthenticated: () => useAuthStore.getState().isAuthenticated,
      },
      navigation: {
        navigateTo: (route: string) => router.navigate(route),
        getCurrentRoute: () => router.state.location.pathname,
      },
      notifications: {
        showNotification: (message: string, type: 'info' | 'success' | 'warning' | 'error') => {
          useNotificationStore.getState().addNotification({
            id: `plugin-${Date.now()}`,
            title: 'Plugin Notification',
            message,
            type,
            timestamp: new Date(),
            read: false,
          });
        },
      },
      chat: {
        sendMessage: (channelId: string, message: string) => {
          const sender = useAuthStore.getState().user;
          if (sender) {
            useChatStore.getState().sendMessage(channelId, {
              id: `msg-${Date.now()}`,
              sender,
              content: message,
              timestamp: new Date(),
              status: 'sent',
            });
          }
        },
      },
    },
    extensionPoints: {},
  };
};
