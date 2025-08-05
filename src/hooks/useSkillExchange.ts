import { useState, useCallback } from 'react';
import { useSkillExchangeStore } from '../store';
import skillExchangeApi, { SkillExchangeFilters } from '../api/skillExchange';
import { SkillExchange, SkillExchangeResponse } from '../types';

export const useSkillExchange = () => {
  const {
    exchanges,
    isLoading: storeLoading,
    error: storeError,
    fetchExchanges: storeFetchExchanges,
    createExchange: storeCreateExchange,
    respondToExchange: storeRespondToExchange,
    filterExchanges: storeFilterExchanges,
  } = useSkillExchangeStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch skill exchanges with optional filtering
   */
  const fetchExchanges = useCallback(async (filters?: SkillExchangeFilters) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await skillExchangeApi.fetchExchanges(filters);
      
      // Update the store
      await storeFetchExchanges();
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch skill exchanges';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchExchanges]);

  /**
   * Get a single skill exchange by ID
   */
  const getExchange = useCallback(async (exchangeId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const exchange = await skillExchangeApi.getExchange(exchangeId);
      return exchange;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch skill exchange';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Create a new skill exchange
   */
  const createExchange = useCallback(async (exchangeData: Omit<SkillExchange, 'id' | 'userId' | 'createdAt' | 'updatedAt' | 'responses'>) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const newExchange = await skillExchangeApi.createExchange(exchangeData);
      
      // Update the store
      await storeCreateExchange(newExchange);
      
      return newExchange;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create skill exchange';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeCreateExchange]);

  /**
   * Update an existing skill exchange
   */
  const updateExchange = useCallback(async (exchangeId: string, exchangeData: Partial<SkillExchange>) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedExchange = await skillExchangeApi.updateExchange(exchangeId, exchangeData);
      
      // Refresh exchanges after update
      await storeFetchExchanges();
      
      return updatedExchange;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update skill exchange';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchExchanges]);

  /**
   * Delete a skill exchange
   */
  const deleteExchange = useCallback(async (exchangeId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await skillExchangeApi.deleteExchange(exchangeId);
      
      // Refresh exchanges after deletion
      await storeFetchExchanges();
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete skill exchange';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchExchanges]);

  /**
   * Respond to a skill exchange
   */
  const respondToExchange = useCallback(async (exchangeId: string, message: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call the API
      const response = await skillExchangeApi.respondToExchange(exchangeId, message);
      
      // Update the store
      await storeRespondToExchange(exchangeId);
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to respond to skill exchange';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeRespondToExchange]);

  /**
   * Get responses for a skill exchange
   */
  const getExchangeResponses = useCallback(async (exchangeId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const responses = await skillExchangeApi.getExchangeResponses(exchangeId);
      return responses;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch exchange responses';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Accept a response to a skill exchange
   */
  const acceptExchangeResponse = useCallback(async (exchangeId: string, responseId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await skillExchangeApi.acceptExchangeResponse(exchangeId, responseId);
      
      // Refresh exchanges after accepting response
      await storeFetchExchanges();
      
      return response;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to accept exchange response';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchExchanges]);

  /**
   * Filter skill exchanges
   */
  const filterExchanges = useCallback((filters: SkillExchangeFilters) => {
    try {
      storeFilterExchanges(filters);
    } catch (err: any) {
      setError(err.message || 'Failed to filter skill exchanges');
      throw err;
    }
  }, [storeFilterExchanges]);

  return {
    exchanges,
    isLoading: isLoading || storeLoading,
    error: error || storeError,
    fetchExchanges,
    getExchange,
    createExchange,
    updateExchange,
    deleteExchange,
    respondToExchange,
    getExchangeResponses,
    acceptExchangeResponse,
    filterExchanges,
  };
};