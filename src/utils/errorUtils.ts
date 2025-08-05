import { ApiError } from '../types';

/**
 * Parse an error from an API response
 * @param error - Error object from catch block
 * @returns Standardized ApiError object
 */
export const parseApiError = (error: any): ApiError => {
  // If it's already an ApiError, return it
  if (error.code && error.message) {
    return error as ApiError;
  }
  
  // If it's an Axios error with a response
  if (error.response && error.response.data) {
    const { data } = error.response;
    return {
      message: data.message || 'An error occurred',
      code: data.code || 'UNKNOWN_ERROR',
      status: error.response.status,
      errors: data.errors,
    };
  }
  
  // If it's a network error
  if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      code: 'NETWORK_ERROR',
      status: 0,
    };
  }
  
  // For other types of errors
  return {
    message: error.message || 'An unknown error occurred',
    code: 'UNKNOWN_ERROR',
  };
};

/**
 * Get a user-friendly error message
 * @param error - Error object from catch block
 * @returns User-friendly error message
 */
export const getUserFriendlyErrorMessage = (error: any): string => {
  const apiError = parseApiError(error);
  
  // Map status codes to user-friendly messages
  if (apiError.status) {
    switch (apiError.status) {
      case 400:
        return 'The request was invalid. Please check your input and try again.';
      case 401:
        return 'You need to log in to access this resource.';
      case 403:
        return 'You do not have permission to access this resource.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'There was a conflict with the current state of the resource.';
      case 422:
        return 'Validation failed. Please check your input and try again.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'A server error occurred. Please try again later.';
    }
  }
  
  // Return the error message or a default message
  return apiError.message || 'An unknown error occurred. Please try again.';
};

/**
 * Log an error to the console with additional context
 * @param error - Error object
 * @param context - Additional context about where the error occurred
 */
export const logError = (error: any, context: string): void => {
  console.error(`Error in ${context}:`, error);
  
  // Parse the error for more detailed logging
  const apiError = parseApiError(error);
  console.error('Parsed error:', apiError);
  
  // Log additional details if available
  if (error.response) {
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
  }
  
  if (error.request) {
    console.error('Request:', error.request);
  }
  
  if (error.config) {
    console.error('Request config:', {
      url: error.config.url,
      method: error.config.method,
      headers: error.config.headers,
    });
  }
};

/**
 * Handle form validation errors
 * @param apiError - API error object
 * @returns Object mapping field names to error messages
 */
export const handleFormValidationErrors = (apiError: ApiError): Record<string, string> => {
  const fieldErrors: Record<string, string> = {};
  
  if (apiError.errors) {
    // Convert the errors object to a flat structure
    Object.entries(apiError.errors).forEach(([field, messages]) => {
      fieldErrors[field] = Array.isArray(messages) ? messages[0] : messages as string;
    });
  }
  
  return fieldErrors;
};