import React, { useEffect, useState } from 'react';
import { useSkillExchange } from '../hooks';
import { SkillExchange } from '../types';

/**
 * Skill Exchange Micro-Frontend
 * 
 * This component serves as the entry point for the Skill Exchange micro-frontend.
 * It can be loaded dynamically by the main application or directly rendered
 * as a standalone page.
 */
const SkillExchangeMFE: React.FC = () => {
  const { exchanges, isLoading, error, fetchExchanges } = useSkillExchange();
  const [activeTab, setActiveTab] = useState<'browse' | 'my-exchanges' | 'create'>('browse');
  
  useEffect(() => {
    // Load skill exchanges when the component mounts
    fetchExchanges();
  }, [fetchExchanges]);
  
  // Expose public API for the micro-frontend
  useEffect(() => {
    // Register this micro-frontend with the main application
    if (window.EduMesh && window.EduMesh.registerMFE) {
      window.EduMesh.registerMFE('skill-exchange', {
        name: 'Skill Exchange',
        version: '1.0.0',
        // Expose methods that can be called by the main application
        api: {
          refreshExchanges: fetchExchanges,
          getExchangeCount: () => exchanges.length,
          switchToBrowseTab: () => setActiveTab('browse'),
          switchToMyExchangesTab: () => setActiveTab('my-exchanges'),
          switchToCreateTab: () => setActiveTab('create'),
        },
      });
    }
    
    // Cleanup when unmounting
    return () => {
      if (window.EduMesh && window.EduMesh.unregisterMFE) {
        window.EduMesh.unregisterMFE('skill-exchange');
      }
    };
  }, [fetchExchanges, exchanges.length]);
  
  if (isLoading) {
    return <div className="p-4">Loading skill exchanges...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading skill exchanges: {error}</div>;
  }
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Skill Exchange</h2>
      <p className="mb-4">Exchange skills with other students and professionals</p>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('browse')}
            className={`${activeTab === 'browse' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Browse Exchanges
          </button>
          <button
            onClick={() => setActiveTab('my-exchanges')}
            className={`${activeTab === 'my-exchanges' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Exchanges
          </button>
          <button
            onClick={() => setActiveTab('create')}
            className={`${activeTab === 'create' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Create Exchange
          </button>
        </nav>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'browse' && (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 mb-2">Found {exchanges.length} skill exchanges</p>
          
          {/* Sample exchange list - in a real implementation, this would be a separate component */}
          <div className="space-y-4">
            {exchanges.map((exchange: SkillExchange) => (
              <div key={exchange.id} className="border rounded p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{exchange.title}</h3>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    {exchange.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{exchange.description.substring(0, 150)}...</p>
                
                <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Skills to offer:</p>
                    <div className="flex flex-wrap gap-1">
                      {exchange.skillsToOffer.map(skill => (
                        <span key={skill.id} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Skills wanted:</p>
                    <div className="flex flex-wrap gap-1">
                      {exchange.skillsWanted.map(skill => (
                        <span key={skill.id} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">
                      {exchange.user.name.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-600">{exchange.user.name}</span>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'my-exchanges' && (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 mb-4">Your skill exchanges</p>
          
          {/* This would show the user's exchanges */}
          <div className="text-center py-8 text-gray-500">
            <p>You don't have any active skill exchanges.</p>
            <button 
              onClick={() => setActiveTab('create')} 
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Create a skill exchange
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'create' && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="font-semibold text-lg mb-4">Create a New Skill Exchange</h3>
          
          {/* Simple form for creating a new exchange */}
          <form className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="What would you like to call this exchange?"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe what you're looking to exchange..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills You Can Offer
              </label>
              <div className="border border-gray-300 rounded-md p-2 min-h-[100px]">
                <p className="text-sm text-gray-500">Select skills you can teach or share with others</p>
                {/* This would be a skill selector component */}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Skills You Want to Learn
              </label>
              <div className="border border-gray-300 rounded-md p-2 min-h-[100px]">
                <p className="text-sm text-gray-500">Select skills you want to learn from others</p>
                {/* This would be a skill selector component */}
              </div>
            </div>
            
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
              >
                Create Skill Exchange
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

// Add type definition for the global EduMesh object
declare global {
  interface Window {
    EduMesh?: {
      registerMFE: (id: string, config: any) => void;
      unregisterMFE: (id: string) => void;
    };
  }
}

export default SkillExchangeMFE;