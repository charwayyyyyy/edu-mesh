import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAvailableMicroFrontends, MicroFrontend } from './index';
import { useAuthStore } from '../store';

/**
 * MicroFrontendRegistry Component
 * 
 * This component displays all available micro-frontends that the user has permission to access.
 * It serves as a dashboard or app launcher for the different features of the application.
 */
const MicroFrontendRegistry: React.FC = () => {
  const [availableMFEs, setAvailableMFEs] = useState<MicroFrontend[]>([]);
  const { user } = useAuthStore();
  
  useEffect(() => {
    // Get all micro-frontends the user has permission to access
    const userPermissions = user?.permissions || [];
    const mfes = getAvailableMicroFrontends(userPermissions);
    setAvailableMFEs(mfes);
  }, [user]);
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">EduMesh Features</h2>
      
      {availableMFEs.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500">No features available. Please contact your administrator.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableMFEs.map(mfe => (
            <Link 
              key={mfe.id} 
              to={mfe.route} 
              className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {mfe.icon ? (
                    <img 
                      src={`/src/assets/${mfe.icon}`} 
                      alt={`${mfe.name} icon`} 
                      className="w-10 h-10 mr-3" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      {mfe.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-lg font-semibold">{mfe.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{mfe.description}</p>
                <div className="flex justify-between items-center text-sm">
                  {mfe.team && (
                    <span className="text-gray-500">Team: {mfe.team}</span>
                  )}
                  <span className="text-indigo-600">v{mfe.version}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MicroFrontendRegistry;