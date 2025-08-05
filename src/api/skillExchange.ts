import apiClient from './index';
import { SkillExchange, SkillExchangeResponse, PaginatedResponse, ApiResponse } from '../types';

export interface SkillExchangeFilters {
  skillsOffered?: string[];
  skillsWanted?: string[];
  status?: 'Open' | 'Closed' | 'In Progress';
  search?: string;
  page?: number;
  limit?: number;
}

const skillExchangeApi = {
  /**
   * Fetch skill exchanges with optional filtering
   */
  fetchExchanges: async (filters?: SkillExchangeFilters): Promise<PaginatedResponse<SkillExchange>> => {
    try {
      const response = await apiClient.get<PaginatedResponse<SkillExchange>>('/skill-exchanges', {
        params: filters,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get a single skill exchange by ID
   */
  getExchange: async (exchangeId: string): Promise<SkillExchange> => {
    try {
      const response = await apiClient.get<ApiResponse<SkillExchange>>(`/skill-exchanges/${exchangeId}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new skill exchange
   */
  createExchange: async (exchangeData: Omit<SkillExchange, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'responses'>): Promise<SkillExchange> => {
    try {
      const response = await apiClient.post<ApiResponse<SkillExchange>>('/skill-exchanges', exchangeData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update an existing skill exchange
   */
  updateExchange: async (exchangeId: string, exchangeData: Partial<SkillExchange>): Promise<SkillExchange> => {
    try {
      const response = await apiClient.put<ApiResponse<SkillExchange>>(`/skill-exchanges/${exchangeId}`, exchangeData);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a skill exchange
   */
  deleteExchange: async (exchangeId: string): Promise<void> => {
    try {
      await apiClient.delete(`/skill-exchanges/${exchangeId}`);
    } catch (error) {
      throw error;
    }
  },

  /**
   * Respond to a skill exchange
   */
  respondToExchange: async (exchangeId: string, message: string): Promise<SkillExchangeResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<SkillExchangeResponse>>(`/skill-exchanges/${exchangeId}/responses`, { message });
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get responses for a skill exchange
   */
  getExchangeResponses: async (exchangeId: string): Promise<SkillExchangeResponse[]> => {
    try {
      const response = await apiClient.get<ApiResponse<SkillExchangeResponse[]>>(`/skill-exchanges/${exchangeId}/responses`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Accept a response to a skill exchange
   */
  acceptExchangeResponse: async (exchangeId: string, responseId: string): Promise<SkillExchangeResponse> => {
    try {
      const response = await apiClient.put<ApiResponse<SkillExchangeResponse>>(
        `/skill-exchanges/${exchangeId}/responses/${responseId}`,
        { status: 'Accepted' }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reject a response to a skill exchange
   */
  rejectExchangeResponse: async (exchangeId: string, responseId: string): Promise<SkillExchangeResponse> => {
    try {
      const response = await apiClient.put<ApiResponse<SkillExchangeResponse>>(
        `/skill-exchanges/${exchangeId}/responses/${responseId}`,
        { status: 'Rejected' }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user's skill exchanges
   */
  getUserExchanges: async (): Promise<SkillExchange[]> => {
    try {
      const response = await apiClient.get<ApiResponse<SkillExchange[]>>('/user/skill-exchanges');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
};

export default skillExchangeApi;