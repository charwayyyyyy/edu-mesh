import React, { useEffect } from 'react';
import { useJobs } from '../hooks';

/**
 * Job Board Micro-Frontend
 * 
 * This component serves as the entry point for the Job Board micro-frontend.
 * It can be loaded dynamically by the main application or directly rendered
 * as a standalone page.
 */
const JobBoardMFE: React.FC = () => {
  const { jobs, isLoading, error, fetchJobs } = useJobs();
  
  useEffect(() => {
    // Load jobs when the component mounts
    fetchJobs();
  }, [fetchJobs]);
  
  // Expose public API for the micro-frontend
  useEffect(() => {
    // Register this micro-frontend with the main application
    if (window.EduMesh && window.EduMesh.registerMFE) {
      window.EduMesh.registerMFE('job-board', {
        name: 'Job Board',
        version: '1.0.0',
        // Expose methods that can be called by the main application
        api: {
          refreshJobs: fetchJobs,
          getJobCount: () => jobs.length,
        },
      });
    }
    
    // Cleanup when unmounting
    return () => {
      if (window.EduMesh && window.EduMesh.unregisterMFE) {
        window.EduMesh.unregisterMFE('job-board');
      }
    };
  }, [fetchJobs, jobs.length]);
  
  if (isLoading) {
    return <div className="p-4">Loading jobs...</div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading jobs: {error}</div>;
  }
  
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Job Board</h2>
      <p className="mb-4">Browse and apply for job opportunities</p>
      
      {/* This component would normally render the full job board UI */}
      <div className="bg-white rounded-lg shadow p-4">
        <p className="text-gray-500 mb-2">Found {jobs.length} jobs</p>
        
        {/* Sample job list - in a real implementation, this would be a separate component */}
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="border rounded p-4 hover:bg-gray-50">
              <h3 className="font-semibold text-lg">{job.title}</h3>
              <p className="text-gray-600">{job.company} • {job.location}</p>
              <p className="text-sm text-gray-500 mt-2">{job.type}</p>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
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

export default JobBoardMFE;