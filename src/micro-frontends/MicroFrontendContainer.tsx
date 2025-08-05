import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';

// Define the context for micro-frontend communication
interface MicroFrontendContextType {
  registerMFE: (id: string, config: any) => void;
  unregisterMFE: (id: string) => void;
  getMFEApi: (id: string) => any | null;
  broadcastEvent: (eventName: string, data: any) => void;
  subscribeToEvent: (eventName: string, callback: (data: any) => void) => () => void;
}

const MicroFrontendContext = createContext<MicroFrontendContextType | null>(null);

/**
 * Hook to access the micro-frontend context
 */
export const useMicroFrontendContext = () => {
  const context = useContext(MicroFrontendContext);
  if (!context) {
    throw new Error('useMicroFrontendContext must be used within a MicroFrontendContainer');
  }
  return context;
};

/**
 * MicroFrontendContainer Component
 * 
 * This component provides a container for all micro-frontends with:
 * - Consistent layout
 * - Communication context
 * - Event system for cross-MFE communication
 * - Global state access
 */
const MicroFrontendContainer: React.FC = () => {
  const [registeredMFEs, setRegisteredMFEs] = useState<Record<string, any>>({});
  const [eventListeners, setEventListeners] = useState<Record<string, Array<(data: any) => void>>>({});
  const { user } = useAuthStore();
  
  // Register a micro-frontend and its public API
  const registerMFE = (id: string, config: any) => {
    console.log(`Registering micro-frontend: ${id}`);
    setRegisteredMFEs(prev => ({
      ...prev,
      [id]: config,
    }));
  };
  
  // Unregister a micro-frontend
  const unregisterMFE = (id: string) => {
    console.log(`Unregistering micro-frontend: ${id}`);
    setRegisteredMFEs(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };
  
  // Get a micro-frontend's public API
  const getMFEApi = (id: string) => {
    return registeredMFEs[id]?.api || null;
  };
  
  // Broadcast an event to all subscribers
  const broadcastEvent = (eventName: string, data: any) => {
    console.log(`Broadcasting event: ${eventName}`, data);
    if (eventListeners[eventName]) {
      eventListeners[eventName].forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in event listener for ${eventName}:`, error);
        }
      });
    }
  };
  
  // Subscribe to an event
  const subscribeToEvent = (eventName: string, callback: (data: any) => void) => {
    console.log(`Subscribing to event: ${eventName}`);
    setEventListeners(prev => {
      const listeners = prev[eventName] || [];
      return {
        ...prev,
        [eventName]: [...listeners, callback],
      };
    });
    
    // Return unsubscribe function
    return () => {
      setEventListeners(prev => {
        const listeners = prev[eventName] || [];
        return {
          ...prev,
          [eventName]: listeners.filter(cb => cb !== callback),
        };
      });
    };
  };
  
  // Expose the MFE API to the window object for external access
  useEffect(() => {
    window.EduMesh = {
      registerMFE,
      unregisterMFE,
      getMFEApi,
      broadcastEvent,
      subscribeToEvent,
    };
    
    return () => {
      delete window.EduMesh;
    };
  }, [registeredMFEs, eventListeners]);
  
  // Context value
  const contextValue: MicroFrontendContextType = {
    registerMFE,
    unregisterMFE,
    getMFEApi,
    broadcastEvent,
    subscribeToEvent,
  };
  
  return (
    <MicroFrontendContext.Provider value={contextValue}>
      <div className="micro-frontend-container bg-gray-50 min-h-screen">
        {/* Header with user info */}
        <header className="bg-white shadow-sm p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-semibold text-indigo-600">EduMesh Platform</h1>
            
            {user ? (
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">
                  Welcome, {user.name}
                </span>
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {user.name.charAt(0)}
                </div>
              </div>
            ) : (
              <button className="text-sm text-indigo-600 hover:text-indigo-800">
                Sign In
              </button>
            )}
          </div>
        </header>
        
        {/* Main content area */}
        <main className="container mx-auto py-6 px-4">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 mt-8">
          <div className="container mx-auto text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} EduMesh Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </MicroFrontendContext.Provider>
  );
};

// Update the global Window interface
declare global {
  interface Window {
    EduMesh?: {
      registerMFE: (id: string, config: any) => void;
      unregisterMFE: (id: string) => void;
      getMFEApi: (id: string) => any | null;
      broadcastEvent: (eventName: string, data: any) => void;
      subscribeToEvent: (eventName: string, callback: (data: any) => void) => () => void;
    };
  }
}

export default MicroFrontendContainer;