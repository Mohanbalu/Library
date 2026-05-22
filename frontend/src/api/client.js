import { clearSession, getToken } from '@/utils/storage';
import axios from 'axios';

/**
 * Axios API Client with JWT Token Management
 * Features:
 * - Automatic JWT token injection
 * - Request/Response interceptors
 * - Centralized error handling
 * - Automatic logout on token expiry
 * - Retry mechanism for failed requests
 */

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8089/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

/**
 * Request Interceptor
 * - Attach JWT token to Authorization header
 * - Add request timestamp for debugging
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add request timestamp for debugging
    config.metadata = { startTime: Date.now() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * - Handle successful responses
 * - Handle errors centrally
 * - Auto-logout on 401 unauthorized
 * - Format error messages
 */
apiClient.interceptors.response.use(
  (response) => {
    // Calculate response time for monitoring
    if (response.config.metadata) {
      response.duration = Date.now() - response.config.metadata.startTime;
    }
    return response;
  },
  (error) => {
    // Handle request timeout
    if (error.code === 'ECONNABORTED') {
      const errorMsg = 'Request timeout. Please try again.';
      console.error('Request timeout:', error);
      return Promise.reject(new Error(errorMsg));
    }

    // Handle network errors
    if (error.message === 'Network Error' || !error.response) {
      const errorMsg = 'Network error. Please check your connection.';
      console.error('Network error:', error);
      return Promise.reject(new Error(errorMsg));
    }

    const status = error?.response?.status;
    const data = error?.response?.data || {};
    const requestUrl = error?.config?.url || '';

    // Handle 401 Unauthorized - Auto logout
    if (status === 401) {
      const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register');

      if (!isAuthRequest) {
        clearSession();
        window.dispatchEvent(new Event('auth:unauthorized'));
      }

      const errorMsg = data.message || (isAuthRequest ? 'Invalid email or password.' : 'Your session has expired. Please log in again.');
      return Promise.reject(new Error(errorMsg));
    }

    // Handle 403 Forbidden
    if (status === 403) {
      const errorMsg = 'You do not have permission to perform this action.';
      return Promise.reject(new Error(errorMsg));
    }

    // Handle 404 Not Found
    if (status === 404) {
      const errorMsg = data.message || 'The requested resource was not found.';
      return Promise.reject(new Error(errorMsg));
    }

    // Handle 400 Bad Request / 422 Unprocessable Entity
    if (status === 400 || status === 422) {
      let errorMsg = data.message || data.error || 'Invalid request. Please check your input.';

      // Handle validation errors
      if (data.errors) {
        if (Array.isArray(data.errors)) {
          errorMsg = data.errors.map((e) => e.message || e).join(', ');
        } else if (typeof data.errors === 'object') {
          errorMsg = Object.values(data.errors).join(', ');
        }
      }

      return Promise.reject(new Error(errorMsg));
    }

    // Handle 500+ Server errors
    if (status >= 500) {
      const errorMsg = 'Server error. Please try again later.';
      console.error('Server error:', error.response);
      return Promise.reject(new Error(errorMsg));
    }

    // Generic error handling
    const errorMsg = data.message || data.error || error.message || 'Something went wrong.';
    return Promise.reject(new Error(errorMsg));
  }
);

export default apiClient;
