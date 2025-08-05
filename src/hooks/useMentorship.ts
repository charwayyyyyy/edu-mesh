import { useState, useCallback } from 'react';
import { useMentorshipStore } from '../store';
import mentorshipApi, { MentorFilters } from '../api/mentorship';
import { Mentor, MentorshipRequest, MentorReview } from '../types';

export const useMentorship = () => {
  const {
    mentors,
    isLoading: storeLoading,
    error: storeError,
    fetchMentors: storeFetchMentors,
    becomeMentor: storeBecomeMentor,
    requestMentorship: storeRequestMentorship,
    filterMentors: storeFilterMentors,
  } = useMentorshipStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch mentors with optional filtering
   */
  const fetchMentors = useCallback(async (filters?: MentorFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await mentorshipApi.fetchMentors(filters);
      
      // Update the store
      await storeFetchMentors();
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch mentors';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchMentors]);

  /**
   * Get a single mentor by ID
   */
  const getMentor = useCallback(async (mentorId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const mentor = await mentorshipApi.getMentor(mentorId);
      return mentor;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch mentor';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Register as a mentor
   */
  const becomeMentor = useCallback(async (mentorData: Omit<Mentor, 'id' | 'userId' | 'rating' | 'reviews' | 'mentees'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const newMentor = await mentorshipApi.becomeMentor(mentorData);
      
      // Update the store
      await storeBecomeMentor(newMentor);
      
      return newMentor;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to register as mentor';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeBecomeMentor]);

  /**
   * Update mentor profile
   */
  const updateMentorProfile = useCallback(async (mentorId: string, mentorData: Partial<Mentor>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedMentor = await mentorshipApi.updateMentorProfile(mentorId, mentorData);
      
      // Refresh mentors after update
      await storeFetchMentors();
      
      return updatedMentor;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update mentor profile';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchMentors]);

  /**
   * Request mentorship from a mentor
   */
  const requestMentorship = useCallback(async (mentorId: string, message: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const request = await mentorshipApi.requestMentorship(mentorId, message);
      
      // Update the store
      await storeRequestMentorship(mentorId);
      
      return request;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to request mentorship';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeRequestMentorship]);

  /**
   * Get mentorship requests (for mentors)
   */
  const getMentorshipRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const requests = await mentorshipApi.getMentorshipRequests();
      return requests;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch mentorship requests';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Get sent mentorship requests (for mentees)
   */
  const getSentMentorshipRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const requests = await mentorshipApi.getSentMentorshipRequests();
      return requests;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch sent mentorship requests';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Respond to a mentorship request
   */
  const respondToMentorshipRequest = useCallback(async (requestId: string, status: 'Accepted' | 'Rejected') => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedRequest = await mentorshipApi.respondToMentorshipRequest(requestId, status);
      return updatedRequest;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to respond to mentorship request';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Leave a review for a mentor
   */
  const reviewMentor = useCallback(async (mentorId: string, reviewData: { rating: number, comment: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const review = await mentorshipApi.reviewMentor(mentorId, reviewData);
      return review;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit review';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Filter mentors
   */
  const filterMentors = useCallback((filters: MentorFilters) => {
    try {
      storeFilterMentors(filters);
    } catch (err: any) {
      setError(err.message || 'Failed to filter mentors');
      throw err;
    }
  }, [storeFilterMentors]);

  return {
    mentors,
    isLoading: isLoading || storeLoading,
    error: error || storeError,
    fetchMentors,
    getMentor,
    becomeMentor,
    updateMentorProfile,
    requestMentorship,
    getMentorshipRequests,
    getSentMentorshipRequests,
    respondToMentorshipRequest,
    reviewMentor,
    filterMentors,
  };
};