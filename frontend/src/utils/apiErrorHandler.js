import toast from 'react-hot-toast';

/**
 * API Error Handler Utility
 * Centralized error handling for API responses
 */

export const API_ERROR_CODES = {
  // Client errors (4xx)
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server errors (5xx)
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,

  // Network errors
  NETWORK_ERROR: 0,
  TIMEOUT: 'TIMEOUT',
};

/**
 * Extract error message from various API response formats
 */
const extractErrorMessage = (error) => {
  // Axios error structure
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      return errors[0].message || errors[0];
    }
    if (typeof errors === 'object') {
      const firstKey = Object.keys(errors)[0];
      return errors[firstKey];
    }
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};

/**
 * Get user-friendly error message based on status code
 */
const getStatusCodeMessage = (statusCode) => {
  const messages = {
    [API_ERROR_CODES.BAD_REQUEST]: 'Invalid request. Please check your input.',
    [API_ERROR_CODES.UNAUTHORIZED]: 'Unauthorized. Please log in again.',
    [API_ERROR_CODES.FORBIDDEN]: 'You do not have permission to perform this action.',
    [API_ERROR_CODES.NOT_FOUND]: 'The requested resource was not found.',
    [API_ERROR_CODES.CONFLICT]: 'A conflict occurred. The resource may already exist.',
    [API_ERROR_CODES.UNPROCESSABLE_ENTITY]: 'Unable to process the request. Please check your input.',
    [API_ERROR_CODES.INTERNAL_SERVER_ERROR]: 'Server error. Please try again later.',
    [API_ERROR_CODES.BAD_GATEWAY]: 'Server is temporarily unavailable.',
    [API_ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service is currently unavailable. Please try again later.',
    [API_ERROR_CODES.GATEWAY_TIMEOUT]: 'Request timeout. Please try again.',
  };

  return messages[statusCode] || 'An error occurred. Please try again.';
};

/**
 * Main error handler function
 */
export const handleApiError = (error, options = {}) => {
  const {
    showToast = true,
    onUnauthorized = null,
    onForbidden = null,
    onNotFound = null,
    onServerError = null,
  } = options;

  const statusCode = error?.response?.status;
  let errorMessage = extractErrorMessage(error);

  // If no specific error message, use status code message
  if (!errorMessage || errorMessage === error?.message) {
    errorMessage = getStatusCodeMessage(statusCode);
  }

  // Handle specific status codes
  switch (statusCode) {
    case API_ERROR_CODES.UNAUTHORIZED:
      if (onUnauthorized) onUnauthorized();
      if (showToast) toast.error('Session expired. Please log in again.');
      break;

    case API_ERROR_CODES.FORBIDDEN:
      if (onForbidden) onForbidden();
      if (showToast) toast.error('Access denied.');
      break;

    case API_ERROR_CODES.NOT_FOUND:
      if (onNotFound) onNotFound();
      if (showToast) toast.error(errorMessage);
      break;

    case API_ERROR_CODES.BAD_REQUEST:
    case API_ERROR_CODES.UNPROCESSABLE_ENTITY:
    case API_ERROR_CODES.CONFLICT:
      if (showToast) toast.error(errorMessage);
      break;

    case API_ERROR_CODES.INTERNAL_SERVER_ERROR:
    case API_ERROR_CODES.BAD_GATEWAY:
    case API_ERROR_CODES.SERVICE_UNAVAILABLE:
    case API_ERROR_CODES.GATEWAY_TIMEOUT:
      if (onServerError) onServerError();
      if (showToast) toast.error(errorMessage);
      break;

    case API_ERROR_CODES.NETWORK_ERROR:
    case API_ERROR_CODES.TIMEOUT:
      if (showToast) toast.error('Network error. Please check your connection.');
      break;

    default:
      if (showToast) toast.error(errorMessage);
  }

  return {
    statusCode,
    message: errorMessage,
    data: error?.response?.data,
  };
};

/**
 * Validate API response
 */
export const validateApiResponse = (response) => {
  if (!response) {
    throw new Error('No response from server');
  }

  if (response.status < 200 || response.status >= 300) {
    throw new Error(`Invalid response status: ${response.status}`);
  }

  return true;
};

/**
 * Handle form validation errors
 */
export const handleValidationError = (error) => {
  const fieldErrors = {};

  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;

    if (Array.isArray(errors)) {
      errors.forEach((err) => {
        fieldErrors[err.field] = err.message;
      });
    } else if (typeof errors === 'object') {
      Object.assign(fieldErrors, errors);
    }
  }

  return fieldErrors;
};

/**
 * Create error object with additional context
 */
export const createErrorObject = (error, context = {}) => {
  return {
    statusCode: error?.response?.status,
    message: extractErrorMessage(error),
    originalError: error,
    context,
    timestamp: new Date().toISOString(),
  };
};

export default {
  handleApiError,
  validateApiResponse,
  handleValidationError,
  createErrorObject,
  extractErrorMessage,
  getStatusCodeMessage,
  API_ERROR_CODES,
};
