import React, { useEffect, useState } from 'react';
import { useMentorship } from '../hooks';
import { Mentor } from '../types';

/**
 * Mentorship Micro-Frontend
 * 
 * This component serves as the entry point for the Mentorship micro-frontend.
 * It can be loaded dynamically by the main application or directly rendered
 * as a standalone page.
 */
const MentorshipMFE: React.FC = () => {
  const { mentors, isLoading, error, fetchMentors } = useMentorship();
  const [activeTab, setActiveTab] = useState<'find' | 'requests'>('find');
  
  useEffect(() => {
    // Load mentors when the component mounts
    fetchMentors();
  }, [fetchMentors]);
  
  // Expose public API for the micro-frontend
  useEffect(() => {
    // Register this micro-frontend with the main application
    if (window.EduMesh && window.EduMesh.registerMFE) {
      window.EduMesh.registerMFE('mentorship', {
        name: 'Mentorship',
        version: '1.0.0',
        // Expose methods that can be called by the main application
        api: {
          refreshMentors: fetchMentors,
          getMentorCount: () => mentors.length,
          switchToFindTab: () => setActiveTab('find'),
          switchToRequestsTab: () => setActiveTab('requests'),
        },
      });
    }
    
    // Cleanup when unmounting
    return () => {
      if (window.EduMesh && window.EduMesh.unregisterMFE) {
        window.EduMesh.unregisterMFE('mentorship');
      }
    };
  }, [fetchMentors, mentors.length]);
  
  if (isLoading) {
    return <div className="p-4">Loading mentorship data...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading mentorship data: {error}</div>;
  }
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Mentorship</h2>
      <p className="mb-4">Connect with mentors and mentees to grow your skills and network</p>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('find')}
            className={`${activeTab === 'find' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Find a Mentor
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`${activeTab === 'requests' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            My Requests
          </button>
        </nav>
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'find' ? (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 mb-2">Found {mentors.length} mentors</p>
          
          {/* Sample mentor list - in a real implementation, this would be a separate component */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentors.map((mentor: Mentor) => (
              <div key={mentor.id} className="border rounded p-4 hover:bg-gray-50">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    {mentor.user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{mentor.user.name}</h3>
                    <p className="text-sm text-gray-500">{mentor.title}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{mentor.bio.substring(0, 100)}...</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {mentor.skills.slice(0, 3).map(skill => (
                    <span key={skill.id} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">
                      {skill.name}
                    </span>
                  ))}
                  {mentor.skills.length > 3 && (
                    <span className="text-xs text-gray-500 px-2 py-1">+{mentor.skills.length - 3} more</span>
                  )}
                </div>
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
                  Request Mentorship
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-500 mb-4">Your mentorship requests</p>
          
          {/* This would show the user's mentorship requests */}
          <div className="text-center py-8 text-gray-500">
            <p>You don't have any active mentorship requests.</p>
            <button 
              onClick={() => setActiveTab('find')} 
              className="mt-4 text-indigo-600 hover:text-indigo-800"
            >
              Find a mentor
            </button>
          </div>
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

export default MentorshipMFE;