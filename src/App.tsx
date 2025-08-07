import { Outlet } from 'react-router-dom';
import { Suspense, lazy, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ChatManager from './components/chat/ChatManager';
import NotificationCenter from './components/notifications/NotificationCenter';
import { useChatStore } from './store/chatStore';
import { useNotificationStore } from './store/notificationStore';

// Lazy load components for better performance
const PluginLoader = lazy(() => import('./plugins/PluginLoader'));

function App() {
  const loadContacts = useChatStore(state => state.loadContacts);
  const addNotification = useNotificationStore(state => state.addNotification);

  useEffect(() => {
    // Load chat contacts when app initializes
    loadContacts();
    
    // Demo notification after app loads
    const timer = setTimeout(() => {
      addNotification({
        id: `welcome-${Date.now()}`,
        title: 'Welcome to EduMesh',
        message: 'Explore our new features and connect with peers!',
        type: 'info',
        timestamp: new Date(),
        read: false
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [loadContacts, addNotification]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <PluginLoader />
      </Suspense>
      <NotificationCenter />
      <ChatManager />
      <Footer />
    </div>
  );
}

export default App;