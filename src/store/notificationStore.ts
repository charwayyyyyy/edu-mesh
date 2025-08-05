import { create } from 'zustand';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  link?: string;
  actionText?: string;
  image?: string;
  sender?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (notificationId: string) => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) =>
    set((state) => {
      const newNotification: Notification = {
        ...notification,
        id: `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        timestamp: new Date(),
        read: false,
      };

      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
  markAsRead: (notificationId) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === notificationId);
      if (!notification || notification.read) {
        return state;
      }

      return {
        notifications: state.notifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1,
      };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),
  deleteNotification: (notificationId) =>
    set((state) => {
      const notification = state.notifications.find((n) => n.id === notificationId);
      const unreadDelta = notification && !notification.read ? 1 : 0;

      return {
        notifications: state.notifications.filter((n) => n.id !== notificationId),
        unreadCount: state.unreadCount - unreadDelta,
      };
    }),
  clearAllNotifications: () => set({ notifications: [], unreadCount: 0 }),
}));

// Helper function to create notifications of different types
export const createNotification = {
  info: (title: string, message: string, options?: Partial<Notification>) =>
    useNotificationStore.getState().addNotification({
      title,
      message,
      type: 'info',
      ...options,
    }),
  success: (title: string, message: string, options?: Partial<Notification>) =>
    useNotificationStore.getState().addNotification({
      title,
      message,
      type: 'success',
      ...options,
    }),
  warning: (title: string, message: string, options?: Partial<Notification>) =>
    useNotificationStore.getState().addNotification({
      title,
      message,
      type: 'warning',
      ...options,
    }),
  error: (title: string, message: string, options?: Partial<Notification>) =>
    useNotificationStore.getState().addNotification({
      title,
      message,
      type: 'error',
      ...options,
    }),
};