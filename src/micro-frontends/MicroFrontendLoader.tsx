import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadMicroFrontend, MicroFrontend, microFrontends } from './index';
import { useAuthStore } from '../store';

/**
 * MicroFrontendLoader Component
 * 
 * This component is responsible for dynamically loading and rendering micro-frontends
 * based on the route parameter. It handles loading states, errors, and permissions.
 */
const MicroFrontendLoader: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mfe, setMfe] = useState<MicroFrontend | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  
  useEffect(() => {
    if (!id) {
      setError('No micro-frontend ID provided');
      return;
    }
    
    const foundMfe = microFrontends.find(m => m.id === id);
    if (!foundMfe) {
      setError(`Micro-frontend with ID "${id}" not found`);
      return;
    }
    
    // Check permissions if required
    if (foundMfe.permissions && foundMfe.permissions.length > 0) {
      const userPermissions = user?.permissions || [];
      const hasPermission = foundMfe.permissions.every(permission => 
        userPermissions.includes(permission)
      );
      
      if (!hasPermission) {
        setError('You do not have permission to access this feature');
        return;
      }
    }
    
    setMfe(foundMfe);
    setError(null);
  }, [id, user]);
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg inline-block">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!mfe) {
    return (
      <div className="p-8 text-center">
        <div className="bg-gray-50 p-4 rounded-lg inline-block">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Dynamically load the micro-frontend component
  const MicroFrontendComponent = React.lazy(() => {
    try {
      return import(`./${mfe.id.charAt(0).toUpperCase() + mfe.id.slice(1)}MFE`);
    } catch (err) {
      setError(`Failed to load micro-frontend: ${err}`);
      return Promise.reject(err);
    }
  });
  
  return (
    <div className="micro-frontend-container">
      <Suspense fallback={
        <div className="p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      }>
        <MicroFrontendComponent />
      </Suspense>
    </div>
  );
};

export default MicroFrontendLoader;