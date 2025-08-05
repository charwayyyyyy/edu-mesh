import apiClient from './index';
import { Job, PaginatedResponse, ApiResponse } from '../types';

export interface JobFilters {
  type?: string;
  location?: string;
  company?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const jobsApi = {
  /**
   * Fetch jobs with optional filtering
   */
  fetchJobs: async (filters?: JobFilters): Promise<PaginatedResponse<Job>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Job>>('/jobs', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single job by ID
   */
  getJob: async (jobId: string): Promise<Job> => {
    try {
      const response = await apiClient.get<ApiResponse<Job>>(`/jobs/${jobId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new job posting
   */
  createJob: async (jobData: Omit<Job, 'id' | 'postedBy' | 'postedAt' | 'applicants'>): Promise<Job> => {
    try {
      const response = await apiClient.post<ApiResponse<Job>>('/jobs', jobData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update an existing job
   */
  updateJob: async (jobId: string, jobData: Partial<Job>): Promise<Job> => {
    try {
      const response = await apiClient.put<ApiResponse<Job>>(`/jobs/${jobId}`, jobData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a job posting
   */
  deleteJob: async (jobId: string): Promise<void> => {
    try {
      await apiClient.delete(`/jobs/${jobId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Apply to a job
   */
  applyToJob: async (jobId: string, applicationData: { coverLetter?: string, resumeUrl?: string }): Promise<void> => {
    try {
      await apiClient.post(`/jobs/${jobId}/apply`, applicationData);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get applications for a job (for job posters)
   */
  getJobApplications: async (jobId: string): Promise<any[]> => {
    try {
      const response = await apiClient.get(`/jobs/${jobId}/applications`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's job applications
   */
  getUserApplications: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get('/user/applications');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default jobsApi;