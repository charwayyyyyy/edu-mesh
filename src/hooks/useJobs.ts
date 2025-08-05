import { useState, useCallback } from 'react';
import { useJobStore } from '../store';
import jobsApi, { JobFilters } from '../api/jobs';
import { Job } from '../types';

export const useJobs = () => {
  const {
    jobs,
    isLoading: storeLoading,
    error: storeError,
    fetchJobs: storeFetchJobs,
    addJob: storeAddJob,
    applyToJob: storeApplyToJob,
    filterJobs: storeFilterJobs,
  } = useJobStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch jobs with optional filtering
   */
  const fetchJobs = useCallback(async (filters?: JobFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await jobsApi.fetchJobs(filters);
      
      // Update the store
      await storeFetchJobs();
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch jobs';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchJobs]);

  /**
   * Get a single job by ID
   */
  const getJob = useCallback(async (jobId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const job = await jobsApi.getJob(jobId);
      return job;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch job';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new job posting
   */
  const createJob = useCallback(async (jobData: Omit<Job, 'id' | 'postedBy' | 'postedAt' | 'applicants'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const newJob = await jobsApi.createJob(jobData);
      
      // Update the store
      await storeAddJob(newJob);
      
      return newJob;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create job';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeAddJob]);

  /**
   * Update an existing job
   */
  const updateJob = useCallback(async (jobId: string, jobData: Partial<Job>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedJob = await jobsApi.updateJob(jobId, jobData);
      
      // Refresh jobs after update
      await storeFetchJobs();
      
      return updatedJob;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update job';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchJobs]);

  /**
   * Delete a job posting
   */
  const deleteJob = useCallback(async (jobId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await jobsApi.deleteJob(jobId);
      
      // Refresh jobs after deletion
      await storeFetchJobs();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete job';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchJobs]);

  /**
   * Apply to a job
   */
  const applyToJob = useCallback(async (jobId: string, applicationData: { coverLetter?: string, resumeUrl?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      await jobsApi.applyToJob(jobId, applicationData);
      
      // Update the store
      await storeApplyToJob(jobId);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to apply to job';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeApplyToJob]);

  /**
   * Filter jobs
   */
  const filterJobs = useCallback((filters: JobFilters) => {
    try {
      storeFilterJobs(filters);
    } catch (err: any) {
      setError(err.message || 'Failed to filter jobs');
      throw err;
    }
  }, [storeFilterJobs]);

  /**
   * Get user's job applications
   */
  const getUserApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const applications = await jobsApi.getUserApplications();
      return applications;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch applications';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    jobs,
    isLoading: isLoading || storeLoading,
    error: error || storeError,
    fetchJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
    applyToJob,
    filterJobs,
    getUserApplications,
  };
};