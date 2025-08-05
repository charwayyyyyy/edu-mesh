import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useAuthStore } from '../../store';

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

interface NotificationCenterProps {
  maxNotifications?: number;
}

const NotificationCenter = ({ maxNotifications = 5 }: NotificationCenterProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [newNotificationCount, setNewNotificationCount] = useState(0);

  // Load mock notifications
  useEffect(() => {
    if (isAuthenticated) {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: 'New Mentorship Request',
          message: 'Kofi Annan has requested to be your mentee.',
          type: 'info',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          link: '/mentorship',
          actionText: 'View Request',
          sender: {
            id: '104',
            name: 'Kofi Annan',
            avatar: 'https://ui-avatars.com/api/?name=Kofi+Annan&background=0D8ABC&color=fff',
          },
        },
        {
          id: '2',
          title: 'Job Application Update',
          message: 'Your application for Frontend Developer at Tech Ghana has been reviewed.',
          type: 'success',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: false,
          link: '/applications',
          actionText: 'View Status',
        },
        {
          id: '3',
          title: 'Skill Exchange Match',
          message: 'We found a match for your Python tutoring offer!',
          type: 'success',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
          read: true,
          link: '/skills',
          actionText: 'View Match',
        },
        {
          id: '4',
          title: 'Profile Verification',
          message: 'Your university credentials have been verified successfully.',
          type: 'success',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
          read: true,
        },
        {
          id: '5',
          title: 'New Career Story',
          message: 'Dr. Kwame Nkrumah shared a new career story that matches your interests.',
          type: 'info',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
          read: true,
          link: '/stories',
          actionText: 'Read Story',
          sender: {
            id: '102',
            name: 'Dr. Kwame Nkrumah',
            avatar: 'https://ui-avatars.com/api/?name=Kwame+Nkrumah&background=0D8ABC&color=fff',
          },
        },
      ];

      setNotifications(mockNotifications);
      setNewNotificationCount(mockNotifications.filter((n) => !n.read).length);
    }
  }, [isAuthenticated]);

  // Simulate receiving a new notification every 30 seconds
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      const randomNotification = generateRandomNotification();
      addNotification(randomNotification);
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const generateRandomNotification = (): Notification => {
    const types: Array<'info' | 'success' | 'warning' | 'error'> = ['info', 'success', 'warning', 'error'];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const templates = [
      {
        title: 'New Job Posting',
        message: 'A new job matching your skills has been posted.',
        link: '/jobs',
        actionText: 'View Job',
      },
      {
        title: 'Mentorship Session Reminder',
        message: 'Your mentorship session is scheduled in 1 hour.',
        link: '/mentorship',
        actionText: 'Join Session',
      },
      {
        title: 'Skill Exchange Update',
        message: 'Someone has accepted your skill exchange offer.',
        link: '/skills',
        actionText: 'View Details',
      },
      {
        title: 'Profile View',
        message: 'A recruiter from Tech Ghana viewed your profile.',
        link: '/profile',
        actionText: 'Update Profile',
      },
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];

    return {
      id: `notification-${Date.now()}`,
      title: template.title,
      message: template.message,
      type: randomType,
      timestamp: new Date(),
      read: false,
      link: template.link,
      actionText: template.actionText,
    };
  };

  const addNotification = (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev].slice(0, 20)); // Keep only the 20 most recent notifications
    setNewNotificationCount((prev) => prev + 1);

    // Show toast notification
    showToast(notification);
  };

  const showToast = (notification: Notification) => {
    // This function would show a toast notification
    // For now, we'll just log it
    console.log('Toast notification:', notification);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      )
    );

    // Update the new notification count
    setNewNotificationCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })));
    setNewNotificationCount(0);
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== notificationId));

    // Update the new notification count if the deleted notification was unread
    const wasUnread = notifications.find((n) => n.id === notificationId && !n.read);
    if (wasUnread) {
      setNewNotificationCount((prev) => Math.max(0, prev - 1));
    }
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={toggleNotifications}
        className="relative p-1 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" />
        {newNotificationCount > 0 && (
          <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
            {newNotificationCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <div className="p-3 bg-primary-600 text-white flex justify-between items-center">
              <h3 className="font-medium">Notifications</h3>
              <div className="flex space-x-2">
                <button
                  onClick={markAllAsRead}
                  className="text-white hover:text-gray-200 text-sm flex items-center"
                >
                  <CheckIcon className="h-4 w-4 mr-1" />
                  Mark all as read
                </button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No notifications
                </div>
              ) : (
                notifications.slice(0, maxNotifications).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20' : ''}`}
                  >
                    <div className="flex">
                      {notification.sender?.avatar ? (
                        <img
                          src={notification.sender.avatar}
                          alt={notification.sender.name}
                          className="h-10 w-10 rounded-full mr-3"
                        />
                      ) : (
                        <div
                          className={`h-10 w-10 rounded-full mr-3 flex items-center justify-center ${getNotificationTypeColor(notification.type)}`}
                        >
                          {getNotificationTypeIcon(notification.type)}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </h4>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                            >
                              <XMarkIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {notification.message}
                        </p>
                        {notification.link && (
                          <div className="mt-2">
                            <a
                              href={notification.link}
                              onClick={() => markAsRead(notification.id)}
                              className="inline-flex items-center text-xs font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                            >
                              {notification.actionText || 'View'}
                              <svg
                                className="ml-1 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}

              {notifications.length > maxNotifications && (
                <div className="p-3 text-center">
                  <a
                    href="/notifications"
                    className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    View all notifications
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper functions
const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  return timestamp.toLocaleDateString();
};

const getNotificationTypeColor = (type: string): string => {
  switch (type) {
    case 'success':
      return 'bg-green-100 text-green-600 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400';
    case 'warning':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-400';
    case 'error':
      return 'bg-red-100 text-red-600 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400';
    case 'info':
    default:
      return 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:bg-opacity-30 dark:text-blue-400';
  }
};

const getNotificationTypeIcon = (type: string) => {
  switch (type) {
    case 'success':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'warning':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'error':
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'info':
    default:
      return (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
};

export default NotificationCenter;