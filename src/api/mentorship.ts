import apiClient from './index';
import { Mentor, MentorshipRequest, MentorReview, PaginatedResponse, ApiResponse } from '../types';

export interface MentorFilters {
  expertise?: string;
  availability?: string;
  rating?: number;
  search?: string;
  page?: number;
  limit?: number;
}

const mentorshipApi = {
  /**
   * Fetch mentors with optional filtering
   */
  fetchMentors: async (filters?: MentorFilters): Promise<PaginatedResponse<Mentor>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<Mentor>>('/mentors', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single mentor by ID
   */
  getMentor: async (mentorId: string): Promise<Mentor> => {
    try {
      const response = await apiClient.get<ApiResponse<Mentor>>(`/mentors/${mentorId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register as a mentor
   */
  becomeMentor: async (mentorData: Omit<Mentor, 'id' | 'userId' | 'rating' | 'reviews' | 'mentees'>): Promise<Mentor> => {
    try {
      const response = await apiClient.post<ApiResponse<Mentor>>('/mentors', mentorData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update mentor profile
   */
  updateMentorProfile: async (mentorId: string, mentorData: Partial<Mentor>): Promise<Mentor> => {
    try {
      const response = await apiClient.put<ApiResponse<Mentor>>(`/mentors/${mentorId}`, mentorData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request mentorship from a mentor
   */
  requestMentorship: async (mentorId: string, message: string): Promise<MentorshipRequest> => {
    try {
      const response = await apiClient.post<ApiResponse<MentorshipRequest>>(`/mentors/${mentorId}/request`, { message });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get mentorship requests (for mentors)
   */
  getMentorshipRequests: async (): Promise<MentorshipRequest[]> => {
    try {
      const response = await apiClient.get<ApiResponse<MentorshipRequest[]>>('/mentors/requests');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get sent mentorship requests (for mentees)
   */
  getSentMentorshipRequests: async (): Promise<MentorshipRequest[]> => {
    try {
      const response = await apiClient.get<ApiResponse<MentorshipRequest[]>>('/mentors/requests/sent');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Respond to a mentorship request
   */
  respondToMentorshipRequest: async (requestId: string, status: 'Accepted' | 'Rejected'): Promise<MentorshipRequest> => {
    try {
      const response = await apiClient.put<ApiResponse<MentorshipRequest>>(`/mentors/requests/${requestId}`, { status });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Leave a review for a mentor
   */
  reviewMentor: async (mentorId: string, reviewData: { rating: number, comment: string }): Promise<MentorReview> => {
    try {
      const response = await apiClient.post<ApiResponse<MentorReview>>(`/mentors/${mentorId}/reviews`, reviewData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get reviews for a mentor
   */
  getMentorReviews: async (mentorId: string): Promise<MentorReview[]> => {
    try {
      const response = await apiClient.get<ApiResponse<MentorReview[]>>(`/mentors/${mentorId}/reviews`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default mentorshipApi;